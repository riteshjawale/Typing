import React, { useState } from 'react';
import { TrendingUp, Award, Calendar, Target, Zap, Star, Trophy } from 'lucide-react';
import Button from '../../../components/ui/Button';

const ProgressTracker = () => {
  const [timeRange, setTimeRange] = useState('week');

  const progressData = {
    week: {
      avgWpm: 42,
      avgAccuracy: 94,
      totalPracticeTime: 180, // minutes
      sessionsCompleted: 12,
      improvement: '+8%',
    },
    month: {
      avgWpm: 38,
      avgAccuracy: 92,
      totalPracticeTime: 720,
      sessionsCompleted: 45,
      improvement: '+15%',
    },
    all: {
      avgWpm: 35,
      avgAccuracy: 90,
      totalPracticeTime: 1800,
      sessionsCompleted: 120,
      improvement: '+25%',
    },
  };

  const achievements = [
    {
      title: 'Speed Demon',
      description: 'Reached 50 WPM',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      unlocked: false,
      progress: 84,
    },
    {
      title: 'Accuracy Master',
      description: 'Maintained 95% accuracy for 10 sessions',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      unlocked: false,
      progress: 70,
    },
    {
      title: 'Consistent Learner',
      description: 'Practiced for 7 consecutive days',
      icon: Calendar,
      color: 'from-blue-500 to-indigo-500',
      unlocked: true,
      progress: 100,
    },
    {
      title: 'Marathon Typist',
      description: 'Completed 100 practice sessions',
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
      unlocked: true,
      progress: 100,
    },
  ];

  const recentSessions = [
    { date: '2026-01-19', wpm: 45, accuracy: 96, duration: 15 },
    { date: '2026-01-18', wpm: 43, accuracy: 94, duration: 20 },
    { date: '2026-01-17', wpm: 41, accuracy: 93, duration: 18 },
    { date: '2026-01-16', wpm: 40, accuracy: 95, duration: 12 },
    { date: '2026-01-15', wpm: 38, accuracy: 92, duration: 25 },
  ];

  const currentData = progressData?.[timeRange];

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-8">
      {/* Header with Time Range Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl text-white">
              <TrendingUp size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Progress Tracker</h2>
              <p className="text-gray-600">Track your improvement over time with detailed statistics</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={timeRange === 'week' ? 'default' : 'outline'}
              onClick={() => setTimeRange('week')}
            >
              This Week
            </Button>
            <Button
              size="sm"
              variant={timeRange === 'month' ? 'default' : 'outline'}
              onClick={() => setTimeRange('month')}
            >
              This Month
            </Button>
            <Button
              size="sm"
              variant={timeRange === 'all' ? 'default' : 'outline'}
              onClick={() => setTimeRange('all')}
            >
              All Time
            </Button>
          </div>
        </div>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Zap size={24} />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              {currentData?.improvement}
            </span>
          </div>
          <div className="text-4xl font-bold mb-1">{currentData?.avgWpm}</div>
          <div className="text-sm opacity-90">Average WPM</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Target size={24} />
            <Star size={20} className="text-yellow-300" />
          </div>
          <div className="text-4xl font-bold mb-1">{currentData?.avgAccuracy}%</div>
          <div className="text-sm opacity-90">Average Accuracy</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Calendar size={24} />
          </div>
          <div className="text-4xl font-bold mb-1">{formatTime(currentData?.totalPracticeTime)}</div>
          <div className="text-sm opacity-90">Practice Time</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Trophy size={24} />
          </div>
          <div className="text-4xl font-bold mb-1">{currentData?.sessionsCompleted}</div>
          <div className="text-sm opacity-90">Sessions Completed</div>
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Award size={24} className="text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements?.map((achievement, index) => {
            const IconComponent = achievement?.icon;
            return (
              <div
                key={index}
                className={`relative rounded-xl p-6 border-2 transition-all ${
                  achievement?.unlocked
                    ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200' :'bg-gray-50 border-gray-200 opacity-75'
                }`}
              >
                {achievement?.unlocked && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full p-2 shadow-lg">
                    <Star size={16} fill="currentColor" />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-br ${achievement?.color} p-3 rounded-xl text-white`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement?.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{achievement?.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-900">{achievement?.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${achievement?.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${achievement?.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Recent Sessions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Sessions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">WPM</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Accuracy</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Duration</th>
              </tr>
            </thead>
            <tbody>
              {recentSessions?.map((session, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-900">{session?.date}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                      <Zap size={14} />
                      {session?.wpm}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
                      <Target size={14} />
                      {session?.accuracy}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{session?.duration} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-8 shadow-lg text-center">
        <Trophy size={48} className="mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Keep Up the Great Work!</h3>
        <p className="text-indigo-100 max-w-2xl mx-auto">
          You're making excellent progress. Continue practicing regularly to achieve your typing goals!
        </p>
      </div>
    </div>
  );
};

export default ProgressTracker;