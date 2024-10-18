import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import Reports from './components/Reports';
import ForexMarketHours from './components/tools/ForexMarketHours';
import CurrencyCorrelation from './components/tools/CurrencyCorrelation';
import RiskOnRiskOffMeter from './components/tools/RiskOnRiskOffMeter';
import GainLossCalculator from './components/tools/GainLossCalculator';
import PipValueCalculator from './components/tools/PipValueCalculator';
import PositionSizeCalculator from './components/tools/PositionSizeCalculator';
import EconomicCalendar from './components/EconomicCalendar';

interface AppRoutesProps {
  trades: any[];
  setTrades: React.Dispatch<React.SetStateAction<any[]>>;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ trades, setTrades }) => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard trades={trades} />} />
      <Route path="/journal" element={<Journal trades={trades} setTrades={setTrades} />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/economic-calendar" element={<EconomicCalendar />} />
      <Route path="/tools/forex-market-hours" element={<ForexMarketHours />} />
      <Route path="/tools/currency-correlation" element={<CurrencyCorrelation />} />
      <Route path="/tools/risk-on-risk-off" element={<RiskOnRiskOffMeter />} />
      <Route path="/tools/gain-loss-calculator" element={<GainLossCalculator />} />
      <Route path="/tools/pip-value-calculator" element={<PipValueCalculator />} />
      <Route path="/tools/position-size-calculator" element={<PositionSizeCalculator />} />
    </Routes>
  );
};

export default AppRoutes;