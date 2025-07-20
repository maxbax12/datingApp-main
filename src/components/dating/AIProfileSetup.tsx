import { useState } from "react";
import { Bot, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  id: string;
  text: string;
  type: "text" | "choice" | "scale";
  options?: string[];
  required: boolean;
}

const setupQuestions: Question[] = [
  {
    id: "1",
    text: "What are you looking for in a relationship?",
    type: "choice",
    options: [
      "Something casual",
      "Long-term relationship",
      "Not sure yet",
      "Just friends",
    ],
    required: true,
  },
  {
    id: "2",
    text: "How would you describe your personality?",
    type: "text",
    required: true,
  },
  {
    id: "3",
    text: "What are your main interests and hobbies?",
    type: "text",
    required: true,
  },
  {
    id: "4",
    text: "How important is physical fitness in your life?",
    type: "scale",
    required: false,
  },
  {
    id: "5",
    text: "What's your ideal first date?",
    type: "text",
    required: true,
  },
  {
    id: "6",
    text: "How do you prefer to communicate?",
    type: "choice",
    options: ["Texting", "Phone calls", "Video calls", "In person"],
    required: true,
  },
  {
    id: "7",
    text: "What are your deal-breakers in a relationship?",
    type: "text",
    required: true,
  },
];

interface AIProfileSetupProps {
  onComplete: () => void;
}

const AIProfileSetup = ({ onComplete }: AIProfileSetupProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const question = setupQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / setupQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < setupQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Setup complete
      setIsProcessing(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    const answer = answers[question.id];
    return !question.required || (answer && answer.trim().length > 0);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="relative">
              <Bot className="h-16 w-16 mx-auto text-purple-500 mb-4" />
              <Sparkles className="h-6 w-6 absolute top-0 right-1/3 text-pink-500 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Creating Your AI Avatar
            </h2>
            <p className="text-gray-600 mb-6">
              I'm analyzing your responses to create a personalized AI that
              understands you...
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing answers</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Bot className="h-12 w-12 text-purple-500" />
          </div>
          <CardTitle className="text-xl">AI Avatar Setup</CardTitle>
          <p className="text-sm text-gray-600">
            Let me get to know you to create your personal dating AI
          </p>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>
                Question {currentQuestion + 1} of {setupQuestions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">{question.text}</h3>

            {question.type === "text" && (
              <Textarea
                value={answers[question.id] || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder="Tell me about yourself..."
                className="min-h-[100px]"
              />
            )}

            {question.type === "choice" && (
              <div className="space-y-2">
                {question.options?.map((option) => (
                  <Button
                    key={option}
                    variant={
                      answers[question.id] === option ? "default" : "outline"
                    }
                    className="w-full justify-start"
                    onClick={() => handleAnswer(option)}
                  >
                    {answers[question.id] === option && (
                      <Check className="h-4 w-4 mr-2" />
                    )}
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {question.type === "scale" && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Not important</span>
                  <span>Very important</span>
                </div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      variant={
                        answers[question.id] === value.toString()
                          ? "default"
                          : "outline"
                      }
                      className="flex-1 p-2"
                      onClick={() => handleAnswer(value.toString())}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => {
                  // Quick complete for demo
                  setIsProcessing(true);
                  setTimeout(() => {
                    onComplete();
                  }, 1000);
                }}
                className="text-xs text-gray-500"
              >
                Skip Demo
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-purple-500 hover:bg-purple-600"
              >
                {currentQuestion === setupQuestions.length - 1
                  ? "Complete Setup"
                  : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          {!question.required && (
            <p className="text-xs text-gray-500 text-center">
              This question is optional
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIProfileSetup;
