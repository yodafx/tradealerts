import React from 'react';
import { Row, Col, Card } from 'antd';

interface TradingSessionsDisplayProps {
  is24HourFormat: boolean;
  selectedTimezone: string;
}

const TradingSessionsDisplay: React.FC<TradingSessionsDisplayProps> = ({ is24HourFormat, selectedTimezone }) => {
  const sessions = [
    { name: 'Sydney', flag: '🇦🇺', time: '2:30 am', date: 'Tue Oct 15th AEDT (UTC +11)' },
    { name: 'Tokyo', flag: '🇯🇵', time: '12:50 am', date: 'Tue Oct 15th JST (UTC +9)' },
    { name: 'London', flag: '🇬🇧', time: '4:50 pm', date: 'Mon Oct 14th BST (UTC +1)' },
    { name: 'New York', flag: '🇺🇸', time: '11:50 am', date: 'Mon Oct 14th EDT (UTC -4)' },
  ];

  return (
    <Row gutter={[16, 16]}>
      {sessions.map((session) => (
        <Col span={6} key={session.name}>
          <Card className="bg-[#2C2C2C] text-white">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{session.flag}</span>
              <span className="font-bold">{session.name}</span>
            </div>
            <div className="text-lg">{session.time}</div>
            <div className="text-xs text-gray-400">{session.date}</div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TradingSessionsDisplay;