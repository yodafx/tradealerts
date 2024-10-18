import React, { useState } from 'react';
import { Layout as AntLayout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <AntLayout 
        className="site-layout" 
        style={{ 
          marginLeft: collapsed ? 80 : 200, 
          transition: 'margin-left 0.2s',
          minHeight: '100vh'
        }}
      >
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content 
          className="bg-background" 
          style={{ 
            margin: '64px 16px 16px', 
            padding: 24, 
            minHeight: 280,
            borderRadius: 8,
            overflow: 'initial'
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;