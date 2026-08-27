import React from 'react';
import clsx from 'clsx';

interface ProgressRingProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  showLabel?: boolean;
  color?: string;
  backgroundColor?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 'md',
  strokeWidth = 4,
  showLabel = true,
  color = '#8b47ff',
  backgroundColor = '#e5e7eb',
}) => {
  const sizeMap = {
    sm: 80,
    md: 120,
    lg: 160,
  };

  const radius = sizeMap[size];
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={radius * 2 + 20} height={radius * 2 + 20} viewBox={`0 0 ${radius * 2 + 20} ${radius * 2 + 20}`}>
        {/* Background circle */}
        <circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
            transform: 'rotate(-90deg)',
            transformOrigin: `${radius + 10}px ${radius + 10}px`,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute text-center">
          <div className="text-2xl font-bold text-gray-900">{Math.round(percentage)}%</div>
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
