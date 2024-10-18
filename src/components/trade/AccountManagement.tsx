import React from 'react';
import { Typography, Descriptions, Button, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

interface AccountManagementProps {
  onClose: () => void;
  accountInfo: any;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ onClose, accountInfo }) => {
  const handleAccountChange = (value: string) => {
    // Implement account switching logic here
    console.log('Switched to account:', value);
  };

  return (
    <div>
      <Title level={4}>Account Information</Title>
      {accountInfo ? (
        <>
          <Select
            style={{ width: 200, marginBottom: 16 }}
            placeholder="Select account"
            onChange={handleAccountChange}
          >
            <Option value="demo">Demo Account</Option>
            <Option value="real">Real Account</Option>
          </Select>
          <Descriptions column={1}>
            <Descriptions.Item label="Login">{accountInfo.login}</Descriptions.Item>
            <Descriptions.Item label="Server">{accountInfo.server}</Descriptions.Item>
            <Descriptions.Item label="Balance">${accountInfo.balance.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Equity">${accountInfo.equity.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Margin">${accountInfo.margin.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Free Margin">${accountInfo.margin_free.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Margin Level">{accountInfo.margin_level.toFixed(2)}%</Descriptions.Item>
            <Descriptions.Item label="Leverage">1:{accountInfo.leverage}</Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <p>Loading account information...</p>
      )}

      <Button onClick={onClose} className="mt-4">Close</Button>
    </div>
  );
};

export default AccountManagement;