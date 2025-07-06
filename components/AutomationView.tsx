import React, { useState, useEffect } from 'react';
import { Automation } from '../types';
import { getAutomations } from '../services/geminiService';
import { ZapIcon, DollarSignIcon, HeartPulseIcon, ClipboardCheckIcon } from './icons';

interface AutomationViewProps {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  Finance: <DollarSignIcon className="w-6 h-6 text-green-400" />,
  Productivity: <ClipboardCheckIcon className="w-6 h-6 text-blue-400" />,
  Wellness: <HeartPulseIcon className="w-6 h-6 text-orange-400" />,
};

const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({ enabled, onToggle }) => (
    <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-violet-500 ${
            enabled ? 'bg-violet-600' : 'bg-slate-600'
        }`}
    >
        <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
    </button>
);


const AutomationCard: React.FC<{ automation: Automation, onToggle: (id: string) => void }> = ({ automation, onToggle }) => {
    return (
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/50 flex items-start gap-5">
            <div className="flex-shrink-0 mt-1">
                {categoryIcons[automation.category] || <ZapIcon className="w-6 h-6 text-slate-400" />}
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-slate-100">{automation.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{automation.description}</p>
            </div>
            <div className="flex-shrink-0">
                <ToggleSwitch enabled={automation.enabled} onToggle={() => onToggle(automation.id)} />
            </div>
        </div>
    );
};

const AutomationView: React.FC<AutomationViewProps> = ({ addToast }) => {
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAutomations = async () => {
            setLoading(true);
            const data = await getAutomations();
            setAutomations(data);
            setLoading(false);
        };
        fetchAutomations();
    }, []);

    const handleToggle = (id: string) => {
        setAutomations(prev =>
            prev.map(auto => {
                if (auto.id === id) {
                    const updatedAuto = { ...auto, enabled: !auto.enabled };
                    addToast(`${updatedAuto.title} has been ${updatedAuto.enabled ? 'enabled' : 'disabled'}.`, 'info');
                    return updatedAuto;
                }
                return auto;
            })
        );
    };

    const renderAutomations = (category: Automation['category']) => {
        const filtered = automations.filter(a => a.category === category);
        if (loading) {
             return [...Array(2)].map((_, i) => <div key={i} className="h-24 bg-slate-800 rounded-xl animate-pulse"></div>)
        }
        return filtered.map(auto => (
            <AutomationCard key={auto.id} automation={auto} onToggle={handleToggle} />
        ));
    }

    return (
        <div className="p-8 space-y-8 h-full bg-slate-900 overflow-y-auto">
            <header>
                <h1 className="text-4xl font-bold text-slate-100">Automations</h1>
                <p className="text-slate-400 mt-1">Let Aura handle the routine tasks, so you can focus on what matters.</p>
            </header>
            
            <div className="max-w-4xl mx-auto space-y-10">
                <section>
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Productivity</h2>
                    <div className="space-y-4 mt-4">
                        {renderAutomations('Productivity')}
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Finance</h2>
                     <div className="space-y-4 mt-4">
                        {renderAutomations('Finance')}
                    </div>
                </section>
                 <section>
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Wellness</h2>
                     <div className="space-y-4 mt-4">
                        {renderAutomations('Wellness')}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AutomationView;