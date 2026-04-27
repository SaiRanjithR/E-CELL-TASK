import { useMemo, useState } from 'react';
import type { ChartDataPoint } from '../hooks/useRunwayCalculations';

interface RunwayChartProps {
  data: ChartDataPoint[];
  fundraisingDate: Date | null;
}

export function RunwayChart({ data, fundraisingDate }: RunwayChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const { points, maxCash, fundraiseX, width, height, padding } = useMemo(() => {
    const w = 800;
    const h = 300;
    const p = 40;
    const innerW = w - p * 2;
    const innerH = h - p * 2;
    
    const maxVal = Math.max(...data.map(d => d.cash), 1);
    
    const mapped = data.map((d, i) => {
      const x = p + (i / Math.max(1, data.length - 1)) * innerW;
      const y = h - p - (d.cash / maxVal) * innerH;
      // Fade opacity heavily once cash <= 0 to simulate end of line without breaking SVG
      const opacity = d.cash <= 0 ? 0.2 : 1;
      return { x, y, opacity, ...d };
    });

    let fundX = null;
    if (fundraisingDate) {
      const fundDateStr = fundraisingDate.toLocaleDateString('default', { month: 'short', year: '2-digit' });
      const fData = mapped.find(d => d.dateStr === fundDateStr);
      if (fData) fundX = fData.x;
    }

    return { points: mapped, maxCash: maxVal, fundraiseX: fundX, width: w, height: h, padding: p };
  }, [data, fundraisingDate]);

  const formatY = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
    return `₹${value}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
       <h3 className="text-lg font-semibold text-slate-900 mb-2">Cash Flow Timeline</h3>
       <div className="w-full overflow-x-auto custom-scrollbar pb-2">
         <div className="min-w-[600px] w-full aspect-[8/3]">
           <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full font-sans overflow-visible">
              
              {/* Very faint Y Axis Guides */}
              {[1, 0.5, 0].map(ratio => {
                const y = padding + (1 - ratio) * (height - padding * 2);
                return (
                  <g key={`guide-${ratio}`}>
                    <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                    <text x={padding - 10} y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="11" fontWeight="500">{ratio === 0 ? '₹0' : formatY(maxCash * ratio)}</text>
                  </g>
                );
              })}

              {/* X Axis Labels */}
              {points.filter((_, i) => i % Math.max(1, Math.floor(points.length / 8)) === 0).map((pt, i) => (
                 <text key={`x-${i}`} x={pt.x} y={height - 10} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="500">{pt.dateStr}</text>
              ))}

              {/* Trajectory Area Fill (Subtle gradient) */}
              <defs>
                 <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.1" />
                   <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                 </linearGradient>
              </defs>
              <polygon 
                points={`${points[0].x},${height - padding} ${points.map(p => `${p.x},${p.y}`).join(' ')} ${points[points.length-1].x},${height - padding}`}
                fill="url(#chartGradient)"
              />

              {/* Trajectory Line Segments - Minimal Indigo curve */}
              {points.slice(0, -1).map((pt, i) => {
                 const nextPt = points[i+1];
                 if (pt.opacity < 0.5) return null; // stop drawing solid line when it hits 0
                 return (
                   <line 
                      key={`line-${i}`}
                      x1={pt.x} y1={pt.y}
                      x2={nextPt.x} y2={nextPt.y}
                      stroke="#4f46e5"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity={pt.opacity}
                   />
                 );
              })}

              {/* Fundraising Marker */}
              {fundraiseX !== null && (
                 <g>
                    <line x1={fundraiseX} y1={padding} x2={fundraiseX} y2={height - padding} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
                    <circle cx={fundraiseX} cy={points.find(p => p.x === fundraiseX)?.y || padding} r="4" fill="white" stroke="#f59e0b" strokeWidth="2" />
                    <text x={fundraiseX} y={padding - 15} textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="600">Fundraise By</text>
                 </g>
              )}

              {/* Zero Marker */}
              {(() => {
                 const zeroPoint = points.find(p => p.cash <= 0);
                 if (zeroPoint) {
                   return (
                     <g>
                       <line x1={zeroPoint.x} y1={zeroPoint.y} x2={zeroPoint.x} y2={height - padding} stroke="#e11d48" strokeDasharray="3 3" strokeWidth="1" opacity={0.5} />
                       <circle cx={zeroPoint.x} cy={zeroPoint.y} r="4" fill="white" stroke="#e11d48" strokeWidth="2" />
                       <text x={zeroPoint.x} y={zeroPoint.y - 12} textAnchor="middle" fill="#e11d48" fontSize="11" fontWeight="600">Zero Cash</text>
                     </g>
                   )
                 }
                 return null;
              })()}

              {/* Hover Interaction Areas */}
              {points.map((pt, i) => (
                <g key={`interaction-${i}`} 
                   onMouseEnter={() => setHoverIdx(i)}
                   onMouseLeave={() => setHoverIdx(null)}
                   className="cursor-pointer"
                >
                  <line x1={pt.x} y1={padding} x2={pt.x} y2={height - padding} stroke="transparent" strokeWidth="20" />
                  {hoverIdx === i && (
                    <>
                      <line x1={pt.x} y1={padding} x2={pt.x} y2={height - padding} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" className="shadow-sm" />
                    </>
                  )}
                </g>
              ))}

              {/* Custom Minimal Tooltip */}
              {hoverIdx !== null && points[hoverIdx] && (
                <g transform={`translate(${points[hoverIdx].x}, ${padding - 5})`}>
                   <rect 
                     x={points[hoverIdx].x > width - 100 ? -90 : points[hoverIdx].x < 80 ? 10 : -45} 
                     y="-5" width="90" height="40" 
                     rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1"
                     className="shadow-md"
                   />
                   <text 
                     x={points[hoverIdx].x > width - 100 ? -45 : points[hoverIdx].x < 80 ? 55 : 0} 
                     y="12" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle"
                   >
                     {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(points[hoverIdx].cash)}
                   </text>
                   <text 
                     x={points[hoverIdx].x > width - 100 ? -45 : points[hoverIdx].x < 80 ? 55 : 0} 
                     y="26" fill="#64748b" fontSize="10" fontWeight="500" textAnchor="middle"
                   >
                     {points[hoverIdx].dateStr}
                   </text>
                </g>
              )}

           </svg>
         </div>
       </div>
    </div>
  );
}
