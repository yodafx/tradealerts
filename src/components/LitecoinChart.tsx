import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Text } = Typography;

const LitecoinChart: React.FC = () => {
  const data = [
    { name: 'Sep', value: 65 },
    { name: 'Oct', value: 70 },
    { name: 'Nov', value: 80 },
    { name: 'Dec', value: 75 },
    { name: 'Jan', value: 85 },
  ];

  return (
    <Card className="bg-panel border-none h-full">
      <Row justify="space-between" align="middle" className="mb-2">
        <Col>
          <Text className="text-sm text-text-secondary">Litecoin (LTC)</Text>
          <Text className="block text-xl font-semibold text-text-primary">$1,241.51</Text>
        </Col>
        <Col>
          <Text className="text-sm text-green-500">+6.4%</Text>
        </Col>
      </Row>
      <div style={{ height: '150px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis dataKey="name" stroke="#A0AEC0" />
            <YAxis stroke="#A0AEC0" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#2D3748', border: 'none' }}
              labelStyle={{ color: '#A0AEC0' }}
            />
            <Line type="monotone" dataKey="value" stroke="#1EB980" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Row justify="space-between" className="mt-2">
        <Text className="text-xs text-text-secondary">$79.41</Text>
        <Text className="text-xs text-text-secondary">$65.71</Text>
        <Text className="text-xs text-text-secondary">$81.06</Text>
        <Text className="text-xs text-text-secondary">$75.25</Text>
        <Text className="text-xs text-text-secondary">$71.76</Text>
      </Row>
    </Card>
  );
};

export default LitecoinChart;