import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Table } from 'lucide-react';
import type { ChartDataPoint } from '../hooks/useRunwayCalculations';

interface SimulationTableProps {
  data: ChartDataPoint[];
}

export function SimulationTable({ data }: SimulationTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisibleRows(0), 0);
      const interval = setInterval(() => {
        setVisibleRows(prev => {
          if (prev < Math.min(data.length, 24)) return prev + 1; // max 24 months for visual sanity
          clearInterval(interval);
          return prev;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isOpen, data.length]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Table size={20} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Full Simulator Mode</h3>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl transition-all"
        >
          {isOpen ? 'Hide Simulation' : 'Run 24-Month Simulation'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 h-[400px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 sticky top-0 backdrop-blur-sm z-10 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Month</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Cash Remaining</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Revenue</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Expenses</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px] text-right">Net Burn</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, visibleRows).map((row) => (
                <motion.tr 
                  key={row.month}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`border-b border-slate-100 ${row.cash <= 0 ? 'bg-rose-50/50 text-rose-600' : 'hover:bg-slate-50'}`}
                >
                  <td className="px-4 py-3 font-medium">{row.dateStr}</td>
                  <td className={`px-4 py-3 font-bold ${row.cash <= 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                    ₹{row.cash.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3">₹{row.revenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                  <td className="px-4 py-3">₹{row.expenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                  <td className="px-4 py-3 text-right text-rose-600 font-medium">₹{row.netBurn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
