import React from 'react';
import { ArrowRight, Activity, Cpu, Leaf, Compass, Shield, BarChart3, Anchor, Navigation, Sparkles } from 'lucide-react';
import { AnimatedNumber } from '../common/AnimatedNumber';

interface OverviewHeroProps {
  setActiveTab: (tabId: string) => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ setActiveTab }) => {
  return (
    <section id="overview" className="space-y-16 py-6 relative scroll-mt-28">
      
      {/* Background Drifting Ambient Blobs */}
      <div className="ambient-blob-1" />
      <div className="ambient-blob-2" />

      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-stoneBorder p-8 sm:p-12 lg:p-16 shadow-md">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Headlines & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="inline-flex items-center space-x-3 bg-electricTeal-50 border border-electricTeal-100 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-industrial-900 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-freshLime-600 animate-ping" />
              <span className="font-mono tracking-wide uppercase text-electricTeal-800">Fleet Intelligence Platform</span>
              <span className="text-stone-300">|</span>
              <span className="text-industrial-900 font-semibold">Green Maritime Decarbonization</span>
            </div>

            {/* Big Editorial Headline */}
            <h1 className="text-display-hero text-industrial-900 font-display font-medium">
              Smarter fleet decisions. <br />
              <span className="italic text-electricTeal-700 font-normal">Less fuel wasted.</span>
            </h1>

            {/* Concise Supporting Text */}
            <p className="text-lg sm:text-xl text-industrial-900/80 leading-relaxed max-w-2xl font-normal">
              Predict fuel consumption, optimize fleet routing, and evaluate decarbonization strategies using physics-grounded prediction models and quantum-inspired annealing.
            </p>

            {/* CTAs: Real User Workflow Entry Points */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('fleet')}
                className="flex items-center space-x-3 bg-electricTeal-600 hover:bg-electricTeal-700 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-lg shadow-electricTeal-600/20 hover:shadow-xl transition-all active:scale-95 group"
              >
                <span>Select Fleet Asset & Route</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('optimizer')}
                className="flex items-center space-x-3 bg-industrial-900 hover:bg-industrial-800 text-creamBg px-7 py-4 rounded-2xl font-bold text-base shadow-md transition-all active:scale-95"
              >
                <span>Optimization Engine</span>
              </button>
            </div>

            {/* Animated Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stoneBorder">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-freshLime-700 font-sans">
                  -<AnimatedNumber value={9.2} formatter={(v) => v.toFixed(1)} />%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-stone-600">Average Fuel Saved</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-electricTeal-800 font-sans">
                  -<AnimatedNumber value={8.4} formatter={(v) => v.toFixed(1)} />%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-stone-600">CO₂ Reduction</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cobaltBlue-600 font-sans">
                  &lt;<AnimatedNumber value={380} />ms
                </div>
                <div className="text-xs sm:text-sm font-semibold text-stone-600">QUBO Solver Runtime</div>
              </div>
            </div>

          </div>

          {/* Right Column: Shipping Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-stoneBorder shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80"
                alt="Container Ship Maritime Fleet"
                className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/90 via-industrial-900/30 to-transparent" />
              
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 flex items-center space-x-2 text-xs font-mono font-bold text-industrial-900 animate-float-slow">
                <Sparkles className="w-4 h-4 text-sunnyYellow-500 fill-current" />
                <span>ECO SPEED: 13.2 KN</span>
              </div>

              <div className="absolute top-20 left-6 bg-industrial-900/90 text-creamBg backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border border-industrial-700">
                <span className="w-2 h-2 rounded-full bg-freshLime-500 animate-pulse" />
                <span>JNPT MUMBAI → DUBAI CORRIDOR</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-industrial-900">
                  <span className="flex items-center space-x-2">
                    <Anchor className="w-4 h-4 text-electricTeal-700" />
                    <span>VESSEL-01 • LNG TANKER</span>
                  </span>
                  <span className="text-freshLime-700 font-extrabold">✓ OPTIMIZED PLAN</span>
                </div>
                <div className="text-sm font-bold text-industrial-900">
                  Est. Fuel Burn: 11,250 Liters
                </div>
                <div className="flex justify-between items-center text-xs text-stone-600 pt-2 border-t border-stone-200">
                  <span>Schedule ETA: 90.9 Hours</span>
                  <span className="font-extrabold text-freshLime-800">Carbon Abated: -2.70 t CO₂</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Core Capabilities */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-electricTeal-700 bg-electricTeal-50 px-3.5 py-1 rounded-full border border-electricTeal-100">
            Platform Workflow Architecture
          </span>
          <h2 className="text-display-section text-industrial-900 font-display font-medium">
            Three steps from raw fleet data to carbon reduction.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Predict */}
          <div 
            onClick={() => setActiveTab('predictor')}
            className="industrial-card industrial-card-hover p-8 cursor-pointer space-y-4 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-electricTeal-50 text-electricTeal-700 flex items-center justify-center group-hover:bg-electricTeal-600 group-hover:text-white transition-colors shadow-sm">
              <Activity className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-bold text-stone-400 uppercase">01 / PREDICT</span>
            <h3 className="text-2xl font-bold text-industrial-900 font-sans group-hover:text-electricTeal-700 transition-colors">
              Fuel Consumption Prediction
            </h3>
            <p className="text-stone-600 text-base leading-relaxed">
              Hydrodynamic resistance modeling (P ∝ V²·⁷⁵) accounting for vessel speed, cargo load, sea weather (Beaufort scale), and engine degradation.
            </p>
            <div className="pt-2 flex items-center text-sm font-extrabold text-electricTeal-700 group-hover:translate-x-2 transition-transform">
              <span>Open Predictor Tool</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

          {/* Card 2: Optimize */}
          <div 
            onClick={() => setActiveTab('optimizer')}
            className="industrial-card industrial-card-hover p-8 cursor-pointer space-y-4 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-freshLime-50 text-freshLime-700 flex items-center justify-center group-hover:bg-freshLime-600 group-hover:text-white transition-colors shadow-sm">
              <Cpu className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-bold text-stone-400 uppercase">02 / OPTIMIZE</span>
            <h3 className="text-2xl font-bold text-industrial-900 font-sans group-hover:text-freshLime-700 transition-colors">
              Fleet & Route Optimization
            </h3>
            <p className="text-stone-600 text-base leading-relaxed">
              Formulates multi-objective QUBO matrices solved via quantum-inspired simulated annealing to balance ETA schedules, fuel budget, and cargo load.
            </p>
            <div className="pt-2 flex items-center text-sm font-extrabold text-freshLime-700 group-hover:translate-x-2 transition-transform">
              <span>Open Optimization Center</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

          {/* Card 3: Reduce */}
          <div 
            onClick={() => setActiveTab('impact')}
            className="industrial-card industrial-card-hover p-8 cursor-pointer space-y-4 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-cobaltBlue-50 text-cobaltBlue-600 flex items-center justify-center group-hover:bg-cobaltBlue-600 group-hover:text-white transition-colors shadow-sm">
              <Leaf className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-bold text-stone-400 uppercase">03 / REDUCE</span>
            <h3 className="text-2xl font-bold text-industrial-900 font-sans group-hover:text-cobaltBlue-600 transition-colors">
              Fuel, Cost & Carbon Reduction
            </h3>
            <p className="text-stone-600 text-base leading-relaxed">
              Transparent, audit-ready reductions in bunkering expenditure and greenhouse gas emissions with Before vs After benchmarking.
            </p>
            <div className="pt-2 flex items-center text-sm font-extrabold text-cobaltBlue-600 group-hover:translate-x-2 transition-transform">
              <span>View Impact Metrics</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
