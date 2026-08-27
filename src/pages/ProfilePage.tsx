import React, { useState } from 'react';
import { User, Edit2, Mail, MapPin, Trophy, Zap, Calendar } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Avatar from '@/components/Avatar';
import ProgressBar from '@/components/ProgressBar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

const ProfilePage: React.FC = () => {
  const { profile } = useAuth();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: profile?.bio || 'Passionate about productivity and focus',
    location: profile?.location || 'San Francisco, CA',
  });

  const handleSave = () => {
    addToast('Profile updated successfully!', 'success');
    setIsEditing(false);
  };

  const achievements = [
    { id: 1, name: 'Early Bird', icon: '🌅', description: '5 morning sessions' },
    { id: 2, name: 'Week Warrior', icon: '⚔️', description: '7-day streak' },
    { id: 3, name: 'Focused', icon: '🧠', description: '100 sessions' },
    { id: 4, name: 'Social', icon: '👥', description: '5 buddies' },
  ];

  const stats = [
    { label: 'Total Sessions', value: profile?.total_sessions || 0 },
    { label: 'Focus Hours', value: Math.round((profile?.total_focus_minutes || 0) / 60) },
    { label: 'Current Streak', value: profile?.current_streak || 0 },
    { label: 'Level', value: profile?.level || 1 },
  ];

  const levelProgress = profile?.experience_points ? (profile.experience_points % 1000) / 10 : 0;

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      {/* Profile Header */}
      <Card className="mb-6 text-center">
        <Avatar
          src={profile?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
          name={profile?.username || 'User'}
          size="lg"
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900">{profile?.username}</h1>
        <p className="text-gray-600 mt-1">Level {profile?.level || 1}</p>
        <div className="mt-4">
          <ProgressBar percentage={levelProgress} showLabel={false} />
          <p className="text-xs text-gray-500 mt-1">XP to next level</p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            icon={<Edit2 size={16} />}
            onClick={() => setIsEditing(true)}
            className="mt-4"
          >
            Edit Profile
          </Button>
        )}
      </Card>

      {/* Bio and Info */}
      {isEditing ? (
        <Card className="mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleSave} className="flex-1">
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="mb-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{profile?.email}</p>
              </div>
            </div>
            <hr className="border-gray-200" />
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-900">{formData.location}</p>
              </div>
            </div>
            <hr className="border-gray-200" />
            <div className="flex items-start gap-3">
              <User size={18} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Bio</p>
                <p className="font-medium text-gray-900">{formData.bio}</p>
              </div>
            </div>
            <hr className="border-gray-200" />
            <div className="flex items-start gap-3">
              <Calendar size={18} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium text-gray-900">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
            <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy size={18} />
          Achievements
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className="font-medium text-gray-900 text-sm">{achievement.name}</p>
              <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
