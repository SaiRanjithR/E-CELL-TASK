import { motion } from 'framer-motion';

// ─── Tiny SVG Icons ────────────────────────────────────────────────────────

function CurrencyBubble({ symbol, color }: { symbol: string; color: string }) {
  return (
    <svg width="38" height="38" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="20" fill={color} fillOpacity="0.1" stroke={color} strokeOpacity="0.2" strokeWidth="1.5" />
      <text x="22" y="28" textAnchor="middle" fontSize="17" fontWeight="800" fill={color} fillOpacity="0.5">{symbol}</text>
    </svg>
  );
}

function RocketIcon({ color = '#6366f1' }: { color?: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity={0.4}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}

function ClockIcon({ color = '#f59e0b' }: { color?: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity={0.4}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarIcon({ color = '#10b981' }: { color?: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity={0.38}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function BarChartIcon({ color = '#4f46e5' }: { color?: string }) {
  return (
    <svg width="36" height="30" viewBox="0 0 38 32" fill="none" opacity={0.35}>
      <rect x="1" y="18" width="8" height="12" rx="1.5" fill={color} />
      <rect x="13" y="8" width="8" height="22" rx="1.5" fill={color} />
      <rect x="25" y="2" width="8" height="28" rx="1.5" fill={color} />
    </svg>
  );
}

function TrendLine({ up = true }: { up?: boolean }) {
  const c = up ? '#10b981' : '#f43f5e';
  return (
    <svg width="50" height="26" viewBox="0 0 52 28" fill="none" opacity={0.38}>
      <polyline
        points={up ? "0,26 13,18 26,10 39,4 52,1" : "0,2 13,8 26,16 39,22 52,26"}
        stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx={up ? 52 : 0} cy={up ? 1 : 2} r="3" fill={c} />
    </svg>
  );
}

function HourglassIcon({ color = '#a78bfa' }: { color?: string }) {
  return (
    <svg width="26" height="34" viewBox="0 0 28 38" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.4}>
      <path d="M4 2h20M4 36h20" />
      <path d="M5 2c0 9 9 14 9 16S5 34 5 36" />
      <path d="M23 2c0 9-9 14-9 16s9 8 9 16" />
    </svg>
  );
}

function LightbulbIcon({ color = '#f59e0b' }: { color?: string }) {
  return (
    <svg width="26" height="32" viewBox="0 0 24 28" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity={0.4}>
      <path d="M9 21h6m-6 3h6M12 3a7 7 0 0 1 4 12.73V18H8v-2.27A7 7 0 0 1 12 3z" />
    </svg>
  );
}

function TargetIcon({ color = '#6366f1' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity={0.4}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.3" />
    </svg>
  );
}

/**
 * LandingPage content is max-w-4xl (~896px) centered.
 * On a 1440px screen: left gutter = 0–19%, right gutter = 81–100%.
 * On a 1280px screen: left gutter = 0–15%, right gutter = 85–100%.
 *
 * We spread icons throughout the FULL gutter width, not just the far edge.
 */

interface Item {
  id: number;
  el: React.ReactNode;
  x: string;
  y: string;
  duration: number;
  delay: number;
  rotate?: number;
}

const items: Item[] = [
  // ── LEFT GUTTER (x: 2%–16%): spread wide across the blank area ──
  { id: 1,  el: <CurrencyBubble symbol="₹" color="#6366f1" />, x: '2%',   y: '5%',  duration: 7,   delay: 0 },
  { id: 2,  el: <RocketIcon color="#6366f1" />,                x: '11%',  y: '12%', duration: 6,   delay: 0.5,  rotate: 25 },
  { id: 3,  el: <LightbulbIcon color="#f59e0b" />,             x: '5%',   y: '24%', duration: 8,   delay: 1.2 },
  { id: 4,  el: <TrendLine up />,                              x: '13%',  y: '33%', duration: 7.5, delay: 0.7 },
  { id: 5,  el: <ClockIcon color="#f59e0b" />,                 x: '3%',   y: '44%', duration: 8.5, delay: 1.8 },
  { id: 6,  el: <BarChartIcon color="#4f46e5" />,              x: '10%',  y: '55%', duration: 9,   delay: 0.3 },
  { id: 7,  el: <HourglassIcon color="#a78bfa" />,             x: '4%',   y: '66%', duration: 10,  delay: 2.0 },
  { id: 8,  el: <CurrencyBubble symbol="€" color="#10b981" />, x: '13%',  y: '77%', duration: 7,   delay: 1.0 },
  { id: 9,  el: <TargetIcon color="#6366f1" />,                x: '6%',   y: '87%', duration: 8,   delay: 1.5 },

  // ── RIGHT GUTTER (x: 82%–97%): spread wide across the blank area ──
  { id: 10, el: <CurrencyBubble symbol="$" color="#10b981" />, x: '94%',  y: '5%',  duration: 8,   delay: 1.5 },
  { id: 11, el: <CalendarIcon color="#10b981" />,              x: '84%',  y: '14%', duration: 7.5, delay: 2.2 },
  { id: 12, el: <HourglassIcon color="#6366f1" />,             x: '95%',  y: '24%', duration: 10,  delay: 0.2 },
  { id: 13, el: <BarChartIcon color="#10b981" />,              x: '83%',  y: '35%', duration: 9,   delay: 0.9 },
  { id: 14, el: <RocketIcon color="#10b981" />,                x: '94%',  y: '45%', duration: 6.5, delay: 0.8,  rotate: -20 },
  { id: 15, el: <TrendLine up={false} />,                      x: '82%',  y: '56%', duration: 7,   delay: 1.3 },
  { id: 16, el: <TargetIcon color="#6366f1" />,                x: '93%',  y: '67%', duration: 8,   delay: 2.5 },
  { id: 17, el: <LightbulbIcon color="#f59e0b" />,             x: '84%',  y: '78%', duration: 7,   delay: 0.6 },
  { id: 18, el: <ClockIcon color="#a78bfa" />,                 x: '94%',  y: '88%', duration: 8.5, delay: 1.9 },
];

interface FloatingElementsProps {
  variant?: 'light' | 'subtle';
}

export function FloatingElements({ variant = 'light' }: FloatingElementsProps) {
  const opacityScale = variant === 'subtle' ? 0.35 : 0.75;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: item.x, top: item.y, opacity: opacityScale }}
          animate={{
            y: [0, -12, 0, 8, 0],
            rotate: item.rotate
              ? [item.rotate, item.rotate + 5, item.rotate - 3, item.rotate]
              : [0, 2, -2, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.el}
        </motion.div>
      ))}
    </div>
  );
}
