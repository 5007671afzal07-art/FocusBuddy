import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  showLabel = true,
  color = 'bg-primary-600',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      <div className={clsx('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={clsx(color, 'h-full transition-all duration-500')}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-2 text-sm font-medium text-gray-600 text-right">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
