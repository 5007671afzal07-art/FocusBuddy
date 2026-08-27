# FocusBuddy

A modern productivity app for focused work sessions and accountability with friends.

## Features

✨ **Core Features**
- 25-minute Pomodoro timer with pause/resume
- Focus buddy system for accountability
- Real-time streak tracking
- Gamified rewards system with points and levels
- Detailed productivity statistics and charts
- Achievement badges and milestones
- Push notifications and reminders

🎯 **User Pages**
- Dashboard - Main focus session interface
- Buddy Page - Connect with focus partners
- Rewards - Earn and redeem achievements
- Statistics - Track productivity metrics
- Profile - User profile and achievements
- Notifications - Activity feed
- Settings - Preferences and account
- Onboarding - First-time setup wizard

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build**: Vite
- **State Management**: React Context

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/FocusBuddy.git
cd FocusBuddy

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Demo Credentials

- **Email**: user@example.com
- **Password**: password123

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type checking
npm run type-check
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React contexts for state
├── pages/           # Page components
├── services/        # API and utility services
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Components

- **Card** - Container component
- **Button** - Multi-variant button
- **Input** - Form input field
- **Badge** - Status badge
- **Avatar** - User avatar
- **ProgressBar** - Progress indicator
- **Toggle** - On/off switch
- **NavBar** - Top navigation
- **BottomNav** - Tab navigation
- **LoadingSpinner** - Loading indicator
- **ProtectedRoute** - Route guard

## API Integration

The app uses mock data by default. To integrate with a backend:

1. Update `AuthContext.tsx` with real API calls
2. Configure API endpoints in environment variables
3. Replace mock data services with API calls

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=FocusBuddy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For support, email support@focusbuddy.com or open an issue on GitHub.

## Roadmap

- [ ] Backend API integration
- [ ] Real-time buddy sync
- [ ] Offline mode
- [ ] Mobile native apps
- [ ] Social features
- [ ] Custom themes
- [ ] Browser extensions

---

**FocusBuddy** - Stay focused, stay accountable! ⚡
