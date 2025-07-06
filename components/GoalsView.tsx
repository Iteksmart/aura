import React, { useState, useEffect } from 'react';
import { Goal, GoalStep } from '../types';
import { getGoals, decomposeGoal, addGoal } from '../services/geminiService';
import GoalCard from './GoalCard';
import { BrainCircuitIcon, CheckCircleIcon, PlusIcon, TargetIcon, BookOpenIcon } from './icons';

interface GoalsViewProps {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const CourseSuggestionCard: React.FC<{goalTitle: string, addToast: GoalsViewProps['addToast']}> = ({ goalTitle, addToast }) => (
    <div className="mt-4 bg-gradient-to-r from-sky-500/20 to-blue-500/20 p-5 rounded-xl border border-sky-500/30 flex items-start gap-5">
        <div className="flex-shrink-0 bg-sky-500/10 p-3 rounded-full">
            <BookOpenIcon className="w-6 h-6 text-sky-300" />
        </div>
        <div>
            <h3 className="font-semibold text-slate-200 mb-1">Level Up Your Skills</h3>
            <p className="text-slate-300 leading-relaxed text-sm">Based on your goal to "{goalTitle}", I've found a top-rated course that fits your learning style.</p>
            <button
                onClick={() => addToast('Enrolling you in the top-rated Python course!', 'success')} 
                className="mt-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                Enroll with One Click
            </button>
        </div>
    </div>
);


const GoalsView: React.FC<GoalsViewProps> = ({ addToast }) => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [decomposedSteps, setDecomposedSteps] = useState<GoalStep[]>([]);
    const [decomposedGoalTitle, setDecomposedGoalTitle] = useState('');
    const [isDecomposing, setIsDecomposing] = useState(false);
    const [loadingGoals, setLoadingGoals] = useState(true);

    const fetchGoals = async () => {
        setLoadingGoals(true);
        const fetchedGoals = await getGoals();
        setGoals(fetchedGoals);
        setLoadingGoals(false);
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const handleDecompose = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoalTitle) return;

        setIsDecomposing(true);
        setDecomposedSteps([]);
        setDecomposedGoalTitle(newGoalTitle);

        const steps = await decomposeGoal(newGoalTitle);
        setDecomposedSteps(steps);

        await addGoal({
            title: newGoalTitle,
            category: 'Skills', // Default category for new goals
            description: 'A newly set ambition, ready to be tackled.'
        });
        await fetchGoals(); // Re-fetch goals to include the new one
        setIsDecomposing(false);
        addToast(`New goal "${newGoalTitle}" has been added!`, 'success')
        setNewGoalTitle('');
    };

    const toggleStep = (id: string) => {
        setDecomposedSteps(steps =>
            steps.map(step =>
                step.id === id ? { ...step, completed: !step.completed } : step
            )
        );
    };
    
    return (
        <div className="p-8 space-y-8 h-full bg-slate-900 overflow-y-auto">
            <header>
                <h1 className="text-4xl font-bold text-slate-100">Goal Navigator</h1>
                <p className="text-slate-400 mt-1">Define your ambitions, and let Aura chart the course.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50 space-y-6">
                    <div className="flex items-center gap-3">
                        <BrainCircuitIcon className="w-8 h-8 text-violet-400" />
                        <h2 className="text-2xl font-semibold text-slate-200">Goal Decomposition Engine</h2>
                    </div>
                    <form onSubmit={handleDecompose} className="space-y-4">
                        <div>
                            <label htmlFor="goal-title" className="block text-sm font-medium text-slate-300 mb-2">
                                What is your next major goal?
                            </label>
                            <input
                                type="text"
                                id="goal-title"
                                value={newGoalTitle}
                                onChange={(e) => setNewGoalTitle(e.target.value)}
                                placeholder="e.g., Learn Python for Data Science"
                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
                                disabled={isDecomposing}
                            />
                        </div>
                        <button type="submit" disabled={isDecomposing || !newGoalTitle} className="w-full flex justify-center items-center gap-2 font-semibold py-3 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed">
                            {isDecomposing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                    <span>Aura is Planning...</span>
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="w-5 h-5"/>
                                    <span>Decompose & Add Goal</span>
                                </>
                            )}
                        </button>
                    </form>
                    {decomposedSteps.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-slate-700">
                             <h3 className="font-semibold text-slate-200">Your Action Plan for "{decomposedGoalTitle}":</h3>
                             {decomposedSteps.map(step => (
                                 <div key={step.id} onClick={() => toggleStep(step.id)} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${step.completed ? 'bg-green-500/10 text-slate-400' : 'bg-slate-700/50 hover:bg-slate-700'}`}>
                                     <CheckCircleIcon className={`w-6 h-6 flex-shrink-0 transition-colors ${step.completed ? 'text-green-400' : 'text-slate-500'}`} />
                                     <span className={`flex-1 ${step.completed ? 'line-through' : ''}`}>{step.description}</span>
                                 </div>
                             ))}
                             {decomposedGoalTitle.toLowerCase().includes('learn') && (
                                <CourseSuggestionCard goalTitle={decomposedGoalTitle} addToast={addToast} />
                             )}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <TargetIcon className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-2xl font-semibold text-slate-200">Your Core Goals</h2>
                    </div>
                    <div className="space-y-4">
                        {loadingGoals ? (
                            [...Array(2)].map((_, i) => <div key={i} className="h-24 bg-slate-800 rounded-xl animate-pulse"></div>)
                        ) : goals.length > 0 ? (
                            goals.map(goal => <GoalCard key={goal.id} goal={goal} />)
                        ) : (
                            <div className="text-center text-slate-400 p-8 bg-slate-800/60 rounded-xl border border-slate-700/50">
                                <p>Use the Decomposition Engine to add your first goal.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalsView;