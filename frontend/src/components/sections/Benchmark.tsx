import React from 'react';
import { BENCHMARK_METRICS } from '../../config/demoData';
import { Cpu, CheckCircle2, AlertCircle, Zap, Shield, ArrowUpRight, BarChart3, HelpCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export const Benchmark: React.FC = () => {
  const chartData = [
    { metric: 'Fuel (100s L)', Classical: 124, QuantumInspired: 112.5 },
    { metric: 'CO₂ (Tonnes)', Classical: 32.1, QuantumInspired: 29.4 },
    { metric: 'Cost (Lakh ₹)', Classical: 9.85, QuantumInspired: 8.92 },
    { metric: 'Runtime (sec)', Classical: 4.25, QuantumInspired: 0.38 },
  ];

  return (
    <section id="benchmark" className="space-y-10 py-6 scroll-mt-28">
      
      {/* Title & Introduction */}
      <div>
        <span className="text-xs font-mono font-bold text-electricTeal-700 uppercase tracking-widest bg-electricTeal-50 px-3.5 py-1 rounded-full border border-electricTeal-100">
          Algorithmic Benchmarking
        </span>
        <h2 className="text-display-section text-industrial-900 font-display font-medium mt-2">
          Classical vs. Quantum-Inspired Optimization
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Comparative performance evaluation between Classical Mixed-Integer Linear Programming (MILP) heuristics and Quantum-Inspired Simulated Annealing / QUBO solvers.
        </p>
      </div>

      {/* Benchmark Methodology Notice */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-sunnyYellow-500/40 text-industrial-900 flex items-start space-x-4">
        <AlertCircle className="w-6 h-6 text-sunnyYellow-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-sm">
          <span className="font-bold text-industrial-900 block">
            Algorithmic Benchmark Evaluation Criteria
          </span>
          <p className="text-stone-700 leading-relaxed">
            "The two approaches are evaluated under identical objectives, operational constraints, and input fleet telemetry data."
          </p>
          <p className="text-xs text-stone-500 font-mono pt-1">
            Note: Benchmark values represent simulated experimental trials. The application architecture is designed so physical QUBO/D-Wave API response payloads can directly hydrate this interface.
          </p>
        </div>
      </div>

      {/* Side-by-Side Visual Comparison Charts */}
      <div className="industrial-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-industrial-900 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-electricTeal-700" />
              <span>Comparative Performance Metrics</span>
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Lower is better for Fuel, CO₂, Cost, and Runtime.
            </p>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6E1D7" />
              <XAxis dataKey="metric" stroke="#121E1E" tick={{ fill: '#121E1E', fontSize: 13, fontWeight: 'bold' }} />
              <YAxis stroke="#121E1E" tick={{ fill: '#121E1E', fontSize: 12, fontWeight: 'bold' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#121E1E', color: '#FAF8F5', borderRadius: '12px', border: 'none' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="Classical" fill="#64748B" radius={[6, 6, 0, 0]} name="Classical MILP Heuristic" />
              <Bar dataKey="QuantumInspired" fill="#0E7490" radius={[6, 6, 0, 0]} name="Quantum-Inspired QUBO" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Benchmark Metrics Table */}
      <div className="industrial-card overflow-hidden">
        <div className="p-6 border-b border-stoneBorder bg-creamBg/40">
          <h3 className="text-xl font-bold text-industrial-900">
            Formal Benchmark Evaluation Table
          </h3>
          <p className="text-xs text-stone-600">Side-by-side performance indicators across identical test scenarios.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-creamBg border-b border-stoneBorder text-xs font-mono font-bold text-industrial-900 uppercase">
                <th className="py-4 px-6">Evaluation Metric</th>
                <th className="py-4 px-6">Classical MILP</th>
                <th className="py-4 px-6 text-electricTeal-800">Quantum-Inspired QUBO</th>
                <th className="py-4 px-6">Net Delta</th>
                <th className="py-4 px-6">Unit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stoneBorder text-sm font-semibold">
              {BENCHMARK_METRICS.map((row, idx) => (
                <tr key={idx} className="hover:bg-creamBg/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-industrial-900 flex items-center space-x-2">
                    <span>{row.metric}</span>
                  </td>
                  <td className="py-4 px-6 text-stone-700 font-mono">
                    {row.classical}
                  </td>
                  <td className="py-4 px-6 font-mono font-extrabold text-electricTeal-800">
                    {row.quantumInspired}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      row.higherIsBetter
                        ? 'bg-freshLime-100 text-freshLime-800'
                        : 'bg-electricTeal-100 text-electricTeal-800'
                    }`}>
                      {row.improvement}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-stone-500 text-xs font-mono">
                    {row.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
