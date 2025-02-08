"use client";

import { useState } from "react";
import { walletInfo } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Copy,
  History,
  Wallet,
  Network,
  PieChart,
} from "lucide-react";

export default function Dashboard() {
  const [showDeposit, setShowDeposit] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(walletInfo.address);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <Dialog open={showDeposit} onOpenChange={setShowDeposit}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Deposit
              </Button>
            </DialogTrigger>
            <DialogContent className="border-gray-800 bg-gray-900 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Deposit Funds</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="rounded-lg border border-gray-800 bg-black/50 p-4">
                  <p className="mb-2 text-sm text-gray-400">
                    Your Wallet Address
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-gray-800 px-2 py-1 font-mono text-sm text-white">
                      {walletInfo.address}
                    </code>
                    <Button variant="ghost" size="icon" onClick={copyAddress}>
                      <Copy className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Amount to Deposit
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="border-gray-800 bg-black/50 text-white"
                  />
                </div>
                <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
                  Confirm Deposit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Wallet Balance
              </CardTitle>
              <Wallet className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {walletInfo.balance} ETH
              </div>
              <p className="text-xs text-gray-400">
                ≈ ${(walletInfo.balance * 2500).toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Network
              </CardTitle>
              <Network className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {walletInfo.network}
              </div>
              <p className="text-xs text-gray-400">Connected & Synced</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Portfolio Value
              </CardTitle>
              <PieChart className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                $
                {walletInfo.portfolio
                  .reduce((acc, curr) => acc + curr.value, 0)
                  .toFixed(2)}
              </div>
              <p className="text-xs text-gray-400">
                Across {walletInfo.portfolio.length} assets
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">
                Portfolio Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletInfo.portfolio.map((item) => (
                  <div
                    key={item.asset}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white">
                        {item.asset}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.amount} {item.asset}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        ${item.value.toFixed(2)}
                      </p>
                      <p
                        className={`text-xs ${
                          item.change24h >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {item.change24h >= 0 ? "+" : ""}
                        {item.change24h}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletInfo.transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between rounded-lg border border-gray-800 bg-black/50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-2 ${
                          tx.type === "DEPOSIT"
                            ? "bg-green-500/10 text-green-500"
                            : tx.type === "WITHDRAWAL"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {tx.type === "DEPOSIT" ? (
                          <ArrowDownToLine className="h-4 w-4" />
                        ) : tx.type === "WITHDRAWAL" ? (
                          <ArrowUpFromLine className="h-4 w-4" />
                        ) : (
                          <History className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {tx.type}
                        </p>
                        <p className="text-xs text-gray-400">
                          {tx.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        {tx.type === "WITHDRAWAL" ? "-" : "+"}
                        {tx.amount} ETH
                      </p>
                      <Badge
                        variant="outline"
                        className={
                          tx.status === "COMPLETED"
                            ? "border-green-500/50 text-green-400"
                            : tx.status === "PENDING"
                            ? "border-yellow-500/50 text-yellow-400"
                            : "border-red-500/50 text-red-400"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
