import React from 'react';
import { Cpu, Wifi, Radio, Shield, Anchor, Layers, Zap, ArrowUpRight } from 'lucide-react';

export const FutureScope: React.FC = () => {
  const capabilities = [
    {
      title: 'Satellite AIS & Live Telemetry Streams',
      description: 'Continuous ingest of Automatic Identification System (AIS) vessel position, engine RPM, torque, and draft sensors via IoT protocols.',
      icon: Wifi,
      status: 'Phase 2 Architecture',
    },
    {
      title: 'Digital Twin Hydrodynamic Hull Modeling',
      description: 'Physics-informed machine learning (PINN) simulating hull bio-fouling, wave resistance, and real-time degradation twin.',
      icon: Layers,
      status: 'Phase 2 Architecture',
    },
    {
      title: 'Live NOAA / ECMWF Weather API Synchronization',
      description: 'Dynamic ocean current, wave height, and wind vector feeds triggering dynamic route re-optimization mid-voyage.',
      icon: Radio,
      status: 'Phase 3 Integration',
    },
    {
      title: 'Direct Physical QPU Hardware Connectors',
      description: 'Native REST connectors to D-Wave Advantage QPU quantum annealers and IBM Quantum System One via Qiskit runtime.',
      icon: Cpu,
      status: 'Phase 3 Integration',
    },
    {
      title: 'Zero-Emission Alternative Fuel Transition',
      description: 'Extending QUBO energy matrices for Green Ammonia, Liquid Hydrogen, and Port Shore Power (Cold Ironing) scheduling.',
      icon: Zap,
      status: 'Long-term Roadmap',
    },
  ];

  return (
    <section id="future" className="space-y-10 py-6 scroll-mt-28">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono font-bold text-electricTeal-700 uppercase tracking-widest bg-electricTeal-50 px-3.5 py-1 rounded-full border border-electricTeal-100">
          Technology Roadmap
        </span>
        <h2 className="text-display-section text-industrial-900 font-display font-medium mt-2">
          Future Scope & Technical Extensions
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Architectural blueprint for scaling the prototype into an enterprise-grade maritime fleet intelligence system.
        </p>
      </div>

      {/* Grid of Future Extension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="industrial-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-creamBg border border-stoneBorder flex items-center justify-center text-electricTeal-700">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-industrial-900 font-sans">
                  {item.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stoneBorder flex items-center text-xs font-bold text-electricTeal-700">
                <span>View Integration Specification</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
