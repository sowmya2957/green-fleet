import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

interface MetricCardProps {
  label: string;
  value: number | string;
  unit?: string;
  subtext?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'teal' | 'lime' | 'blue' | 'orange' | 'coral' | 'dark' | 'default';
  isNumeric?: boolean;
  formatter?: (val: number) => string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  icon: Icon,
  trend,
  variant = 'default',
  isNumeric = typeof value === 'number',
  formatter,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'teal':
        return 'bg-electricTeal-50/80 border-electricTeal-500/30 text-industrial-900';
      case 'lime':
        return 'bg-freshLime-50/90 border-freshLime-500/40 text-industrial-900';
      case 'blue':
        return 'bg-cobaltBlue-50/80 border-cobaltBlue-500/30 text-industrial-900';
      case 'orange':
        return 'bg-energyOrange-50/80 border-energyOrange-500/30 text-industrial-900';
      case 'coral':
        return 'bg-coralCrimson-50/80 border-coralCrimson-500/30 text-industrial-900';
      case 'dark':
        return 'bg-industrial-900 border-industrial-800 text-creamBg';
      default:
        return 'bg-white border-stoneBorder text-industrial-900';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'teal':
        return 'bg-electricTeal-500 text-white';
      case 'lime':
        return 'bg-freshLime-600 text-white';
      case 'blue':
        return 'bg-cobaltBlue-600 text-white';
      case 'orange':
        return 'bg-energyOrange-600 text-white';
      case 'coral':
        return 'bg-coralCrimson-600 text-white';
      case 'dark':
        return 'bg-industrial-800 text-electricTeal-500';
      default:
        return 'bg-stone-100 text-industrial-900';
    }
  };

  return (
    <div className={`p-5 sm:p-6 rounded-2xl border shadow-sm transition-all industrial-card-hover relative flex flex-col justify-between ${getVariantStyles()}`}>
      
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider leading-snug ${
            variant === 'dark' ? 'text-stone-300' : 'text-industrial-900/80'
          }`}>
            {label}
          </span>
          {Icon && (
            <div className={`p-2 sm:p-2.5 rounded-xl shadow-sm flex-shrink-0 ${getIconStyles()}`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          )}
        </div>

        {/* Extra-Large Animated Metric Number with Wrapping Support */}
        <div className="flex flex-wrap items-baseline gap-1.5 my-1">
          <span className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans break-words ${
            variant === 'lime' ? 'text-freshLime-800' : variant === 'teal' ? 'text-electricTeal-800' : ''
          }`}>
            {isNumeric && typeof value === 'number' ? (
              <AnimatedNumber value={value} formatter={formatter} />
            ) : (
              value
            )}
          </span>
          {unit && (
            <span className={`text-sm sm:text-base font-bold whitespace-normal leading-tight ${
              variant === 'dark' ? 'text-stone-300' : 'text-stone-600'
            }`}>
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Trend & Subtext */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mt-3 pt-2 border-t border-stone-200/40 text-xs sm:text-sm">
        {subtext && (
          <span className={`font-semibold leading-tight ${
            variant === 'dark' ? 'text-stone-400' : 'text-stone-600'
          }`}>
            {subtext}
          </span>
        )}
        {trend && (
          <span
            className={`font-extrabold px-2.5 py-0.5 rounded-full text-xs flex-shrink-0 ${
              trend.isPositive
                ? 'bg-freshLime-100 text-freshLime-800'
                : 'bg-coralCrimson-500/10 text-coralCrimson-700'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
