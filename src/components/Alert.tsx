import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import Card from './Card';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  action,
}) => {
  const configs = {
    info: {
      icon: <Info size={20} />,
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-500',
    },
    success: {
      icon: <CheckCircle size={20} />,
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-700',
      iconColor: 'text-green-500',
    },
    warning: {
      icon: <AlertTriangle size={20} />,
      bgColor: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-700',
      iconColor: 'text-yellow-500',
    },
    error: {
      icon: <AlertCircle size={20} />,
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-700',
      iconColor: 'text-red-500',
    },
  };

  const config = configs[type];

  return (
    <Card className={`border ${config.bgColor}`}>
      <div className="flex gap-3">
        <div className={config.iconColor}>{config.icon}</div>
        <div className="flex-1">
          {title && <h3 className={`font-semibold ${config.textColor}`}>{title}</h3>}
          <p className={`${config.textColor} text-sm ${title ? 'mt-1' : ''}`}>{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className={`mt-2 text-sm font-medium underline ${config.textColor} hover:opacity-80`}
            >
              {action.label}
            </button>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${config.textColor} hover:opacity-80`}
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>
    </Card>
  );
};

export default Alert;
