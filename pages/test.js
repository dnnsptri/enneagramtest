import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

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
      
      const resultData = {
        scores,
        primaryType,
        secondaryType,
        tertiaryType,
        timestamp: new Date().toISOString()
      };
      
      // Store in localStorage for persistence
      const resultId = Date.now().toString();
      localStorage.setItem(`enneagram-result-${resultId}`, JSON.stringify(resultData));
      
      // Also try to save to server
      try {
        const response = await fetch('/api/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resultData),
        });
        
        if (response.ok) {
          const data = await response.json();
          router.push(`/results?id=${data.id}`);
          return;
        }
      } catch (serverError) {
        console.log('Server storage failed, using localStorage only');
      }
      
      // If server fails, use localStorage ID
      router.push(`/results?id=${resultId}`);
    } catch (error) {
      console.error('Error submitting results:', error);
      alert('Er is een fout opgetreden bij het opslaan van de resultaten.');
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

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const previousAnswer = answers[answers.length - 1];
      const previousAnswers = answers.slice(0, -1);
      setAnswers(previousAnswers);
      setCurrentQuestion(currentQuestion - 1);
      form.reset({ answer: previousAnswer });
      setShowError(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-start">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="w-full bg-[#F8F5F1] h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Form Card */}
        <div className="rounded-lg bg-[#F7F5F1] text-card-foreground shadow-sm p-8">
          {showError && (
            <div className="text-[#B56362] text-sm mb-4">Selecteer een antwoord om verder te gaan.</div>
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
              <h2 className="text-2xl font-bold mb-8 min-h-[64px] flex items-start font-sans">
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
                    className="h-5 w-5 accent-[#B56362] focus:outline-none cursor-pointer"
                  />
                  <label htmlFor="r2" className="text-base font-medium font-sans">Eens</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="r0"
                    value="0"
                    name="answer"
                    onChange={() => form.setValue('answer', 0)}
                    checked={form.watch('answer') === 0}
                    className="h-5 w-5 accent-[#B56362] focus:outline-none cursor-pointer"
                  />
                  <label htmlFor="r0" className="text-base font-medium font-sans">Oneens</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="r1"
                    value="1"
                    name="answer"
                    onChange={() => form.setValue('answer', 1)}
                    checked={form.watch('answer') === 1}
                    className="h-5 w-5 accent-[#B56362] focus:outline-none cursor-pointer"
                  />
                  <label htmlFor="r1" className="text-base font-medium font-sans">Deels</label>
                </div>
              </div>
            </div>
            <button 
              type="submit"
              className="inline-flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-[#2F4F43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors font-sans"
            >
              {currentQuestion < questions.length - 1 ? "Volgende" : "Resultaten Bekijken"}
            </button>
            {currentQuestion > 0 && (
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="text-xs text-[#383838] font-light hover:underline font-sans"
                >
                  Vorige
                </button>
              </div>
            )}
          </form>
        </div>
        <div className="flex justify-center mt-10">
          <p className="text-xs text-[#383838] font-light font-sans">
            ©{new Date().getFullYear()} Enneagramtest - <Link href="https://www.groeienontwikkelingscoach.nl/" target="_blank" rel="noopener noreferrer" className="underline">Groei- en Ontwikkelingscoach</Link>
          </p>
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
  // Define the three centers according to Enneagram theory
  const gutCenter = [8, 9, 1];   // Gut/Body center: doing
  const heartCenter = [2, 3, 4]; // Heart center: feeling
  const headCenter = [5, 6, 7];  // Head center: thinking
  
  // Find the highest scoring type in each center
  const getHighestInCenter = (center) => {
    let highestType = center[0];
    let highestScore = scores[center[0] - 1];
    
    center.forEach(type => {
      if (scores[type - 1] > highestScore) {
        highestScore = scores[type - 1];
        highestType = type;
      }
    });
    
    return { type: highestType, score: highestScore };
  };
  
  const gutResult = getHighestInCenter(gutCenter);
  const heartResult = getHighestInCenter(heartCenter);
  const headResult = getHighestInCenter(headCenter);
  
  // Sort the three types by score (highest to lowest)
  const triTypeResults = [
    gutResult,
    heartResult,
    headResult
  ].sort((a, b) => b.score - a.score);
  
  return {
    primaryType: triTypeResults[0].type,
    secondaryType: triTypeResults[1].type,
    tertiaryType: triTypeResults[2].type
  };
}