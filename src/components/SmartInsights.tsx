import { Lightbulb, TrendingDown, Target, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { RunwayZone, AppState } from '../hooks/useRunwayCalculations';

interface SmartInsightsProps {
  calc: {
    runwayMonths: number;
    statusZone: RunwayZone;
    isProfitable: boolean;
    netBurn: number;
  };
  appState: AppState;
}

export function SmartInsights({ calc, appState }: SmartInsightsProps) {
  
  const generateInsights = () => {
    const insights = [];

    if (calc.isProfitable) {
      insights.push({
        icon: <ShieldCheck size={18} className="text-emerald-500" />,
        text: "You are default alive. Your revenue exceeds expenses.",
        action: "Focus on scaling growth channels without increasing fixed costs unnecessarily."
      });
      return insights;
    }

    if (calc.statusZone === 'Critical') {
      const targetBurn = appState.monthlyExpenses - (appState.monthlyExpenses * 0.3); // Cut 30%
      const cutAmount = appState.monthlyExpenses - targetBurn;
      
      insights.push({
        icon: <AlertTriangle size={18} className="text-rose-500" />,
        text: `Runway is highly critical (${calc.runwayMonths.toFixed(1)} months).`,
        action: `Raise capital immediately or cut burn by ₹${cutAmount.toLocaleString('en-IN')}/mo to survive.`
      });
    } else if (calc.statusZone === 'Warning') {
      const targetBurn = appState.monthlyExpenses - (appState.monthlyExpenses * 0.15); // Cut 15%
      const cutAmount = appState.monthlyExpenses - targetBurn;

      insights.push({
        icon: <TrendingDown size={18} className="text-amber-500" />,
        text: "Runway is under 12 months. Start fundraising prep.",
        action: `Optimize spend by ₹${cutAmount.toLocaleString('en-IN')}/mo to extend runway while you raise.`
      });
    }

    // Goal to reach 18 months
    const desiredCash = calc.netBurn * 18;
    const fundingNeeded = Math.max(0, desiredCash - appState.cashOnHand);

    if (fundingNeeded > 0) {
      insights.push({
        icon: <Target size={18} className="text-indigo-500" />,
        text: `Target a raise of ₹${fundingNeeded.toLocaleString('en-IN')} to achieve 18-month safety.`,
        action: "Prepare your data room and investor updates."
      });
    }

    if (appState.expenseGrowth > appState.revenueGrowth) {
       insights.push({
         icon: <Lightbulb size={18} className="text-slate-500" />,
         text: "Expenses are growing faster than revenue.",
         action: "This will rapidly accelerate your runway depletion. Cap OPEX growth."
       });
    }

    return insights;
  };

  const insights = generateInsights();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-5">Smart Insights</h3>
      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="mt-0.5 bg-slate-50 p-2 rounded-full border border-slate-100 shrink-0">
               {insight.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 leading-tight mb-1">{insight.text}</p>
              <p className="text-[13px] text-slate-500 leading-snug">{insight.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
