import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Trade } from '../../types/Trade';
import GradientGraph from './GradientGraph';

interface PerformanceMetricsProps {
  trades: Trade[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ trades }) => {
  const calculateMetrics = () => {
    let totalProfit = 0;
    let totalLoss = 0;
    let winCount = 0;
    let lossCount = 0;
    let maxDrawdown = 0;
    let currentDrawdown = 0;
    let peakBalance = 0;

    trades.forEach((trade) => {
      const profitLoss = trade.netProfit;
      
      if (profitLoss > 0) {
        totalProfit += profitLoss;
        winCount++;
      } else {
        totalLoss += Math.abs(profitLoss);
        lossCount++;
      }

      peakBalance = Math.max(peakBalance, peakBalance + profitLoss);
      currentDrawdown = peakBalance - (peakBalance + profitLoss);
      maxDrawdown = Math.max(maxDrawdown, currentDrawdown);
    });

    const totalTrades = trades.length;
    const winRate = totalTrades > 0 ? (winCount / totalTrades) * 100 : 0;
    const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : totalProfit > 0 ? Infinity : 0;
    const averageWin = winCount > 0 ? totalProfit / winCount : 0;
    const averageLoss = lossCount > 0 ? totalLoss / lossCount : 0;

    return {
      totalProfitLoss: totalProfit - totalLoss,
      winRate,
      profitFactor,
      averageWin,
      averageLoss,
      maxDrawdown,
    };
  };

  const metrics = calculateMetrics();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic
            title="Total Profit/Loss"
            value={metrics.totalProfitLoss}
            precision={2}
            prefix="$"
            valueStyle={{ color: metrics.totalProfitLoss >= 0 ? '#3f8600' : '#cf1322' }}
            prefix={metrics.totalProfitLoss >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic title="Win Rate" value={metrics.winRate} precision={1} suffix="%" />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic title="Profit Factor" value={metrics.profitFactor} precision={2} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic title="Average Win" value={metrics.averageWin} prefix="$" precision={2} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic title="Average Loss" value={metrics.averageLoss} prefix="$" precision={2} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic title="Max Drawdown" value={metrics.maxDrawdown} prefix="$" precision={2} />
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Performance Graph">
          <GradientGraph trades={trades} />
        </Card>
      </Col>
    </Row>
  );
};

export default PerformanceMetrics;