import React from 'react';
import { Card, Typography, Progress } from 'antd';

const { Title, Paragraph } = Typography;

const RiskOnRiskOffMeter: React.FC = () => {
  return (
    <Card className="bg-[#1E1E1E] text-white">
      <Title level={2} className="text-white">Risk-On Risk-Off Meter</Title>
      <Paragraph className="text-gray-300">
        This meter indicates the current market sentiment. A higher value suggests a "risk-on" environment, while a lower value suggests a "risk-off" environment.
      </Paragraph>
      <Progress
        percent={65}
        strokeColor={{
          '0%': '#FF4D4F',
          '100%': '#52C41A',
        }}
        format={(percent) => `${percent}%`}
      />
      <div className="flex justify-between mt-2">
        <span>Risk-Off</span>
        <span>Risk-On</span>
      </div>
    </Card>
  );
};

export default RiskOnRiskOffMeter;