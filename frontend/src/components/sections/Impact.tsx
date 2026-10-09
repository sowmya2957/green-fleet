import React from 'react';
import { MetricCard } from '../common/MetricCard';
import { Leaf, Fuel, IndianRupee, TrendingUp, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { AnimatedNumber } from '../common/AnimatedNumber';

export const Impact: React.FC = () => {
  return (
    <section id="impact" className="space-y-12 py-6 scroll-mt-28">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono font-bold text-freshLime-700 uppercase tracking-widest bg-freshLime-50 px-3.5 py-1 rounded-full border border-freshLime-100">
          Environmental Decarbonization
        </span>
        <h2 className="text-display-section text-industrial-900 font-display font-medium mt-2">
          Fleet Sustainability & Carbon Impact
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Quantifiable carbon reduction and bunkering expenditure savings verified through classical vs quantum-inspired operational benchmarking.
        </p>
      </div>

      {/* Top Impact Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Total Fuel Saved"
          value="1,150"
          unit="Liters"
          subtext="9.27% reduction per Voyage"
          icon={Fuel}
          variant="teal"
          trend={{ value: '-9.27%', isPositive: true }}
        />

        <MetricCard
          label="Net CO₂ Abated"
          value="2.70"
          unit="Tonnes"
          subtext="Direct GHG offset per Voyage"
          icon={Leaf}
          variant="lime"
          trend={{ value: '-8.41%', isPositive: true }}
        />

        <MetricCard
          label="Operational Cost Saved"
          value="₹93,000"
          unit="Savings"
          subtext="₹1.40 Lakh saved per Month"
          icon={IndianRupee}
          variant="default"
          trend={{ value: '₹93k Saved', isPositive: true }}
        />

        <MetricCard
          label="Optimization Score"
          value="98.6"
          unit="/ 100"
          subtext="QUBO Global Solution Index"
          icon={ShieldCheck}
          variant="dark"
        />
      </div>

      {/* BEFORE vs AFTER Detailed Comparison Card */}
      <div className="industrial-card p-8 sm:p-12 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stoneBorder pb-6">
          <div>
            <h3 className="text-2xl font-bold text-industrial-900">
              Operational Baseline: BEFORE vs. AFTER Optimization
            </h3>
            <p className="text-stone-600 text-sm">
              Comparative voyage audit for JNPT Mumbai → Jebel Ali Dubai (1,200 NM Corridor).
            </p>
          </div>

          <span className="px-3.5 py-1 bg-freshLime-100 text-freshLime-800 text-xs font-mono font-bold rounded-lg border border-freshLime-200 w-fit">
            Verified Operational Audit Data
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* BEFORE Card (Classical Un-optimized) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-creamBg/80 border border-stoneBorder space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stoneBorder">
              <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-widest">
                BEFORE (UN-OPTIMIZED CLASSICAL)
              </span>
              <span className="text-xs font-bold text-coralCrimson-700 bg-coralCrimson-50 px-2.5 py-1 rounded">
                High Speed 15.0 kn
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-stone-600 text-sm font-medium">Fuel Consumption:</span>
                <span className="text-2xl font-extrabold text-industrial-900 font-mono">12,400 L</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-stone-600 text-sm font-medium">CO₂ Emissions:</span>
                <span className="text-2xl font-extrabold text-industrial-900 font-mono">32.1 Tonnes</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-stone-600 text-sm font-medium">Voyage Expenditure:</span>
                <span className="text-2xl font-extrabold text-industrial-900 font-mono">₹9.85 Lakh</span>
              </div>
            </div>
          </div>

          {/* Center Arrow Indicator */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-freshLime-700 space-y-2">
            <div className="w-12 h-12 rounded-full bg-freshLime-100 flex items-center justify-center shadow-sm">
              <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
            </div>
            <span className="text-xs font-bold font-mono text-freshLime-800 uppercase">
              QUBO Optim
            </span>
          </div>

          {/* AFTER Card (Quantum-Inspired Green Fleet) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-freshLime-50/80 border border-freshLime-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-freshLime-200">
              <span className="text-xs font-mono font-bold text-freshLime-800 uppercase tracking-widest">
                AFTER (QUANTUM-INSPIRED GREEN PLAN)
              </span>
              <span className="text-xs font-bold text-freshLime-800 bg-white px-2.5 py-1 rounded shadow-sm">
                Optimal Speed 13.2 kn
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-industrial-900/80 text-sm font-medium">Fuel Consumption:</span>
                <span className="text-2xl font-extrabold text-freshLime-800 font-mono">11,250 L</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-industrial-900/80 text-sm font-medium">CO₂ Emissions:</span>
                <span className="text-2xl font-extrabold text-freshLime-800 font-mono">29.4 Tonnes</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-industrial-900/80 text-sm font-medium">Voyage Expenditure:</span>
                <span className="text-2xl font-extrabold text-freshLime-800 font-mono">₹8.92 Lakh</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
