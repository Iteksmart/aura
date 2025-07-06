
import React from 'react';
import { BrainCircuitIcon } from './icons';

interface WellnessWidgetProps {
    insight: string;
    loading: boolean;
}

const WellnessWidget: React.FC<WellnessWidgetProps> = ({ insight, loading }) => {
  if (loading) {
      return <div className="h-32 bg-slate-800 rounded-xl animate-pulse"></div>
  }

  return (
    <section>
        <h2 className="text-2xl font-semibold text-slate-200 mb-4">Holistic Wellness</h2>
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-5 rounded-xl border border-cyan-500/30 flex items-start gap-5">
            <div className="flex-shrink-0 bg-cyan-500/10 p-3 rounded-full">
                <BrainCircuitIcon className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
                <h3 className="font-semibold text-slate-200 mb-1">Aura Insight</h3>
                <p className="text-slate-300 leading-relaxed">{insight}</p>
            </div>
        </div>
    </section>
  );
};

export default WellnessWidget;
