import { useState } from 'react';
import { Copy, Download, Share2, Check } from 'lucide-react';
import type { RunwayZone } from '../hooks/useRunwayCalculations';

interface ShareableSnapshotProps {
  calc: {
    runwayMonths: number;
    statusZone: RunwayZone;
    isProfitable: boolean;
    netBurn: number;
    zeroCashDate: Date | null;
  };
}

export function ShareableSnapshot({ calc }: ShareableSnapshotProps) {
  const [copied, setCopied] = useState(false);

  const safeFormatRunway = (val: number) => {
    if (val === Infinity || val === -Infinity) return 'Infinity';
    if (isNaN(val)) return '0.0';
    return val.toFixed(1);
  };

  const handleCopy = () => {
    const text = `Startup Runway Report 🚀\nRunway: ${calc.isProfitable ? 'Infinity' : safeFormatRunway(calc.runwayMonths) + ' months'}\nBurn: ₹${calc.netBurn.toLocaleString('en-IN')}/mo\nZero Date: ${calc.zeroCashDate ? calc.zeroCashDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Never'}\nStatus: ${calc.statusZone}\n\nBuilt with Founder's Runway.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    alert("Pro Feature: To download image, simply screenshot this beautiful card!");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center">

      {/* The Card */}
      <div id="snapshot-card" className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-200 relative overflow-hidden mb-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />

        <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">
          Startup Snapshot
        </h4>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 text-sm font-medium">Runway</span>
            <span className="text-slate-900 font-bold text-lg">{calc.isProfitable ? 'Infinity' : safeFormatRunway(calc.runwayMonths) + ' mo'}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 text-sm font-medium">Net Burn</span>
            <span className="text-slate-900 font-bold text-lg">₹{calc.netBurn.toLocaleString('en-IN')}/mo</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 text-sm font-medium">Zero Date</span>
            <span className="text-slate-900 font-bold text-lg">{calc.isProfitable ? 'N/A' : calc.zeroCashDate?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-slate-500 text-sm font-medium">Status</span>
            <span className={`text-xs px-2.5 py-1 rounded font-bold border ${calc.statusZone === 'Critical' ? 'text-rose-600 border-rose-200 bg-rose-50' : calc.statusZone === 'Warning' ? 'text-amber-600 border-amber-200 bg-amber-50' : 'text-emerald-600 border-emerald-200 bg-emerald-50'}`}>
              {calc.statusZone}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3 w-full">
        <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          <Download size={16} />
          Save
        </button>
        <button onClick={handleCopy} className="w-12 h-[41px] flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors shrink-0 border border-indigo-100">
          <Share2 size={16} />
        </button>
      </div>

    </div>
  );
}
