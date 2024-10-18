import React, { useState, useEffect } from 'react';
import { Card, Typography, Select } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Text } = Typography;
const { Option } = Select;

interface FearAndGreedIndexProps {
  className?: string;
}

// Mock data for different markets
const marketData = {
  Forex: [
    { name: '1', value: 45 },
    { name: '2', value: 55 },
    { name: '3', value: 60 },
    { name: '4', value: 50 },
    { name: '5', value: 65 },
    { name: '6', value: 70 },
  ],
  Crypto: [
    { name: '1', value: 20 },
    { name: '2', value: 40 },
    { name: '3', value: 30 },
    { name: '4', value: 50 },
    { name: '5', value: 70 },
    { name: '6', value: 82 },
  ],
  Stocks: [
    { name: '1', value: 30 },
    { name: '2', value: 35 },
    { name: '3', value: 45 },
    { name: '4', value: 55 },
    { name: '5', value: 50 },
    { name: '6', value: 58 },
  ],
};

const FearAndGreedIndex: React.FC<FearAndGreedIndexProps> = ({ className }) => {
  const [selectedMarket, setSelectedMarket] = useState<'Forex' | 'Crypto' | 'Stocks'>('Crypto');
  const [indexValue, setIndexValue] = useState(0);
  const [data, setData] = useState(marketData.Crypto);

  useEffect(() => {
    // Simulate API call and data processing
    const newData = marketData[selectedMarket];
    setData(newData);
    setIndexValue(newData[newData.length - 1].value);
  }, [selectedMarket]);

  const getColor = (value: number) => {
    if (value <= 25) return '#FF4136';
    if (value <= 45) return '#FF851B';
    if (value <= 55) return '#FFDC00';
    if (value <= 75) return '#2ECC40';
    return '#01FF70';
  };

  const getLabel = (value: number) => {
    if (value <= 30) return 'Extreme Fear';
    if (value <= 50) return 'Fear';
    if (value <= 70) return 'Greed';
    return 'Extreme Greed';
  };

  return (
    <Card 
      className={`bg-panel border-none ${className}`} 
      styles={{ body: { padding: '12px' } }}
    >
      <div className="flex justify-between items-center mb-2">
        <Text className="text-sm text-text-secondary">Fear & Greed Index</Text>
        <Select 
          value={selectedMarket} 
          onChange={(value: 'Forex' | 'Crypto' | 'Stocks') => setSelectedMarket(value)}
          className="w-24"
        >
          <Option value="Forex">Forex</Option>
          <Option value="Crypto">Crypto</Option>
          <Option value="Stocks">Stocks</Option>
        </Select>
      </div>
      <div className="flex items-center justify-between mb-2">
        <Text className="text-2xl font-semibold text-text-primary">{indexValue}</Text>
        <Text style={{ color: getColor(indexValue) }}>{getLabel(indexValue)}</Text>
      </div>
      <div style={{ height: '60px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis dataKey="name" hide />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#2D3748', border: 'none' }}
              labelStyle={{ color: '#A0AEC0' }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF4136" />
                <stop offset="25%" stopColor="#FF851B" />
                <stop offset="50%" stopColor="#FFDC00" />
                <stop offset="75%" stopColor="#2ECC40" />
                <stop offset="100%" stopColor="#01FF70" />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="url(#colorGradient)" fill="url(#colorGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-1">
        <Text className="text-xs text-text-secondary">0</Text>
        <Text className="text-xs text-text-secondary">100</Text>
      </div>
    </Card>
  );
};

export default FearAndGreedIndex;