import React from 'react';
import { Typography, Row, Col, Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DatabaseOutlined, SyncOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

const PortfolioStats: React.FC = () => {
  const data = [
    { name: '1-5', value: 23500 },
    { name: '6-10', value: 24000 },
    { name: '11-15', value: 23800 },
    { name: '16-20', value: 25500 },
    { name: '21-25', value: 24200 },
    { name: '26-30', value: 24511 },
  ];

  return (
    <div className="bg-panel p-6 rounded-lg">
      <Text className="text-2xl font-bold text-[#929292] mb-1 block">Overview</Text>
      <Text className="text-sm text-[#444444] mb-4 block">Total assets</Text>
      <Row justify="space-between" align="middle" className="mb-6">
        <Col>
          <div className="flex items-center">
            <Text className="text-4xl font-semibold text-text-primary mr-4">$24,511<span className="text-2xl">.14</span></Text>
            <div className="flex items-center">
              <Text className="text-xs px-2 py-1 bg-green-500 text-black rounded mr-2">+3.1% +$516.61</Text>
            </div>
          </div>
        </Col>
        <Col>
          <Select defaultValue="30d" style={{ width: '110px' }} className="bg-gray-800 text-text-primary">
            <Option value="30d">Last 30 days</Option>
            <Option value="60d">Last 60 days</Option>
            <Option value="90d">Last 90 days</Option>
          </Select>
        </Col>
      </Row>
      <div style={{ height: '200px', marginBottom: '16px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={true} horizontal={false} stroke="#2D3748" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#A0AEC0', fontSize: 12 }} 
              domain={['dataMin - 1000', 'dataMax + 1000']}
              ticks={[23000, 24000, 25000, 26000]}
              orientation="right"
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#2D3748', border: 'none' }}
              labelStyle={{ color: '#A0AEC0' }}
              formatter={(value) => [`$${value}`, 'Value']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#fff" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Row justify="space-between" align="middle" className="mt-4">
        <Col span={18}>
          <div className="h-1 bg-gray-700 relative">
            <div className="absolute h-4 w-4 bg-orange-500 rounded-full top-1/2 left-1/3 transform -translate-y-1/2"></div>
          </div>
        </Col>
        <Col span={6}>
          <Row gutter={8} justify="end" align="middle">
            <Col>
              <DatabaseOutlined className="text-orange-500" />
            </Col>
            <Col>
              <SyncOutlined spin className="text-gray-500" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-between" className="mt-2">
        <Text className="text-xs text-text-secondary">1-5</Text>
        <Text className="text-xs text-text-secondary">10-15</Text>
        <Text className="text-xs text-text-secondary">15-20</Text>
        <Text className="text-xs text-text-secondary">20-25</Text>
        <Text className="text-xs text-text-secondary">25-30</Text>
        <Text className="text-xs text-text-secondary">1-5</Text>
      </Row>
    </div>
  );
};

export default PortfolioStats;