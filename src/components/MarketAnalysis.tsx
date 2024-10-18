import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import FearAndGreedIndex from './FearAndGreedIndex';

const { Text } = Typography;

const MarketAnalysis: React.FC = () => {
  return (
    <Card className="bg-surface border-none">
      <Text className="text-lg font-semibold mb-4 block">Market Analysis</Text>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Card className="bg-surface-light border-none">
            <Text className="text-xs text-secondary block">24h ETH</Text>
            <Text className="text-sm font-semibold">$2,602.89</Text>
            <Text className="text-xs text-red-500 block">-3.37%</Text>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="bg-surface-light border-none">
            <Text className="text-xs text-secondary block">Phantom</Text>
            <Text className="text-sm font-semibold">$5,151.15</Text>
            <Text className="text-xs text-secondary block">My wallet</Text>
          </Card>
        </Col>
      </Row>
      <FearAndGreedIndex className="mt-4" />
    </Card>
  );
};

export default MarketAnalysis;