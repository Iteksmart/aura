
import React from 'react';
import { ProactiveSuggestion } from '../types';
import { CalendarIcon, LightbulbIcon, PiggyBankIcon, ClipboardCheckIcon, UserIcon, BriefcaseIcon } from './icons';

interface ProactiveSuggestionCardProps {
  suggestion: ProactiveSuggestion;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const iconMap: { [key: string]: React.ReactNode } = {
  calendar: <CalendarIcon className="w-6 h-6" />,
  meditation: <LightbulbIcon className="w-6 h-6" />,
  budget: <PiggyBankIcon className="w-6 h-6" />,
  task: <ClipboardCheckIcon className="w-6 h-6" />,
  user: <UserIcon className="w-6 h-6" />,
  briefcase: <BriefcaseIcon className="w-6 h-6" />,
};

const colorMap: { [key:string]: { border: string, iconText: string, button: string, iconBg: string } } = {
    blue: {
        border: 'from-blue-500/20 to-slate-800/10 border-blue-500/50',
        iconText: 'text-blue-400',
        button: 'bg-blue-600 hover:bg-blue-500',
        iconBg: 'bg-blue-500/10'
    },
    purple: {
        border: 'from-purple-500/20 to-slate-800/10 border-purple-500/50',
        iconText: 'text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-500',
        iconBg: 'bg-purple-500/10'
    },
    green: {
        border: 'from-green-500/20 to-slate-800/10 border-green-500/50',
        iconText: 'text-green-400',
        button: 'bg-green-600 hover:bg-green-500',
        iconBg: 'bg-green-500/10'
    },
    yellow: {
        border: 'from-yellow-500/20 to-slate-800/10 border-yellow-500/50',
        iconText: 'text-yellow-400',
        button: 'bg-yellow-600 hover:bg-yellow-500',
        iconBg: 'bg-yellow-500/10'
    },
    orange: {
        border: 'from-orange-500/20 to-slate-800/10 border-orange-500/50',
        iconText: 'text-orange-400',
        button: 'bg-orange-600 hover:bg-orange-500',
        iconBg: 'bg-orange-500/10'
    },
};

const ProactiveSuggestionCard: React.FC<ProactiveSuggestionCardProps> = ({ suggestion, addToast }) => {
  const handleAction = () => {
      let message = '';
      switch(suggestion.action) {
          case 'Schedule Now':
              message = 'Task has been scheduled in your calendar.';
              break;
          case 'Add to Calendar':
              message = 'Mindfulness session added to your calendar.';
              break;
          case 'Adjust Budget':
              message = 'Budget has been successfully adjusted.';
              break;
          case 'Draft Email':
              message = 'Email draft to Sarah has been opened.';
              break;
          case 'Start Review':
              message = 'Review time has been added to your calendar.';
              break;
          case 'Create Task':
              message = 'Task has been added to your to-do list.';
              break;
          default:
              message = 'Action completed!';
      }
      addToast(message, 'success');
  }
  
  const colors = colorMap[suggestion.color] || colorMap.blue;

  return (
    <div className={`bg-slate-800/50 p-5 rounded-xl border transition-all duration-300 hover:shadow-2xl hover:shadow-slate-950/50 hover:-translate-y-1 bg-gradient-to-br ${colors.border}`}>
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-full ${colors.iconBg}`}>
            <div className={colors.iconText}>
                {iconMap[suggestion.icon]}
            </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mt-4">{suggestion.title}</h3>
      <p className="text-slate-400 text-sm mt-1 mb-4 h-16">{suggestion.description}</p>
      <button 
        onClick={handleAction}
        className={`w-full text-center font-semibold py-2 px-4 rounded-lg ${colors.button} text-white transition-colors duration-200 text-sm`}>
        {suggestion.action}
      </button>
    </div>
  );
};

export default ProactiveSuggestionCard;
