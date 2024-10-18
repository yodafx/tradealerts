import React from 'react';
import { Card, Typography, Row, Col, Table } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const AssetDetails: React.FC = () => {
  const data = [
    { name: '00:00', price: 45000 },
    { name: '04:00', price: 46000 },
    { name: '08:00', price: 45500 },
    { name: '12:00', price: 46500 },
    { name: '16:00', price: 46000 },
    { name: '20:00', price: 46095 },
    { name: '23:59', price: 46200 },
  ];

  const currentPrice = data[data.length - 1].price;
  const previousPrice = data[0].price;
  const priceChange = currentPrice - previousPrice;
  const percentageChange = (priceChange / previousPrice) * 100;

  const additionalInfo = [
    { key: '1', metric: 'Market Cap', value: '$862.7B' },
    { key: '2', metric: 'Circulating Supply', value: '18.7M BTC' },
    { key: '3', metric: 'Max Supply', value: '21M BTC' },
    { key: '4', metric: 'All-Time High', value: '$64,863.10' },
  ];

  const columns = [
    { title: 'Metric', dataIndex: 'metric', key: 'metric' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];

  return (
    <Card className="bg-panel border-none h-full">
      <Title level={3} className="text-white mb-4">Bitcoin (BTC)</Title>
      <Row justify="space-between" align="middle" className="mb-4">
        <Col>
          <Text className="text-2xl font-semibold text-text-primary">${currentPrice.toFixed(2)}</Text>
        </Col>
        <Col>
          <Text className={`text-lg ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            ${Math.abs(priceChange).toFixed(2)} ({percentageChange.toFixed(2)}%)
          </Text>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis 
                  stroke="#A0AEC0"
                  domain={['dataMin - 500', 'dataMax + 500']}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#2D3748', border: 'none' }}
                  labelStyle={{ color: '#A0AEC0' }}
                  formatter={(value) => [`$${value}`, 'Price']}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#1EB980" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col span={8}>
          <Table 
            dataSource={additionalInfo} 
            columns={columns} 
            pagination={false}
            size="small"
            className="bg-panel text-white"
          />
        </Col>
      </Row>
      <Row justify="space-between" className="mt-4">
        <Col>
          <Text className="text-gray-400">24h Low</Text>
          <Text className="block text-white">${Math.min(...data.map(d => d.price)).toFixed(2)}</Text>
        </Col>
        <Col>
          <Text className="text-gray-400">24h High</Text>
          <Text className="block text-white">${Math.max(...data.map(d => d.price)).toFixed(2)}</Text>
        </Col>
        <Col>
          <Text className="text-gray-400">24h Volume</Text>
          <Text className="block text-white">$1,234,567,890</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default AssetDetails;