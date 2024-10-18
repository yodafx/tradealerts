import React from 'react';
import { Table, Tag, Space, Popconfirm, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Trade } from '../../types/Trade';

const { Text } = Typography;

interface TradeListProps {
  trades: Trade[];
  onEditTrade: (trade: Trade) => void;
  onDeleteTrade: (tradeId: string) => void;
}

const TradeList: React.FC<TradeListProps> = ({ trades, onEditTrade, onDeleteTrade }) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: Trade, b: Trade) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Direction',
      dataIndex: 'direction',
      key: 'direction',
      render: (direction: string) => (
        <Tag color={direction.toLowerCase() === 'buy' ? 'green' : 'red'}>{direction.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Entry Price',
      dataIndex: 'entryPrice',
      key: 'entryPrice',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Exit Price',
      dataIndex: 'exitPrice',
      key: 'exitPrice',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Position Size',
      dataIndex: 'positionSize',
      key: 'positionSize',
    },
    {
      title: 'Commission',
      dataIndex: 'commission',
      key: 'commission',
      render: (commission: number) => `$${commission.toFixed(2)}`,
    },
    {
      title: 'Gross Profit',
      dataIndex: 'profit',
      key: 'profit',
      render: (profit: number) => (
        <Text style={{ color: profit >= 0 ? 'green' : 'red' }}>
          ${profit.toFixed(2)}
        </Text>
      ),
    },
    {
      title: 'Net Profit',
      dataIndex: 'netProfit',
      key: 'netProfit',
      render: (netProfit: number) => (
        <Text style={{ color: netProfit >= 0 ? 'green' : 'red' }}>
          ${netProfit.toFixed(2)}
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'blue';
        if (status === 'Win') color = 'green';
        else if (status === 'Loss') color = 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Trade) => (
        <Space size="middle">
          <EditOutlined 
            onClick={() => onEditTrade(record)} 
            style={{ color: '#1890ff', cursor: 'pointer' }}
          />
          <Popconfirm
            title="Are you sure you want to delete this trade?"
            onConfirm={() => onDeleteTrade(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table 
        columns={columns} 
        dataSource={trades} 
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
        rowKey="key"
      />
    </div>
  );
};

export default TradeList;