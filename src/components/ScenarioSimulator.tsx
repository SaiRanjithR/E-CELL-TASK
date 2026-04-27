import { DollarSign, Percent } from 'lucide-react';
import type { ScenarioState, AppState, RunwayCalculations } from '../hooks/useRunwayCalculations';

interface ScenarioSimulatorProps {
  scenario: ScenarioState;
  onChange: (update: Partial<ScenarioState>) => void;
  baseCalc: RunwayCalculations;
  appState: AppState;
}

export function ScenarioSimulator({ scenario, onChange, baseCalc, appState }: ScenarioSimulatorProps) {
  
  // Calculate specific scenarios on the fly to show their isolated impact
  const calcCutOnly = (cutPercent: number) => {
    const simExpValue = appState.monthlyExpenses * (1 - cutPercent / 100);
    const net = Math.max(0, simExpValue - appState.monthlyRevenue);
    if (appState.monthlyRevenue >= simExpValue) return Infinity;
    return appState.cashOnHand / net;
  };

  const calcRaiseOnly = (amount: number) => {
    const net = baseCalc.netBurn;
    if (net <= 0) return Infinity;
    return (appState.cashOnHand + amount) / net;
  };

  const safeFormatRunway = (val: number) => {
    if (val === Infinity || val === -Infinity || isNaN(val)) return Infinity;
    return Number(val.toFixed(1));
  };

  const runwayBase = baseCalc.isProfitable ? Infinity : safeFormatRunway(baseCalc.runwayMonths);
  const runwayCut = safeFormatRunway(calcCutOnly(scenario.reduceBurnPercent));
  const runwayRaise = safeFormatRunway(calcRaiseOnly(scenario.addFundingAmount));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">What-if Scenarios</h3>
      
      <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4 pt-1 px-1 -mx-1 snap-x">
        
        {/* Base Scenario Card */}
        <div className="min-w-[200px] flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5 shrink-0 snap-start">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current</p>
          <div className="flex items-baseline gap-1 mb-4">
             <span className="text-3xl font-bold text-slate-900">{runwayBase === Infinity ? '∞' : runwayBase}</span>
             <span className="text-sm font-medium text-slate-500">mo</span>
          </div>
          <p className="text-xs text-slate-500 mt-auto pt-4 border-t border-slate-200">Baseline configuration</p>
        </div>

        {/* Reduce Burn Card */}
        <div className="min-w-[240px] flex-1 bg-white border border-slate-200 shadow-sm rounded-xl p-5 shrink-0 snap-start hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reduce Burn</p>
            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${runwayCut > runwayBase ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
               {runwayCut > runwayBase ? `+${runwayCut === Infinity ? '∞' : (runwayCut - runwayBase).toFixed(1)} mo` : 'No Change'}
            </div>
          </div>
          <div className="flex items-baseline gap-1 mb-4 text-indigo-600">
             <span className="text-3xl font-bold">{runwayCut === Infinity ? '∞' : runwayCut}</span>
             <span className="text-sm font-medium">mo</span>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-auto">
             <div className="flex items-center gap-2 mb-2 text-slate-600">
                <Percent size={14} />
                <span className="text-xs font-medium">Target cut (%)</span>
             </div>
             <input 
               type="range" 
               min="0" max="80" step="5"
               value={scenario.reduceBurnPercent}
               onChange={(e) => onChange({ reduceBurnPercent: Number(e.target.value) })}
               className="w-full accent-indigo-600"
             />
             <div className="text-right text-xs font-bold text-slate-900 mt-1">{scenario.reduceBurnPercent}% Cut</div>
          </div>
        </div>

        {/* Add Funding Card */}
        <div className="min-w-[240px] flex-1 bg-white border border-slate-200 shadow-sm rounded-xl p-5 shrink-0 snap-start hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Add Funding</p>
            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${runwayRaise > runwayBase ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
               {runwayRaise > runwayBase ? `+${runwayRaise === Infinity ? '∞' : (runwayRaise - runwayBase).toFixed(1)} mo` : 'No Change'}
            </div>
          </div>
          <div className="flex items-baseline gap-1 mb-4 text-teal-600">
             <span className="text-3xl font-bold">{runwayRaise === Infinity ? '∞' : runwayRaise}</span>
             <span className="text-sm font-medium">mo</span>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-auto">
             <div className="flex items-center gap-2 mb-2 text-slate-600">
                <DollarSign size={14} />
                <span className="text-xs font-medium">Raise amount (₹)</span>
             </div>
             <input 
               type="range" 
               min="0" max="50000000" step="1000000"
               value={scenario.addFundingAmount}
               onChange={(e) => onChange({ addFundingAmount: Number(e.target.value) })}
               className="w-full accent-teal-600"
             />
             <div className="text-right text-xs font-bold text-slate-900 mt-1">₹{(scenario.addFundingAmount / 100000).toFixed(0)}L Raise</div>
          </div>
        </div>

      </div>
    </div>
  );
}
