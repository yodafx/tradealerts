import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Typography, Spin, Alert, Button } from 'antd';
import { fetchMockEconomicNews } from '../services/mockEconomicNewsService';
import { NewsItem } from '../types/NewsItem';

const { Title } = Typography;

const EconomicNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMockEconomicNews();
      setNews(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch economic news. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      render: (currency: string) => <Tag color="blue">{currency}</Tag>,
    },
    {
      title: 'Impact',
      dataIndex: 'impact',
      key: 'impact',
      render: (impact: string) => {
        let color = impact.toLowerCase() === 'high' ? 'red' : impact.toLowerCase() === 'medium' ? 'orange' : 'green';
        return <Tag color={color}>{impact.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Actual',
      dataIndex: 'actual',
      key: 'actual',
    },
    {
      title: 'Forecast',
      dataIndex: 'forecast',
      key: 'forecast',
    },
    {
      title: 'Previous',
      dataIndex: 'previous',
      key: 'previous',
    },
  ];

  return (
    <Card className="bg-surface border-none">
      <Title level={2} className="text-white mb-4">Economic Calendar</Title>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center">
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            className="mb-4"
          />
          <Button onClick={fetchNews} type="primary">
            Retry
          </Button>
        </div>
      ) : (
        <Table 
          dataSource={news} 
          columns={columns} 
          pagination={{ pageSize: 10 }}
          className="economic-news-table"
        />
      )}
    </Card>
  );
};

export default EconomicNews;