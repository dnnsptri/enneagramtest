import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import type { Question } from "@shared/types";

const answerSchema = z.object({
  answer: z.number().min(0).max(2)
});

type FormData = z.infer<typeof answerSchema>;

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [, setLocation] = useLocation();

  const { data: questions, isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"]
  });

  const form = useForm<FormData>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: undefined
    }
  });

  const [answers, setAnswers] = useState<number[]>([]);

  const mutation = useMutation({
    mutationFn: async (scores: number[]) => {
      const { primaryType, secondaryType, tertiaryType } = calculateTriTypes(scores);

      const response = await apiRequest("POST", "/api/results", {
        scores,
        primaryType,
        secondaryType,
        tertiaryType,
        timestamp: new Date().toISOString()
      });
      return await response.json();
    },
    onSuccess: (data) => {
      setLocation(`/results/${data.id}`);
    }
  });

  if (isLoading || !questions) {
    return <div>Laden...</div>;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const onSubmit = (data: FormData) => {
    const newAnswers = [...answers, data.answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Reset form with undefined value to clear radio selection
      form.reset({ answer: undefined });
    } else {
      mutation.mutate(calculateScores(newAnswers, questions));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Progress value={progress} className="mb-8" />

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
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
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2 min-h-[80px] flex items-start">
                    {questions[currentQuestion].text}
                  </h2>

                  <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(parseInt(value));
                              // Optionally auto-submit on selecting an option
                              // Uncomment the next line to enable automatic submission on selecting
                              // setTimeout(() => form.handleSubmit(onSubmit)(), 300);
                            }}
                            value={field.value?.toString()}
                            className="space-y-1.2" /* Reduced spacing by 40% (from 2 to 1.2) */
                          >
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center space-x-2 p-3 cursor-pointer" onClick={() => field.onChange(2)}>
                                  <RadioGroupItem value="2" id="r2" />
                                  <FormLabel htmlFor="r2" className="text-base w-full cursor-pointer">Eens</FormLabel>
                                </div>
                              </FormControl>
                            </FormItem>
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center space-x-2 p-3 cursor-pointer" onClick={() => field.onChange(0)}>
                                  <RadioGroupItem value="0" id="r0" />
                                  <FormLabel htmlFor="r0" className="text-base w-full cursor-pointer">Oneens</FormLabel>
                                </div>
                              </FormControl>
                            </FormItem>
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center space-x-2 p-3 cursor-pointer" onClick={() => field.onChange(1)}>
                                  <RadioGroupItem value="1" id="r1" />
                                  <FormLabel htmlFor="r1" className="text-base w-full cursor-pointer">Deels</FormLabel>
                                </div>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {currentQuestion < questions.length - 1 ? "Volgende" : "Resultaten Bekijken"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function calculateScores(answers: number[], questions: Question[]): number[] {
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

function calculateTriTypes(scores: number[]): { primaryType: number, secondaryType: number, tertiaryType: number } {
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

// Keep the original function for backward compatibility
function calculatePrimaryType(scores: number[]): number {
  const maxScore = Math.max(...scores);
  // If all scores are 0, default to type 1
  if (maxScore === 0) return 1;
  return scores.indexOf(maxScore) + 1;
}