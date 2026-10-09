import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number; // in ms
  formatter?: (val: number) => string;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 600,
  formatter = (val) => Math.round(val).toLocaleString(),
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const initialValue = displayValue;
    const targetValue = value;

    if (initialValue === targetValue) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = initialValue + (targetValue - initialValue) * easeProgress;
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value, duration]);

  return <span className={className}>{formatter(displayValue)}</span>;
};
