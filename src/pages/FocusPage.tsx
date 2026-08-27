import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pause, Play, RotateCcw, Check } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { useTimer } from '@/hooks/useTimer';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';
import { calculatePoints } from '@/utils/calculations';

const PRESET_DURATIONS = [
  { label: '5 min', value: 5 * 60 },
  { label: '25 min', value: 25 * 60 },
  { label: '45 min', value: 45 * 60 },
  { label: '60 min', value: 60 * 60 },
];

const FocusPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();
  const [selectedDuration, setSelectedDuration] = useState(25 * 60);
  const timer = useTimer(selectedDuration);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const minutes = Math.floor(timer.seconds / 60);
  const seconds = timer.seconds % 60;
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleStart = () => {
    setSessionStarted(true);
    timer.start();
  };

  const handlePause = () => {
    timer.pause();
  };

  const handleResume = () => {
    timer.resume();
  };

  const handleReset = () => {
    timer.reset();
    setSessionStarted(false);
  };

  const handleDurationChange = (duration: number) => {
    if (!sessionStarted) {
      setSelectedDuration(duration);
      timer.reset();
    }
  };

  // Handle completion
  useEffect(() => {
    if (timer.isCompleted && sessionStarted) {
      const points = calculatePoints(selectedDuration / 60);
      setCompletedSessions((prev) => prev + 1);
      addToast(`🎉 Session complete! You earned ${points} points!`, 'success');
      setSessionStarted(false);
    }
  }, [timer.isCompleted, sessionStarted, selectedDuration, addToast]);

  const progressPercent = ((selectedDuration - timer.seconds) / selectedDuration) * 100;

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Focus Session</h1>
        <p className="text-gray-600 mt-1">Eliminate distractions and concentrate</p>
      </div>

      {/* Timer Display */}
      <Card className="mb-6 py-8 text-center bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-primary-200 text-primary-700 rounded-full text-sm font-semibold">
            {sessionStarted ? (timer.isActive ? 'In Progress' : 'Paused') : 'Ready'}
          </span>
        </div>
        <div className="text-7xl font-bold text-primary-600 font-mono tracking-wider mb-6">
          {displayTime}
        </div>
        <p className="text-gray-600 mb-8">
          {selectedDuration / 60} minute{(selectedDuration / 60) !== 1 ? 's' : ''} session
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-primary-200 rounded-full h-2 mb-6">
          <div
            className="bg-primary-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </Card>

      {/* Session Stats */}
      <Card className="mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">{completedSessions}</div>
            <p className="text-xs text-gray-600 mt-1">Sessions Today</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">{completedSessions * 20}</div>
            <p className="text-xs text-gray-600 mt-1">Points Earned</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">{completedSessions * (selectedDuration / 60)}</div>
            <p className="text-xs text-gray-600 mt-1">Total Minutes</p>
          </div>
        </div>
      </Card>

      {/* Controls */}
      <Card className="mb-6">
        <div className="flex gap-3">
          {!sessionStarted ? (
            <Button
              onClick={handleStart}
              variant="primary"
              size="lg"
              icon={<Play size={20} />}
              className="flex-1"
            >
              Start Session
            </Button>
          ) : (
            <>
              {timer.isActive ? (
                <Button
                  onClick={handlePause}
                  variant="secondary"
                  size="lg"
                  icon={<Pause size={20} />}
                  className="flex-1"
                >
                  Pause
                </Button>
              ) : (
                <Button
                  onClick={handleResume}
                  variant="primary"
                  size="lg"
                  icon={<Play size={20} />}
                  className="flex-1"
                >
                  Resume
                </Button>
              )}
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                icon={<RotateCcw size={20} />}
              >
                Reset
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Duration Presets */}
      {!sessionStarted && (
        <Card>
          <h3 className="font-semibold text-gray-900 mb-3">Quick Presets</h3>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_DURATIONS.map(({ label, value }) => (
              <Button
                key={value}
                onClick={() => handleDurationChange(value)}
                variant={selectedDuration === value ? 'primary' : 'outline'}
                size="sm"
                className="w-full"
              >
                {label}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Motivational Tips */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Focus Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Put your phone in another room</li>
          <li>Close unnecessary browser tabs</li>
          <li>Mute notifications</li>
          <li>Take breaks between sessions</li>
        </ul>
      </Card>
    </div>
  );
};

export default FocusPage;
