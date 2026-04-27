import { Flag, PieChart } from 'lucide-react';
import type { AppState } from '../hooks/useRunwayCalculations';

interface InputPanelProps {
  state: AppState;
  onChange: (update: Partial<AppState>) => void;
}

export function InputPanel({ state, onChange }: InputPanelProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    onChange({ [name]: value });
  };

  const handleBreakdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof AppState['breakdown'];
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    const newBreakdown = { ...state.breakdown, [name]: value };
    const newTotal = Object.values(newBreakdown).reduce((a, b) => a + b, 0);
    onChange({ 
      breakdown: newBreakdown,
      monthlyExpenses: newTotal
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Financial Inputs</h2>

      <div className="space-y-5">

        {/* Cash on Hand */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Cash on Hand (₹)</label>
          <input 
            type="number" name="cashOnHand" value={state.cashOnHand || ''} onChange={handleChange}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 transition-all"
            placeholder="e.g. 5000000"
          />
        </div>

        {/* Monthly Revenue */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Monthly Revenue (₹)</label>
          <input 
            type="number" name="monthlyRevenue" value={state.monthlyRevenue || ''} onChange={handleChange}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 transition-all"
            placeholder="e.g. 100000"
          />
        </div>

        {/* Burn Breakdown */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <PieChart size={15} />
            <h3 className="font-semibold text-sm">Cost Breakdown (₹)</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500 uppercase">Salaries</label>
              <input type="number" name="salaries" value={state.breakdown.salaries || ''} onChange={handleBreakdownChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500 uppercase">Marketing</label>
              <input type="number" name="marketing" value={state.breakdown.marketing || ''} onChange={handleBreakdownChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500 uppercase">Tools / SaaS</label>
              <input type="number" name="tools" value={state.breakdown.tools || ''} onChange={handleBreakdownChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500 uppercase">Other</label>
              <input type="number" name="other" value={state.breakdown.other || ''} onChange={handleBreakdownChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all" />
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-3 flex justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span>Total Monthly Burn:</span>
            <span className="font-bold text-slate-700">₹{state.monthlyExpenses.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Growth Drivers */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <Flag size={15} />
            <h3 className="font-semibold text-sm">Growth Drivers</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-500 uppercase">Rev Growth % / mo</label>
              <input 
                type="number" name="revenueGrowth" value={state.revenueGrowth || ''} onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-500 uppercase">Exp Growth % / mo</label>
              <input 
                type="number" name="expenseGrowth" value={state.expenseGrowth || ''} onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Milestone */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Months until next Milestone</label>
          <input 
            type="number" name="milestoneMonths" value={state.milestoneMonths || ''} onChange={handleChange}
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all"
            placeholder="e.g. 12"
          />
        </div>

      </div>
    </div>
  );
}
