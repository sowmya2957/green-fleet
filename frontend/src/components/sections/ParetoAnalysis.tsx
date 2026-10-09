import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { Zap, ShieldCheck, BarChart2, Info } from 'lucide-react';

interface ParetoAnalysisProps {
  onSelectSolution?: (solutionName: string) => void;
}

export const ParetoAnalysis: React.FC<ParetoAnalysisProps> = () => {
  const paretoData = [
    { name: 'Profile A (Fast Speed 16.5 kn)', costLakh: 11.2, co2Tonnes: 36.5, fuelLiters: 14100, type: 'Sub-Optimal', color: '#E11D48' },
    { name: 'Profile B (Lowest Cost 12.0 kn)', costLakh: 8.4, co2Tonnes: 31.0, fuelLiters: 11000, type: 'Lowest Cost (Schedule Penalty)', color: '#F5B875' },
    { name: 'Profile C (Lowest CO₂ Methanol)', costLakh: 9.6, co2Tonnes: 18.5, fuelLiters: 12200, type: 'Lowest Carbon', color: '#4E8B37' },
    { name: 'Profile D (AURA Balanced QUBO)', costLakh: 8.92, co2Tonnes: 29.4, fuelLiters: 11250, type: 'Pareto Optimum', color: '#0E7490' },
  ];

  return (
    <section id="pareto" className="space-y-8 py-6 scroll-mt-28">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono font-bold text-auraGreen-700 uppercase tracking-widest bg-auraGreen-50 px-3.5 py-1 rounded-full border border-auraGreen-200">
          Multi-Objective Decision Theory
        </span>
        <h2 className="text-display-section text-auraDarkGreen-800 font-display font-medium mt-2">
          Pareto Frontier & Trade-off Analysis
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Visualizing non-dominated candidate solutions balancing operating cost (₹ Lakh), lifecycle carbon emissions (t CO₂), and schedule SLAs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Recharts Scatter Plot (8 Cols) */}
        <div className="lg:col-span-8 industrial-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-auraBorder">
            <h3 className="text-xl font-bold text-auraDarkGreen-800 flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-auraGreen-700" />
              <span>Multi-Objective Trade-off Frontier (Cost vs. CO₂ Emissions)</span>
            </h3>
            <span className="text-xs font-mono text-stone-500 font-bold">Non-Dominated Solutions</span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E0D5" />
                <XAxis
                  type="number"
                  dataKey="costLakh"
                  name="Voyage Cost"
                  unit=" Lakh ₹"
                  domain={[7.5, 12.0]}
                  stroke="#1D3F1B"
                  tick={{ fill: '#1D3F1B', fontSize: 12, fontWeight: 'bold' }}
                />
                <YAxis
                  type="number"
                  dataKey="co2Tonnes"
                  name="CO₂ Emissions"
                  unit=" t"
                  domain={[15, 40]}
                  stroke="#1D3F1B"
                  tick={{ fill: '#1D3F1B', fontSize: 12, fontWeight: 'bold' }}
                />
                <ZAxis type="number" range={[100, 400]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-auraDarkGreen-900 text-creamBg p-4 rounded-xl shadow-xl text-xs space-y-1 font-sans">
                          <div className="font-extrabold text-auraPeach-500">{data.name}</div>
                          <div>Cost: ₹{data.costLakh} Lakh</div>
                          <div>Emissions: {data.co2Tonnes} Tonnes CO₂</div>
                          <div>Fuel Burn: {data.fuelLiters.toLocaleString()} L</div>
                          <div className="text-[10px] font-mono text-auraGreen-50 font-bold uppercase pt-1">{data.type}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Candidate Solutions" data={paretoData}>
                  {paretoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Candidate Trade-off Breakdown (4 Cols) */}
        <div className="lg:col-span-4 industrial-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-auraDarkGreen-800 border-b border-auraBorder pb-3">
            Pareto Frontier Solutions
          </h3>

          <div className="space-y-3">
            {paretoData.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-auraBorder bg-auraCream/60 space-y-1.5 hover:bg-white transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-auraDarkGreen-800">
                  <span className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </span>
                </div>
                <div className="flex justify-between text-xs font-mono text-stone-600">
                  <span>₹{item.costLakh} Lakh</span>
                  <span className="font-extrabold text-auraGreen-700">{item.co2Tonnes} t CO₂</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
