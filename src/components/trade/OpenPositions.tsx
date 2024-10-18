import React, { useState, useEffect } from 'react';
import { Table, Typography, Button, App } from 'antd';
import { getOpenPositions, closeOrder } from '../../services/mt4Api';

const { Title } = Typography;

interface OpenPositionsProps {
  disabled: boolean;
}

const OpenPositions: React.FC<OpenPositionsProps> = ({ disabled }) => {
  const [positions, setPositions] = useState([]);
  const { message } = App.useApp();

  useEffect(() => {
    if (!disabled) {
      fetchOpenPositions();
    }
  }, [disabled]);

  const fetchOpenPositions = async () => {
    try {
      const data = await getOpenPositions();
      setPositions(data);
    } catch (error) {
      message.error('Failed to fetch open positions');
    }
  };

  const handleClosePosition = async (orderId: string) => {
    if (disabled) {
      message.error('Trading is currently unavailable');
      return;
    }

    try {
      const result = await closeOrder(orderId);
      if (result.status) {
        message.success('Position closed successfully');
        fetchOpenPositions();
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Failed to close position');
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
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
      title: 'Current Price',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
    },
    {
      title: 'Profit/Loss',
      dataIndex: 'profit',
      key: 'profit',
      render: (value: number) => (
        <span style={{ color: value >= 0 ? 'green' : 'red' }}>
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button onClick={() => handleClosePosition(record.id)} disabled={disabled}>
          Close
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={4} className="text-white mb-4">Open Positions</Title>
      <Table 
        dataSource={positions} 
        columns={columns} 
        rowKey="id"
        loading={disabled}
      />
    </div>
  );
};

export default OpenPositions;