import React, { useState } from 'react';
import { Card, Typography, Input, Button } from 'antd';

const { Title, Paragraph } = Typography;

interface CalculationResult {
  percentage: number;
  amount: number;
}

const GainLossCalculator: React.FC = () => {
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateGainLoss = () => {
    const entry = parseFloat(entryPrice);
    const exit = parseFloat(exitPrice);
    if (!isNaN(entry) && !isNaN(exit) && entry !== 0) {
      const percentage = ((exit - entry) / entry) * 100;
      const amount = exit - entry;
      setResult({ percentage, amount });
    } else {
      setResult(null);
    }
  };

  return (
    <Card className="bg-panel text-white">
      <Title level={2} className="text-white">Gain & Loss Calculator</Title>
      <Paragraph className="text-text-secondary">
        Calculate the percentage and amount of gain or loss between your entry and exit prices.
      </Paragraph>
      <div className="flex flex-col space-y-4">
        <Input
          placeholder="Entry Price"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
          type="number"
          min="0"
          step="0.01"
        />
        <Input
          placeholder="Exit Price"
          value={exitPrice}
          onChange={(e) => setExitPrice(e.target.value)}
          type="number"
          min="0"
          step="0.01"
        />
        <Button onClick={calculateGainLoss} className="bg-primary hover:bg-primary-dark text-white">Calculate</Button>
        {result && (
          <div className="text-white">
            <Paragraph>
              Percentage: <span className={result.percentage >= 0 ? 'text-green-500' : 'text-red-500'}>
                {result.percentage.toFixed(2)}%
              </span>
            </Paragraph>
            <Paragraph>
              Amount: <span className={result.amount >= 0 ? 'text-green-500' : 'text-red-500'}>
                ${result.amount.toFixed(2)}
              </span>
            </Paragraph>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GainLossCalculator;