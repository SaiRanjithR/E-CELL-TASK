import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { AppState } from '../hooks/useRunwayCalculations';

interface BurnBreakdownChartProps {
  breakdown: AppState['breakdown'];
}

export function BurnBreakdownChart({ breakdown }: BurnBreakdownChartProps) {
  const data = [
    { name: 'Salaries', value: breakdown.salaries, color: '#4f46e5' }, // indigo-600
    { name: 'Marketing', value: breakdown.marketing, color: '#0ea5e9' }, // sky-500
    { name: 'Tools/SaaS', value: breakdown.tools, color: '#10b981' }, // emerald-500
    { name: 'Other', value: breakdown.other, color: '#f59e0b' } // amber-500
  ].filter(d => d.value > 0);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
       <h3 className="text-lg font-semibold text-slate-900 mb-6">Cost Breakdown</h3>
       <div className="flex flex-col xl:flex-row items-center gap-6">
         <div className="w-40 h-40 relative shrink-0">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie
                 data={data}
                 cx="50%"
                 cy="50%"
                 innerRadius={60}
                 outerRadius={75}
                 paddingAngle={2}
                 dataKey="value"
                 stroke="none"
               >
                 {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Pie>
               <Tooltip 
                 formatter={(value) => [new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value as number), 'Amount']}
                 contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', color: '#000' }}
               />
             </PieChart>
           </ResponsiveContainer>
         </div>
         
         <div className="flex-1 w-full space-y-3">
           {data.map((item, idx) => {
             const pct = ((item.value / total) * 100).toFixed(1);
             return (
               <div key={idx} className="flex flex-col gap-0.5">
                 <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                     <span className="text-slate-600 font-medium">{item.name}</span>
                   </div>
                   <span className={`font-bold ${Number(pct) < 25 ? 'text-emerald-600' : Number(pct) > 50 ? 'text-rose-600' : 'text-slate-900'}`}>{pct}%</span>
                 </div>
                 <div className="flex items-center justify-between text-xs text-slate-500 pl-[18px]">
                   <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.value)}</span>
                 </div>
               </div>
             );
           })}
         </div>
       </div>
    </div>
  );
}
