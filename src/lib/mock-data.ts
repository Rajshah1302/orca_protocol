import type { Agent } from "./types";
import type { WalletInfo } from "./types";

export const agents: Agent[] = [
  {
    id: "1",
    name: "Quantum Edge",
    codename: "NEO-7",
    description:
      "Specialized in high-frequency ETH/BTC pair trading using quantum probability models",
    totalProfit: 156.78,
    successRate: 78.5,
    tradesExecuted: 1243,
    activeFrom: new Date("2023-01-15"),
    trades: [
      {
        id: "t1",
        timestamp: new Date("2024-02-07T10:30:00"),
        pair: "ETH/BTC",
        type: "BUY",
        amount: 0.5,
        price: 2450.75,
      },
      {
        id: "t2",
        timestamp: new Date("2024-02-07T14:45:00"),
        pair: "ETH/BTC",
        type: "SELL",
        amount: 0.5,
        price: 2480.25,
        profit: 14.75,
      },
    ],
  },
  {
    id: "2",
    name: "Neural Nexus",
    codename: "ATLAS-X",
    description:
      "Multi-chain arbitrage specialist with advanced pattern recognition",
    totalProfit: 243.92,
    successRate: 82.1,
    tradesExecuted: 956,
    activeFrom: new Date("2023-03-22"),
    trades: [
      {
        id: "t3",
        timestamp: new Date("2024-02-07T09:15:00"),
        pair: "SOL/USDT",
        type: "BUY",
        amount: 10,
        price: 98.45,
      },
      {
        id: "t4",
        timestamp: new Date("2024-02-07T16:20:00"),
        pair: "SOL/USDT",
        type: "SELL",
        amount: 10,
        price: 103.75,
        profit: 53.0,
      },
    ],
  },
  {
    id: "3",
    name: "Cipher Pulse",
    codename: "NOVA-9",
    description:
      "Sentiment analysis expert focusing on emerging market opportunities",
    totalProfit: 189.34,
    successRate: 75.8,
    tradesExecuted: 847,
    activeFrom: new Date("2023-06-10"),
    trades: [
      {
        id: "t5",
        timestamp: new Date("2024-02-07T11:00:00"),
        pair: "DOT/USDT",
        type: "BUY",
        amount: 100,
        price: 7.25,
      },
      {
        id: "t6",
        timestamp: new Date("2024-02-07T19:30:00"),
        pair: "DOT/USDT",
        type: "SELL",
        amount: 100,
        price: 7.45,
        profit: 20.0,
      },
    ],
  },
];

export const walletInfo: WalletInfo = {
  address: "0x1234...5678",
  network: "Ethereum Mainnet",
  balance: 5.234,
  transactions: [
    {
      id: "tx1",
      type: "DEPOSIT",
      amount: 1.5,
      timestamp: new Date("2024-02-07T10:30:00"),
      status: "COMPLETED",
      hash: "0xabcd...efgh",
    },
    {
      id: "tx2",
      type: "TRADE",
      amount: 0.5,
      timestamp: new Date("2024-02-06T15:45:00"),
      status: "COMPLETED",
      hash: "0xijkl...mnop",
    },
    {
      id: "tx3",
      type: "WITHDRAWAL",
      amount: 0.25,
      timestamp: new Date("2024-02-05T09:15:00"),
      status: "PENDING",
      hash: "0xqrst...uvwx",
    },
  ],
  portfolio: [
    {
      asset: "ETH",
      amount: 3.5,
      value: 8750,
      change24h: 2.5,
    },
    {
      asset: "BTC",
      amount: 0.15,
      value: 6300,
      change24h: -1.2,
    },
    {
      asset: "SOL",
      amount: 45.0,
      value: 4455,
      change24h: 5.8,
    },
  ],
};
