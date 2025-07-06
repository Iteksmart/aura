
import React from 'react';
import { ScheduleItem } from '../types';
import { CalendarDaysIcon } from './icons';

interface ScheduleWidgetProps {
    schedule: ScheduleItem[];
    loading: boolean;
}

const categoryColors: { [key: string]: string } = {
    Work: 'border-l-violet-500',
    Personal: 'border-l-sky-500',
    Wellness: 'border-l-green-500',
};

const ScheduleWidget: React.FC<ScheduleWidgetProps> = ({ schedule, loading }) => {
  return (
    <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50 h-full">
        <div className="flex items-center gap-3 mb-6">
            <CalendarDaysIcon className="w-6 h-6 text-slate-300"/>
            <h2 className="text-2xl font-semibold text-slate-200">Today's Agenda</h2>
        </div>
        <div className="space-y-4">
        {loading ? (
            [...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                    <div className="w-16 h-8 bg-slate-700 rounded animate-pulse"></div>
                    <div className="flex-1 h-8 bg-slate-700 rounded animate-pulse"></div>
                </div>
            ))
        ) : schedule.length > 0 ? (
            schedule.map((item, index) => (
                <div key={index} className={`pl-4 py-2 border-l-4 ${categoryColors[item.category] || 'border-l-slate-500'} bg-slate-900/50 rounded-r-lg`}>
                    <p className="text-sm font-medium text-slate-400">{item.time}</p>
                    <p className="font-semibold text-slate-100">{item.title}</p>
                </div>
            ))
        ) : (
            <p className="text-slate-400">Your schedule for today is clear.</p>
        )}
        </div>
    </div>
  );
};

export default ScheduleWidget;
