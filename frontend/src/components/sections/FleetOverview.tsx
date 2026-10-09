import React, { useState } from 'react';
import { DEMO_VESSELS, DEMO_ROUTES, Vessel, RouteOption } from '../../config/demoData';
import { Search, Filter, Anchor, Fuel, Gauge, Navigation, CheckCircle2, Clock, X, ArrowRight, Activity, ShieldCheck, MapPin, Compass } from 'lucide-react';

interface FleetOverviewProps {
  selectedVessel: Vessel | null;
  selectedRoute: RouteOption | null;
  onStartPrediction: (vessel: Vessel, route: RouteOption) => void;
}

export const FleetOverview: React.FC<FleetOverviewProps> = ({
  selectedVessel: initialSelectedVessel,
  selectedRoute: initialSelectedRoute,
  onStartPrediction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Real User Workflow Selection State
  const [activeVessel, setActiveVessel] = useState<Vessel>(initialSelectedVessel || DEMO_VESSELS[0]);
  const [activeRoute, setActiveRoute] = useState<RouteOption>(initialSelectedRoute || DEMO_ROUTES[0]);
  const [inspectVesselModal, setInspectVesselModal] = useState<Vessel | null>(null);

  const filteredVessels = DEMO_VESSELS.filter((vessel) => {
    const matchesSearch =
      vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.currentRoute.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFuel = selectedFuelType === 'ALL' || vessel.fuelType === selectedFuelType;
    const matchesStatus = selectedStatus === 'ALL' || vessel.status === selectedStatus;

    return matchesSearch && matchesFuel && matchesStatus;
  });

  const getStatusBadge = (status: Vessel['status']) => {
    switch (status) {
      case 'In Transit':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-electricTeal-50 text-electricTeal-800 border border-electricTeal-200">
            <span className="w-2 h-2 rounded-full bg-electricTeal-500 animate-pulse" />
            <span>In Transit</span>
          </span>
        );
      case 'Available':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-freshLime-50 text-freshLime-800 border border-freshLime-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-freshLime-600" />
            <span>Available</span>
          </span>
        );
      case 'Maintenance':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-energyOrange-50 text-energyOrange-700 border border-energyOrange-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Maintenance</span>
          </span>
        );
    }
  };

  const isWorkflowReady = Boolean(activeVessel && activeRoute);

  return (
    <section id="fleet" className="space-y-8 py-6 relative scroll-mt-28">
      
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-electricTeal-700 uppercase tracking-widest bg-electricTeal-50 px-3.5 py-1 rounded-full border border-electricTeal-100">
            Operational Workflow Step 1 of 3
          </span>
          <h2 className="text-display-section text-industrial-900 font-display font-medium mt-2">
            Fleet Asset Registry & Voyage Assignment
          </h2>
          <p className="text-stone-600 text-base max-w-2xl">
            Select a vessel asset and assign a target maritime corridor (Origin → Destination) to initiate fuel prediction.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-sm font-semibold text-industrial-900 bg-white px-5 py-3 rounded-2xl border border-stoneBorder shadow-sm">
          <Anchor className="w-5 h-5 text-electricTeal-700" />
          <span>Active Fleet Inventory: <strong className="text-lg text-electricTeal-800">{DEMO_VESSELS.length} Vessels</strong></span>
        </div>
      </div>

      {/* Workflow Selection Bar (WHO + WHERE -> PREDICT) */}
      <div className="industrial-card p-6 sm:p-8 bg-white border-2 border-electricTeal-500/40 shadow-xl space-y-6">
        
        <div className="flex items-center justify-between border-b border-stoneBorder pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-7 h-7 rounded-full bg-electricTeal-600 text-white font-mono text-xs font-extrabold flex items-center justify-center">
              1
            </span>
            <h3 className="text-xl font-extrabold text-industrial-900 font-sans">
              Configured Voyage & Prediction Pipeline
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-electricTeal-700 bg-electricTeal-50 px-3 py-1 rounded-full border border-electricTeal-100">
            Selected Pair Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* WHO: Selected Vessel */}
          <div className="md:col-span-4 space-y-1.5 p-4 rounded-2xl bg-creamBg border border-stoneBorder">
            <label className="text-xs font-mono font-bold text-stone-500 uppercase flex items-center space-x-1.5">
              <Anchor className="w-4 h-4 text-electricTeal-700" />
              <span>1. Selected Vessel Asset</span>
            </label>
            <div className="font-extrabold text-industrial-900 text-lg truncate">
              {activeVessel.name}
            </div>
            <div className="text-xs text-stone-600 font-semibold">
              {activeVessel.type} • {activeVessel.fuelType} • {activeVessel.capacityDWT.toLocaleString()} DWT
            </div>
          </div>

          {/* WHERE: Selected Voyage / Corridor */}
          <div className="md:col-span-5 space-y-1.5 p-4 rounded-2xl bg-creamBg border border-stoneBorder">
            <label className="text-xs font-mono font-bold text-stone-500 uppercase flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-freshLime-600" />
              <span>2. Assigned Voyage Corridor (Origin → Destination)</span>
            </label>
            <select
              value={activeRoute.id}
              onChange={(e) => {
                const found = DEMO_ROUTES.find(r => r.id === e.target.value);
                if (found) setActiveRoute(found);
              }}
              className="w-full font-extrabold text-industrial-900 text-sm bg-white border border-stoneBorder rounded-xl px-3 py-2 focus:outline-none focus:border-electricTeal-600"
            >
              {DEMO_ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.origin} ➔ {r.destination} ({r.distanceNM} NM)
                </option>
              ))}
            </select>
            <div className="text-xs text-freshLime-800 font-bold flex items-center space-x-2 pt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Route Distance: {activeRoute.distanceNM} NM • Sea State Beaufort {activeRoute.seaConditionBeaufort}</span>
            </div>
          </div>

          {/* HOW & ACTION: Predict Fuel Button */}
          <div className="md:col-span-3 flex flex-col justify-center">
            <button
              onClick={() => onStartPrediction(activeVessel, activeRoute)}
              disabled={!isWorkflowReady}
              className={`w-full py-4 rounded-2xl font-extrabold text-base tracking-wide shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2.5 ${
                isWorkflowReady
                  ? 'bg-electricTeal-600 hover:bg-electricTeal-700 text-white shadow-electricTeal-600/30'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Fuel className="w-5 h-5" />
              <span>Predict Fuel →</span>
            </button>
          </div>

        </div>
      </div>

      {/* Filter & Search Bar for Vessel Selection */}
      <div className="industrial-card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by Vessel ID, Name, or Route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-stoneBorder bg-creamBg/50 text-industrial-900 placeholder:text-stone-400 font-medium text-base focus:bg-white focus:border-electricTeal-600 focus:outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedFuelType}
              onChange={(e) => setSelectedFuelType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stoneBorder bg-creamBg/50 text-industrial-900 font-semibold text-sm focus:bg-white focus:border-electricTeal-600 focus:outline-none transition-colors"
            >
              <option value="ALL">All Fuel Types (LNG, MGO, Methanol...)</option>
              <option value="LNG">LNG (Liquefied Gas)</option>
              <option value="MGO">MGO (Marine Gas Oil / Diesel)</option>
              <option value="METHANOL">Methanol</option>
              <option value="HFO">HFO (Heavy Oil)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stoneBorder bg-creamBg/50 text-industrial-900 font-semibold text-sm focus:bg-white focus:border-electricTeal-600 focus:outline-none transition-colors"
            >
              <option value="ALL">All Statuses (In Transit, Available...)</option>
              <option value="In Transit">In Transit</option>
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

        </div>
      </div>

      {/* Vessels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVessels.map((vessel) => {
          const isSelected = activeVessel.id === vessel.id;
          return (
            <div
              key={vessel.id}
              onClick={() => setActiveVessel(vessel)}
              className={`industrial-card overflow-hidden flex flex-col justify-between cursor-pointer group transition-all duration-300 ${
                isSelected
                  ? 'border-2 border-electricTeal-600 shadow-xl shadow-electricTeal-600/15 scale-[1.01]'
                  : 'industrial-card-hover'
              }`}
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 overflow-hidden bg-stone-200">
                  <img
                    src={vessel.image}
                    alt={vessel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-industrial-900/90 backdrop-blur-md text-creamBg text-xs font-mono font-bold px-3 py-1 rounded-md">
                    {vessel.id}
                  </div>
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(vessel.status)}
                  </div>
                  {isSelected && (
                    <div className="absolute bottom-3 right-3 bg-electricTeal-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>SELECTED</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-industrial-900 font-sans group-hover:text-electricTeal-700 transition-colors">
                      {vessel.name}
                    </h3>
                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mt-1">
                      {vessel.type} • {vessel.capacityDWT.toLocaleString()} DWT
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stoneBorder text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-600 font-medium flex items-center space-x-1.5">
                        <Fuel className="w-4 h-4 text-electricTeal-600" />
                        <span>Fuel Type:</span>
                      </span>
                      <span className="font-bold text-industrial-900 bg-stone-100 px-2.5 py-0.5 rounded text-xs">
                        {vessel.fuelType}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-600 font-medium flex items-center space-x-1.5">
                        <Gauge className="w-4 h-4 text-stone-500" />
                        <span>Cruising Speed:</span>
                      </span>
                      <span className="font-bold text-industrial-900">
                        {vessel.cruisingSpeed} knots (Max {vessel.maxSpeed} kn)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-600 font-medium flex items-center space-x-1.5">
                        <Navigation className="w-4 h-4 text-freshLime-600" />
                        <span>Assigned Route:</span>
                      </span>
                      <span className="font-semibold text-industrial-900 text-xs truncate max-w-[170px]" title={vessel.currentRoute}>
                        {vessel.currentRoute}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVessel(vessel);
                  onStartPrediction(vessel, activeRoute);
                }}
                className={`px-6 py-4 border-t border-stoneBorder flex items-center justify-between text-xs font-extrabold transition-colors ${
                  isSelected
                    ? 'bg-electricTeal-600 text-white'
                    : 'bg-creamBg/60 text-electricTeal-700 hover:bg-electricTeal-50'
                }`}
              >
                <span>Select & Predict →</span>
                <span>{vessel.baseConsumptionRate} L/nm</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
