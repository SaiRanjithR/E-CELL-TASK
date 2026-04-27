import { useEffect, useState } from 'react';
import { Calendar, Activity, TrendingDown, Target, Clock, Trophy } from 'lucide-react';
import type { RunwayZone, AppState } from '../hooks/useRunwayCalculations';

interface OutputDashboardProps {
  calc: {
    statusZone: RunwayZone;
    runwayMonths: number;
    isProfitable: boolean;
    daysToZero: number;
    netBurn: number;
    healthScore: number;
    zeroCashDate: Date | null;
    fundraisingDate: Date | null;
    stageBenchmark: string;
  };
  appState: AppState;
}

export function OutputDashboard({ calc, appState }: OutputDashboardProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress ring on load
    const target = calc.isProfitable ? 100 : Math.min(100, (calc.runwayMonths / 24) * 100);
    setTimeout(() => setProgress(0), 0);
    setTimeout(() => setProgress(target), 100);
  }, [calc.runwayMonths, calc.isProfitable]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  
  const formatDate = (d: Date | null) => {
    if (!d) return 'N/A';
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const safeFormatRunway = (val: number) => {
    if (val === Infinity || val === -Infinity) return 'Infinity';
    if (isNaN(val)) return '0.0';
    return val.toFixed(1);
  };

  const isProfitable = calc.isProfitable;
  const runwayDisplay = isProfitable ? 'Infinity' : safeFormatRunway(calc.runwayMonths);

  // SVG Ring calculations
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const safeProgress = isNaN(progress) ? 0 : progress;
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  let ringColor = '#4f46e5'; // Indigo default (Strong)
  if (calc.statusZone === 'Critical') ringColor = '#e11d48';
  else if (calc.statusZone === 'Warning') ringColor = '#d97706';
  else if (calc.statusZone === 'Healthy') ringColor = '#059669';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center">
      
      {/* Hero Circular Ring */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <svg className="w-full h-full transform -rotate-90">
           {/* Background Track */}
           <circle cx="128" cy="128" r={radius} stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
           {/* Progress Track */}
           <circle 
             cx="128" 
             cy="128" 
             r={radius} 
             stroke={ringColor} 
             strokeWidth="12" 
             fill="transparent" 
             strokeDasharray={circumference}
             strokeDashoffset={strokeDashoffset}
             strokeLinecap="round"
             className="transition-all duration-1000 ease-out"
           />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <span className="text-sm font-medium text-slate-500 mb-1 tracking-wide">RUNWAY</span>
           <div className="flex items-baseline gap-1">
              <span className={`text-5xl font-bold tracking-tight ${
                isProfitable ? 'text-emerald-600' :
                calc.statusZone === 'Healthy' || calc.statusZone === 'Strong' ? 'text-emerald-600' :
                calc.statusZone === 'Warning' ? 'text-amber-600' : 'text-rose-600'
              }`}>{runwayDisplay}</span>
           </div>
           <span className="text-sm font-medium text-slate-400 mt-1">{isProfitable ? '' : 'MONTHS'}</span>
        </div>
      </div>

      <div className={`mb-8 px-4 py-1.5 rounded-full text-xs font-bold border ${isProfitable ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
         calc.statusZone === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-100' :
         calc.statusZone === 'Warning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
         calc.statusZone === 'Healthy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
         'bg-indigo-50 text-indigo-600 border-indigo-100'
      }`}>
        {isProfitable ? 'PROFITABLE' : calc.statusZone.toUpperCase()}
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <MetricCard icon={<Clock size={16} />} label="Days to Zero" value={isProfitable ? '∞' : calc.daysToZero} valueColor={isProfitable ? 'text-emerald-600' : calc.daysToZero > 365 ? 'text-emerald-600' : 'text-slate-900'} />
        <MetricCard icon={<Calendar size={16} />} label="Zero Cash Date" value={isProfitable ? 'Never' : formatDate(calc.zeroCashDate)} />
        <MetricCard icon={<Activity size={16} />} label="Net Burn" value={`${formatCurrency(calc.netBurn)}/mo`} valueColor={isProfitable ? 'text-emerald-600' : 'text-rose-600'} />
        <MetricCard icon={<TrendingDown size={16} />} label="Monthly Revenue" value={`${formatCurrency(appState.monthlyRevenue)}/mo`} valueColor="text-emerald-600" />
        <MetricCard icon={<Target size={16} />} label="Fundraise By" value={isProfitable ? 'N/A' : formatDate(calc.fundraisingDate)} valueColor="text-indigo-600" />
        <MetricCard icon={<Trophy size={16} />} label="Runway Score" value={`${calc.healthScore}/100`} valueColor={calc.healthScore >= 70 ? 'text-emerald-600' : calc.healthScore >= 40 ? 'text-amber-600' : 'text-rose-600'} />
      </div>

    </div>
  );
}

function MetricCard({ icon, label, value, valueColor = "text-slate-900" }: { icon: React.ReactNode, label: string, value: string | number, valueColor?: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2 hover:shadow-sm hover:border-slate-200 transition-all cursor-default">
       <div className="flex items-center gap-2 text-slate-500">
         {icon}
         <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
       </div>
       <span className={`font-bold text-lg ${valueColor}`}>{value}</span>
    </div>
  );
}
