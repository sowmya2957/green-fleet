import React, { useState } from 'react';
import { Vessel, RouteOption } from '../../config/demoData';
import { EMISSION_FACTORS, DEFAULT_FUEL_PRICES } from '../../config/projectConfig';
import { MetricCard } from '../common/MetricCard';
import { Fuel, IndianRupee, Leaf, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface AltFuelSimulatorProps {
  selectedVessel: Vessel;
  selectedRoute: RouteOption;
}

export const AltFuelSimulator: React.FC<AltFuelSimulatorProps> = ({
  selectedVessel,
  selectedRoute,
}) => {
  const [selectedAltFuel, setSelectedAltFuel] = useState<'MGO' | 'LNG' | 'METHANOL' | 'HYDROGEN' | 'AMMONIA'>('LNG');

  const distance = selectedRoute.distanceNM;
  const baseRate = selectedVessel.baseConsumptionRate;

  // Fuel calculation logic
  const estimatedLiters = Math.round(baseRate * distance * 0.92);
  const price = DEFAULT_FUEL_PRICES[selectedAltFuel] || 85;
  const costLakh = Number(((estimatedLiters * price) / 100000).toFixed(2));
  const emissionFactor = EMISSION_FACTORS[selectedAltFuel] || 1.95;
  const co2Tonnes = Number(((estimatedLiters * emissionFactor) / 1000).toFixed(2));

  const fuelFeasibilityMap = {
    LNG: { status: 'High Feasibility', notes: 'Bunkering available at JNPT & Singapore', color: 'text-auraGreen-700 bg-auraGreen-50' },
    MGO: { status: 'Standard Baseline', notes: 'Conventional high-emission diesel', color: 'text-stone-700 bg-stone-100' },
    METHANOL: { status: 'Growing Adoption', notes: 'Dual-fuel retrofit required', color: 'text-auraGreen-700 bg-auraGreen-50' },
    HYDROGEN: { status: 'Pilot Stage', notes: 'Requires cryo storage & fuel cell stack', color: 'text-energyOrange-700 bg-energyOrange-50' },
    AMMONIA: { status: 'Long-term Future', notes: 'Toxicity safety protocols required', color: 'text-energyOrange-700 bg-energyOrange-50' },
  };

  const currentFeasibility = fuelFeasibilityMap[selectedAltFuel];

  return (
    <section id="altfuel" className="space-y-8 py-6 scroll-mt-28">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono font-bold text-auraGreen-700 uppercase tracking-widest bg-auraGreen-50 px-3.5 py-1 rounded-full border border-auraGreen-200">
          Decarbonization Engine
        </span>
        <h2 className="text-display-section text-auraDarkGreen-800 font-display font-medium mt-2">
          Alternative Fuel & Energy Simulator
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Evaluate fuel substitution pathways (LNG, Methanol, Green Hydrogen, Ammonia) against your selected vessel asset ({selectedVessel.name}) and assigned voyage.
        </p>
      </div>

      {/* Fuel Switcher Grid */}
      <div className="industrial-card p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-auraBorder pb-4">
          <h3 className="text-lg font-bold text-auraDarkGreen-800">
            Select Marine Propulsion Fuel Pathway
          </h3>
          <span className="text-xs font-mono font-bold text-stone-500">
            Route: {selectedRoute.origin} ➔ {selectedRoute.destination}
          </span>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(['MGO', 'LNG', 'METHANOL', 'HYDROGEN', 'AMMONIA'] as const).map((fuelKey) => {
            const isActive = selectedAltFuel === fuelKey;
            return (
              <button
                key={fuelKey}
                onClick={() => setSelectedAltFuel(fuelKey)}
                className={`p-4 rounded-2xl border font-bold text-sm transition-all text-center ${
                  isActive
                    ? 'bg-auraGreen-700 text-white border-auraGreen-700 shadow-md scale-[1.02]'
                    : 'bg-auraCream/60 border-auraBorder text-auraDarkGreen-800 hover:bg-white'
                }`}
              >
                <div className="text-base font-extrabold">{fuelKey}</div>
                <div className="text-[11px] font-mono opacity-80 mt-0.5">
                  ₹{DEFAULT_FUEL_PRICES[fuelKey]}/L
                </div>
              </button>
            );
          })}
        </div>

        {/* Simulated Metric Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <MetricCard
            label="Fuel Requirement"
            value={estimatedLiters}
            unit="Liters"
            subtext={`Pathway: ${selectedAltFuel}`}
            icon={Fuel}
            variant="teal"
            isNumeric={true}
          />

          <MetricCard
            label="Estimated Bunkering Cost"
            value={`₹${costLakh}`}
            unit="Lakh"
            subtext={`Price: ₹${price}/L`}
            icon={IndianRupee}
            variant="default"
            isNumeric={false}
          />

          <MetricCard
            label="Lifecycle Carbon Offset"
            value={co2Tonnes}
            unit="Tonnes CO₂"
            subtext={`EF: ${emissionFactor} kg/L`}
            icon={Leaf}
            variant="lime"
            isNumeric={true}
            formatter={(v) => v.toFixed(2)}
          />

          <div className={`p-5 rounded-2xl border flex flex-col justify-between ${currentFeasibility.color}`}>
            <div className="text-xs font-mono font-bold uppercase">Feasibility Rating</div>
            <div className="text-xl font-extrabold my-1">{currentFeasibility.status}</div>
            <div className="text-xs opacity-90 font-medium">{currentFeasibility.notes}</div>
          </div>

        </div>

      </div>

    </section>
  );
};
