import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  BarChartOutlined,
  ToolOutlined,
  FileTextOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/journal',
      icon: <BookOutlined />,
      label: <Link to="/journal">Journal</Link>,
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: <Link to="/reports">Reports</Link>,
    },
    {
      key: '/chart',
      icon: <BarChartOutlined />,
      label: <Link to="/chart">Chart</Link>,
    },
    {
      key: '/economic-calendar',
      icon: <GlobalOutlined />,
      label: <Link to="/economic-calendar">Economic Calendar</Link>,
    },
    {
      key: 'tools',
      icon: <ToolOutlined />,
      label: 'Tools',
      children: [
        {
          key: '/tools/forex-market-hours',
          label: <Link to="/tools/forex-market-hours">Forex Market Hours</Link>,
        },
        {
          key: '/tools/currency-correlation',
          label: (
            <Link to="/tools/currency-correlation">Currency Correlation</Link>
          ),
        },
        {
          key: '/tools/risk-on-risk-off',
          label: (
            <Link to="/tools/risk-on-risk-off">Risk-On Risk-Off Meter</Link>
          ),
        },
        {
          key: '/tools/gain-loss-calculator',
          label: (
            <Link to="/tools/gain-loss-calculator">Gain & Loss Calculator</Link>
          ),
        },
        {
          key: '/tools/pip-value-calculator',
          label: (
            <Link to="/tools/pip-value-calculator">Pip Value Calculator</Link>
          ),
        },
        {
          key: '/tools/position-size-calculator',
          label: (
            <Link to="/tools/position-size-calculator">
              Position Size Calculator
            </Link>
          ),
        },
      ],
    },
  ];

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={200}
      className="bg-surface fixed left-0 top-0 bottom-0 overflow-auto"
      style={{ height: '100vh', zIndex: 1000 }}
    >
      <div className="h-16 flex items-center justify-center">
        <span className="text-lg font-bold text-primary">
          {collapsed ? 'TA' : 'Trade Alerts'}
        </span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-r-0 bg-surface"
      />
    </Sider>
  );
};

export default Sidebar;
