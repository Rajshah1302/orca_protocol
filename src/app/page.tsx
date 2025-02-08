"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AIAssessmentModal } from "@/components/AIAssessmentModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Info } from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === "ai") {
      setIsModalOpen(true);
    } else {
      // Handle navigation to risk level pages
      console.log(`Navigating to ${option} risk page`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-36 bg-black">
      <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        HorizonAI
      </h1>

      {/* New section for website description */}
      <section className="text-center mb-12 max-w-2xl">
        <p className="text-xl text-gray-300 mb-4">
          See Beyond. Invest Smarter.   🚀
        </p>
        {/* <Card className="bg-gray-800 border-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-2xl text-purple-400">
              <Info className="mr-2" />
              About HorizonAI
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p className="mb-2">
              Our AI-driven platform analyzes your financial goals, risk
              tolerance, and market knowledge to recommend the most suitable
              investment approach for you.
            </p>
            <p>
              We're solving the challenge of one-size-fits-all investment
              advice, ensuring that whether you're a cautious saver or an
              ambitious risk-taker, your investment strategy aligns perfectly
              with your financial aspirations.
            </p>
          </CardContent>
        </Card> */}
      </section>

      <h2 className="text-3xl font-semibold mb-8 text-yellow-300">
        Choose Your Risk Level
      </h2>
      <div className="grid grid-cols-3 gap-8 w-full max-w-5xl mb-12">
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
