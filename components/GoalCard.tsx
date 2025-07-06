
import React from 'react';
import { Goal } from '../types';
import { TargetIcon, TrendingUpIcon } from './icons';

interface GoalCardProps {
  goal: Goal;
}

const categoryColors: { [key: string]: string } = {
    Financial: 'bg-green-500/10 text-green-400 border-green-500/20',
    Fitness: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Skills: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
}

const progressColors: { [key: string]: string } = {
    Financial: 'bg-green-500',
    Fitness: 'bg-orange-500',
    Skills: 'bg-sky-500',
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  return (
    <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/50 flex items-center gap-6 transition-all duration-300 hover:bg-slate-800">
      <div className="flex-shrink-0">
         <div className={`w-12 h-12 rounded-full flex items-center justify-center ${categoryColors[goal.category] || 'bg-slate-700'}`}>
            <TargetIcon className="w-6 h-6" />
         </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
            <div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[goal.category] || 'bg-slate-700'}`}>{goal.category}</span>
                <h3 className="text-lg font-semibold text-slate-100 mt-1">{goal.title}</h3>
                <p className="text-sm text-slate-400">{goal.description}</p>
            </div>
            <div className="text-right flex-shrink-0 pl-4">
                <p className="text-2xl font-bold text-slate-100">{goal.progress}%</p>
                <p className="text-sm text-slate-400">Complete</p>
            </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5 mt-3">
          <div className={`${progressColors[goal.category]} h-2.5 rounded-full`} style={{ width: `${goal.progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
