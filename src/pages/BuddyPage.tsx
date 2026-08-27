import React, { useState } from 'react';
import { Users, Plus, Search, UserCheck, MessageCircle } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Badge from '@/components/Badge';
import Avatar from '@/components/Avatar';
import { useToast } from '@/contexts/ToastContext';

interface Buddy {
  id: string;
  username: string;
  avatar_url: string;
  status: 'online' | 'offline' | 'focusing';
  streak: number;
  level: number;
  connected_date: string;
}

const BuddyPage: React.FC = () => {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [buddies] = useState<Buddy[]>([
    {
      id: '1',
      username: 'alex_focus',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      status: 'focusing',
      streak: 12,
      level: 5,
      connected_date: '2024-01-15',
    },
    {
      id: '2',
      username: 'jordan_dev',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
      status: 'online',
      streak: 8,
      level: 3,
      connected_date: '2024-02-20',
    },
    {
      id: '3',
      username: 'sam_productivity',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam',
      status: 'offline',
      streak: 5,
      level: 2,
      connected_date: '2024-03-10',
    },
  ]);

  const [suggestedBuddies] = useState<Buddy[]>([
    {
      id: '4',
      username: 'casey_focus',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=casey',
      status: 'online',
      streak: 15,
      level: 6,
      connected_date: '',
    },
    {
      id: '5',
      username: 'morgan_tech',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=morgan',
      status: 'focusing',
      streak: 10,
      level: 4,
      connected_date: '',
    },
  ]);

  const filteredBuddies = buddies.filter((buddy) =>
    buddy.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBuddy = (buddyId: string) => {
    addToast('Buddy request sent! 🎉', 'success');
  };

  const handleMessage = (username: string) => {
    addToast(`Opening chat with ${username}...`, 'info');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'focusing':
        return 'bg-blue-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'focusing':
        return 'Focusing';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Users size={32} />
          Focus Buddies
        </h1>
        <p className="text-gray-600 mt-1">Stay accountable with your friends</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search buddies..."
          icon={<Search size={18} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Connected Buddies */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Buddies ({filteredBuddies.length})</h2>
        <div className="space-y-3">
          {filteredBuddies.length > 0 ? (
            filteredBuddies.map((buddy) => (
              <Card key={buddy.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <Avatar src={buddy.avatar_url} name={buddy.username} size="md" />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(buddy.status)}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{buddy.username}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" size="sm">
                        🔥 {buddy.streak} streak
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        Level {buddy.level}
                      </Badge>
                      <span className="text-xs text-gray-500">{getStatusLabel(buddy.status)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<MessageCircle size={16} />}
                  onClick={() => handleMessage(buddy.username)}
                />
              </Card>
            ))
          ) : (
            <Card className="text-center py-6">
              <p className="text-gray-500">No buddies found</p>
            </Card>
          )}
        </div>
      </div>

      {/* Suggested Buddies */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Buddies</h2>
        <div className="space-y-3">
          {suggestedBuddies.map((buddy) => (
            <Card key={buddy.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Avatar src={buddy.avatar_url} name={buddy.username} size="md" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{buddy.username}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" size="sm">
                      🔥 {buddy.streak} streak
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      Level {buddy.level}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={<Plus size={16} />}
                onClick={() => handleAddBuddy(buddy.id)}
              >
                Add
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuddyPage;
