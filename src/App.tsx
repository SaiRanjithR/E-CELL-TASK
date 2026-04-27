import { LandingPage } from './components/LandingPage';
import { CalculatorApp } from './components/CalculatorApp';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-500/30">
      <LandingPage />
      <div id="calculator" className="bg-slate-50 border-t border-slate-100 py-20 pb-32">
        <CalculatorApp />
      </div>
    </div>
  );
}

export default App;
