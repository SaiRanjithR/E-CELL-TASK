import type { AppState, RunwayZone } from '../hooks/useRunwayCalculations';

interface MetricsStripProps {
  calc: {
    runwayMonths: number;
    daysToZero: number;
    zeroCashDate: Date | null;
    netBurn: number;
    fundraisingDate: Date | null;
    statusZone: RunwayZone;
    isProfitable: boolean;
  };
  appState: AppState;
}

export function MetricsStrip({ calc, appState }: MetricsStripProps) {
  
  const formatDate = (d: Date | null) => {
    if (!d) return 'N/A';
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  const formatCurrency = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(val);
  };

  const safeFormatRunway = (val: number) => {
    if (val === Infinity || val === -Infinity) return 'Infinity';
    if (isNaN(val)) return '0.0';
    return val.toFixed(1);
  };

  const statusColor = calc.statusZone === 'Critical' ? 'text-rose-600' :
                      calc.statusZone === 'Warning' ? 'text-amber-600' :
                      calc.statusZone === 'Healthy' ? 'text-emerald-600' : 'text-indigo-600';

  return (
    <div className="w-full bg-white border-b border-slate-200 overflow-x-auto custom-scrollbar">
      <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-8 md:gap-12 min-w-max">
        
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 mb-0.5">RUNWAY</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">{calc.isProfitable ? 'Infinity' : safeFormatRunway(calc.runwayMonths) + ' mo'}</span>
            {!calc.isProfitable && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${statusColor} bg-slate-50 border border-slate-100`}>
                {calc.statusZone}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 mb-0.5">DAYS TO ZERO</span>
          <span className={`font-bold ${calc.isProfitable ? 'text-emerald-600' : calc.daysToZero > 365 ? 'text-emerald-600' : 'text-slate-900'}`}>{calc.isProfitable ? '∞' : calc.daysToZero}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 mb-0.5">NET BURN</span>
          <span className={`font-bold ${calc.isProfitable ? 'text-emerald-600' : 'text-rose-600'}`}>{calc.isProfitable ? '+' : ''}{formatCurrency(calc.netBurn)}<span className="text-xs font-normal text-slate-500">/mo</span></span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 mb-0.5">MONTHLY REVENUE</span>
          <span className="font-bold text-emerald-600">{formatCurrency(appState.monthlyRevenue)}<span className="text-xs font-normal text-slate-500">/mo</span></span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 mb-0.5">ZERO CASH DATE</span>
          <span className="font-bold text-slate-900">{calc.isProfitable ? 'Never' : formatDate(calc.zeroCashDate)}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 mb-0.5">GROSS BURN</span>
          <span className="font-bold text-slate-900">{formatCurrency(appState.monthlyExpenses)}<span className="text-xs font-normal text-slate-500">/mo</span></span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 mb-0.5">FUNDRAISE BY</span>
          <span className="font-bold text-indigo-600">{calc.isProfitable ? 'N/A' : (calc.runwayMonths < 6 ? 'Immediately' : formatDate(calc.fundraisingDate))}</span>
        </div>

      </div>
    </div>
  );
}
