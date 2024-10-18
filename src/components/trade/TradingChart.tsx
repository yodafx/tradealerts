import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const TradingChart: React.FC = () => {
  return (
    <div>
      <Title level={3} className="text-white">Trading Chart</Title>
      {/* Implement your trading chart here */}
      <div className="bg-gray-800 h-96 flex items-center justify-center">
        <p className="text-gray-400">Trading Chart Placeholder</p>
      </div>
    </div>
  );
};

export default TradingChart;