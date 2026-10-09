import React, { useState } from 'react';
import { Play, SkipForward, Check, X, ArrowRight, ShieldCheck, Video } from 'lucide-react';

interface PresentationFlowProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  onCloseDemo: () => void;
}

export const PresentationFlow: React.FC<PresentationFlowProps> = ({
  activeTab,
  setActiveTab,
  onCloseDemo,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: '1. Platform Overview',
      desc: 'Smarter fleet decisions. Less fuel wasted.',
      tab: 'overview',
    },
    {
      num: 2,
      title: '2. Operational Capabilities',
      desc: 'Predict, Optimize, and Reduce workflow architecture.',
      tab: 'overview',
    },
    {
      num: 3,
      title: '3. Fleet Asset Registry',
      desc: 'Open live maritime asset registry (20 vessels, search & fuel filters).',
      tab: 'fleet',
    },
    {
      num: 4,
      title: '4. Select Vessel Asset',
      desc: 'Inspect VESSEL-01 (Container Ship • LNG • 12,500 DWT).',
      tab: 'fleet',
    },
    {
      num: 5,
      title: '5. Predict Fuel Consumption',
      desc: 'Hydrodynamic speed curve & physics prediction (Fuel, Cost, CO₂, Duration).',
      tab: 'predictor',
    },
    {
      num: 6,
      title: '6. Optimization Center',
      desc: 'Configure objective weights & operational schedule constraints.',
      tab: 'optimizer',
    },
    {
      num: 7,
      title: '7. Execute QUBO Annealing',
      desc: 'Run candidate speed & route search animation across solution space.',
      tab: 'optimizer',
    },
    {
      num: 8,
      title: '8. Recommended Fleet Plan',
      desc: 'Show assigned vessel, route corridor, 13.2 kn eco speed & checklist.',
      tab: 'optimizer',
    },
    {
      num: 9,
      title: '9. Classical vs Quantum Benchmark',
      desc: 'Algorithmic benchmarking comparison table & execution runtime.',
      tab: 'benchmark',
    },
    {
      num: 10,
      title: '10. What-If Simulator',
      desc: 'Interactive macro & weather scenario sensitivity modeling.',
      tab: 'simulator',
    },
    {
      num: 11,
      title: '11. Sensitivity Recalculation',
      desc: 'Adjusting cruising speed slider to observe live cost recalculation.',
      tab: 'simulator',
    },
    {
      num: 12,
      title: '12. Environmental Carbon Impact',
      desc: 'BEFORE vs AFTER optimization audit (-9.27% Fuel • -8.41% CO₂).',
      tab: 'impact',
    },
    {
      num: 13,
      title: '13. Analytics & Future Scope',
      desc: 'Executive summary & technical roadmap for satellite AIS & QPU hardware.',
      tab: 'future',
    },
  ];

  const currentStepObj = steps[currentStep - 1];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      const nextStepNum = currentStep + 1;
      setCurrentStep(nextStepNum);
      setActiveTab(steps[nextStepNum - 1].tab);
    } else {
      onCloseDemo();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      const prevStepNum = currentStep - 1;
      setCurrentStep(prevStepNum);
      setActiveTab(steps[prevStepNum - 1].tab);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-industrial-900 text-creamBg border-2 border-electricTeal-500 p-5 rounded-3xl shadow-2xl space-y-3 backdrop-blur-xl">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-electricTeal-600 text-white rounded-xl shadow-md">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base">
                Guided Presentation Tour ({currentStep} / {steps.length})
              </span>
              <span className="text-xs text-electricTeal-400 block font-mono">
                Interactive Demonstration Flow
              </span>
            </div>
          </div>

          <button
            onClick={onCloseDemo}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-industrial-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-industrial-800 p-4 rounded-2xl space-y-1 border border-industrial-700">
          <div className="font-bold text-electricTeal-300 text-base">
            {currentStepObj.title}
          </div>
          <div className="text-sm text-stone-300">
            {currentStepObj.desc}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl bg-industrial-800 text-stone-300 font-bold text-xs hover:bg-industrial-700 disabled:opacity-40"
          >
            Back
          </button>

          {/* Stepper Dots */}
          <div className="hidden sm:flex items-center space-x-1.5">
            {steps.map((s) => (
              <div
                key={s.num}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  s.num === currentStep
                    ? 'bg-electricTeal-400 w-7'
                    : s.num < currentStep
                    ? 'bg-freshLime-500 w-2.5'
                    : 'bg-industrial-800 w-2.5'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextStep}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-freshLime-600 hover:bg-freshLime-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
          >
            <span>{currentStep === steps.length ? 'Finish Tour' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
