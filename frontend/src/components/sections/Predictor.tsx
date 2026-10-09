import React, { useState, useEffect } from 'react';
import { DEMO_VESSELS, DEMO_ROUTES, Vessel, RouteOption } from '../../config/demoData';
import { calculateFuelPrediction, PredictionResult } from '../../config/mathEngine';
import { MetricCard } from '../common/MetricCard';
import { Fuel, IndianRupee, Leaf, Clock, Gauge, Wind, Sliders, RefreshCw, BarChart2, Info, Compass } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

interface PredictorProps {
  selectedVessel?: Vessel | null;
  selectedRoute?: RouteOption | null;
}

export const Predictor: React.FC<PredictorProps> = ({ selectedVessel, selectedRoute }) => {
  const defaultVessel = selectedVessel || DEMO_VESSELS[0];
  const defaultRoute = selectedRoute || DEMO_ROUTES[0];

  const [vesselId, setVesselId] = useState<string>(defaultVessel.id);
  const [routeId, setRouteId] = useState<string>(defaultRoute.id);
  const [distanceNM, setDistanceNM] = useState<number>(defaultRoute.distanceNM);
  const [cargoLoadPercent, setCargoLoadPercent] = useState<number>(85);
  const [cruisingSpeedKnots, setCruisingSpeedKnots] = useState<number>(defaultVessel.cruisingSpeed);
  const [fuelType, setFuelType] = useState<'LNG' | 'MGO' | 'METHANOL' | 'HFO'>(defaultVessel.fuelType);
  const [seaConditionBeaufort, setSeaConditionBeaufort] = useState<number>(defaultRoute.seaConditionBeaufort);

  // Synchronize state when selectedVessel or selectedRoute props update
  useEffect(() => {
    if (selectedVessel) {
      setVesselId(selectedVessel.id);
      setFuelType(selectedVessel.fuelType);
      setCruisingSpeedKnots(selectedVessel.cruisingSpeed);
    }
  }, [selectedVessel]);

  useEffect(() => {
    if (selectedRoute) {
      setRouteId(selectedRoute.id);
      setDistanceNM(selectedRoute.distanceNM);
      setSeaConditionBeaufort(selectedRoute.seaConditionBeaufort);
    }
  }, [selectedRoute]);

  // Real-time calculation on every input change!
  const prediction: PredictionResult = calculateFuelPrediction({
    vesselId,
    distanceNM,
    cargoLoadPercent,
    cruisingSpeedKnots,
    fuelType,
    seaConditionBeaufort,
  });

  const currentVesselObj = DEMO_VESSELS.find(v => v.id === vesselId) || DEMO_VESSELS[0];
  const currentRouteObj = DEMO_ROUTES.find(r => r.id === routeId) || DEMO_ROUTES[0];

  return (
    <section id="predictor" className="space-y-10 py-6 scroll-mt-28">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono font-bold text-electricTeal-700 uppercase tracking-widest bg-electricTeal-50 px-3.5 py-1 rounded-full border border-electricTeal-100">
          Operational Workflow Step 2 of 3
        </span>
        <h2 className="text-display-section text-industrial-900 font-display font-medium mt-2">
          Fuel Consumption Predictor
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Real-time non-linear hydrodynamic drag simulation (P ∝ V²·⁷⁵) populated automatically from your selected vessel and assigned voyage corridor.
        </p>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Input Parameters (5 Cols) */}
        <div className="lg:col-span-5 industrial-card p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-stoneBorder">
            <h3 className="text-lg font-bold text-industrial-900 flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-electricTeal-700" />
              <span>Operational Variables</span>
            </h3>
            <span className="text-xs font-mono text-stone-400 font-bold">Connected Context</span>
          </div>

          <div className="space-y-5">
            
            {/* Vessel Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900/70 mb-1.5">
                Active Vessel Asset
              </label>
              <select
                value={vesselId}
                onChange={(e) => {
                  setVesselId(e.target.value);
                  const selected = DEMO_VESSELS.find(v => v.id === e.target.value);
                  if (selected) {
                    setFuelType(selected.fuelType);
                    setCruisingSpeedKnots(selected.cruisingSpeed);
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-sm text-industrial-900 focus:bg-white focus:border-electricTeal-600 focus:outline-none transition-colors"
              >
                {DEMO_VESSELS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.type} • {v.fuelType})
                  </option>
                ))}
              </select>
            </div>

            {/* Route & Distance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900/70 mb-1.5">
                  Assigned Voyage Corridor
                </label>
                <select
                  value={routeId}
                  onChange={(e) => {
                    setRouteId(e.target.value);
                    const r = DEMO_ROUTES.find(rt => rt.id === e.target.value);
                    if (r) {
                      setDistanceNM(r.distanceNM);
                      setSeaConditionBeaufort(r.seaConditionBeaufort);
                    }
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-xs text-industrial-900 focus:bg-white focus:border-electricTeal-600 focus:outline-none"
                >
                  {DEMO_ROUTES.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900/70 mb-1.5">
                  Distance (Nautical Miles)
                </label>
                <input
                  type="number"
                  value={distanceNM}
                  onChange={(e) => setDistanceNM(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-sm text-industrial-900 focus:bg-white focus:border-electricTeal-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Cruising Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-industrial-900/70">
                  Cruising Speed
                </label>
                <span className="font-extrabold text-electricTeal-800 text-sm font-mono bg-electricTeal-50 px-2.5 py-0.5 rounded border border-electricTeal-100">
                  {cruisingSpeedKnots} knots
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={Math.min(22, currentVesselObj.maxSpeed)}
                step={0.5}
                value={cruisingSpeedKnots}
                onChange={(e) => setCruisingSpeedKnots(Number(e.target.value))}
                className="w-full accent-electricTeal-600 h-2.5 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono mt-1">
                <span>10 kn (Slow Steam)</span>
                <span>15 kn (Normal)</span>
                <span>{currentVesselObj.maxSpeed} kn (Max)</span>
              </div>
            </div>

            {/* Cargo Load Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-industrial-900/70">
                  Cargo Capacity Load
                </label>
                <span className="font-extrabold text-industrial-900 text-sm font-mono">
                  {cargoLoadPercent}% ({Math.round(currentVesselObj.capacityDWT * (cargoLoadPercent / 100)).toLocaleString()} Tons)
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={cargoLoadPercent}
                onChange={(e) => setCargoLoadPercent(Number(e.target.value))}
                className="w-full accent-industrial-900 h-2.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Fuel Type & Weather */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900/70 mb-1.5">
                  Bunker Fuel Type
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-xs text-industrial-900"
                >
                  <option value="LNG">LNG (Liquefied Gas)</option>
                  <option value="MGO">MGO (Marine Gas Oil)</option>
                  <option value="METHANOL">Methanol</option>
                  <option value="HFO">HFO (Heavy Oil)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900/70 mb-1.5">
                  Sea Weather (Beaufort)
                </label>
                <select
                  value={seaConditionBeaufort}
                  onChange={(e) => setSeaConditionBeaufort(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-xs text-industrial-900"
                >
                  <option value={1}>Level 1 - Calm Sea</option>
                  <option value={2}>Level 2 - Light Breeze</option>
                  <option value={3}>Level 3 - Moderate Swell</option>
                  <option value={4}>Level 4 - Moderate Rough</option>
                  <option value={5}>Level 5 - Heavy Seas</option>
                </select>
              </div>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-electricTeal-50/70 border border-electricTeal-100 flex items-start space-x-3 text-xs text-electricTeal-900">
            <Info className="w-5 h-5 text-electricTeal-700 flex-shrink-0 mt-0.5" />
            <span>
              Active vessel and corridor parameters carried automatically from Fleet Registry. Modifying any variable recalculates predictions in real time.
            </span>
          </div>

        </div>

        {/* Right Column: High-Visibility Metric Results & Chart (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top 4 Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <MetricCard
              label="Predicted Fuel Consumption"
              value={prediction.predictedFuelLiters}
              unit="Liters"
              subtext={`Burn Rate: ${prediction.fuelRatePerNM} L/nm`}
              icon={Fuel}
              variant="teal"
              isNumeric={true}
            />

            <MetricCard
              label="Estimated Operating Cost"
              value={`₹${(prediction.estimatedCostINR / 100000).toFixed(2)}`}
              unit="Lakh"
              subtext={`₹${prediction.estimatedCostINR.toLocaleString()} total`}
              icon={IndianRupee}
              variant="default"
              isNumeric={false}
            />

            <MetricCard
              label="Estimated CO₂ Footprint"
              value={prediction.estimatedCO2Tonnes}
              unit="Tonnes"
              subtext={`Emission Factor: ${fuelType}`}
              icon={Leaf}
              variant="lime"
              isNumeric={true}
              formatter={(v) => v.toFixed(2)}
            />

            <MetricCard
              label="Estimated Travel Duration"
              value={prediction.estimatedTravelTimeHours}
              unit="Hours"
              subtext={`Speed: ${cruisingSpeedKnots} knots`}
              icon={Clock}
              variant="default"
              isNumeric={true}
              formatter={(v) => v.toFixed(1)}
            />

          </div>

          {/* Speed vs Fuel Consumption Interactive Chart */}
          <div className="industrial-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-industrial-900 flex items-center space-x-2">
                  <BarChart2 className="w-5 h-5 text-electricTeal-700" />
                  <span>Hydrodynamic Speed vs Fuel Consumption Curve</span>
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Cubic resistance exponent graph (P ∝ V²·⁷⁵). Vertical line marks selected speed ({cruisingSpeedKnots} kn).
                </p>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prediction.speedVsFuelCurve} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6E1D7" />
                  <XAxis
                    dataKey="speed"
                    unit=" kn"
                    stroke="#121E1E"
                    tick={{ fill: '#121E1E', fontSize: 12, fontWeight: 'bold' }}
                  />
                  <YAxis
                    stroke="#121E1E"
                    tick={{ fill: '#121E1E', fontSize: 12, fontWeight: 'bold' }}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k L`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#121E1E', color: '#FAF8F5', borderRadius: '12px', border: 'none' }}
                    formatter={(val: any) => [`${Number(val).toLocaleString()} Liters`, 'Fuel Consumed']}
                    labelFormatter={(label) => `Cruising Speed: ${label} knots`}
                  />
                  <ReferenceLine x={cruisingSpeedKnots} stroke="#0891B2" strokeWidth={2.5} label={{ value: 'Selected', fill: '#0891B2', fontSize: 12, fontWeight: 'bold' }} />
                  <Line
                    type="monotone"
                    dataKey="fuelLiters"
                    stroke="#0891B2"
                    strokeWidth={3}
                    dot={{ fill: '#0891B2', r: 4 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
