"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AIAssessmentModal } from "@/components/AIAssessmentModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Info } from "lucide-react";
import { Header } from "@/components/header";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === "ai") {
      setIsModalOpen(true);
    } else {
      console.log(`Navigating to ${option} risk page`);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="flex flex-col items-center justify-start px-4 py-12 md:px-36">
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          HorizonAI
        </h1>

        <section className="text-center mb-12 max-w-2xl">
          <p className="text-xl text-gray-300 mb-4">
            See Beyond. Invest Smarter. 🚀
          </p>
        </section>


        <h2 className="text-3xl font-semibold mb-8 text-yellow-300">
          Choose Your Risk Level
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
          <RiskCard
            title="High Risk"
            description="For experienced investors seeking maximum returns"
            color="from-red-600 to-orange-600"
            onClick={() => handleOptionClick("high")}
          />
          <RiskCard
            title="Medium Risk"
            description="Balanced approach for moderate growth"
            color="from-yellow-600 to-amber-600"
            onClick={() => handleOptionClick("medium")}
          />
          <RiskCard
            title="Low Risk"
            description="Conservative strategy for stable returns"
            color="from-green-600 to-emerald-600"
            onClick={() => handleOptionClick("low")}
          />
        </div>
        <Button
          onClick={() => handleOptionClick("ai")}
          className="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Brain className="mr-2 h-6 w-6" />
          Let AI Decide
          <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
        <AIAssessmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}

function RiskCard({ title, description, color, onClick }) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer`}
      onClick={onClick}
    >
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      <CardHeader className="bg-gray-800">
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="bg-gray-700 text-gray-200 p-6">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
