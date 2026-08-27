import React, { useState } from 'react';
import { Gift, Trophy, Star, Zap, Heart, Lock } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import ProgressBar from '@/components/ProgressBar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

interface Reward {
  id: string;
  name: string;
  description: string;
  points_required: number;
  icon: string;
  category: 'badge' | 'premium' | 'feature';
  unlocked: boolean;
  progress: number;
}

const RewardsPage: React.FC = () => {
  const { profile } = useAuth();
  const { addToast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'available' | 'unlocked'>('available');

  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      name: 'Early Bird',
      description: 'Complete 5 morning focus sessions',
      points_required: 500,
      icon: '🌅',
      category: 'badge',
      unlocked: true,
      progress: 100,
    },
    {
      id: '2',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      points_required: 1000,
      icon: '⚔️',
      category: 'badge',
      unlocked: true,
      progress: 100,
    },
    {
      id: '3',
      name: 'Focus Master',
      description: 'Complete 50 focus sessions',
      points_required: 2500,
      icon: '🧠',
      category: 'badge',
      unlocked: false,
      progress: 68,
    },
    {
      id: '4',
      name: 'Ad-Free Mode',
      description: 'Remove ads from your experience',
      points_required: 5000,
      icon: '✨',
      category: 'premium',
      unlocked: false,
      progress: 45,
    },
    {
      id: '5',
      name: 'Custom Themes',
      description: 'Unlock custom app themes',
      points_required: 3000,
      icon: '🎨',
      category: 'feature',
      unlocked: false,
      progress: 30,
    },
    {
      id: '6',
      name: 'Legendary Status',
      description: 'Reach level 50',
      points_required: 10000,
      icon: '👑',
      category: 'badge',
      unlocked: false,
      progress: 12,
    },
  ]);

  const unlockedRewards = rewards.filter((r) => r.unlocked);
  const availableRewards = rewards.filter((r) => !r.unlocked);
  const displayedRewards = selectedTab === 'unlocked' ? unlockedRewards : availableRewards;

  const handleRedeem = (rewardId: string, rewardName: string) => {
    addToast(`${rewardName} redeemed! 🎉`, 'success');
  };

  const currentPoints = profile?.total_points || 0;

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Gift size={32} />
          Rewards
        </h1>
        <p className="text-gray-600 mt-1">Earn points and unlock amazing rewards</p>
      </div>

      {/* Points Overview */}
      <Card className="mb-6 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Your Points</p>
            <h2 className="text-4xl font-bold text-primary-600">{currentPoints.toLocaleString()}</h2>
          </div>
          <Zap className="text-primary-600" size={40} />
        </div>
        <p className="text-sm text-gray-600">
          You're making great progress! Keep completing focus sessions to earn more points.
        </p>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedTab === 'available' ? 'primary' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => setSelectedTab('available')}
        >
          Available ({availableRewards.length})
        </Button>
        <Button
          variant={selectedTab === 'unlocked' ? 'primary' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => setSelectedTab('unlocked')}
        >
          Unlocked ({unlockedRewards.length})
        </Button>
      </div>

      {/* Rewards Grid */}
      <div className="space-y-3">
        {displayedRewards.map((reward) => {
          const canRedeem = currentPoints >= reward.points_required && !reward.unlocked;
          const isUnlocked = reward.unlocked;

          return (
            <Card
              key={reward.id}
              className={`flex items-start gap-4 ${
                isUnlocked ? 'bg-green-50 border-green-200' : ''
              }`}
            >
              <div className="text-4xl flex-shrink-0">{reward.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                  <Badge
                    variant={isUnlocked ? 'success' : 'secondary'}
                    size="sm"
                  >
                    {isUnlocked ? '✓ Unlocked' : `${reward.points_required} pts`}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>

                {!isUnlocked && (
                  <>
                    <div className="mb-2">
                      <ProgressBar
                        percentage={reward.progress}
                        showLabel={false}
                        size="sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {reward.progress}% progress
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {canRedeem && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleRedeem(reward.id, reward.name)}
                        >
                          Redeem
                        </Button>
                      )}
                      {!canRedeem && currentPoints < reward.points_required && (
                        <p className="text-xs text-gray-500">
                          {reward.points_required - currentPoints} more points needed
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* How to Earn Points */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <Star size={18} />
          How to Earn Points
        </h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex gap-2">
            <span>•</span>
            <span>25 min focus session = 20 points</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Daily streak bonus = 50 points</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Refer a friend = 100 points</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Complete weekly goals = 75 points</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default RewardsPage;
