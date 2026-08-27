import { useState, useCallback } from 'react';

interface UseTimerState {
  seconds: number;
  isActive: boolean;
  isCompleted: boolean;
}

interface UseTimerReturn extends UseTimerState {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  stop: () => void;
}

export const useTimer = (initialSeconds: number): UseTimerReturn => {
  const [state, setState] = useState<UseTimerState>({
    seconds: initialSeconds,
    isActive: false,
    isCompleted: false,
  });

  // Use a ref to track the interval ID to avoid multiple intervals
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const React = require('react');

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.seconds <= 1) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return {
          ...prev,
          seconds: 0,
          isActive: false,
          isCompleted: true,
        };
      }
      return {
        ...prev,
        seconds: prev.seconds - 1,
      };
    });
  }, []);

  React.useEffect(() => {
    if (state.isActive && state.seconds > 0) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isActive, state.seconds, tick]);

  const start = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: true,
    }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  const resume = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: true,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      seconds: initialSeconds,
      isActive: false,
      isCompleted: false,
    });
  }, [initialSeconds]);

  const stop = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  return {
    ...state,
    start,
    pause,
    resume,
    reset,
    stop,
  };
};
