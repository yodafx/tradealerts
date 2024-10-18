import React from 'react';
import { List, Avatar, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Trade {
  key: string;
  symbol: string;
  direction: string;
  profit: number;
  netProfit: number;
}

interface RecentOperationsProps {
  trades: Trade[];
}

const RecentOperations: React.FC<RecentOperationsProps> = ({ trades }) => {
  const recentTrades = trades.slice(0, 5); // Get the 5 most recent trades

  return (
    <div>
      <Text className="text-lg font-semibold text-text mb-4 block">Recent Trades</Text>
      <List
        dataSource={recentTrades}
        renderItem={(trade) => (
          <List.Item className="py-3 border-b border-border">
            <List.Item.Meta
              avatar={
                <Avatar 
                  icon={trade.direction.toLowerCase() === 'buy' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} 
                  style={{ backgroundColor: trade.direction.toLowerCase() === 'buy' ? '#52c41a' : '#f5222d' }}
                />
              }
              title={<Text className="text-sm text-text">{trade.symbol}</Text>}
              description={<Text className="text-xs text-text-secondary">{trade.direction.toUpperCase()}</Text>}
            />
            <Text className="text-sm font-semibold" style={{ color: trade.netProfit >= 0 ? '#52c41a' : '#f5222d' }}>
              {trade.netProfit >= 0 ? '+' : '-'}${Math.abs(trade.netProfit).toFixed(2)}
            </Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default RecentOperations;