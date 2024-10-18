import React from 'react';
import { Card, Typography, Table } from 'antd';

const { Title, Paragraph } = Typography;

const CurrencyCorrelation: React.FC = () => {
  const columns = [
    { title: 'Currency Pair', dataIndex: 'pair', key: 'pair' },
    { title: 'Correlation', dataIndex: 'correlation', key: 'correlation' },
  ];

  const data = [
    { key: '1', pair: 'EUR/USD', correlation: '1.00' },
    { key: '2', pair: 'GBP/USD', correlation: '0.85' },
    { key: '3', pair: 'USD/JPY', correlation: '-0.72' },
    // Add more currency pairs and their correlations
  ];

  return (
    <Card className="bg-[#1E1E1E] text-white">
      <Title level={2} className="text-white">Currency Correlation</Title>
      <Paragraph className="text-gray-300">
        This tool shows the correlation between different currency pairs. A correlation of 1.00 means perfect positive correlation, while -1.00 means perfect negative correlation.
      </Paragraph>
      <Table columns={columns} dataSource={data} className="mt-4" />
    </Card>
  );
};

export default CurrencyCorrelation;