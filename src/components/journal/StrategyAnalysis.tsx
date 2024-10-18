import React from 'react';
import { Table, Tag } from 'antd';

const StrategyAnalysis: React.FC = () => {
  const columns = [
    {
      title: 'Strategy',
      dataIndex: 'strategy',
      key: 'strategy',
    },
    {
      title: 'Win Rate',
      dataIndex: 'winRate',
      key: 'winRate',
      render: (winRate: number) => `${winRate}%`,
    },
    {
      title: 'Profit Factor',
      dataIndex: 'profitFactor',
      key: 'profitFactor',
    },
    {
      title: 'Total Trades',
      dataIndex: 'totalTrades',
      key: 'totalTrades',
    },
    {
      title: 'Net Profit',
      dataIndex: 'netProfit',
      key: 'netProfit',
      render: (netProfit: number) => (
        <span style={{ color: netProfit >= 0 ? 'green' : 'red' }}>
          ${netProfit.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Performance',
      key: 'performance',
      dataIndex: 'performance',
      render: (performance: string) => {
        let color = performance === 'Excellent' ? 'green' : performance === 'Good' ? 'blue' : 'orange';
        return (
          <Tag color={color}>
            {performance.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const data = [
    {
      key: '1',
      strategy: 'Trend Following',
      winRate: 65,
      profitFactor: 1.8,
      totalTrades: 50,
      netProfit: 2500,
      performance: 'Excellent',
    },
    {
      key: '2',
      strategy: 'Breakout',
      winRate: 55,
      profitFactor: 1.5,
      totalTrades: 40,
      netProfit: 1500,
      performance: 'Good',
    },
    {
      key: '3',
      strategy: 'Mean Reversion',
      winRate: 45,
      profitFactor: 1.2,
      totalTrades: 30,
      netProfit: 500,
      performance: 'Average',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default StrategyAnalysis;