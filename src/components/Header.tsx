import React from 'react';
import { Layout, Input, Button, Avatar, Dropdown, MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const userMenuItems: MenuProps['items'] = [
    { key: '1', label: 'Profile' },
    { key: '2', label: 'Settings' },
    { key: '3', label: 'Logout' },
  ];

  return (
    <AntHeader 
      className="flex items-center justify-between px-6 bg-surface fixed top-0 right-0 z-50"
      style={{
        width: `calc(100% - ${collapsed ? '80px' : '200px'})`,
        transition: 'width 0.2s',
      }}
    >
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="text-white"
        />
        <Input.Search
          placeholder="Search..."
          className="ml-4 w-64"
        />
      </div>
      <div className="flex items-center">
        <Button type="text" icon={<BellOutlined />} className="text-white mr-4" />
        <Button type="text" icon={<SettingOutlined />} className="text-white mr-4" />
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
          <Button type="text" className="flex items-center text-white">
            <Avatar icon={<UserOutlined />} className="mr-2" />
            John Doe
          </Button>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;