import React from 'react';
import { PROJECT_NAME, PROJECT_SUBTITLE, PROBLEM_STATEMENT_ID } from '../../config/projectConfig';
import { ShieldCheck, Leaf, Cpu, Anchor } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-white text-auraDarkGreen-900 border-t-2 border-auraBorder pt-14 pb-10 mt-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-auraBorder">
          
          {/* Column 1: Clean AURA Logo & Story */}
          <div className="md:col-span-2 space-y-4">
            <div 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center space-x-3.5 cursor-pointer group w-fit"
            >
              {/* Official AURA Logo Emblem Artwork */}
              <div className="flex items-center justify-center p-1 rounded-xl bg-white border border-auraBorder shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                <img 
                  src="/aura-logo-cropped.png" 
                  alt="AURA Official Logo" 
                  className="h-12 w-auto sm:h-14 object-contain" 
                />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-auraDarkGreen-900 font-sans group-hover:text-auraGreen-700 transition-colors block">
                  {PROJECT_NAME}
                </span>
                <span className="text-xs font-bold text-auraDarkGreen-700">
                  Green Fleet Platform
                </span>
              </div>
            </div>

            <p className="text-auraDarkGreen-800 text-sm sm:text-base font-semibold max-w-md leading-relaxed">
              {PROJECT_SUBTITLE}
            </p>

            <div className="flex items-center space-x-2 text-xs font-extrabold text-auraDarkGreen-900 bg-auraGreen-50 px-3.5 py-2 rounded-xl w-fit border border-auraGreen-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-auraGreen-700 flex-shrink-0" />
              <span>{PROBLEM_STATEMENT_ID}</span>
            </div>
          </div>

          {/* Column 2: Platform Capabilities */}
          <div>
            <h4 className="font-extrabold text-base text-auraDarkGreen-900 uppercase tracking-wider mb-4 border-b border-auraGreen-200 pb-2">
              Platform Capabilities
            </h4>
            <ul className="space-y-2.5 text-auraDarkGreen-800 font-bold text-sm">
              <li>
                <button onClick={() => setActiveTab('fleet')} className="hover:text-auraGreen-700 transition-colors text-left">
                  Fleet Inventory Management
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('predictor')} className="hover:text-auraGreen-700 transition-colors text-left">
                  Hydrodynamic Fuel Predictor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('optimizer')} className="hover:text-auraGreen-700 transition-colors text-left">
                  QUBO Optimization Engine
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('benchmark')} className="hover:text-auraGreen-700 transition-colors text-left">
                  Classical vs Quantum Benchmark
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('scenarios')} className="hover:text-auraGreen-700 transition-colors text-left">
                  What-If Scenario Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Technology Architecture */}
          <div>
            <h4 className="font-extrabold text-base text-auraDarkGreen-900 uppercase tracking-wider mb-4 border-b border-auraGreen-200 pb-2">
              Technology Architecture
            </h4>
            <ul className="space-y-3 text-auraDarkGreen-800 font-bold text-sm">
              <li className="flex items-center space-x-2.5">
                <Cpu className="w-4 h-4 text-auraGreen-700 flex-shrink-0" />
                <span>QUBO & Quantum Annealing</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Leaf className="w-4 h-4 text-auraGreen-700 flex-shrink-0" />
                <span>Maritime Decarbonization</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Anchor className="w-4 h-4 text-auraGreen-700 flex-shrink-0" />
                <span>Hydrodynamic resistance physics</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar - High Contrast & Clean Branding */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-auraDarkGreen-800 gap-3">
          <p>© 2026 {PROJECT_NAME} Platform — Adaptive Utilization for Route & Fuel Analytics.</p>
          <div className="flex items-center space-x-2 text-auraDarkGreen-800 bg-auraCream px-3 py-1.5 rounded-lg border border-auraBorder">
            <span className="w-2 h-2 rounded-full bg-auraGreen-600 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Enterprise Operational Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

