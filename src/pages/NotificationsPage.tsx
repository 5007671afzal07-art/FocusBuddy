import React, { useState } from 'react';
import { Bell, Trash2, Check, MessageSquare, Users, Trophy } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Avatar from '@/components/Avatar';
import { useToast } from '@/contexts/ToastContext';

interface Notification {
  id: string;
  type: 'buddy' | 'achievement' | 'message' | 'reminder' | 'social';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  icon: string;
  actionUrl?: string;
  user?: {
    username: string;
    avatar_url: string;
  };
}

const NotificationsPage: React.FC = () => {
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'achievement',
      title: 'Achievement Unlocked! 🎉',
      description: 'You completed your 50th focus session!',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      icon: '🏆',
      user: { username: 'system', avatar_url: '' },
    },
    {
      id: '2',
      type: 'buddy',
      title: 'alex_focus joined your focus session',
      description: 'Your buddy is now focusing with you',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      icon: '👥',
      user: { username: 'alex_focus', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' },
    },
    {
      id: '3',
      type: 'message',
      title: 'New message from jordan_dev',
      description: 'Hey! Want to do a focus session together?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      icon: '💬',
      user: { username: 'jordan_dev', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan' },
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Time for a break!',
      description: 'You\'ve been focusing for 45 minutes. Great work!',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: true,
      icon: '⏰',
    },
    {
      id: '5',
      type: 'social',
      title: 'sam_productivity shared their stats',
      description: 'Check out their amazing productivity streak!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      icon: '📊',
      user: { username: 'sam_productivity', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam' },
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      addToast('All notifications cleared', 'success');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy size={18} className="text-yellow-500" />;
      case 'buddy':
        return <Users size={18} className="text-blue-500" />;
      case 'message':
        return <MessageSquare size={18} className="text-purple-500" />;
      case 'reminder':
        return <Bell size={18} className="text-orange-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Bell size={32} />
            Notifications
          </h1>
          {unreadCount > 0 && (
            <Badge variant="danger" className="mt-2">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      {notifications.length > 0 && (
        <div className="flex gap-2 mb-6">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check size={16} />
              Mark all as read
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={clearAll} className="text-red-600">
            <Trash2 size={16} />
            Clear all
          </Button>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Card
              key={notif.id}
              className={`flex items-start gap-3 transition-colors ${
                !notif.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {notif.user?.avatar_url ? (
                  <Avatar src={notif.user.avatar_url} name={notif.user.username} size="sm" />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {getTypeIcon(notif.type)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium text-gray-900 ${
                  !notif.read ? 'font-semibold' : 'font-medium'
                }`}>
                  {notif.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{notif.description}</p>
                <p className="text-xs text-gray-500 mt-2">{formatTime(notif.timestamp)}</p>
              </div>
              <div className="flex-shrink-0 flex gap-2">
                {!notif.read && (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Check size={16} />}
                    onClick={() => markAsRead(notif.id)}
                  />
                )}
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Trash2 size={16} />}
                  onClick={() => deleteNotification(notif.id)}
                />
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 font-medium">No notifications yet</p>
            <p className="text-gray-500 text-sm mt-1">Check back soon for updates</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
