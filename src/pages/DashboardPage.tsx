import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Target, Users, Trophy } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import ProgressBar from '@/components/ProgressBar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

const DashboardPage: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime] = useState(25 * 60);
  const [sessionsToday, setSessionsToday] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setSessionsToday((prev) => prev + 1);
      addToast('Great job! Session completed! 🎉', 'success');
      setTimeLeft(25 * 60);
      updateProfile({
        total_sessions: (profile?.total_sessions || 0) + 1,
        total_focus_minutes: (profile?.total_focus_minutes || 0) + 25,
        total_points: (profile?.total_points || 0) + 20,
      });
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, profile, updateProfile, addToast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back! 👋</h1>
        <p className="text-gray-600 mt-1">Ready to focus? Start a session now</p>
      </div>

      {/* Main Timer */}
      <Card className="mb-6 text-center bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-2">Focus Session</p>
          <div className="text-7xl font-bold text-primary-600 font-mono mb-4">
            {formatTime(timeLeft)}
          </div>
          <p className="text-gray-600">25 minute session</p>
        </div>

        {/* Progress Ring */}
        <div className="mb-6">
          <ProgressBar percentage={progress} showLabel={false} />
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          {!isRunning ? (
            <Button
              variant="primary"
              size="lg"
              icon={<Play size={20} />}
              onClick={handleStart}
            >
              Start
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              icon={<Pause size={20} />}
              onClick={handlePause}
            >
              Pause
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            icon={<RotateCcw size={20} />}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="text-center">
          <Zap size={24} className="mx-auto text-yellow-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{profile?.total_points || 0}</p>
          <p className="text-xs text-gray-600 mt-1">Points</p>
        </Card>
        <Card className="text-center">
          <Target size={24} className="mx-auto text-blue-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{sessionsToday}</p>
          <p className="text-xs text-gray-600 mt-1">Today</p>
        </Card>
        <Card className="text-center">
          <Users size={24} className="mx-auto text-purple-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{profile?.current_streak || 0}</p>
          <p className="text-xs text-gray-600 mt-1">Day Streak</p>
        </Card>
        <Card className="text-center">
          <Trophy size={24} className="mx-auto text-orange-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">Level {profile?.level}</p>
          <p className="text-xs text-gray-600 mt-1">Current Level</p>
        </Card>
      </div>

      {/* Session History */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Deep Work Session</h3>
                <p className="text-sm text-gray-600 mt-1">25 minutes completed</p>
              </div>
              <Badge variant="success">✓ Complete</Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
