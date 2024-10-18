import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Trade {
  status: string;
  entryPrice: number;
  exitPrice: number;
  positionSize: number;
}

interface GradientGraphProps {
  trades: Trade[];
}

const GradientGraph: React.FC<GradientGraphProps> = ({ trades }) => {
  const [data, setData] = useState<{ date: string; balance: number }[]>([]);

  useEffect(() => {
    const graphData = calculateGraphData();
    setData(graphData);
  }, [trades]);

  const calculateGraphData = () => {
    let balance = 0;
    return trades.map((trade, index) => {
      const profitLoss = (trade.exitPrice - trade.entryPrice) * trade.positionSize;
      balance += profitLoss;
      return {
        date: `Trade ${index + 1}`,
        balance: Number(balance.toFixed(2)),
      };
    });
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <defs>
          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#8884d8"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorBalance)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GradientGraph;