import React, { useState } from 'react';
import { Settings, Bell, Lock, Trash2, LogOut, Eye, EyeOff } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Toggle from '@/components/Toggle';
import Input from '@/components/Input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

const SettingsPage: React.FC = () => {
  const { profile, logOut } = useAuth();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    notifications_enabled: true,
    email_notifications: true,
    sound_enabled: true,
    dark_mode: false,
    private_profile: false,
    show_stats: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    addToast('Setting updated', 'success');
  };

  const handleChangePassword = () => {
    addToast('Password change email sent to your inbox', 'success');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      addToast('Account deletion initiated', 'info');
    }
  };

  const handleLogOut = () => {
    logOut();
    addToast('Logged out successfully', 'success');
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Settings size={32} />
          Settings
        </h1>
        <p className="text-gray-600 mt-1">Manage your preferences</p>
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Bell size={20} />
          Notifications
        </h2>
        <div className="space-y-3">
          <Card className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-600 mt-1">Receive reminders and updates</p>
            </div>
            <Toggle
              checked={settings.notifications_enabled}
              onChange={() => handleToggle('notifications_enabled')}
            />
          </Card>
          <Card className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-600 mt-1">Weekly summary and alerts</p>
            </div>
            <Toggle
              checked={settings.email_notifications}
              onChange={() => handleToggle('email_notifications')}
            />
          </Card>
          <Card className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Sound Effects</h3>
              <p className="text-sm text-gray-600 mt-1">Audio feedback for events</p>
            </div>
            <Toggle
              checked={settings.sound_enabled}
              onChange={() => handleToggle('sound_enabled')}
            />
          </Card>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Lock size={20} />
          Privacy & Security
        </h2>
        <div className="space-y-3">
          <Card className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Private Profile</h3>
              <p className="text-sm text-gray-600 mt-1">Hide your stats from others</p>
            </div>
            <Toggle
              checked={settings.private_profile}
              onChange={() => handleToggle('private_profile')}
            />
          </Card>
          <Card className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Show Public Stats</h3>
              <p className="text-sm text-gray-600 mt-1">Display stats on leaderboard</p>
            </div>
            <Toggle
              checked={settings.show_stats}
              onChange={() => handleToggle('show_stats')}
            />
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-600 mt-1">Update your password regularly</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleChangePassword}
              >
                Change
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Appearance */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Appearance</h2>
        <Card className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Dark Mode</h3>
            <p className="text-sm text-gray-600 mt-1">Easier on the eyes at night</p>
          </div>
          <Toggle
            checked={settings.dark_mode}
            onChange={() => handleToggle('dark_mode')}
          />
        </Card>
      </div>

      {/* Account */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Account</h2>
        <div className="space-y-3">
          <Card className="bg-red-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-red-900">Delete Account</h3>
                <p className="text-sm text-red-700 mt-1">Permanently delete your account and data</p>
              </div>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 size={16} />}
                onClick={handleDeleteAccount}
              >
                Delete
              </Button>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Log Out</h3>
                <p className="text-sm text-gray-600 mt-1">Sign out from this device</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<LogOut size={16} />}
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* App Info */}
      <Card className="text-center bg-gray-50">
        <p className="text-sm text-gray-600 mb-1">FocusBuddy</p>
        <p className="text-xs text-gray-500">Version 1.0.0</p>
        <p className="text-xs text-gray-400 mt-2">© 2024 FocusBuddy. All rights reserved.</p>
      </Card>
    </div>
  );
};

export default SettingsPage;
