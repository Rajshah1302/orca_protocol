import Link from "next/link";
import { agents } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-yellow-400">
            AI Trading Agents
          </h1>
          <p className="text-gray-400">
            Advanced algorithmic trading powered by artificial intelligence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Link key={agent.id} href={`/agent/`}>
              <Card className="group h-full cursor-pointer border-gray-800 bg-gray-900/50 transition-all hover:border-yellow-500/50 hover:bg-gray-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-yellow-500/50 text-yellow-400"
                    >
                      {agent.codename}
                    </Badge>
                    <Cpu className="h-5 w-5 text-yellow-400" />
                  </div>
                  <CardTitle className="text-xl text-white">
                    {agent.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-400">
                    {agent.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Success Rate</p>
                      <p className="font-mono text-white">
                        {agent.successRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Profit</p>
                      <p className="font-mono text-green-400">
                        ${agent.totalProfit.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between text-sm text-gray-400">
                  <span>{agent.tradesExecuted} trades</span>
                  <ArrowUpRight className="h-4 w-4 text-yellow-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
