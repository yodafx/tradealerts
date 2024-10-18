import React from 'react';
import { Card, Typography, Progress, Tooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface SentimentData {
  asset: string;
  score: number;
  change: number;
}

const sentimentData: SentimentData[] = [
  { asset: 'BTC/USD', score: 72, change: 5 },
  { asset: 'ETH/USD', score: 65, change: -2 },
  { asset: 'EUR/USD', score: 48, change: 0 },
  { asset: 'Gold', score: 80, change: 8 },
];

const getSentimentColor = (score: number) => {
  if (score >= 70) return '#52c41a';
  if (score >= 50) return '#faad14';
  return '#f5222d';
};

const getSentimentText = (score: number) => {
  if (score >= 70) return 'Bullish';
  if (score >= 50) return 'Neutral';
  return 'Bearish';
};

const MarketSentimentAnalysis: React.FC = () => {
  return (
    <Card className="bg-panel text-white h-full">
      <Title level={3} className="text-white mb-4">Market Sentiment Analysis</Title>
      {sentimentData.map((item) => (
        <div key={item.asset} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Text strong className="text-white">{item.asset}</Text>
            <Tooltip title={`${getSentimentText(item.score)} sentiment`}>
              <Text className="text-white">{item.score}</Text>
            </Tooltip>
          </div>
          <Progress 
            percent={item.score} 
            strokeColor={getSentimentColor(item.score)}
            showInfo={false}
          />
          <div className="flex justify-end items-center mt-1">
            {item.change > 0 ? (
              <ArrowUpOutlined className="text-green-500 mr-1" />
            ) : item.change < 0 ? (
              <ArrowDownOutlined className="text-red-500 mr-1" />
            ) : (
              <MinusOutlined className="text-gray-500 mr-1" />
            )}
            <Text className={item.change > 0 ? 'text-green-500' : item.change < 0 ? 'text-red-500' : 'text-gray-500'}>
              {Math.abs(item.change)}%
            </Text>
          </div>
        </div>
      ))}
      <Text className="text-gray-400 text-sm mt-4 block">
        Sentiment scores range from 0 (extremely bearish) to 100 (extremely bullish). 
        This analysis is based on various factors including news sentiment, social media trends, and technical indicators.
      </Text>
    </Card>
  );
};

export default MarketSentimentAnalysis;