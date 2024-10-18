import React from 'react';
import { Typography, Card, Space } from 'antd';
import { Clock, DollarSign, BarChart2 } from 'lucide-react';

const { Title, Paragraph, Text } = Typography;

const ForexMarketInfo: React.FC = () => {
  return (
    <Card className="mt-8 bg-gray-900 text-white">
      <Title level={3} className="text-white">How to use the Forex Market Time Zone Converter</Title>
      <Paragraph>
        The forex market is open 24 hours a day during the weekdays which allows traders to potentially trade all day and all night.
      </Paragraph>
      <Paragraph>
        Knowing the forex market's operating hours is essential for a trader. You need to know when the forex market opens and closes as well as the four main trading sessions.
      </Paragraph>
      <Paragraph>
        The Forex Market Time Zone Converter displays which trading session(s) is open in your current local time.
      </Paragraph>

      <Title level={4} className="text-white mt-6">Forex Trading Sessions</Title>
      <Paragraph>
        Just because you can trade the market any time of the day or night doesn't necessarily mean that you should.
      </Paragraph>
      <Paragraph>
        The best time to trade is when the market is active with lots of forex traders opening and closing positions, which creates a large volume of trades.
      </Paragraph>
      <Paragraph>
        The forex market can be broken up into four major trading sessions: the Sydney session, the Tokyo session, the London session, and the New York session.
      </Paragraph>

      <Title level={4} className="text-white mt-6">Forex Trading Volume</Title>
      <Paragraph>
        You can make money trading when the market moves up, and you can even make money when the market moves down. But you will have a very difficult time trying to make money when the market doesn't move at all.
      </Paragraph>
      <Paragraph>
        In order for the market to move, lots of trades need to occur. And this is why you should focus your energy during specific trading sessions.
      </Paragraph>
      <Paragraph>
        The forex trading sessions are named after major financial centers and are loosely based on the local "work day" of traders working in those cities.
      </Paragraph>
      <Paragraph>
        The more traders trading, the higher the trading volume, and the more active the market.
      </Paragraph>
      <Paragraph>
        The more active the market, the tighter the spreads you'll get and the less slippage you'll experience. In a nutshell, you'll get better order execution.
      </Paragraph>

      <Title level={4} className="text-white mt-6">When is the best time to trade forex?</Title>
      <Paragraph>
        During the weekdays, there's always at least one forex trading session open although there are periods of downtime when the market is really quiet and trading volume is low or "thin".
      </Paragraph>
      <Paragraph>
        You usually want to avoid trading when only one trading session is open and instead, wait for trading sessions to overlap.
      </Paragraph>
      <Paragraph>
        When two major financial centers are open, the number of traders actively buying and selling a given currency greatly increases.
      </Paragraph>
      <Paragraph>
        The highest trading volume occurs during the overlap of the London and New York trading sessions. More than 50% of trading volume occurs at these two financial centers.
      </Paragraph>
      <Paragraph>
        The best time for you to trade forex will depend on which currency pair you're looking to trade.
      </Paragraph>
      <Paragraph>
        Most of the trading activity for a specific currency pair will occur when the trading sessions of the individual currencies overlap.
      </Paragraph>
      <Paragraph>
        For example, AUD/JPY will experience a higher trading volume when both Sydney and Tokyo sessions are open. And EUR/USD will experience a higher trading volume when both London and New York sessions are open.
      </Paragraph>

      <Title level={4} className="text-white mt-6">How to Trade with the Forex Market Time Zone Converter</Title>
      <Paragraph>Here are some tips for using the Forex Market Time Zone Converter:</Paragraph>
      <ul className="list-disc list-inside mb-4">
        <li>Concentrate your trading activity during the trading hours for the three busiest trading sessions: Tokyo, London, and New York.</li>
        <li>Most market activity will occur when one of these three markets open.</li>
        <li>The most active times will occur when two or more trading sessions overlap and are open at the same time.</li>
      </ul>

      <Title level={4} className="text-white mt-6">Frequently Asked Questions about Forex Market Hours</Title>
      <Space direction="vertical" size="middle" className="w-full">
        <Card className="bg-gray-800 border-gray-700">
          <Space>
            <Clock className="text-blue-400" />
            <Text strong className="text-white">What are the forex market hours?</Text>
          </Space>
          <Paragraph className="mt-2">
            The forex market technically never closes, but retail traders can only trade the hours between Sunday at 5:00 pm ET and Friday at 5:00 pm ET.
          </Paragraph>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <Space>
            <Clock className="text-green-400" />
            <Text strong className="text-white">What time does the forex market open?</Text>
          </Space>
          <Paragraph className="mt-2">
            The forex market opens on Sunday at 5:00 pm ET.
          </Paragraph>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <Space>
            <Clock className="text-red-400" />
            <Text strong className="text-white">What time does the forex market close?</Text>
          </Space>
          <Paragraph className="mt-2">
            The forex market closed on Friday at 5:00 pm ET.
          </Paragraph>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <Space>
            <DollarSign className="text-yellow-400" />
            <Text strong className="text-white">What are the forex market sessions?</Text>
          </Space>
          <Paragraph className="mt-2">
            There are four trading sessions in the forex market:
          </Paragraph>
          <ul className="list-disc list-inside">
            <li>Sydney is open from 9:00 pm to 6:00 am UTC</li>
            <li>Tokyo is open from 12:00 am to 9:00 am UTC</li>
            <li>London is open from 7:00 am to 4:00 pm UTC</li>
            <li>New York is open from 1:00 pm to 10:00 pm UTC</li>
          </ul>
        </Card>
      </Space>
    </Card>
  );
};

export default ForexMarketInfo;