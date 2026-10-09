import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DashboardSnapshot } from './components/sections/DashboardSnapshot';
import { FleetOverview } from './components/sections/FleetOverview';
import { Predictor } from './components/sections/Predictor';
import { Optimizer } from './components/sections/Optimizer';
import { AltFuelSimulator } from './components/sections/AltFuelSimulator';
import { ScenarioComparison } from './components/sections/ScenarioComparison';
import { ParetoAnalysis } from './components/sections/ParetoAnalysis';
import { Benchmark } from './components/sections/Benchmark';
import { Impact } from './components/sections/Impact';
import { Report } from './components/sections/Report';
import { FutureScope } from './components/sections/FutureScope';
import { Vessel, RouteOption, DEMO_VESSELS, DEMO_ROUTES } from './config/demoData';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [selectedVessel, setSelectedVessel] = useState<Vessel>(DEMO_VESSELS[0]);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(DEMO_ROUTES[0]);

  // Quick-Jump Navigation Handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Connected Workflow Handler: Vessel + Voyage -> Predictor
  const handleStartPrediction = (vessel: Vessel, route: RouteOption) => {
    setSelectedVessel(vessel);
    setSelectedRoute(route);
    handleNavigate('predictor');
  };

  // Observe current section in viewport to highlight correct navbar link
  useEffect(() => {
    const sectionIds = ['dashboard', 'fleet', 'predictor', 'optimizer', 'altfuel', 'scenarios', 'pareto', 'benchmark', 'impact', 'reports', 'future'];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-auraCream text-industrial-900 font-sans selection:bg-auraGreen-100 selection:text-auraGreen-800">
      
      {/* Sticky Top Header Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Continuous Single-Page Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-6">
        
        {/* 1. Opening Viewport Dashboard Snapshot */}
        <DashboardSnapshot
          selectedVessel={selectedVessel}
          selectedRoute={selectedRoute}
          onNavigate={handleNavigate}
        />

        {/* 2. Fleet Registry & Voyage Selection */}
        <FleetOverview
          selectedVessel={selectedVessel}
          selectedRoute={selectedRoute}
          onStartPrediction={handleStartPrediction}
        />

        {/* 3. Fuel Consumption Predictor */}
        <Predictor
          selectedVessel={selectedVessel}
          selectedRoute={selectedRoute}
        />

        {/* 4. QUBO Optimization Engine */}
        <Optimizer />

        {/* 5. Alternative Fuel Simulator */}
        <AltFuelSimulator
          selectedVessel={selectedVessel}
          selectedRoute={selectedRoute}
        />

        {/* 6. Scenario Matrix */}
        <ScenarioComparison
          selectedVessel={selectedVessel}
          selectedRoute={selectedRoute}
        />

        {/* 7. Pareto Multi-Objective Frontier */}
        <ParetoAnalysis />

        {/* 8. Classical vs Quantum Benchmarking */}
        <Benchmark />

        {/* 9. Sustainability & Carbon Impact */}
        <Impact />

        {/* 10. Executive Printable Decision Report */}
        <Report
          selectedVessel={selectedVessel}
          selectedRoute={selectedRoute}
        />

        {/* 11. Technology Roadmap / Future Scope */}
        <FutureScope />

      </main>

      {/* Footer */}
      <Footer setActiveTab={handleNavigate} />

    </div>
  );
}

export default App;

