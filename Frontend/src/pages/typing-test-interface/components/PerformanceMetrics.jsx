import React from 'react';
import { Gauge, Target, Clock, AlertCircle } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const PerformanceMetrics = ({ wpm, cpm, accuracy, time, errors }) => {
  const metrics = [
    {
      label: 'WPM',
      value: wpm,
      icon: Gauge,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'CPM',
      value: cpm,
      icon: Gauge,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Accuracy',
      value: `${accuracy}%`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Time',
      value: time,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Errors',
      value: errors,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {metrics?.map((metric, index) => {
        const Icon = metric?.icon;
        return (
          <div
            key={index}
            className={`${metric?.bgColor} rounded-xl p-4 border-2 border-gray-100`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{metric?.label}</span>
              <Icon size={18} className={metric?.color} />
            </div>
            <div className={`text-2xl font-bold ${metric?.color}`}>
              {metric?.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PerformanceMetrics;