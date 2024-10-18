import React, { useState } from 'react';
import { ConfigProvider, App as AntApp, theme } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  const [trades, setTrades] = useState<any[]>([]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#4FD1C5',
          colorBgBase: '#0a0a0a',
          colorText: '#ffffff',
          colorTextSecondary: '#a1a1a1',
          borderRadius: 8,
        },
      }}
    >
      <AntApp>
        <Router>
          <Layout>
            <AppRoutes trades={trades} setTrades={setTrades} />
          </Layout>
        </Router>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;