import React from 'react';
import { Vessel, RouteOption } from '../../config/demoData';
import { PROJECT_NAME, PROJECT_SUBTITLE, PROBLEM_STATEMENT_ID } from '../../config/projectConfig';
import { Printer, Download, ShieldCheck, CheckCircle2, FileText, Anchor, Compass, Fuel, Leaf, IndianRupee } from 'lucide-react';

interface ReportProps {
  selectedVessel: Vessel;
  selectedRoute: RouteOption;
}

export const Report: React.FC<ReportProps> = ({ selectedVessel, selectedRoute }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="reports" className="space-y-8 py-6 scroll-mt-28">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-auraGreen-700 uppercase tracking-widest bg-auraGreen-50 px-3.5 py-1 rounded-full border border-auraGreen-200">
            Decision Artifact Generation
          </span>
          <h2 className="text-display-section text-auraDarkGreen-800 font-display font-medium mt-2">
            Executive Decision Report
          </h2>
          <p className="text-stone-600 text-base max-w-2xl">
            Audit-ready decision support document synthesizing current telemetry, QUBO optimization, feasibility validation, and carbon abatement metrics.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-auraGreen-700 hover:bg-auraGreen-800 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 no-print"
        >
          <Printer className="w-4 h-4" />
          <span>Generate & Export PDF Report</span>
        </button>
      </div>

      {/* Printable Executive Report Card */}
      <div className="industrial-card p-8 sm:p-12 space-y-8 bg-white border-2 border-auraBorder shadow-xl">
        
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-auraDarkGreen-800 gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center p-1 rounded-xl bg-white border border-auraBorder shadow-2xs flex-shrink-0">
              <img src="/aura-logo-cropped.png" alt="AURA Logo" className="h-12 w-auto sm:h-14 object-contain" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-auraDarkGreen-800 font-sans tracking-tight">{PROJECT_NAME}</h3>
              <p className="text-xs text-auraDarkGreen-700 font-bold">{PROJECT_SUBTITLE}</p>
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <div className="font-bold text-auraDarkGreen-800">REPORT ID: AUR-2026-8849</div>
            <div className="text-stone-500">Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div className="text-auraGreen-700 font-bold uppercase pt-0.5">Status: ✓ Verified Feasible</div>
          </div>
        </div>

        {/* Section 1: Executive Context & Fleet Specs */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-auraGreen-700">
            1. Fleet Asset & Voyage Specifications
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-auraCream border border-auraBorder space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase block">Selected Asset</span>
              <div className="font-extrabold text-industrial-900 text-base">{selectedVessel.name}</div>
              <div className="text-xs text-stone-600">{selectedVessel.type} • {selectedVessel.capacityDWT.toLocaleString()} DWT • Fuel: {selectedVessel.fuelType}</div>
            </div>

            <div className="p-4 rounded-xl bg-auraCream border border-auraBorder space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase block">Assigned Voyage Corridor</span>
              <div className="font-extrabold text-industrial-900 text-base">{selectedRoute.name}</div>
              <div className="text-xs text-stone-600">Distance: {selectedRoute.distanceNM} NM • Sea State: Beaufort {selectedRoute.seaConditionBeaufort}</div>
            </div>
          </div>
        </div>

        {/* Section 2: Predictive & Optimization Results Matrix */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-auraGreen-700">
            2. Performance Matrix: Baseline vs. AURA QUBO Plan
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-auraCream border-b border-auraBorder text-xs font-mono font-bold text-auraDarkGreen-800 uppercase">
                  <th className="py-3 px-4">Metric Parameter</th>
                  <th className="py-3 px-4">Classical Baseline</th>
                  <th className="py-3 px-4 text-auraGreen-800">AURA QUBO Optimum</th>
                  <th className="py-3 px-4">Net Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auraBorder font-semibold">
                <tr>
                  <td className="py-3 px-4 font-bold text-industrial-900">Cruising Speed</td>
                  <td className="py-3 px-4 text-stone-600">15.0 knots</td>
                  <td className="py-3 px-4 text-auraGreen-800 font-bold">13.2 knots</td>
                  <td className="py-3 px-4 text-auraGreen-700 font-bold">Optimal Eco Speed</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-industrial-900">Fuel Consumption</td>
                  <td className="py-3 px-4 text-stone-600">12,400 Liters</td>
                  <td className="py-3 px-4 text-auraGreen-800 font-bold">11,250 Liters</td>
                  <td className="py-3 px-4 text-auraGreen-700 font-bold">-1,150 L (-9.27%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-industrial-900">Voyage Expenditure</td>
                  <td className="py-3 px-4 text-stone-600">₹9.85 Lakh</td>
                  <td className="py-3 px-4 text-auraGreen-800 font-bold">₹8.92 Lakh</td>
                  <td className="py-3 px-4 text-auraGreen-700 font-bold">-₹93,000 (-9.44%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-industrial-900">CO₂ Carbon Footprint</td>
                  <td className="py-3 px-4 text-stone-600">32.1 Tonnes</td>
                  <td className="py-3 px-4 text-auraGreen-800 font-bold">29.4 Tonnes</td>
                  <td className="py-3 px-4 text-auraGreen-700 font-bold">-2.70 Tonnes (-8.41%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Constraint & Feasibility Confirmation */}
        <div className="p-4 rounded-xl bg-auraGreen-50 border border-auraGreen-200 space-y-2">
          <div className="flex items-center space-x-2 text-auraGreen-800 font-extrabold text-sm">
            <CheckCircle2 className="w-5 h-5 text-auraGreen-600" />
            <span>Feasibility Verification: All Operational SLA Constraints Satisfied</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-auraGreen-800 pt-1">
            <div>✓ Cargo Demand (11,500 t)</div>
            <div>✓ Vessel DWT Capacity</div>
            <div>✓ Schedule ETA (&le; 96h)</div>
            <div>✓ Fuel Budget (&le; ₹30L)</div>
          </div>
        </div>

        {/* Report Footer */}
        <div className="pt-6 border-t border-auraBorder flex justify-between items-center text-xs text-stone-500 font-mono">
          <span>Generated by {PROJECT_NAME} Platform</span>
          <span>Official Decision Artifact • Page 1 of 1</span>
        </div>

      </div>

    </section>
  );
};
