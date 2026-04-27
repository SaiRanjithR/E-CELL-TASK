import { useState } from 'react';
import { Search, Bell, Plane, Menu, X } from 'lucide-react';
import type { RunwayZone } from '../hooks/useRunwayCalculations';

interface NavbarProps {
  zone?: RunwayZone;
  isProfitable?: boolean;
}

const zoneConfig = {
  Critical: { label: '🔴 Critical', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', pulse: true },
  Warning:  { label: '🟡 Warning',  bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', pulse: false },
  Healthy:  { label: '🟢 Healthy',  bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', pulse: false },
  Strong:   { label: '🔵 Strong',   bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', pulse: false },
};

export function Navbar({ zone, isProfitable }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const config = isProfitable
    ? { label: '✅ Profitable', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', pulse: false }
    : zone ? zoneConfig[zone] : null;

  const navLinks = ['Dashboard', 'Scenarios', 'Insights', 'Reports', 'Settings'];

  return (
    <>
      <nav className="h-16 w-full bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Plane size={16} className="rotate-45" />
          </div>
          <span className="font-bold text-base md:text-lg tracking-tight text-slate-900">Founder's Runway</span>
        </div>

        {/* Center Nav — desktop only */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <button
              key={link}
              className={`font-medium text-sm pb-[21px] mt-[23px] transition-colors ${
                i === 0
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Zone badge — hidden on xs, visible sm+ */}
          {config && (
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${config.bg} ${config.text} ${config.border} transition-all duration-500`}>
              {config.pulse && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              )}
              {config.label}
            </div>
          )}

          {/* Search — desktop only */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-44 focus-within:bg-white focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search runway..."
              className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button className="text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
            <Bell size={18} />
          </button>

          <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex flex-col gap-1 z-40 shadow-md">
          {/* Zone badge on mobile */}
          {config && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-bold mb-2 ${config.bg} ${config.text} ${config.border}`}>
              {config.pulse && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              )}
              {config.label}
            </div>
          )}
          {navLinks.map((link, i) => (
            <button
              key={link}
              className={`text-left px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                i === 0 ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
