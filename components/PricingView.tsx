
import React from 'react';
import { View } from '../types';
import { CheckCircleIcon, SparklesIcon } from './icons';

interface PricingViewProps {
  setActiveView: (view: View) => void;
}

const Feature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center gap-3">
    <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
    <span className="text-slate-300">{children}</span>
  </li>
);

const PricingCard: React.FC<{
  plan: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}> = ({ plan, price, description, features, isPopular = false }) => (
  <div
    className={`relative bg-slate-800/60 p-8 rounded-2xl border ${
      isPopular ? 'border-violet-500' : 'border-slate-700'
    }`}
  >
    {isPopular && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <span className="bg-violet-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">
          Most Popular
        </span>
      </div>
    )}
    <h3 className="text-2xl font-semibold text-white">{plan}</h3>
    <p className="text-slate-400 mt-2">{description}</p>
    <div className="mt-6">
      <span className="text-5xl font-bold text-white">{price}</span>
      <span className="text-slate-400 font-medium">/ month</span>
    </div>
    <ul className="mt-8 space-y-4">
      {features.map((feature, i) => (
        <Feature key={i}>{feature}</Feature>
      ))}
    </ul>
    <button
      className={`w-full mt-10 py-3 rounded-lg font-semibold transition-colors ${
        isPopular
          ? 'bg-violet-600 hover:bg-violet-500 text-white'
          : 'bg-slate-700 hover:bg-slate-600 text-slate-100'
      }`}
    >
      {isPopular ? 'Upgrade to Pro' : 'Choose Plan'}
    </button>
  </div>
);

const PricingView: React.FC<PricingViewProps> = ({ setActiveView }) => {
  return (
    <div className="p-8 h-full bg-slate-900 overflow-y-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-slate-100">Find the right plan for you</h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          Start for free, then unlock the full power of an AI life-operating system. Aura is built to give you back time and mental clarity.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingCard
          plan="Freemium"
          price="$0"
          description="The essentials to get started with a unified dashboard."
          features={[
            'Unified Dashboard',
            'Connect up to 3 apps',
            '5 AI Suggestions per day',
            'Basic Goal Tracking',
          ]}
        />
        <PricingCard
          plan="Aura Pro"
          price="$20"
          description="For the individual who wants to fully optimize their life."
          features={[
            'Everything in Freemium, plus:',
            'Unlimited app integrations',
            'Unlimited AI proactive suggestions',
            'Advanced Goal Decomposition Engine',
            'Holistic Wellness Insights',
            'Priority Support',
          ]}
          isPopular
        />
        <PricingCard
          plan="Aura Family"
          price="$30"
          description="Manage and coordinate your entire family's operating system."
          features={[
            'Everything in Pro, plus:',
            'Up to 5 family members',
            'Shared family dashboard',
            'Collaborative goals & tasks',
            'Unified family calendar',
          ]}
        />
      </div>
       <div className="text-center mt-12">
            <button onClick={() => setActiveView(View.Dashboard)} className="text-slate-400 hover:text-white transition-colors">
                &larr; Back to Dashboard
            </button>
        </div>
    </div>
  );
};

export default PricingView;
