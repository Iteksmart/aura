import React, { useState, useEffect } from 'react';
import { WellnessData } from '../types';
import { getWellnessData, getWellnessInsight } from '../services/geminiService';
import { HeartPulseIcon, BedIcon, FootprintsIcon, BrainCircuitIcon } from './icons';

const WellnessMetricCard: React.FC<{ title: string; value: string; subtext: string; icon: React.ReactNode; color: string; }> = ({ title, value, subtext, icon, color }) => (
    <div className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 flex items-center gap-5`}>
        <div className={`p-3 rounded-full bg-${color}-500/10 text-${color}-400`}>
            {icon}
        </div>
        <div>
            <span className="text-slate-400 font-medium">{title}</span>
            <p className="text-3xl font-bold text-slate-100">{value}</p>
            <p className="text-sm text-slate-500">{subtext}</p>
        </div>
    </div>
);

const BarChart: React.FC<{ data: { day: string; value: number }[]; color: string; label: string }> = ({ data, color, label }) => (
    <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50">
        <h3 className="font-semibold text-slate-200 mb-4">{label}</h3>
        <div className="flex justify-between items-end gap-3 h-32">
            {data.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-700 rounded-md h-full flex items-end">
                        <div className={`w-full bg-${color}-500 rounded-md`} style={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-400">{item.day}</span>
                </div>
            ))}
        </div>
    </div>
);

const WellnessView: React.FC = () => {
    const [wellnessData, setWellnessData] = useState<WellnessData | null>(null);
    const [insight, setInsight] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [data, insightData] = await Promise.all([getWellnessData(), getWellnessInsight()]);
                setWellnessData(data);
                setInsight(insightData);
            } catch (error) {
                console.error("Failed to fetch wellness data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8"><div className="w-full h-64 bg-slate-800 rounded-xl animate-pulse"></div></div>;
    }

    if (!wellnessData) {
        return <div className="p-8 text-center text-slate-400">Could not load wellness data.</div>;
    }

    return (
        <div className="p-8 space-y-8 h-full bg-slate-900 overflow-y-auto">
            <header>
                <h1 className="text-4xl font-bold text-slate-100">Wellness Hub</h1>
                <p className="text-slate-400 mt-1">A holistic view of your physical and mental well-being.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <WellnessMetricCard title="Sleep" value={`${wellnessData.sleep.hours}h`} subtext={`${wellnessData.sleep.quality}% quality`} icon={<BedIcon className="w-7 h-7"/>} color="blue" />
                <WellnessMetricCard title="Activity" value={wellnessData.activity.steps.toLocaleString()} subtext="steps today" icon={<FootprintsIcon className="w-7 h-7"/>} color="green" />
                <WellnessMetricCard title="Stress Index" value={`${wellnessData.stress.level}`} subtext={`trend is ${wellnessData.stress.trend}`} icon={<HeartPulseIcon className="w-7 h-7"/>} color="orange" />
            </section>
            
            <section className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30 flex items-start gap-5">
                <div className="flex-shrink-0 bg-cyan-500/10 p-3 rounded-full">
                    <BrainCircuitIcon className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-200 mb-1">Aura's Holistic Insight</h3>
                    <p className="text-slate-300 leading-relaxed">{insight}</p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <BarChart data={wellnessData.weeklySleep.map(d => ({...d, value: d.hours}))} color="blue" label="Weekly Sleep (hours)" />
                 <BarChart data={wellnessData.weeklyActivity.map(d => ({...d, value: d.steps}))} color="green" label="Weekly Activity (steps)" />
            </section>
        </div>
    );
};

export default WellnessView;