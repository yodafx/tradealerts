import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Select, Card, Typography } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

interface EconomicEvent {
  id: string;
  date: string;
  time: string;
  name: string;
  impact: string;
  currency: string;
}

const economicEvents: EconomicEvent[] = [
  {id: "c38d16fa-762f-4e37-8d3e-87abfb31d307", date: "2024-10-01", time: "00:30:00", name: "Jibun Bank Manufacturing PMI", impact: "LOW", currency: "JPY"},
  {id: "129b9db3-a03f-4fea-be97-870d2e0a11e5", date: "2024-10-01", time: "01:30:00", name: "Building Permits (MoM)", impact: "MEDIUM", currency: "AUD"},
  {id: "22ac824c-993b-464b-9227-7b0e6e95b5a3", date: "2024-10-01", time: "01:30:00", name: "Retail Sales s.a. (MoM)", impact: "HIGH", currency: "AUD"},
  {id: "9520e1db-b5cb-47c4-8b80-99da15876c5a", date: "2024-10-01", time: "14:00:00", name: "ISM Manufacturing PMI", impact: "HIGH", currency: "USD"},
  // ... Add more events as needed
];

const EconomicCalendar: React.FC = () => {
  const [filteredEvents, setFilteredEvents] = useState(economicEvents);
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment]>([moment(), moment().add(7, 'days')]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [selectedImpacts, setSelectedImpacts] = useState<string[]>([]);

  useEffect(() => {
    filterEvents();
  }, [dateRange, selectedCurrencies, selectedImpacts]);

  const filterEvents = () => {
    const filtered = economicEvents.filter(event => {
      const eventDate = moment(`${event.date} ${event.time}`);
      const inDateRange = dateRange && eventDate.isBetween(dateRange[0], dateRange[1], null, '[]');
      const matchesCurrency = selectedCurrencies.length === 0 || selectedCurrencies.includes(event.currency);
      const matchesImpact = selectedImpacts.length === 0 || selectedImpacts.includes(event.impact);
      return inDateRange && matchesCurrency && matchesImpact;
    });
    setFilteredEvents(filtered);
  };

  const columns = [
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date',
      render: (date: string) => moment(date).format('YYYY-MM-DD'),
    },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Currency', dataIndex: 'currency', key: 'currency' },
    { title: 'Event', dataIndex: 'name', key: 'name' },
    { 
      title: 'Impact', 
      dataIndex: 'impact', 
      key: 'impact',
      render: (impact: string) => (
        <span style={{ color: impact === 'HIGH' ? 'red' : impact === 'MEDIUM' ? 'orange' : 'green' }}>
          {impact}
        </span>
      )
    },
  ];

  return (
    <Card className="bg-panel text-white">
      <Title level={2} className="text-white mb-4">Economic Calendar</Title>
      <div style={{ marginBottom: 16 }}>
        <RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates as [moment.Moment, moment.Moment])}
          style={{ marginRight: 16 }}
        />
        <Select
          mode="multiple"
          style={{ width: 200, marginRight: 16 }}
          placeholder="Select currencies"
          onChange={setSelectedCurrencies}
        >
          {Array.from(new Set(economicEvents.map(e => e.currency))).map(currency => (
            <Option key={currency} value={currency}>{currency}</Option>
          ))}
        </Select>
        <Select
          mode="multiple"
          style={{ width: 200 }}
          placeholder="Select impact"
          onChange={setSelectedImpacts}
        >
          <Option value="HIGH">High</Option>
          <Option value="MEDIUM">Medium</Option>
          <Option value="LOW">Low</Option>
        </Select>
      </div>
      <Table 
        dataSource={filteredEvents} 
        columns={columns} 
        rowKey="id"
        className="text-white"
      />
    </Card>
  );
};

export default EconomicCalendar;