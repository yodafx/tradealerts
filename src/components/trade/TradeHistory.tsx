import React, { useState, useEffect } from 'react';
import { Table, Typography, App } from 'antd';
import { getTradeHistory } from '../../services/mt4Api';

const { Title } = Typography;

interface TradeHistoryProps {
  disabled: boolean;
}

const TradeHistory: React.FC<TradeHistoryProps> = ({ disabled }) => {
  const [history, setHistory] = useState([]);
  const { message } = App.useApp();

  useEffect(() => {
    if (!disabled) {
      fetchTradeHistory();
    }
  }, [disabled]);

  const fetchTradeHistory = async () => {
    try {
      const data = await getTradeHistory();
      setHistory(data);
    } catch (error) {
      message.error('Failed to fetch trade history');
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'Open Price',
      dataIndex: 'openPrice',
      key: 'openPrice',
    },
    {
      title: 'Close Price',
      dataIndex: 'closePrice',
      key: 'closePrice',
    },
    {
      title: 'Profit/Loss',
      dataIndex: 'profitLoss',
      key: 'profitLoss',
      render: (value: number) => (
        <span style={{ color: value >= 0 ? 'green' : 'red' }}>
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Open Time',
      dataIndex: 'openTime',
      key: 'openTime',
    },
    {
      title: 'Close Time',
      dataIndex: 'closeTime',
      key: 'closeTime',
    },
  ];

  return (
    <div>
      <Title level={4} className="text-white mb-4">Trade History</Title>
      <Table 
        dataSource={history} 
        columns={columns} 
        rowKey="orderId"
        loading={disabled}
      />
    </div>
  );
};

export default TradeHistory;