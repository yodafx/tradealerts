import React from 'react';
import { Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const { Text } = Typography;

const VolumeIndicator: React.FC = () => {
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    datasets: [
      {
        label: 'Trading Volume',
        data: [30, 40, 60, 80, 70, 50, 30],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="mt-4">
      <Text className="block mb-2">Trading Volume</Text>
      <div style={{ height: '50px' }}>
        <Line data={data} options={options} />
      </div>
      <div className="flex justify-between mt-1">
        <Text className="text-xs">Low</Text>
        <Text className="text-xs">High</Text>
      </div>
    </div>
  );
};

export default VolumeIndicator;