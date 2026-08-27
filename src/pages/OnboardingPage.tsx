import React, { useState } from 'react';
import { ChevronRight, Zap, Target, Users, Trophy, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import ProgressBar from '@/components/ProgressBar';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userPreferences, setUserPreferences] = useState({
    goal: 'productivity',
    focusTime: 25,
    notificationsEnabled: true,
  });

  const steps = [
    {
      title: 'Welcome to FocusBuddy! 👋',
      subtitle: 'Let\'s set up your account for maximum productivity',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
            <Zap className="text-primary-600 mb-3" size={32} />
            <h3 className="font-semibold text-gray-900 mb-2">Eliminate Distractions</h3>
            <p className="text-sm text-gray-700">
              Build focused work sessions and track your productivity with your friends
            </p>
          </div>
          <p className="text-center text-gray-600 text-sm">
            Join thousands of users improving their focus and productivity
          </p>
        </div>
      ),
    },
    {
      title: 'What\'s Your Goal?',
      subtitle: 'Help us personalize your experience',
      content: (
        <div className="space-y-3">
          {[
            { id: 'productivity', label: 'Boost Productivity', icon: '⚡' },
            { id: 'habits', label: 'Build Better Habits', icon: '🎯' },
            { id: 'learning', label: 'Improve Learning', icon: '📚' },
            { id: 'health', label: 'Better Work-Life Balance', icon: '⚖️' },
          ].map((option) => (
            <Button
              key={option.id}
              variant={userPreferences.goal === option.id ? 'primary' : 'outline'}
              className="w-full justify-start text-lg"
              onClick={() => setUserPreferences({ ...userPreferences, goal: option.id })}
            >
              <span className="text-2xl mr-3">{option.icon}</span>
              {option.label}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: 'Choose Your Focus Duration',
      subtitle: 'How long do you want your focus sessions to be?',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-primary-600">{userPreferences.focusTime}</div>
            <p className="text-gray-600 text-sm mt-2">minutes per session</p>
          </div>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={userPreferences.focusTime}
            onChange={(e) =>
              setUserPreferences({ ...userPreferences, focusTime: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>5 min (Quick)</span>
            <span>120 min (Deep Work)</span>
          </div>
          <p className="text-sm text-gray-600 text-center mt-4">
            Popular recommendation: 25 minutes (Pomodoro technique)
          </p>
        </div>
      ),
    },
    {
      title: 'Find Your Focus Buddies',
      subtitle: 'Connect with friends to stay accountable',
      content: (
        <div className="space-y-4">
          <Card className="text-center py-6 bg-blue-50 border-blue-200">
            <Users className="mx-auto mb-3 text-blue-600" size={32} />
            <h4 className="font-semibold text-gray-900 mb-2">Connect with Others</h4>
            <p className="text-sm text-gray-700">
              Join focus sessions with friends and family. You can add buddies anytime from your profile.
            </p>
          </Card>
          <Button variant="primary" className="w-full" onClick={() => setCurrentStep(currentStep + 1)}>
            Skip for Now
          </Button>
        </div>
      ),
    },
    {
      title: 'Notifications & Reminders',
      subtitle: 'Stay on track with helpful notifications',
      content: (
        <div className="space-y-4">
          <Card className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Enable Notifications</h4>
              <p className="text-sm text-gray-600 mt-1">Get reminders and updates</p>
            </div>
            <Button
              variant={userPreferences.notificationsEnabled ? 'primary' : 'outline'}
              onClick={() =>
                setUserPreferences({
                  ...userPreferences,
                  notificationsEnabled: !userPreferences.notificationsEnabled,
                })
              }
            >
              {userPreferences.notificationsEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </Card>
          <div className="space-y-2 text-sm text-gray-600">
            <p>✓ Session reminders</p>
            <p>✓ Achievement notifications</p>
            <p>✓ Buddy activity updates</p>
          </div>
        </div>
      ),
    },
    {
      title: 'You\'re All Set! 🎉',
      subtitle: 'Ready to start your focus journey?',
      content: (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
            <h3 className="font-semibold text-gray-900 mb-3">Your Setup Summary</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Goal: {userPreferences.goal.replace(/([A-Z])/g, ' $1').toUpperCase()}</li>
              <li>✓ Focus Duration: {userPreferences.focusTime} minutes</li>
              <li>✓ Notifications: {userPreferences.notificationsEnabled ? 'Enabled' : 'Disabled'}</li>
            </ul>
          </Card>
          <Button
            variant="primary"
            className="w-full text-lg py-3"
            onClick={() => navigate('/dashboard')}
          >
            Start Your First Session
            <ChevronRight size={20} />
          </Button>
        </div>
      ),
    },
  ];

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar percentage={progress} showLabel={false} />
          <p className="text-xs text-gray-600 mt-2 text-center">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <Card className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h1>
          <p className="text-gray-600 mb-6">{step.subtitle}</p>
          {step.content}
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
              <ChevronRight size={18} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
