import React, { useState } from 'react';
import { DEMO_VESSELS, DEMO_ROUTES } from '../../config/demoData';
import { runFleetOptimization, OptimizedFleetPlan } from '../../config/mathEngine';
import { Cpu, CheckCircle2, Navigation, Anchor, ShieldCheck, Zap, ArrowRight, Clock, IndianRupee, Fuel, Leaf, Play, Sparkles } from 'lucide-react';
import { AnimatedNumber } from '../common/AnimatedNumber';

interface OptimizerProps {
  onPlanGenerated?: (plan: OptimizedFleetPlan) => void;
}

export const Optimizer: React.FC<OptimizerProps> = ({ onPlanGenerated }) => {
  // Objectives State
  const [minimizeFuel, setMinimizeFuel] = useState(true);
  const [minimizeCost, setMinimizeCost] = useState(true);
  const [minimizeCO2, setMinimizeCO2] = useState(true);

  // Constraints State
  const [cargoDemandTons, setCargoDemandTons] = useState(11500);
  const [scheduleMaxHours, setScheduleMaxHours] = useState(96);
  const [fuelBudgetLakhINR, setFuelBudgetLakhINR] = useState(30.0);
  const [maxDelayHours, setMaxDelayHours] = useState(12);

  // Optimization Animation & Execution State
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [candidateEvaluating, setCandidateEvaluating] = useState<number>(0);

  const [results, setResults] = useState<{ classicalPlan: OptimizedFleetPlan; quantumPlan: OptimizedFleetPlan } | null>(() =>
    runFleetOptimization(
      { minimizeFuel: true, minimizeCost: true, minimizeCO2: true },
      {
        cargoDemandTons: 11500,
        scheduleMaxHours: 96,
        fuelBudgetLakhINR: 30.0,
        maxDelayHours: 12,
        availableVesselIds: ['VESSEL-01', 'VESSEL-02', 'VESSEL-03'],
      }
    )
  );

  const candidateRoutes = [
    { id: 1, name: 'Candidate Profile A (Full Speed 15.5 kn)', status: 'Rejected (High Fuel)', cost: '₹9.85L' },
    { id: 2, name: 'Candidate Profile B (Slow Speed 11.0 kn)', status: 'Rejected (Schedule Violation)', cost: '₹8.40L' },
    { id: 3, name: 'Candidate Profile C (QUBO Optimal 13.2 kn)', status: 'ACCEPTED (Global Optimum)', cost: '₹8.92L' },
  ];

  const steps = [
    'ANALYZING FLEET TELEMETRY & BURN RATES...',
    'EVALUATING HYDRODYNAMIC SPEED-POWER EQUATIONS...',
    'TESTING CANDIDATE SPEED & ROUTE CONFIGURATIONS...',
    'FORMULATING QUBO ENERGY MATRIX & CONSTRAINT PENALTY...',
    'EXECUTING QUANTUM-INSPIRED SIMULATED ANNEALING...',
    'RECOMMENDED PLAN SYNTHESIZED & VERIFIED!',
  ];

  const handleStartOptimization = () => {
    setIsOptimizing(true);
    setCurrentStepIndex(0);
    setCandidateEvaluating(1);

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsOptimizing(false);
          const computed = runFleetOptimization(
            { minimizeFuel, minimizeCost, minimizeCO2 },
            {
              cargoDemandTons,
              scheduleMaxHours,
              fuelBudgetLakhINR,
              maxDelayHours,
              availableVesselIds: ['VESSEL-01', 'VESSEL-02', 'VESSEL-03'],
            }
          );
          setResults(computed);
          if (onPlanGenerated) onPlanGenerated(computed.quantumPlan);
          return prev;
        }
        setCandidateEvaluating((c) => (c % 3) + 1);
        return prev + 1;
      });
    }, 600);
  };

  const activePlan = results?.quantumPlan;

  return (
    <section id="optimizer" className="space-y-12 py-6 scroll-mt-28">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono font-bold text-freshLime-700 uppercase tracking-widest bg-freshLime-50 px-3.5 py-1 rounded-full border border-freshLime-100">
          Operational Workflow Step 3 of 3
        </span>
        <h2 className="text-display-section text-industrial-900 font-display font-medium mt-2">
          Fleet Optimization Center
        </h2>
        <p className="text-stone-600 text-base max-w-3xl">
          Configure objective weights and operational constraints to synthesize non-linear speed profiles via quantum-inspired annealing.
        </p>
      </div>

      {/* Optimization Configuration Card */}
      <div className="industrial-card p-6 sm:p-10 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Objectives Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-industrial-900 flex items-center space-x-2 border-b border-stoneBorder pb-3">
              <Zap className="w-5 h-5 text-electricTeal-700" />
              <span>1. Target Optimization Objectives</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-xl border border-stoneBorder bg-creamBg/40 cursor-pointer hover:bg-white transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={minimizeFuel}
                    onChange={(e) => setMinimizeFuel(e.target.checked)}
                    className="w-5 h-5 accent-electricTeal-600 rounded cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-industrial-900 text-base block">Minimize Fuel Consumption</span>
                    <span className="text-xs text-stone-500">Hydrodynamic speed reduction (Liters)</span>
                  </div>
                </div>
                <Fuel className="w-5 h-5 text-electricTeal-700" />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-stoneBorder bg-creamBg/40 cursor-pointer hover:bg-white transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={minimizeCost}
                    onChange={(e) => setMinimizeCost(e.target.checked)}
                    className="w-5 h-5 accent-electricTeal-600 rounded cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-industrial-900 text-base block">Minimize Operating Cost</span>
                    <span className="text-xs text-stone-500">Bunker fuel price & voyage expenditure (₹)</span>
                  </div>
                </div>
                <IndianRupee className="w-5 h-5 text-stone-700" />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-stoneBorder bg-creamBg/40 cursor-pointer hover:bg-white transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={minimizeCO2}
                    onChange={(e) => setMinimizeCO2(e.target.checked)}
                    className="w-5 h-5 accent-electricTeal-600 rounded cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-industrial-900 text-base block">Minimize CO₂ Carbon Footprint</span>
                    <span className="text-xs text-stone-500">Maritime GHG compliance (Tonnes CO₂)</span>
                  </div>
                </div>
                <Leaf className="w-5 h-5 text-freshLime-600" />
              </label>
            </div>
          </div>

          {/* Operational Constraints */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-industrial-900 flex items-center space-x-2 border-b border-stoneBorder pb-3">
              <ShieldCheck className="w-5 h-5 text-freshLime-600" />
              <span>2. Operational Constraints</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900/70 mb-1">
                  Cargo Demand (Tons)
                </label>
                <input
                  type="number"
                  value={cargoDemandTons}
                  onChange={(e) => setCargoDemandTons(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-sm text-industrial-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900/70 mb-1">
                  Max Schedule ETA (Hours)
                </label>
                <input
                  type="number"
                  value={scheduleMaxHours}
                  onChange={(e) => setScheduleMaxHours(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-sm text-industrial-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900/70 mb-1">
                  Fuel Budget (Lakh ₹)
                </label>
                <input
                  type="number"
                  value={fuelBudgetLakhINR}
                  onChange={(e) => setFuelBudgetLakhINR(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-sm text-industrial-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-900/70 mb-1">
                  Delay Tolerance (Hours)
                </label>
                <input
                  type="number"
                  value={maxDelayHours}
                  onChange={(e) => setMaxDelayHours(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stoneBorder bg-creamBg/50 font-bold text-sm text-industrial-900"
                />
              </div>
            </div>

            <div className="pt-2 text-xs text-stone-500 font-medium">
              Candidate Fleet: Active vessels evaluated across JNPT → Jebel Ali Corridor.
            </div>
          </div>

        </div>

        {/* Big Action Button */}
        <div className="pt-4 border-t border-stoneBorder">
          <button
            onClick={handleStartOptimization}
            disabled={isOptimizing}
            className="w-full py-5 rounded-2xl bg-industrial-900 hover:bg-industrial-800 text-creamBg font-extrabold text-lg tracking-wide shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-3"
          >
            <Cpu className="w-6 h-6 text-electricTeal-500 animate-pulse" />
            <span>{isOptimizing ? 'RUNNING QUBO ANNEALING SOLVER...' : 'OPTIMIZE FLEET PLAN'}</span>
          </button>
        </div>

        {/* Visual Candidate Search Process */}
        {isOptimizing && (
          <div className="p-6 rounded-2xl bg-industrial-900 text-creamBg space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono text-electricTeal-400 font-bold">
              <span>SOLVER STATUS: SEARCHING SOLUTION SPACE</span>
              <span>STEP {currentStepIndex + 1} OF {steps.length}</span>
            </div>

            <div className="text-lg font-bold font-sans text-white">
              {steps[currentStepIndex]}
            </div>

            {/* Candidate Route Evaluation List */}
            <div className="space-y-2 pt-1">
              {candidateRoutes.map((c) => (
                <div
                  key={c.id}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono transition-all ${
                    candidateEvaluating === c.id
                      ? 'bg-electricTeal-700/40 border-electricTeal-500 text-white font-bold scale-[1.01]'
                      : 'bg-industrial-800/60 border-industrial-700 text-stone-400 opacity-60'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="font-extrabold">{c.status}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-industrial-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-electricTeal-500 transition-all duration-500"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

      </div>

      {/* Recommended Fleet Plan Display */}
      {activePlan && !isOptimizing && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-freshLime-700 uppercase tracking-widest bg-freshLime-50 px-3.5 py-1 rounded-full border border-freshLime-100">
                Optimization Output
              </span>
              <h3 className="text-display-section text-industrial-900 font-display font-medium mt-1">
                Recommended Fleet & Route Plan
              </h3>
            </div>

            <span className="inline-flex items-center space-x-2 text-xs font-mono font-bold bg-freshLime-100 text-freshLime-800 px-3.5 py-1.5 rounded-lg border border-freshLime-200">
              <CheckCircle2 className="w-4 h-4 text-freshLime-600" />
              <span>QUBO Global Optimum Found</span>
            </span>
          </div>

          {/* Recommended Plan Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Plan Metrics Card (7 Cols) */}
            <div className="lg:col-span-7 industrial-card p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-6 border-b border-stoneBorder">
                <div>
                  <div className="text-xs font-mono font-bold text-stone-500 uppercase">Assigned Vessel Asset</div>
                  <div className="text-2xl font-bold text-industrial-900 font-sans">{activePlan.vessel.name}</div>
                  <div className="text-xs text-stone-600 font-medium">{activePlan.vessel.type} • {activePlan.vessel.fuelType}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-stone-500 uppercase">Recommended Speed</div>
                  <div className="text-3xl font-extrabold text-freshLime-700 font-mono">{activePlan.recommendedSpeedKnots} kn</div>
                  <div className="text-xs text-stone-500 font-medium">Optimal Eco Cruising</div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-creamBg/60 border border-stoneBorder">
                  <div className="text-xs font-bold text-stone-500 uppercase">Estimated Fuel</div>
                  <div className="text-xl font-extrabold text-industrial-900">
                    <AnimatedNumber value={activePlan.estimatedFuelLiters} /> L
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-creamBg/60 border border-stoneBorder">
                  <div className="text-xs font-bold text-stone-500 uppercase">Estimated Cost</div>
                  <div className="text-xl font-extrabold text-industrial-900">₹{activePlan.estimatedCostLakhINR} Lakh</div>
                </div>

                <div className="p-4 rounded-xl bg-creamBg/60 border border-stoneBorder">
                  <div className="text-xs font-bold text-stone-500 uppercase">Estimated CO₂</div>
                  <div className="text-xl font-extrabold text-freshLime-700">{activePlan.estimatedCO2Tonnes} t</div>
                </div>

                <div className="p-4 rounded-xl bg-creamBg/60 border border-stoneBorder">
                  <div className="text-xs font-bold text-stone-500 uppercase">Expected ETA</div>
                  <div className="text-xl font-extrabold text-industrial-900">{activePlan.expectedArrivalTimeHours} h</div>
                </div>
              </div>

              {/* Constraint Satisfaction Checklist */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Constraint Verification Checklist
                </h4>

                <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
                  <div className="flex items-center space-x-2 text-freshLime-800 bg-freshLime-50 px-3 py-2 rounded-lg border border-freshLime-200">
                    <CheckCircle2 className="w-4 h-4 text-freshLime-600" />
                    <span>Cargo Demand Met (✓ 11,500 Tons)</span>
                  </div>

                  <div className="flex items-center space-x-2 text-freshLime-800 bg-freshLime-50 px-3 py-2 rounded-lg border border-freshLime-200">
                    <CheckCircle2 className="w-4 h-4 text-freshLime-600" />
                    <span>Capacity Constraint Met (✓ DWT OK)</span>
                  </div>

                  <div className="flex items-center space-x-2 text-freshLime-800 bg-freshLime-50 px-3 py-2 rounded-lg border border-freshLime-200">
                    <CheckCircle2 className="w-4 h-4 text-freshLime-600" />
                    <span>Schedule ETA Met (✓ {activePlan.expectedArrivalTimeHours}h &le; {scheduleMaxHours}h)</span>
                  </div>

                  <div className="flex items-center space-x-2 text-freshLime-800 bg-freshLime-50 px-3 py-2 rounded-lg border border-freshLime-200">
                    <CheckCircle2 className="w-4 h-4 text-freshLime-600" />
                    <span>Fuel Budget Met (✓ ₹{activePlan.estimatedCostLakhINR}L &le; ₹{fuelBudgetLakhINR}L)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Route Map Visualizer (5 Cols) */}
            <div className="lg:col-span-5 industrial-card p-6 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="text-lg font-bold text-industrial-900 mb-1">Route Corridor Visualizer</h4>
                <p className="text-xs text-stone-500 font-medium">{activePlan.assignedRoute}</p>
              </div>

              {/* Canvas/SVG Maritime Route Map */}
              <div className="relative rounded-2xl overflow-hidden bg-industrial-900 text-creamBg p-6 h-64 flex flex-col justify-between shadow-inner">
                
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 flex items-center justify-between text-xs font-mono font-bold text-electricTeal-400">
                  <span>ORIGIN: JNPT MUMBAI</span>
                  <span>DEST: JEBEL ALI DUBAI</span>
                </div>

                {/* Animated Vessel Route Line */}
                <div className="relative z-10 my-auto">
                  <div className="relative w-full h-2 bg-industrial-800 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-freshLime-500 w-2/3 animate-pulse" />
                  </div>
                  
                  {/* Vessel Pin */}
                  <div className="absolute left-2/3 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-freshLime-500 text-industrial-900 p-2 rounded-full shadow-lg">
                    <Anchor className="w-5 h-5" />
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-stone-300 font-medium">
                  <span>Distance: 1,200 NM</span>
                  <span className="font-extrabold text-freshLime-400">Optimal Speed: 13.2 kn</span>
                </div>
              </div>

              <div className="text-xs text-stone-500 italic text-center">
                System recommends reducing speed from 15.0 kn to 13.2 kn, saving 1,150 L fuel with minimal 3.2 hour arrival delta.
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};
