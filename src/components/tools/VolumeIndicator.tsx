import React from 'react';
import { Typography } from 'antd';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const { Text } = Typography;

const VolumeIndicator: React.FC<{ currentTime: Date }> = ({ currentTime }) => {
  const getVolumeData = () => {
    const hour = currentTime.getUTCHours();
    const baseVolume = [
      30, 25, 20, 15, 10, 15, 20, 30, 50, 70, 80, 85,
      90, 95, 100, 98, 95, 90, 85, 75, 65, 55, 45, 35
    ];
    const shiftedVolume = [...baseVolume.slice(hour), ...baseVolume.slice(0, hour)];
    return shiftedVolume.map((value, index) => ({ hour: index, value }));
  };

  const volumeData = getVolumeData();

  return (
    <div>
      <Text className="text-white mb-2 block">24-Hour Trading Volume</Text>
      <div style={{ height: '100px', width: '100%' }}>
        <ResponsiveContainer>
          <AreaChart data={volumeData}>
            <XAxis dataKey="hour" tick={{ fill: '#a0aec0' }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '4px' }}
              labelStyle={{ color: '#a0aec0' }}
              formatter={(value) => [`Volume: ${value}`, '']}
            />
            <Area type="monotone" dataKey="value" stroke="#4FD1C5" fill="url(#colorVolume)" />
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4FD1C5" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-1">
        <Text className="text-xs text-gray-400">Low Volume</Text>
        <Text className="text-xs text-gray-400">High Volume</Text>
      </div>
    </div>
  );
};

export default VolumeIndicator;