import React from 'react';
import { Vessel, RouteOption } from '../../config/demoData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Layers, CheckCircle2, TrendingDown } from 'lucide-react';

interface ScenarioComparisonProps {
  selectedVessel: Vessel;
  selectedRoute: RouteOption;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  selectedVessel,
  selectedRoute,
}) => {
  const chartData = [
    { scenario: 'A: Baseline (15.0 kn)', FuelLiters: 12400, CostLakh: 9.85, CO2Tonnes: 32.1 },
    { scenario: 'B: Slow Steam (12.5 kn)', FuelLiters: 11000, CostLakh: 8.50, CO2Tonnes: 28.5 },
    { scenario: 'C: LNG Fuel Switch', FuelLiters: 11800, CostLakh: 9.20, CO2Tonnes: 22.8 },
    { scenario: 'D: AURA QUBO Plan', FuelLiters: 11250, CostLakh: 8.92, CO2Tonnes: 29.4 },
  ];

  return (
    <section id="scenarios" className="space-y-8 py-6 scroll-mt-28">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono font-bold text-auraGreen-700 uppercase tracking-widest bg-auraGreen-50 px-3.5 py-1 rounded-full border border-auraGreen-200">
          Strategic Scenario Modeling
        </span>
        <h2 className="text-display-section text-auraDarkGreen-800 font-display font-medium mt-2">
          Fleet Scenario Comparison Matrix
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Side-by-side evaluation of baseline operations, speed reduction strategies, fuel substitution, and AURA QUBO optimization.
        </p>
      </div>

      {/* Comparison Chart & Cards */}
      <div className="industrial-card p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-auraBorder pb-4">
          <h3 className="text-xl font-bold text-auraDarkGreen-800 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-auraGreen-700" />
            <span>Scenario Performance Trajectory</span>
          </h3>
          <span className="text-xs font-mono font-bold text-stone-500">
            {selectedVessel.name} • {selectedRoute.distanceNM} NM
          </span>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6E0D5" />
              <XAxis dataKey="scenario" stroke="#1D3F1B" tick={{ fill: '#1D3F1B', fontSize: 11, fontWeight: 'bold' }} />
              <YAxis stroke="#1D3F1B" tick={{ fill: '#1D3F1B', fontSize: 12, fontWeight: 'bold' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1D3F1B', color: '#FAF7F2', borderRadius: '12px', border: 'none' }} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="CostLakh" fill="#F08272" radius={[6, 6, 0, 0]} name="Operating Cost (Lakh ₹)" />
              <Bar dataKey="CO2Tonnes" fill="#4E8B37" radius={[6, 6, 0, 0]} name="Carbon Footprint (t CO₂)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 4 Scenario Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-auraBorder">
          
          <div className="p-4 rounded-xl bg-auraCream border border-auraBorder space-y-2">
            <div className="text-xs font-mono font-bold text-stone-500 uppercase">Scenario A — Baseline</div>
            <div className="text-lg font-extrabold text-industrial-900">12,400 L</div>
            <div className="text-xs text-stone-600 font-medium">₹9.85 Lakh • 32.1 t CO₂</div>
          </div>

          <div className="p-4 rounded-xl bg-auraCream border border-auraBorder space-y-2">
            <div className="text-xs font-mono font-bold text-stone-500 uppercase">Scenario B — Slow Steam</div>
            <div className="text-lg font-extrabold text-industrial-900">11,000 L</div>
            <div className="text-xs text-stone-600 font-medium">₹8.50 Lakh • 28.5 t CO₂</div>
          </div>

          <div className="p-4 rounded-xl bg-auraCream border border-auraBorder space-y-2">
            <div className="text-xs font-mono font-bold text-stone-500 uppercase">Scenario C — LNG Switch</div>
            <div className="text-lg font-extrabold text-industrial-900">11,800 L</div>
            <div className="text-xs text-stone-600 font-medium">₹9.20 Lakh • 22.8 t CO₂</div>
          </div>

          <div className="p-4 rounded-xl bg-auraGreen-50 border border-auraGreen-200 space-y-2">
            <div className="text-xs font-mono font-bold text-auraGreen-800 uppercase flex items-center justify-between">
              <span>Scenario D — AURA QUBO</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-auraGreen-700" />
            </div>
            <div className="text-lg font-extrabold text-auraGreen-800">11,250 L</div>
            <div className="text-xs text-auraGreen-800 font-bold">₹8.92 Lakh • 29.4 t CO₂</div>
          </div>

        </div>

      </div>

    </section>
  );
};
