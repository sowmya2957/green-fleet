import React from 'react';
import { PROJECT_NAME, PROJECT_SUBTITLE } from '../../config/projectConfig';
import { Vessel, RouteOption } from '../../config/demoData';
import { MetricCard } from '../common/MetricCard';
import { Fuel, IndianRupee, Leaf, Activity, ArrowRight, ShieldCheck, Anchor, Compass, Cpu, Sparkles } from 'lucide-react';
import { AnimatedNumber } from '../common/AnimatedNumber';

interface DashboardSnapshotProps {
  selectedVessel: Vessel;
  selectedRoute: RouteOption;
  onNavigate: (sectionId: string) => void;
}

export const DashboardSnapshot: React.FC<DashboardSnapshotProps> = ({
  selectedVessel,
  selectedRoute,
  onNavigate,
}) => {
  return (
    <section id="dashboard" className="space-y-12 py-6 scroll-mt-28 relative">
      
      {/* Opening Viewport Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-auraBorder p-8 sm:p-12 shadow-sm">
        
        {/* Soft Decorative Brand Gradient Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-auraPink-100/50 via-auraPeach-100/40 to-auraGreen-100/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Brand Intro & Concise Value Proposition (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center p-1 rounded-xl bg-white border border-auraBorder shadow-2xs flex-shrink-0">
                <img src="/aura-logo-cropped.png" alt="AURA Logo" className="h-10 w-auto sm:h-12 object-contain" />
              </div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-auraGreen-700 bg-auraGreen-50 px-3 py-1 rounded-full border border-auraGreen-200">
                Decision Support Platform
              </div>
            </div>

            <h1 className="text-display-hero text-auraDarkGreen-800 font-display font-medium">
              Adaptive Green Fleet <br />
              <span className="italic text-auraGreen-700 font-normal">& Route Analytics</span>
            </h1>

            <p className="text-base sm:text-lg text-auraDarkGreen-700 leading-relaxed font-normal max-w-xl">
              An intelligent multi-objective platform for predicting vessel fuel consumption, optimizing speed profiles, and evaluating alternative fuel decarbonization strategies.
            </p>

            {/* Workflow Stepper Prompts */}
            <div className="p-4 rounded-2xl bg-auraCream border border-auraBorder space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-auraGreen-700">
                Primary Decision Workflow
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-extrabold text-industrial-900">
                <div className="p-2 bg-white rounded-xl border border-auraBorder flex items-center space-x-1.5 shadow-xs">
                  <span className="w-4 h-4 rounded-full bg-auraGreen-700 text-white font-mono text-[10px] flex items-center justify-center">1</span>
                  <span>Select Fleet</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-auraBorder flex items-center space-x-1.5 shadow-xs">
                  <span className="w-4 h-4 rounded-full bg-auraGreen-700 text-white font-mono text-[10px] flex items-center justify-center">2</span>
                  <span>Select Voyage</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-auraBorder flex items-center space-x-1.5 shadow-xs">
                  <span className="w-4 h-4 rounded-full bg-auraGreen-700 text-white font-mono text-[10px] flex items-center justify-center">3</span>
                  <span>Predict Fuel</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-auraBorder flex items-center space-x-1.5 shadow-xs">
                  <span className="w-4 h-4 rounded-full bg-auraGreen-700 text-white font-mono text-[10px] flex items-center justify-center">4</span>
                  <span>Optimize Plan</span>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="flex items-center space-x-4 pt-1">
              <button
                onClick={() => onNavigate('fleet')}
                className="flex items-center space-x-3 bg-auraGreen-700 hover:bg-auraGreen-800 text-white px-7 py-3.5 rounded-2xl font-extrabold text-sm shadow-md shadow-auraGreen-700/20 active:scale-95 group transition-all"
              >
                <span>Initiate Fleet Decision Workflow</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Active Context Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="industrial-card p-6 bg-auraDarkGreen-900 text-creamBg space-y-5 border-2 border-auraGreen-600/40 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-auraDarkGreen-700 pb-3">
                <span className="text-xs font-mono font-bold text-auraPeach-500 uppercase tracking-widest flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Active Analysis Context</span>
                </span>
                <span className="text-xs font-mono font-extrabold text-auraGreen-50 bg-auraGreen-700 px-2.5 py-0.5 rounded-md">
                  20 Managed Vessels
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-industrial-800/80 border border-industrial-700">
                  <span className="text-stone-300 font-medium flex items-center space-x-2">
                    <Anchor className="w-4 h-4 text-auraGreen-500" />
                    <span>Selected Asset:</span>
                  </span>
                  <strong className="text-white font-extrabold">{selectedVessel.name}</strong>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-industrial-800/80 border border-industrial-700">
                  <span className="text-stone-300 font-medium flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-auraPeach-500" />
                    <span>Assigned Voyage:</span>
                  </span>
                  <strong className="text-white font-extrabold text-xs">{selectedRoute.name}</strong>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-industrial-800 text-stone-300 border border-industrial-700">
                  <span className="block text-[10px] text-stone-400">Distance</span>
                  <span className="font-extrabold text-white text-sm">{selectedRoute.distanceNM} NM</span>
                </div>
                <div className="p-2.5 rounded-lg bg-industrial-800 text-stone-300 border border-industrial-700">
                  <span className="block text-[10px] text-stone-400">Sea State</span>
                  <span className="font-extrabold text-auraGreen-500 text-sm">Beaufort {selectedRoute.seaConditionBeaufort}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Executive Fleet Snapshot Metrics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-auraDarkGreen-800">Executive Fleet Performance Snapshot</h3>
          <span className="text-xs font-mono font-bold text-auraGreen-700 bg-auraGreen-50 px-3 py-1 rounded-full border border-auraGreen-200">
            Real-time Aggregates
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Fleet Fuel Burn Rate"
            value={11250}
            unit="Liters / Voyage"
            subtext="Baseline: 12,400 L"
            icon={Fuel}
            variant="teal"
            isNumeric={true}
            trend={{ value: '-9.27% Saved', isPositive: true }}
          />

          <MetricCard
            label="Total Voyage Cost"
            value="₹8.92"
            unit="Lakh"
            subtext="Baseline: ₹9.85 Lakh"
            icon={IndianRupee}
            variant="default"
            trend={{ value: '₹93k Saved', isPositive: true }}
          />

          <MetricCard
            label="Carbon Emissions"
            value={29.4}
            unit="Tonnes CO₂"
            subtext="Baseline: 32.1 t"
            icon={Leaf}
            variant="lime"
            isNumeric={true}
            formatter={(v) => v.toFixed(1)}
            trend={{ value: '-2.70 t Offset', isPositive: true }}
          />

          <MetricCard
            label="Fleet Utilization"
            value="85"
            unit="%"
            subtext="16 Active / 4 Standby"
            icon={ShieldCheck}
            variant="dark"
          />
        </div>
      </div>

    </section>
  );
};
