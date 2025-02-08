"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

const questions = [
  {
    question:
      "How long are you willing to wait for returns on your investment?",
    options: [
      { label: "Less than 1 year", value: "high" },
      { label: "1-5 years", value: "medium" },
      { label: "More than 5 years", value: "low" },
    ],
  },
  {
    question: "If your investment drops 20% in value, how would you react?",
    options: [
      { label: "Hold or invest more", value: "high" },
      { label: "Wait and see", value: "medium" },
      { label: "Sell immediately", value: "low" },
    ],
  },
  {
    question: "What kind of returns do you expect?",
    options: [
      { label: "15%+", value: "high" },
      { label: "8-15%", value: "medium" },
      { label: "3-8%", value: "low" },
    ],
  },
  {
    question:
      "Do you have enough savings to cover expenses for the next 6-12 months?",
    options: [
      { label: "No, I rely on quick returns", value: "high" },
      { label: "Partially", value: "medium" },
      { label: "Yes, I am financially stable", value: "low" },
    ],
  },
  {
    question:
      "How familiar are you with financial markets and investment strategies?",
    options: [
      { label: "Expert, I take calculated risks", value: "high" },
      { label: "Somewhat knowledgeable", value: "medium" },
      { label: "Beginner, I prefer safer options", value: "low" },
    ],
  },
  {
    question:
      "Would you prefer to put all your money into one high-potential option or diversify?",
    options: [
      { label: "All in one high-reward option", value: "high" },
      { label: "Some diversification but with growth focus", value: "medium" },
      { label: "Fully diversified portfolio", value: "low" },
    ],
  },
  {
    question: "How stable is your primary source of income?",
    options: [
      { label: "Unstable, variable income", value: "high" },
      { label: "Moderately stable", value: "medium" },
      { label: "Very stable", value: "low" },
    ],
  },
];

export function AIAssessmentModal({ isOpen, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Process answers and determine risk level
      const riskLevel = determineRiskLevel(newAnswers);
      console.log(`AI determined risk level: ${riskLevel}`);
      onClose();
      // Here you would typically navigate to the appropriate risk level page
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-black text-gray-100 border-purple-500">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent text-yellow-300">
            AI Risk Assessment
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Progress
            value={((currentQuestion + 1) / questions.length) * 100}
            className="mb-4"
          />
          <p className="mb-4 text-lg font-semibold">
            {questions[currentQuestion].question}
          </p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  answers[currentQuestion] === option.value
                    ? "ring-2 ring-yellow-400"
                    : ""
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button
              onClick={goBack}
              disabled={currentQuestion === 0}
              className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 ease-in-out"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {isLastQuestion && (
              <Button
                onClick={() => {
                  const riskLevel = determineRiskLevel(answers);
                  console.log(`AI determined risk level: ${riskLevel}`);
                  onClose();
                }}
                className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 ease-in-out"
              >
                Finish
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function determineRiskLevel(answers: string[]): string {
  const riskScores = { low: 1, medium: 2, high: 3 };
  const totalScore = answers.reduce(
    (sum, answer) => sum + riskScores[answer],
    0
  );
  const averageScore = totalScore / answers.length;

  if (averageScore < 1.5) return "low";
  if (averageScore < 2.5) return "medium";
  return "high";
}
