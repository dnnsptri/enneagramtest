import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  // Form setup
  const form = useForm({
    defaultValues: {
      answer: undefined
    }
  });

  // Fetch questions on page load
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setIsLoading(false);
      }
    }
    
    fetchQuestions();
  }, []);

  // Submit results and redirect to results page
  async function submitResults(scores) {
    try {
      const { primaryType, secondaryType, tertiaryType } = calculateTriTypes(scores);
      
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scores,
          primaryType,
          secondaryType,
          tertiaryType,
          timestamp: new Date().toISOString()
        }),
      });
      
      const data = await response.json();
      router.push(`/results?id=${data.id}`);
    } catch (error) {
      console.error('Error submitting results:', error);
      // Handle error
    }
  }

  if (isLoading || !questions || questions.length === 0) {
    return <div>Laden...</div>;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const onSubmit = (data) => {
    if (data.answer === undefined) {
      setShowError(true);
      return;
    }
    setShowError(false);
    const newAnswers = [...answers, data.answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      form.reset({ answer: undefined });
    } else {
      submitResults(calculateScores(newAnswers, questions));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-start">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border bg-white text-card-foreground shadow-lg p-8">
          {showError && (
            <div className="text-red-600 text-sm mb-4">Selecteer een antwoord om verder te gaan.</div>
          )}
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            key={currentQuestion}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && form.getValues('answer') !== undefined) {
                form.handleSubmit(onSubmit)();
              }
            }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-8 min-h-[64px] flex items-start">
                {questions[currentQuestion].text}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="r2"
                    value="2"
                    name="answer"
                    onChange={() => form.setValue('answer', 2)}
                    checked={form.watch('answer') === 2}
                    className="h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500 rounded-full"
                  />
                  <label htmlFor="r2" className="text-base font-medium">Eens</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="r0"
                    value="0"
                    name="answer"
                    onChange={() => form.setValue('answer', 0)}
                    checked={form.watch('answer') === 0}
                    className="h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500 rounded-full"
                  />
                  <label htmlFor="r0" className="text-base font-medium">Oneens</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="r1"
                    value="1"
                    name="answer"
                    onChange={() => form.setValue('answer', 1)}
                    checked={form.watch('answer') === 1}
                    className="h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500 rounded-full"
                  />
                  <label htmlFor="r1" className="text-base font-medium">Deels</label>
                </div>
              </div>
            </div>
            <button 
              type="submit"
              className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              {currentQuestion < questions.length - 1 ? "Volgende" : "Resultaten Bekijken"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function calculateScores(answers, questions) {
  // Initialize arrays to store scores and counts for each type (1-9)
  const typeScores = new Array(9).fill(0);
  const typeCounts = new Array(9).fill(0);

  // Process each answer
  answers.forEach((answer, index) => {
    if (answer !== undefined && questions[index]) { // Check both answer and question exist
      const type = questions[index].type;
      typeScores[type - 1] += answer;
      typeCounts[type - 1]++;
    }
  });

  // Calculate average scores, handling division by zero
  return typeScores.map((score, index) => 
    typeCounts[index] > 0 ? score / typeCounts[index] : 0
  );
}

function calculateTriTypes(scores) {
  // Make a copy of the scores array
  const scoresCopy = [...scores];
  
  // Find primary type (highest score)
  const primaryScore = Math.max(...scoresCopy);
  // If all scores are 0, default to type 1, 2, 3 
  if (primaryScore === 0) return { primaryType: 1, secondaryType: 2, tertiaryType: 3 };
  
  const primaryIndex = scoresCopy.indexOf(primaryScore);
  const primaryType = primaryIndex + 1;
  
  // Set the primary score to -1 so it's not chosen again
  scoresCopy[primaryIndex] = -1;
  
  // Find secondary type (second highest score)
  const secondaryScore = Math.max(...scoresCopy);
  const secondaryIndex = scoresCopy.indexOf(secondaryScore);
  const secondaryType = secondaryIndex + 1;
  
  // Set the secondary score to -1 so it's not chosen again
  scoresCopy[secondaryIndex] = -1;
  
  // Find tertiary type (third highest score)
  const tertiaryScore = Math.max(...scoresCopy);
  const tertiaryIndex = scoresCopy.indexOf(tertiaryScore);
  const tertiaryType = tertiaryIndex + 1;
  
  return { primaryType, secondaryType, tertiaryType };
}