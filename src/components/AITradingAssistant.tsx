import React, { useState, useEffect } from 'react';
import { Card, Typography, Input, Button, List, Tag } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Message {
  content: string;
  sender: 'user' | 'ai';
}

const AITradingAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const exampleQueries = [
    "What's the current market sentiment for Bitcoin?",
    "Should I consider buying Ethereum now?",
    "What are the key resistance levels for EUR/USD?",
    "Explain the concept of stop-loss orders.",
  ];

  useEffect(() => {
    setMessages([
      { content: "Hello! I'm your AI Trading Assistant. How can I help you today? You can ask me about market analysis, trading strategies, or specific assets.", sender: 'ai' },
    ]);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { content: input, sender: 'user' }]);
      // Simulated AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          content: `Based on your query "${input}", here's my analysis:

1. Market conditions: Currently showing moderate volatility.
2. Technical indicators: RSI suggests slight overbought conditions.
3. Sentiment analysis: Mixed, with a slight bullish bias.

Remember, this is a simulated response. In a real implementation, I would provide more detailed and personalized insights based on current market data and advanced AI models.`,
          sender: 'ai' 
        }]);
      }, 1000);
      setInput('');
    }
  };

  const handleExampleQuery = (query: string) => {
    setInput(query);
  };

  return (
    <Card className="bg-panel text-white h-full">
      <Title level={3} className="text-white mb-4">AI Trading Assistant</Title>
      <div className="h-64 overflow-y-auto mb-4">
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={item => (
            <List.Item>
              <Card 
                className={`w-full ${item.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                <Text className="text-white">{item.content}</Text>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <div className="mb-4">
        <Paragraph className="text-white mb-2">Example queries:</Paragraph>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((query, index) => (
            <Tag 
              key={index} 
              color="blue" 
              className="cursor-pointer" 
              onClick={() => handleExampleQuery(query)}
            >
              {query}
            </Tag>
          ))}
        </div>
      </div>
      <div className="flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          placeholder="Ask for trading insights..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSend} icon={<SendOutlined />} className="bg-primary hover:bg-primary-dark">
          Send
        </Button>
      </div>
    </Card>
  );
};

export default AITradingAssistant;