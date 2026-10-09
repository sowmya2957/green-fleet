import React from 'react';
import { HISTORICAL_ANALYTICS, DEMO_VESSELS } from '../../config/demoData';
import { BarChart3, TrendingDown, Fuel, PieChart as PieIcon, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

export const Analytics: React.FC = () => {
  // Fuel type distribution data calculation
  const fuelTypeCounts: { [key: string]: number } = {};
  DEMO_VESSELS.forEach(v => {
    fuelTypeCounts[v.fuelType] = (fuelTypeCounts[v.fuelType] || 0) + 1;
  });

  const fuelDistributionData = Object.keys(fuelTypeCounts).map(type => ({
    name: type,
    value: fuelTypeCounts[type],
  }));

  const COLORS = ['#0E7490', '#15803D', '#D97706', '#64748B'];

  return (
    <section id="analytics" className="space-y-10 py-6 scroll-mt-28">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono font-bold text-electricTeal-700 uppercase tracking-widest bg-electricTeal-50 px-3.5 py-1 rounded-full border border-electricTeal-100">
          Executive Telemetry
        </span>
        <h2 className="text-display-section text-industrial-900 font-display font-medium mt-2">
          Fleet Analytics & Historical Trends
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Longitudinal analysis of fuel consumption, carbon emissions trajectory, and alternative fuel adoption across active maritime assets.
        </p>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Monthly Fuel & CO2 Trend (8 Cols) */}
        <div className="lg:col-span-8 industrial-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-industrial-900 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-electricTeal-700" />
                <span>Monthly Fuel Consumption Trajectory (Liters)</span>
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Comparing classical baseline vs quantum-inspired optimized fleet execution.
              </p>
            </div>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HISTORICAL_ANALYTICS} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="classicalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="quantumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0E7490" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#0E7490" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E1D7" />
                <XAxis dataKey="month" stroke="#121E1E" tick={{ fill: '#121E1E', fontSize: 13, fontWeight: 'bold' }} />
                <YAxis stroke="#121E1E" tick={{ fill: '#121E1E', fontSize: 12, fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ backgroundColor: '#121E1E', color: '#FAF8F5', borderRadius: '12px', border: 'none' }} />
                <Area type="monotone" dataKey="classicalFuel" stroke="#64748B" fillOpacity={1} fill="url(#classicalGradient)" name="Classical Baseline" />
                <Area type="monotone" dataKey="quantumFuel" stroke="#0E7490" strokeWidth={3} fillOpacity={1} fill="url(#quantumGradient)" name="Quantum-Inspired Plan" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Fuel Type Mix Distribution (4 Cols) */}
        <div className="lg:col-span-4 industrial-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-industrial-900 flex items-center space-x-2">
              <PieIcon className="w-5 h-5 text-freshLime-600" />
              <span>Fuel Type Mix</span>
            </h3>
            <p className="text-xs text-stone-500 font-medium">Bunker fuel distribution across fleet.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fuelDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {fuelDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#121E1E', color: '#FAF8F5', borderRadius: '12px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-stone-500 font-medium text-center border-t border-stoneBorder pt-3">
            Increasing transition towards LNG & Methanol clean marine propulsion.
          </div>
        </div>

      </div>

    </section>
  );
};
