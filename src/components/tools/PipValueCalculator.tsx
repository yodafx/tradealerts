import React, { useState } from 'react';
import { Card, Typography, Input, Button, Select } from 'antd';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface CurrencyPair {
  name: string;
  pipValue: number;
}

const currencyPairs: CurrencyPair[] = [
  { name: 'EUR/USD', pipValue: 10 },
  { name: 'GBP/USD', pipValue: 10 },
  { name: 'USD/JPY', pipValue: 9.13 },
  { name: 'AUD/USD', pipValue: 10 },
];

const PipValueCalculator: React.FC = () => {
  const [lotSize, setLotSize] = useState('');
  const [currency, setCurrency] = useState('EUR/USD');
  const [result, setResult] = useState<number | null>(null);

  const calculatePipValue = () => {
    const size = parseFloat(lotSize);
    if (!isNaN(size) && size > 0) {
      const selectedPair = currencyPairs.find(pair => pair.name === currency);
      if (selectedPair) {
        const pipValue = size * selectedPair.pipValue;
        setResult(pipValue);
      }
    } else {
      setResult(null);
    }
  };

  return (
    <Card className="bg-panel text-white">
      <Title level={2} className="text-white">Pip Value Calculator</Title>
      <Paragraph className="text-text-secondary">
        Calculate the value of a pip based on your lot size and currency pair.
      </Paragraph>
      <div className="flex flex-col space-y-4">
        <Input
          placeholder="Lot Size"
          value={lotSize}
          onChange={(e) => setLotSize(e.target.value)}
          type="number"
          min="0"
          step="0.01"
        />
        <Select value={currency} onChange={setCurrency} className="text-black">
          {currencyPairs.map(pair => (
            <Option key={pair.name} value={pair.name}>{pair.name}</Option>
          ))}
        </Select>
        <Button onClick={calculatePipValue} className="bg-primary hover:bg-primary-dark text-white">Calculate</Button>
        {result !== null && (
          <Paragraph className="text-white">
            Pip Value: ${result.toFixed(2)}
          </Paragraph>
        )}
      </div>
    </Card>
  );
};

export default PipValueCalculator;