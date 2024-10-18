import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import PortfolioStats from './PortfolioStats';
import RecentOperations from './RecentOperations';
import AssetDetails from './AssetDetails';
import MarketSentimentAnalysis from './MarketSentimentAnalysis';
import AITradingAssistant from './AITradingAssistant';

const { Title } = Typography;

interface DashboardProps {
  trades: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ trades }) => {
  return (
    <div className="space-y-6">
      <Title level={2} className="text-white m-0">Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="bg-panel h-full">
            <PortfolioStats />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="bg-panel h-full">
            <RecentOperations trades={trades} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <AssetDetails />
        </Col>
        <Col xs={24} md={8}>
          <MarketSentimentAnalysis />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AITradingAssistant />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;