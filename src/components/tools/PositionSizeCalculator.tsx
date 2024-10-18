import React, { useState } from 'react';
import { Card, Typography, Input, Button } from 'antd';

const { Title, Paragraph } = Typography;

const PositionSizeCalculator: React.FC = () => {
  const [accountSize, setAccountSize] = useState('');
  const [riskPercentage, setRiskPercentage] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculatePositionSize = () => {
    const account = parseFloat(accountSize);
    const risk = parseFloat(riskPercentage);
    const stop = parseFloat(stopLoss);
    if (!isNaN(account) && !isNaN(risk) && !isNaN(stop) && stop !== 0 && account > 0 && risk > 0 && risk <= 100) {
      const riskAmount = account * (risk / 100);
      const positionSize = riskAmount / stop;
      setResult(positionSize);
    } else {
      setResult(null);
    }
  };

  return (
    <Card className="bg-panel text-white">
      <Title level={2} className="text-white">Position Size Calculator</Title>
      <Paragraph className="text-text-secondary">
        Calculate the appropriate position size based on your account size, risk percentage, and stop loss.
      </Paragraph>
      <div className="flex flex-col space-y-4">
        <Input
          placeholder="Account Size"
          value={accountSize}
          onChange={(e) => setAccountSize(e.target.value)}
          type="number"
          min="0"
          step="0.01"
        />
        <Input
          placeholder="Risk Percentage"
          value={riskPercentage}
          onChange={(e) => setRiskPercentage(e.target.value)}
          type="number"
          min="0"
          max="100"
          step="0.1"
        />
        <Input
          placeholder="Stop Loss (in pips)"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          type="number"
          min="0"
          step="0.1"
        />
        <Button onClick={calculatePositionSize} className="bg-primary hover:bg-primary-dark text-white">Calculate</Button>
        {result !== null && (
          <Paragraph className="text-white">
            Position Size: {result.toFixed(2)} lots
          </Paragraph>
        )}
      </div>
    </Card>
  );
};

export default PositionSizeCalculator;