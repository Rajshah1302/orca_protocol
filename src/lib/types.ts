export interface Trade {
  id: string;
  timestamp: Date;
  pair: string;
  type: "BUY" | "SELL";
  amount: number;
  price: number;
  profit?: number;
}

export interface Agent {
  id: string;
  name: string;
  codename: string;
  description: string;
  totalProfit: number;
  successRate: number;
  tradesExecuted: number;
  activeFrom: Date;
  trades: Trade[];
}
