import { useMemo } from 'react';

export type RunwayZone = 'Critical' | 'Warning' | 'Healthy' | 'Strong';

export interface AppState {
  cashOnHand: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  revenueGrowth: number; 
  expenseGrowth: number;
  milestoneMonths: number;
  breakdown: {
    salaries: number;
    marketing: number;
    tools: number;
    other: number;
  };
}

export interface ScenarioState {
  reduceBurnPercent: number;
  addFundingAmount: number;
}

export interface ChartDataPoint {
  month: number;
  cash: number;
  revenue: number;
  expenses: number;
  netBurn: number;
  dateStr: string;
}

export interface RunwayCalculations {
  netBurn: number;
  isProfitable: boolean;
  runwayMonths: number;
  daysToZero: number;
  zeroCashDate: Date | null;
  fundraisingDate: Date | null;
  statusZone: RunwayZone;
  healthScore: number;
  stageBenchmark: string;
  chartData: ChartDataPoint[];
}

export function useRunwayCalculations(state: AppState, scenario: ScenarioState = { reduceBurnPercent: 0, addFundingAmount: 0 }): RunwayCalculations {
  return useMemo(() => {
    const { cashOnHand, monthlyRevenue, monthlyExpenses, revenueGrowth, expenseGrowth } = state;
    
    // Apply scenario
    const simCash = cashOnHand + scenario.addFundingAmount;
    let simExp = monthlyExpenses * (1 - scenario.reduceBurnPercent / 100);
    let simRev = monthlyRevenue;

    const netBurn = Math.max(0, simExp - simRev);
    const isProfitable = simRev >= simExp && simCash >= 0;

    const chartData: ChartDataPoint[] = [];
    let currentCash = simCash;
    const today = new Date();
    
    let runwayMonthsSim = 0;

    for (let i = 0; i <= 60; i++) {
        const d = new Date(today);
        d.setMonth(today.getMonth() + i);
        
        const currentNetBurn = Math.max(0, simExp - simRev);

        chartData.push({
            month: i,
            cash: Math.max(0, currentCash),
            revenue: simRev,
            expenses: simExp,
            netBurn: currentNetBurn,
            dateStr: d.toLocaleDateString('default', { month: 'short', year: '2-digit' })
        });
        
        if (currentCash <= 0 && i !== 0) {
            runwayMonthsSim = i - 1 + (chartData[i-1].cash / (simExp - simRev));
            break;
        }
        
        simRev = simRev * (1 + revenueGrowth / 100);
        simExp = simExp * (1 + expenseGrowth / 100);
        currentCash = currentCash - (simExp - simRev);
    }

    const runwayMonths = isProfitable ? Infinity : (runwayMonthsSim > 0 ? runwayMonthsSim : simCash / netBurn);
    const daysToZero = isProfitable ? Infinity : Math.round(runwayMonths * 30);
    
    let zeroCashDate: Date | null = null;
    let fundraisingDate: Date | null = null;

    if (!isProfitable) {
      zeroCashDate = new Date(today.getTime() + daysToZero * 24 * 60 * 60 * 1000);
      fundraisingDate = new Date(today);
      fundraisingDate.setMonth(today.getMonth() + Math.max(0, runwayMonths - 6)); // Recommended to raise 6 months prior
    }

    let statusZone: RunwayZone = 'Strong';
    let healthScore = 100;

    if (!isProfitable) {
      if (runwayMonths < 6) {
        statusZone = 'Critical';
        healthScore = Math.min(40, Math.max(0, Math.round(runwayMonths * 10)));
      } else if (runwayMonths <= 12) {
        statusZone = 'Warning';
        healthScore = Math.round(40 + ((runwayMonths - 6) / 6) * 30);
      } else if (runwayMonths <= 18) {
        statusZone = 'Healthy';
        healthScore = Math.round(70 + ((runwayMonths - 12) / 6) * 20);
      } else {
        statusZone = 'Strong';
        healthScore = Math.min(100, Math.round(90 + (runwayMonths - 18)));
      }
    }

    // Adjust health score slightly based on momentum (growth)
    if (!isProfitable) {
      const growthDelta = revenueGrowth - expenseGrowth;
      healthScore = Math.min(100, Math.max(0, healthScore + growthDelta));
    }

    // Determine Stage Benchmark based on Monthly Revenue and Cash
    let stageBenchmark = "Pre-seed";
    const arr = monthlyRevenue * 12; // Annualized revenue
    if (arr >= 100000000) { // ₹10Cr+ ARR -> typically Series A
      stageBenchmark = "Series A";
    } else if (arr >= 10000000 || cashOnHand >= 50000000) { // ₹1Cr ARR or ₹5Cr+ cash -> Seed
      stageBenchmark = "Seed";
    }

    return {
      netBurn,
      isProfitable,
      runwayMonths,
      daysToZero,
      zeroCashDate,
      fundraisingDate,
      statusZone,
      healthScore,
      stageBenchmark,
      chartData
    };
  }, [state, scenario]);
}
