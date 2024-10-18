import React, { useState, useEffect } from 'react';
import { Card, Typography, Switch, Row, Col, Select } from 'antd';
import { Clock } from 'lucide-react';
import ForexSessionsDisplay from './ForexSessionsDisplay';
import VolumeIndicator from './VolumeIndicator';

const { Title, Text } = Typography;
const { Option } = Select;

const ForexMarketHours: React.FC = () => {
  const [is24HourFormat, setIs24HourFormat] = useState(true);
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'New York' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
    { value: 'Australia/Sydney', label: 'Sydney' },
  ];

  const formatTime = (date: Date, timezone: string) => {
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: !is24HourFormat,
      timeZone: timezone,
    });
  };

  return (
    <div className="p-6">
      <Card className="bg-panel text-white">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="text-white m-0">Forex Trading Sessions</Title>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Text className="mr-2 text-white">24h</Text>
              <Switch 
                checked={is24HourFormat} 
                onChange={setIs24HourFormat} 
                className="bg-blue-600"
              />
            </div>
            <Select
              value={selectedTimezone}
              onChange={setSelectedTimezone}
              className="w-48"
              popupMatchSelectWidth={false}
            >
              {timezones.map((tz) => (
                <Option key={tz.value} value={tz.value}>
                  {tz.label} ({formatTime(currentTime, tz.value)})
                </Option>
              ))}
            </Select>
          </div>
        </div>
        
        <Row gutter={[16, 16]} className="mb-6">
          <Col span={24}>
            <Card className="bg-gray-800 border-none">
              <div className="flex items-center justify-between">
                <Text className="text-lg text-white">Current Time ({selectedTimezone}):</Text>
                <div className="flex items-center bg-gray-700 px-4 py-2 rounded-full">
                  <Clock size={20} className="mr-2 text-blue-400" />
                  <Text className="text-xl font-bold text-white">
                    {currentTime.toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      hour12: !is24HourFormat,
                      timeZone: selectedTimezone,
                    })}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <ForexSessionsDisplay
          is24HourFormat={is24HourFormat}
          selectedTimezone={selectedTimezone}
          currentTime={currentTime}
        />
        
        <Row gutter={[16, 16]} className="mt-6">
          <Col span={24}>
            <Card className="bg-gray-800 border-none">
              <Title level={4} className="text-white mb-4">Trading Volume Indicator</Title>
              <VolumeIndicator currentTime={currentTime} />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ForexMarketHours;