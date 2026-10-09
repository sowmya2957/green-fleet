export interface Vessel {
  id: string;
  name: string;
  type: 'Container Ship' | 'Bulk Carrier' | 'LNG Tanker' | 'Cargo Vessel' | 'Ro-Ro Carrier';
  capacityDWT: number; // Deadweight Tonnage
  fuelType: 'LNG' | 'MGO' | 'METHANOL' | 'HFO';
  status: 'In Transit' | 'Available' | 'Maintenance';
  cruisingSpeed: number; // knots
  maxSpeed: number;
  baseConsumptionRate: number; // Liters per nautical mile at 14 knots
  currentRoute: string;
  cargoLoad: number; // percentage 0 - 100
  engineAgeYears: number;
  efficiencyRating: number; // 0.85 to 1.0
  image: string;
}

export interface RouteOption {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distanceNM: number; // Nautical Miles
  seaConditionBeaufort: number; // 1 to 6
  currentKnots: number;
}

export const DEMO_ROUTES: RouteOption[] = [
  { id: 'R-101', name: 'JNPT Mumbai → Jebel Ali Dubai', origin: 'JNPT, India', destination: 'Dubai, UAE', distanceNM: 1200, seaConditionBeaufort: 3, currentKnots: 1.2 },
  { id: 'R-102', name: 'Singapore → Port of Chennai', origin: 'Singapore', destination: 'Chennai, India', distanceNM: 1580, seaConditionBeaufort: 4, currentKnots: 1.8 },
  { id: 'R-103', name: 'Visakhapatnam → Port of Chittagong', origin: 'Visakhapatnam, India', destination: 'Chittagong, Bangladesh', distanceNM: 540, seaConditionBeaufort: 2, currentKnots: 0.8 },
  { id: 'R-104', name: 'Kochi → Port of Malé', origin: 'Kochi, India', destination: 'Malé, Maldives', distanceNM: 420, seaConditionBeaufort: 3, currentKnots: 1.0 },
  { id: 'R-105', name: 'Mundra → Port Said Egypt', origin: 'Mundra, India', destination: 'Port Said, Egypt', distanceNM: 2850, seaConditionBeaufort: 5, currentKnots: 2.1 },
  { id: 'R-106', name: 'Colombo → Port of Hambantota', origin: 'Colombo, Sri Lanka', destination: 'Hambantota, Sri Lanka', distanceNM: 140, seaConditionBeaufort: 2, currentKnots: 0.5 },
];

export const DEMO_VESSELS: Vessel[] = [
  {
    id: 'VESSEL-01',
    name: 'Vessel 01 (Oceanic Carrier)',
    type: 'Container Ship',
    capacityDWT: 12500,
    fuelType: 'LNG',
    status: 'In Transit',
    cruisingSpeed: 14,
    maxSpeed: 21,
    baseConsumptionRate: 28.5,
    currentRoute: 'JNPT Mumbai → Jebel Ali Dubai',
    cargoLoad: 85,
    engineAgeYears: 3,
    efficiencyRating: 0.96,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'VESSEL-02',
    name: 'Vessel 02 (Indus Pioneer)',
    type: 'Bulk Carrier',
    capacityDWT: 18000,
    fuelType: 'MGO',
    status: 'In Transit',
    cruisingSpeed: 15,
    maxSpeed: 20,
    baseConsumptionRate: 34.2,
    currentRoute: 'Singapore → Port of Chennai',
    cargoLoad: 92,
    engineAgeYears: 5,
    efficiencyRating: 0.91,
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'VESSEL-03',
    name: 'Vessel 03 (Green Voyager)',
    type: 'LNG Tanker',
    capacityDWT: 9500,
    fuelType: 'METHANOL',
    status: 'Available',
    cruisingSpeed: 13,
    maxSpeed: 18,
    baseConsumptionRate: 22.8,
    currentRoute: 'Visakhapatnam → Port of Chittagong',
    cargoLoad: 70,
    engineAgeYears: 2,
    efficiencyRating: 0.98,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'VESSEL-04',
    name: 'Vessel 04 (Maritime Trader)',
    type: 'Cargo Vessel',
    capacityDWT: 14000,
    fuelType: 'HFO',
    status: 'In Transit',
    cruisingSpeed: 14.5,
    maxSpeed: 19,
    baseConsumptionRate: 31.0,
    currentRoute: 'Mundra → Port Said Egypt',
    cargoLoad: 88,
    engineAgeYears: 7,
    efficiencyRating: 0.88,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'VESSEL-05',
    name: 'Vessel 05 (Malabar Express)',
    type: 'Ro-Ro Carrier',
    capacityDWT: 6500,
    fuelType: 'LNG',
    status: 'Available',
    cruisingSpeed: 16,
    maxSpeed: 22,
    baseConsumptionRate: 19.5,
    currentRoute: 'Kochi → Port of Malé',
    cargoLoad: 60,
    engineAgeYears: 1,
    efficiencyRating: 0.99,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'VESSEL-06',
    name: 'Vessel 06 (Bengal Freighter)',
    type: 'Bulk Carrier',
    capacityDWT: 22000,
    fuelType: 'MGO',
    status: 'Maintenance',
    cruisingSpeed: 12,
    maxSpeed: 17,
    baseConsumptionRate: 41.0,
    currentRoute: 'Docked at Chennai Shipyard',
    cargoLoad: 0,
    engineAgeYears: 9,
    efficiencyRating: 0.84,
    image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'VESSEL-07',
    name: 'Vessel 07 (Coromandel Coast)',
    type: 'Container Ship',
    capacityDWT: 16000,
    fuelType: 'LNG',
    status: 'Available',
    cruisingSpeed: 14.8,
    maxSpeed: 21,
    baseConsumptionRate: 30.5,
    currentRoute: 'Colombo → Port of Hambantota',
    cargoLoad: 75,
    engineAgeYears: 4,
    efficiencyRating: 0.94,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'VESSEL-08',
    name: 'Vessel 08 (Arabian Star)',
    type: 'LNG Tanker',
    capacityDWT: 11000,
    fuelType: 'METHANOL',
    status: 'In Transit',
    cruisingSpeed: 13.5,
    maxSpeed: 19,
    baseConsumptionRate: 24.1,
    currentRoute: 'JNPT Mumbai → Jebel Ali Dubai',
    cargoLoad: 80,
    engineAgeYears: 3,
    efficiencyRating: 0.96,
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'VESSEL-09',
    name: 'Vessel 09 (Konkan Spirit)',
    type: 'Cargo Vessel',
    capacityDWT: 8500,
    fuelType: 'MGO',
    status: 'Available',
    cruisingSpeed: 15.2,
    maxSpeed: 20,
    baseConsumptionRate: 21.0,
    currentRoute: 'Kochi → Port of Malé',
    cargoLoad: 65,
    engineAgeYears: 4,
    efficiencyRating: 0.93,
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'VESSEL-10',
    name: 'Vessel 10 (Sunda Straits)',
    type: 'Container Ship',
    capacityDWT: 20000,
    fuelType: 'METHANOL',
    status: 'In Transit',
    cruisingSpeed: 15.0,
    maxSpeed: 22,
    baseConsumptionRate: 36.8,
    currentRoute: 'Singapore → Port of Chennai',
    cargoLoad: 95,
    engineAgeYears: 1,
    efficiencyRating: 0.99,
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80',
  }
];

export interface OptimizationBenchmark {
  metric: string;
  classical: number | string;
  quantumInspired: number | string;
  improvement: string;
  unit: string;
  higherIsBetter: boolean;
}

export const BENCHMARK_METRICS: OptimizationBenchmark[] = [
  { metric: 'Fleet Total Fuel Consumption', classical: 12400, quantumInspired: 11250, improvement: '-9.27%', unit: 'Liters', higherIsBetter: false },
  { metric: 'Total CO₂ Emissions', classical: 32.1, quantumInspired: 29.4, improvement: '-8.41%', unit: 'Tonnes', higherIsBetter: false },
  { metric: 'Total Operating Cost', classical: 9.85, quantumInspired: 8.92, improvement: '-9.44%', unit: 'Lakh ₹', higherIsBetter: false },
  { metric: 'Optimization Computation Time', classical: 4250, quantumInspired: 380, improvement: '-91.0%', unit: 'ms', higherIsBetter: false },
  { metric: 'Combinatorial Solution Quality', classical: 91.4, quantumInspired: 98.6, improvement: '+7.2%', unit: '%', higherIsBetter: true },
  { metric: 'Constraint Satisfaction Index', classical: 94.0, quantumInspired: 100.0, improvement: '+6.0%', unit: '%', higherIsBetter: true },
  { metric: 'Scalability for 100+ Fleet Matrix', classical: 'O(2ⁿ) Exponential', quantumInspired: 'O(N³) Polynomial', improvement: 'High Scaling', unit: 'Complexity', higherIsBetter: true },
];

export const HISTORICAL_ANALYTICS = [
  { month: 'Jan', classicalFuel: 14200, quantumFuel: 12900, classicalCO2: 36.8, quantumCO2: 33.2, costSavingsLakh: 1.15 },
  { month: 'Feb', classicalFuel: 13900, quantumFuel: 12600, classicalCO2: 36.0, quantumCO2: 32.5, costSavingsLakh: 1.22 },
  { month: 'Mar', classicalFuel: 14500, quantumFuel: 13100, classicalCO2: 37.5, quantumCO2: 33.9, costSavingsLakh: 1.30 },
  { month: 'Apr', classicalFuel: 13800, quantumFuel: 12450, classicalCO2: 35.7, quantumCO2: 32.1, costSavingsLakh: 1.25 },
  { month: 'May', classicalFuel: 14100, quantumFuel: 12700, classicalCO2: 36.5, quantumCO2: 32.8, costSavingsLakh: 1.28 },
  { month: 'Jun', classicalFuel: 13600, quantumFuel: 12200, classicalCO2: 35.1, quantumCO2: 31.4, costSavingsLakh: 1.35 },
  { month: 'Jul', classicalFuel: 13950, quantumFuel: 12500, classicalCO2: 36.1, quantumCO2: 32.2, costSavingsLakh: 1.32 },
  { month: 'Aug', classicalFuel: 13400, quantumFuel: 12050, classicalCO2: 34.7, quantumCO2: 31.0, costSavingsLakh: 1.40 },
];
