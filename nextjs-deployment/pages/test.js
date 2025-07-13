import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();

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
    const newAnswers = [...answers, data.answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Reset form with undefined value to clear radio selection
      form.reset({ answer: undefined });
    } else {
      submitResults(calculateScores(newAnswers, questions));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="w-full bg-secondary h-3 rounded-full mb-8">
          <div 
            className="bg-primary h-3 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              key={currentQuestion}
              onKeyDown={(e) => {
                // Submit form when Enter is pressed if an answer is selected
                if (e.key === 'Enter' && form.getValues('answer') !== undefined) {
                  form.handleSubmit(onSubmit)();
                }
              }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-6 min-h-[100px] flex items-start">
                  {questions[currentQuestion].text}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="r2"
                      value="2"
                      name="answer"
                      onChange={() => form.setValue('answer', 2)}
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="r2" className="text-sm font-medium">Eens</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="r0"
                      value="0"
                      name="answer"
                      onChange={() => form.setValue('answer', 0)}
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="r0" className="text-sm font-medium">Oneens</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="r1"
                      value="1"
                      name="answer"
                      onChange={() => form.setValue('answer', 1)}
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="r1" className="text-sm font-medium">Deels</label>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {currentQuestion < questions.length - 1 ? "Volgende" : "Resultaten Bekijken"}
              </button>
            </form>
          </div>
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