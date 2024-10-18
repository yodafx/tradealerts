import React, { useState } from 'react';
import { Card, Typography, Tabs, Button, Upload, Modal, App, Row, Col, Radio, Statistic } from 'antd';
import { UploadOutlined, DownloadOutlined, PlusOutlined, DollarOutlined, PercentageOutlined } from '@ant-design/icons';
import TradeList from './journal/TradeList';
import TradeForm from './journal/TradeForm';
import PerformanceMetrics from './journal/PerformanceMetrics';
import StrategyAnalysis from './journal/StrategyAnalysis';
import { parseMT4HTML } from '../utils/mt4Parser';
import { Trade } from '../types/Trade';

const { Title } = Typography;

interface JournalProps {
  trades: Trade[];
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
}

const Journal: React.FC<JournalProps> = ({ trades, setTrades }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  const { message } = App.useApp();

  const handleAddTrade = (trade: Trade) => {
    if (editingTrade) {
      setTrades(prevTrades => prevTrades.map(t => t.key === editingTrade.key ? { ...trade, key: editingTrade.key } : t));
      setEditingTrade(null);
      message.success('Trade updated successfully');
    } else {
      setTrades(prevTrades => [...prevTrades, { ...trade, key: Date.now().toString() }]);
      message.success('Trade added successfully');
    }
    setIsModalVisible(false);
  };

  const handleEditTrade = (trade: Trade) => {
    setEditingTrade(trade);
    setIsModalVisible(true);
  };

  const handleDeleteTrade = (tradeId: string) => {
    setTrades(prevTrades => prevTrades.filter(trade => trade.key !== tradeId));
    message.success('Trade deleted successfully');
  };

  const handleImport = async (info: any) => {
    const { file } = info;
    if (file.status !== 'uploading') {
      try {
        let importedTrades: Trade[];
        const fileContent = await file.text();
        
        if (file.name.toLowerCase().endsWith('.html')) {
          importedTrades = parseMT4HTML(fileContent);
        } else if (file.name.toLowerCase().endsWith('.csv')) {
          message.error('CSV import not implemented yet');
          return;
        } else {
          message.error('Unsupported file type. Please upload an HTML or CSV file.');
          return;
        }
        
        if (importedTrades && importedTrades.length > 0) {
          setTrades(prevTrades => [...prevTrades, ...importedTrades]);
          message.success(`${file.name} imported successfully. ${importedTrades.length} trades added.`);
        } else {
          message.warning('No valid trades found in the imported file.');
        }
      } catch (error) {
        console.error('Error importing file:', error);
        message.error(`Failed to import file: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const handleExport = () => {
    setIsExportModalVisible(true);
  };

  const handleExportConfirm = () => {
    // Implement export functionality here
    message.info(`Export in ${exportFormat.toUpperCase()} format not implemented yet`);
    setIsExportModalVisible(false);
  };

  const calculateTotalProfit = () => {
    return trades.reduce((total, trade) => total + trade.netProfit, 0);
  };

  const calculateWinRate = () => {
    const winningTrades = trades.filter(trade => trade.netProfit > 0);
    return trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;
  };

  const items = [
    {
      key: '1',
      label: 'Trade List',
      children: <TradeList trades={trades} onEditTrade={handleEditTrade} onDeleteTrade={handleDeleteTrade} />,
    },
    {
      key: '2',
      label: 'Performance Metrics',
      children: <PerformanceMetrics trades={trades} />,
    },
    {
      key: '3',
      label: 'Strategy Analysis',
      children: <StrategyAnalysis trades={trades} />,
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card className="bg-surface border-none">
        <Row gutter={[16, 16]} justify="space-between" align="middle" className="mb-6">
          <Col xs={24} md={8}>
            <Title level={2} className="text-white m-0">Trading Journal</Title>
          </Col>
          <Col xs={24} md={16}>
            <Row gutter={[16, 16]} justify="end">
              <Col>
                <Statistic
                  title="Total Profit"
                  value={calculateTotalProfit()}
                  precision={2}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: calculateTotalProfit() >= 0 ? '#3f8600' : '#cf1322' }}
                />
              </Col>
              <Col>
                <Statistic
                  title="Win Rate"
                  value={calculateWinRate()}
                  precision={2}
                  suffix="%"
                  prefix={<PercentageOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="mb-6">
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
              Add Trade
            </Button>
          </Col>
          <Col>
            <Upload
              accept=".csv,.html"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleImport}
            >
              <Button icon={<UploadOutlined />}>Import</Button>
            </Upload>
          </Col>
          <Col>
            <Button icon={<DownloadOutlined />} onClick={handleExport}>
              Export
            </Button>
          </Col>
        </Row>
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="text-white" items={items} />
        <Modal
          title={editingTrade ? "Edit Trade" : "Add New Trade"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingTrade(null);
          }}
          footer={null}
          width={800}
        >
          <TradeForm onAddTrade={handleAddTrade} initialValues={editingTrade} />
        </Modal>
        <Modal
          title="Export Trades"
          open={isExportModalVisible}
          onOk={handleExportConfirm}
          onCancel={() => setIsExportModalVisible(false)}
        >
          <Radio.Group onChange={(e) => setExportFormat(e.target.value)} value={exportFormat}>
            <Radio value="csv">CSV</Radio>
            <Radio value="html">HTML</Radio>
          </Radio.Group>
        </Modal>
      </Card>
    </div>
  );
};

export default Journal;