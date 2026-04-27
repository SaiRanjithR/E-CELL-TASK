import { motion } from 'framer-motion';
import { PlaneTakeoff, ShieldCheck, AlertTriangle, Activity, ArrowRight } from 'lucide-react';
import { FloatingElements } from './FloatingElements';

export function LandingPage() {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full relative flex flex-col items-center justify-center bg-white pt-24 pb-20 px-4 md:px-8">
      <FloatingElements variant="light" />
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs uppercase tracking-widest border border-indigo-100 mb-4 shadow-sm">
          <PlaneTakeoff size={14} />
          <span>Founder's Runway 2.0</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          The Financial Co-Pilot <br/>
          <span className="text-indigo-600">Every Founder Needs.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mt-6 font-medium">
          Founder's Runway is a real-time cash flow intelligence tool built for early-stage startups.
          Enter your financials once — and instantly see <strong className="text-slate-700">how long your money lasts</strong>,
          when to fundraise, and what levers to pull to survive and grow.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['Runway Calculator', 'Burn Analysis', 'What-If Scenarios', '24-Month Simulator', 'Smart Insights'].map(f => (
            <span key={f} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold rounded-full">
              {f}
            </span>
          ))}
        </div>

        <div className="pt-8">
          <button 
            onClick={scrollToCalculator}
            className="group relative inline-flex items-center gap-2 bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-indigo-500/20"
          >
            Go to Dashboard
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        <StatCard 
          icon={<AlertTriangle size={24} />} 
          color="rose"
          title="29% of startups fail" 
          desc="Due to miscalculated cash flow issues and late fundraising." 
        />
        <StatCard 
          icon={<ShieldCheck size={24} />} 
          color="emerald"
          title="18–24 Months Safety" 
          desc="Our modeling aims for the golden ratio of strategic survival." 
        />
        <StatCard 
          icon={<Activity size={24} />} 
          color="amber"
          title="Fundraise Prep" 
          desc="Start your next round at 12 months minimum to ensure leverage." 
        />
      </motion.div>
    </div>
  );
}

function StatCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: 'rose' | 'emerald' | 'amber' }) {
  const colors = {
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100'
  };

  return (
    <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md hover:border-slate-200 transition-all cursor-default">
      <div className={`p-4 rounded-2xl border ${colors[color]}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
