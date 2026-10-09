import React, { useState } from 'react';
import { calculateFuelPrediction } from '../../config/mathEngine';
import { MetricCard } from '../common/MetricCard';
import { Sliders, RefreshCw, Fuel, IndianRupee, Leaf, Clock, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { AnimatedNumber } from '../common/AnimatedNumber';

export const Simulator: React.FC = () => {
  const [fuelPrice, setFuelPrice] = useState<number>(94.20);
  const [cargoLoad, setCargoLoad] = useState<number>(85);
  const [cruisingSpeed, setCruisingSpeed] = useState<number>(14.5);
  const [seaWeather, setSeaWeather] = useState<number>(3);
  const [fuelType, setFuelType] = useState<'LNG' | 'MGO' | 'METHANOL' | 'HFO'>('MGO');
  const [numVessels, setNumVessels] = useState<number>(5);
  const [distanceNM, setDistanceNM] = useState<number>(1580);

  // Live Calculation Result
  const singleVesselRes = calculateFuelPrediction({
    vesselId: 'VESSEL-01',
    distanceNM,
    cargoLoadPercent: cargoLoad,
    cruisingSpeedKnots: cruisingSpeed,
    fuelType,
    seaConditionBeaufort: seaWeather,
    customFuelPrice: fuelPrice,
  });

  const totalFuelLiters = singleVesselRes.predictedFuelLiters * numVessels;
  const totalCostINR = singleVesselRes.estimatedCostINR * numVessels;
  const totalCO2Tonnes = Number((singleVesselRes.estimatedCO2Tonnes * numVessels).toFixed(2));
  const travelTimeHours = singleVesselRes.estimatedTravelTimeHours;

  return (
    <section id="simulator" className="space-y-10 py-6 scroll-mt-28">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono font-bold text-electricTeal-700 uppercase tracking-widest bg-electricTeal-50 px-3.5 py-1 rounded-full border border-electricTeal-100">
          Interactive Scenario Modeling
        </span>
        <h2 className="text-display-section text-industrial-900 font-display font-medium mt-2">
          "What happens if?" — Fleet Simulator
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Move sliders to simulate macro, weather, and operational sensitivity impacts across your entire vessel fleet in real time.
        </p>
      </div>

      {/* Simulator Inputs vs Live Output Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Controls (5 Cols) */}
        <div className="lg:col-span-5 industrial-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stoneBorder">
            <h3 className="text-lg font-bold text-industrial-900 flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-electricTeal-700" />
              <span>Sensitivity Controls</span>
            </h3>
            <span className="text-xs font-mono text-stone-400 font-bold">Zero Latency Engine</span>
          </div>

          <div className="space-y-5">
            
            {/* Fuel Price Input Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-industrial-900 mb-1">
                <span>Bunker Fuel Price</span>
                <span className="font-mono text-electricTeal-800 text-sm font-bold bg-electricTeal-50 px-2 py-0.5 rounded border border-electricTeal-100">
                  ₹{fuelPrice.toFixed(2)} / L
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={150}
                step={1}
                value={fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                className="w-full accent-electricTeal-600 h-2.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Cargo Load Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-industrial-900 mb-1">
                <span>Cargo Load Capacity</span>
                <span className="font-mono text-industrial-900 text-sm font-bold">{cargoLoad}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                step={5}
                value={cargoLoad}
                onChange={(e) => setCargoLoad(Number(e.target.value))}
                className="w-full accent-industrial-900 h-2.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Cruising Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-industrial-900 mb-1">
                <span>Fleet Speed Profile</span>
                <span className="font-mono text-freshLime-800 text-sm font-bold bg-freshLime-50 px-2 py-0.5 rounded border border-freshLime-100">
                  {cruisingSpeed} knots
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={20}
                step={0.5}
                value={cruisingSpeed}
                onChange={(e) => setCruisingSpeed(Number(e.target.value))}
                className="w-full accent-freshLime-600 h-2.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Number of Vessels Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-industrial-900 mb-1">
                <span>Number of Deployed Vessels</span>
                <span className="font-mono text-industrial-900 text-sm font-bold">{numVessels} Vessels</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={numVessels}
                onChange={(e) => setNumVessels(Number(e.target.value))}
                className="w-full accent-industrial-900 h-2.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Route Distance Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-industrial-900 mb-1">
                <span>Voyage Route Distance</span>
                <span className="font-mono text-industrial-900 text-sm font-bold">{distanceNM} NM</span>
              </div>
              <input
                type="range"
                min={200}
                max={3000}
                step={50}
                value={distanceNM}
                onChange={(e) => setDistanceNM(Number(e.target.value))}
                className="w-full accent-industrial-900 h-2.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Fuel Type & Sea Weather */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900 mb-1">
                  Fuel Type
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-xs text-industrial-900"
                >
                  <option value="LNG">LNG</option>
                  <option value="MGO">MGO (Diesel)</option>
                  <option value="METHANOL">Methanol</option>
                  <option value="HFO">HFO</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900 mb-1">
                  Sea Condition
                </label>
                <select
                  value={seaWeather}
                  onChange={(e) => setSeaWeather(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-xs text-industrial-900"
                >
                  <option value={1}>Beaufort 1 (Calm)</option>
                  <option value={3}>Beaufort 3 (Moderate)</option>
                  <option value={5}>Beaufort 5 (Heavy)</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Recalculated Output Metrics (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="industrial-card p-6 bg-industrial-900 text-creamBg space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-electricTeal-400 uppercase tracking-widest">
              <span>Live Fleet Scenario Output</span>
              <span>{numVessels} Active Vessels</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
              ₹<AnimatedNumber value={totalCostINR / 100000} formatter={(v) => v.toFixed(2)} /> Lakh Estimated Expenditure
            </div>
            <p className="text-stone-300 text-sm">
              Simulated across {distanceNM} NM corridor at {cruisingSpeed} knots cruising speed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Fleet Total Fuel Consumed"
              value={totalFuelLiters}
              unit="Liters"
              subtext={`${singleVesselRes.predictedFuelLiters.toLocaleString()} L per vessel`}
              icon={Fuel}
              variant="teal"
              isNumeric={true}
            />

            <MetricCard
              label="Fleet CO₂ Carbon Footprint"
              value={totalCO2Tonnes}
              unit="Tonnes"
              subtext={`${singleVesselRes.estimatedCO2Tonnes} t per vessel`}
              icon={Leaf}
              variant="lime"
              isNumeric={true}
              formatter={(v) => v.toFixed(2)}
            />

            <MetricCard
              label="Voyage Travel Time"
              value={travelTimeHours}
              unit="Hours"
              subtext={`Speed: ${cruisingSpeed} knots`}
              icon={Clock}
              variant="default"
              isNumeric={true}
              formatter={(v) => v.toFixed(1)}
            />

            <MetricCard
              label="Bunker Fuel Expense"
              value={`₹${(totalCostINR / 100000).toFixed(2)}`}
              unit="Lakh"
              subtext={`Price: ₹${fuelPrice.toFixed(2)} / L`}
              icon={IndianRupee}
              variant="default"
              isNumeric={false}
            />
          </div>

        </div>

      </div>

    </section>
  );
};
