import { useState, useEffect } from 'react';
import { type AppState, type ScenarioState, useRunwayCalculations } from '../hooks/useRunwayCalculations';
import { InputPanel } from './InputPanel';
import { OutputDashboard } from './OutputDashboard';
import { RunwayChart } from './RunwayChart';
import { ScenarioSimulator } from './ScenarioSimulator';
import { SmartInsights } from './SmartInsights';
import { SimulationTable } from './SimulationTable';
import { ShareableSnapshot } from './ShareableSnapshot';
import { BurnBreakdownChart } from './BurnBreakdownChart';
import { Navbar } from './Navbar';
import { MetricsStrip } from './MetricsStrip';

export function CalculatorApp() {
  const [appState, setAppState] = useState<AppState>({
    cashOnHand: 5000000,
    monthlyRevenue: 100000,
    monthlyExpenses: 500000,
    revenueGrowth: 5,
    expenseGrowth: 2,
    milestoneMonths: 12,
    breakdown: {
      salaries: 300000,
      marketing: 100000,
      tools: 50000,
      other: 50000
    }
  });

  const [scenarioState, setScenarioState] = useState<ScenarioState>({
    reduceBurnPercent: 0,
    addFundingAmount: 0
  });


  // Force body background to #f8fafc (slate-50) using a side effect to ensure it covers outside root
  useEffect(() => {
    document.body.className = "bg-slate-50 text-slate-900";
    return () => { document.body.className = ""; }
  }, []);

  const baseCalculations = useRunwayCalculations(appState, { reduceBurnPercent: 0, addFundingAmount: 0 });
  const projectedCalculations = useRunwayCalculations(appState, scenarioState);

  // If no scenario active, calculations are the same
  const activeCalc = projectedCalculations;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 pb-24">
      <Navbar />
      <MetricsStrip calc={activeCalc} appState={appState} />

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Inputs & Breakdown (Matches 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <InputPanel
              state={appState}
              onChange={(update) => setAppState(prev => ({ ...prev, ...update }))}
            />
            <BurnBreakdownChart breakdown={appState.breakdown} />
            <SmartInsights calc={activeCalc} appState={appState} />
          </div>

          {/* Right Column: Dashboards & Charts (Matches 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <OutputDashboard calc={activeCalc} appState={appState} />
            <RunwayChart data={activeCalc.chartData} fundraisingDate={activeCalc.fundraisingDate} />
            <ScenarioSimulator
              scenario={scenarioState}
              onChange={(update) => setScenarioState(prev => ({ ...prev, ...update }))}
              baseCalc={baseCalculations}
              appState={appState}
            />
            <SimulationTable data={activeCalc.chartData} />
            <div className="max-w-sm mt-4">
              <ShareableSnapshot calc={activeCalc} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
