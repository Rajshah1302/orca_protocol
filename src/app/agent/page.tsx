import { notFound } from "next/navigation";
import { agents } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Cpu } from "lucide-react";

export default function AgentPage() {
  const agent = agents.find((a) => a.id === '1');


  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-yellow-500/50 text-yellow-400"
            >
              {agent.codename}
            </Badge>
            <Cpu className="h-5 w-5 text-yellow-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">{agent.name}</h1>
          <p className="text-gray-400">{agent.description}</p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400">Total Profit</p>
              <p className="text-2xl font-bold text-green-400">
                ${agent.totalProfit.toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-white">
                {agent.successRate}%
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400">Total Trades</p>
              <p className="text-2xl font-bold text-white">
                {agent.tradesExecuted}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agent.trades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      {trade.type === "BUY" ? (
                        <ArrowDown className="h-4 w-4 text-green-400" />
                      ) : (
                        <ArrowUp className="h-4 w-4 text-red-400" />
                      )}
                      <span className="font-medium text-white">
                        {trade.pair}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {trade.timestamp.toLocaleDateString()}{" "}
                      {trade.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-white">
                      {trade.type === "BUY" ? "-" : "+"}$
                      {(trade.amount * trade.price).toFixed(2)}
                    </p>
                    {trade.profit && (
                      <p className="text-sm font-medium text-green-400">
                        +${trade.profit.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
