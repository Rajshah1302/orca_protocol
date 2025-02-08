"use client";
import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function TradingForm() {
  const [amountPerBuy, setAmountPerBuy] = useState<string>("");
  const [bookProfit, setBookProfit] = useState<string>("");
  const [cutLoss, setCutLoss] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [loadingSubmission, setLoadingSubmission] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    amountPerBuy?: string;
    bookProfit?: string;
    cutLoss?: string;
    instructions?: string;
  }>({});

  const validateInputs = () => {
    const newErrors: any = {};

    if (!amountPerBuy) {
      newErrors.amountPerBuy = "Amount per buy is required";
    } else if (Number(amountPerBuy) <= 0) {
      newErrors.amountPerBuy = "Amount must be greater than 0";
    }

    if (!bookProfit) {
      newErrors.bookProfit = "Book profit multiplier is required";
    } else if (Number(bookProfit) <= 0) {
      newErrors.bookProfit = "Multiplier must be greater than 0";
    }

    if (!cutLoss) {
      newErrors.cutLoss = "Cut loss percentage is required";
    } else if (Number(cutLoss) <= 0 || Number(cutLoss) >= 100) {
      newErrors.cutLoss = "Percentage must be between 0 and 100";
    }

    if (!instructions.trim()) {
      newErrors.instructions = "Instructions are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      setLoadingSubmission(true);
      setTimeout(() => {
        setLoadingSubmission(false);
        setSubmitted(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-[#111111] border border-gray-800 rounded-lg">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-yellow-400 text-center mb-8">
              Trading Parameters
            </h1>
            {!submitted ? (
              <div className="space-y-4">
                <CardDescription className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Amount per buy (ETH)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount in ETH"
                      className="w-full h-12 bg-black border-gray-800 text-gray-300 placeholder-gray-500 focus:border-yellow-400 focus:ring-0"
                      value={amountPerBuy}
                      onChange={(e) => setAmountPerBuy(e.target.value)}
                    />
                    {errors.amountPerBuy && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.amountPerBuy}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Book Profit At (Multiplier)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter profit multiplier"
                      className="w-full h-12 bg-black border-gray-800 text-gray-300 placeholder-gray-500 focus:border-yellow-400 focus:ring-0"
                      value={bookProfit}
                      onChange={(e) => setBookProfit(e.target.value)}
                    />
                    {errors.bookProfit && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.bookProfit}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Cut Losses (Percentage)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter loss percentage"
                      className="w-full h-12 bg-black border-gray-800 text-gray-300 placeholder-gray-500 focus:border-yellow-400 focus:ring-0"
                      value={cutLoss}
                      onChange={(e) => setCutLoss(e.target.value)}
                    />
                    {errors.cutLoss && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.cutLoss}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Instructions
                    </label>
                    <div className="bg-black border border-purple-400 rounded-lg p-4">
                      <Textarea
                        placeholder="Enter detailed trading instructions..."
                        className="w-full min-h-[200px] bg-black border-0 text-gray-300 placeholder-gray-500 focus:ring-0 resize-none"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                      />
                    </div>
                    {errors.instructions && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.instructions}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    {loadingSubmission ? (
                      <Button
                        className="w-full h-12 bg-yellow-300 hover:bg-grey-800 text-black font-medium"
                        disabled
                      >
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Starting...
                      </Button>
                    ) : (
                      <Button
                        className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                        onClick={handleSubmit}
                      >
                        Let's Go
                      </Button>
                    )}
                  </div>
                </CardDescription>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-8 py-8">
                <p className="text-lg text-gray-300 text-center">
                  Your trading parameters have been successfully submitted!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
