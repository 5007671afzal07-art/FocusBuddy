import React from 'react';
import { Home, Zap, Users, Gift, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/focus', label: 'Focus', icon: Zap },
    { path: '/buddy', label: 'Buddy', icon: Users },
    { path: '/rewards', label: 'Rewards', icon: Gift },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center gap-1 safe-area-bottom">
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={clsx(
            'flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors duration-200',
            isActive(path)
              ? 'text-primary-600 bg-primary-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          )}
          aria-label={label}
        >
          <Icon size={24} />
          <span className="text-xs font-medium">{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
