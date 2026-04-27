import { Search, Bell, Plane } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="h-16 w-full bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo and Nav */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
             <Plane size={16} className="rotate-45" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">Founder's Runway</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button className="text-indigo-600 font-medium text-sm border-b-2 border-indigo-600 pb-[21px] mt-[23px]">Dashboard</button>
          <button className="text-slate-500 hover:text-slate-900 font-medium text-sm pb-[21px] mt-[23px] transition-colors">Scenarios</button>
          <button className="text-slate-500 hover:text-slate-900 font-medium text-sm pb-[21px] mt-[23px] transition-colors">Insights</button>
          <button className="text-slate-500 hover:text-slate-900 font-medium text-sm pb-[21px] mt-[23px] transition-colors">Reports</button>
          <button className="text-slate-500 hover:text-slate-900 font-medium text-sm pb-[21px] mt-[23px] transition-colors">Settings</button>
        </div>
      </div>

      {/* Right: Search and Profile */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-64 focus-within:bg-white focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search runway..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <button className="text-slate-500 hover:text-slate-900 transition-colors">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
}
