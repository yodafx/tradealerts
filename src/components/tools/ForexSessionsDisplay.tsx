import React from 'react';
import { Row, Col, Card, Progress, Typography } from 'antd';

const { Text } = Typography;

interface ForexSessionsDisplayProps {
  is24HourFormat: boolean;
  selectedTimezone: string;
  currentTime: Date;
}

const ForexSessionsDisplay: React.FC<ForexSessionsDisplayProps> = ({ is24HourFormat, selectedTimezone, currentTime }) => {
  const sessions = [
    { name: 'Sydney', hours: '22:00 - 07:00', color: '#1890ff' },
    { name: 'Tokyo', hours: '00:00 - 09:00', color: '#52c41a' },
    { name: 'London', hours: '08:00 - 17:00', color: '#faad14' },
    { name: 'New York', hours: '13:00 - 22:00', color: '#f5222d' },
  ];

  const getSessionProgress = (sessionHours: string) => {
    const [start, end] = sessionHours.split(' - ');
    const [startHour] = start.split(':').map(Number);
    const [endHour] = end.split(':').map(Number);
    const currentHour = currentTime.getUTCHours();

    if (startHour < endHour) {
      if (currentHour >= startHour && currentHour < endHour) {
        return ((currentHour - startHour) / (endHour - startHour)) * 100;
      }
    } else {
      if (currentHour >= startHour || currentHour < endHour) {
        return (((currentHour + 24 - startHour) % 24) / ((endHour + 24 - startHour) % 24)) * 100;
      }
    }
    return 0;
  };

  return (
    <Row gutter={[16, 16]}>
      {sessions.map((session) => (
        <Col span={6} key={session.name}>
          <Card className="bg-gray-800 border-none h-full">
            <Text className="text-lg font-bold text-white mb-2 block">{session.name}</Text>
            <Text className="text-sm text-gray-400 mb-4 block">
              {session.hours} UTC
            </Text>
            <Progress
              percent={getSessionProgress(session.hours)}
              strokeColor={session.color}
              trailColor="#1f1f1f"
              showInfo={false}
            />
            <Text className="text-xs text-gray-400 mt-2 block">
              {getSessionProgress(session.hours).toFixed(0)}% Complete
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ForexSessionsDisplay;