export interface Trade {
  key: string;
  date: string;
  symbol: string;
  direction: 'buy' | 'sell';
  positionSize: number;
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  takeProfit: number;
  profit: number;
  commission: number;
  swap: number;
  netProfit: number;
  status: 'Win' | 'Loss' | 'Unknown';
}