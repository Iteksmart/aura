import React, { useState, useEffect } from 'react';
import { ProactiveSuggestion, Goal, ScheduleItem } from '../types';
import { getProactiveSuggestions, getGoals, getWellnessInsight, getSchedule } from '../services/geminiService';
import ProactiveSuggestionCard from './ProactiveSuggestionCard';
import GoalCard from './GoalCard';
import WellnessWidget from './WellnessWidget';
import ScheduleWidget from './ScheduleWidget';

interface DashboardProps {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ addToast }) => {
  const [suggestions, setSuggestions] = useState<ProactiveSuggestion[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [wellnessInsight, setWellnessInsight] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sugg, goalsData, insight, scheduleData] = await Promise.all([
          getProactiveSuggestions(),
          getGoals(),
          getWellnessInsight(),
          getSchedule(),
        ]);
        setSuggestions(sugg);
        setGoals(goalsData);
        setWellnessInsight(insight);
        setSchedule(scheduleData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8 h-full bg-slate-900 overflow-y-auto">
      <header>
        <h1 className="text-4xl font-bold text-slate-100">Welcome back, Alex</h1>
        <p className="text-slate-400 mt-1">Here is your life, optimized by Aura.</p>
      </header>

      {/* Proactive Suggestions */}
      <section>
        <h2 className="text-2xl font-semibold text-slate-200 mb-4">Aura's Suggestions for You</h2>
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-slate-800 rounded-xl animate-pulse"></div>)}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map(suggestion => (
                <ProactiveSuggestionCard key={suggestion.id} suggestion={suggestion} addToast={addToast} />
            ))}
            </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Goals */}
            <section>
                <h2 className="text-2xl font-semibold text-slate-200 mb-4">Your Core Goals</h2>
                <div className="space-y-4">
                    {loading ? (
                        [...Array(2)].map((_, i) => <div key={i} className="h-24 bg-slate-800 rounded-xl animate-pulse"></div>)
                    ) : goals.length > 0 ? (
                        goals.map(goal => <GoalCard key={goal.id} goal={goal} />)
                    ) : (
                         <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-700/50 text-center text-slate-400">
                            <h3 className="text-lg font-semibold text-white">Set Your Ambitions</h3>
                            <p className="mt-2">You haven't set any goals yet. Go to the 'Goals' tab to let Aura help you plan your future.</p>
                        </div>
                    )}
                </div>
            </section>

             {/* Wellness Insight */}
            <WellnessWidget insight={wellnessInsight} loading={loading} />

        </div>
        <div className="lg:col-span-1">
            {/* Schedule */}
            <ScheduleWidget schedule={schedule} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;