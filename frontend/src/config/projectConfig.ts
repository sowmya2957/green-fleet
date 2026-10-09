/**
 * CENTRAL AURA PRODUCT CONFIGURATION
 */
export const PROJECT_NAME = "AURA";
export const PROJECT_SUBTITLE = "Adaptive Utilization for Route & Fuel Analytics";
export const PROBLEM_STATEMENT_ID = "Smart India Hackathon — Maritime & Transport Logistics";

export const NAVIGATION_LINKS = [
  { id: 'fleet', label: 'Fleet' },
  { id: 'predictor', label: 'Predict' },
  { id: 'optimizer', label: 'Optimize' },
  { id: 'altfuel', label: 'Alternative Fuels' },
  { id: 'scenarios', label: 'Scenarios' },
  { id: 'pareto', label: 'Pareto' },
  { id: 'benchmark', label: 'Benchmark' },
  { id: 'impact', label: 'Impact' },
  { id: 'reports', label: 'Reports' },
];

export const EMISSION_FACTORS = {
  LNG: 1.95,          // kg CO2 per liter equivalent
  MGO: 2.68,          // Marine Gas Oil (Diesel) kg CO2/L
  METHANOL: 1.38,     // Methanol kg CO2/L
  HYDROGEN: 0.05,     // Green Hydrogen (minimal life cycle emissions)
  AMMONIA: 0.12,      // Green Ammonia
  HFO: 3.11,          // Heavy Fuel Oil kg CO2/L
};

export const DEFAULT_FUEL_PRICES = {
  LNG: 78.50,        // ₹ per Liter equivalent
  MGO: 94.20,        // ₹ per Liter
  METHANOL: 68.00,   // ₹ per Liter
  HYDROGEN: 110.00,  // ₹ per kg/L equivalent
  AMMONIA: 82.00,    // ₹ per Liter
  HFO: 62.40,        // ₹ per Liter
};
