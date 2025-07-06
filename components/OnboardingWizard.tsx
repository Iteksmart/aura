
import React, { useState } from 'react';
import { BrainCircuitIcon, CalendarIcon, HeartPulseIcon, DollarSignIcon, TargetIcon, ShieldCheckIcon, CheckCircleIcon } from './icons';

interface OnboardingWizardProps {
  onComplete: () => void;
}

const steps = [
  { name: 'Welcome', icon: <BrainCircuitIcon className="w-8 h-8"/> },
  { name: 'Connect Calendar', icon: <CalendarIcon className="w-8 h-8"/> },
  { name: 'Connect Health', icon: <HeartPulseIcon className="w-8 h-8"/> },
  { name: 'Connect Finance', icon: <DollarSignIcon className="w-8 h-8"/> },
  { name: 'Set a Goal', icon: <TargetIcon className="w-8 h-8"/> },
  { name: 'Finalizing', icon: <CheckCircleIcon className="w-8 h-8"/> },
];

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [goal, setGoal] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const handleConnect = (callback: () => void) => {
    setIsConnecting(true);
    setTimeout(() => {
        setIsConnecting(false);
        callback();
    }, 1500);
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="text-3xl font-bold text-slate-100">Welcome to Aura</h2>
            <p className="text-slate-400 mt-2 max-w-md">Your AI Life Operating System. Let's connect your world to unlock proactive, personalized insights.</p>
             <div className="mt-6 flex items-center gap-3 bg-slate-800 p-4 rounded-lg border border-slate-700">
                <ShieldCheckIcon className="w-10 h-10 text-green-400 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-slate-200">Privacy First, Security Always</h3>
                    <p className="text-sm text-slate-400">Aura uses secure, industry-standard connections and you are always in control of your data.</p>
                </div>
            </div>
            <button onClick={handleNext} className="w-full mt-8 py-3 rounded-lg font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors">
              Get Started
            </button>
          </>
        );
      case 1:
      case 2:
      case 3:
        const integration = [
            { name: 'Calendar', subtitle: "So Aura can understand your schedule and commitments.", icon: <CalendarIcon className="w-10 h-10 text-blue-400"/>},
            { name: 'Health Data', subtitle: "To find patterns and optimize your energy and wellness.", icon: <HeartPulseIcon className="w-10 h-10 text-orange-400"/>},
            { name: 'Financial Accounts', subtitle: "Via Plaid for secure, read-only insights into your financial goals.", icon: <DollarSignIcon className="w-10 h-10 text-green-400"/>}
        ][currentStep-1];

        return (
            <>
                {integration.icon}
                <h2 className="text-3xl font-bold text-slate-100 mt-4">Connect Your {integration.name}</h2>
                <p className="text-slate-400 mt-2 max-w-md">{integration.subtitle}</p>
                <button 
                    onClick={() => handleConnect(handleNext)}
                    disabled={isConnecting}
                    className="w-full mt-8 py-3 rounded-lg font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors disabled:bg-slate-600 flex items-center justify-center gap-2"
                >
                    {isConnecting ? (
                        <>
                         <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                         <span>Connecting securely...</span>
                        </>
                    ) : `Connect ${integration.name}`}
                </button>
                <button onClick={handleNext} className="text-slate-500 hover:text-slate-300 mt-4 text-sm">
                    Skip for now
                </button>
            </>
        )

      case 4:
        return (
            <>
                <TargetIcon className="w-10 h-10 text-cyan-400"/>
                <h2 className="text-3xl font-bold text-slate-100 mt-4">What's one goal you have?</h2>
                <p className="text-slate-400 mt-2 max-w-md">This gives Aura an immediate anchor point to start helping you.</p>
                <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., Buy a house, learn to code..."
                    className="w-full mt-6 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
                />
                 <button onClick={() => handleConnect(handleNext)} disabled={!goal || isConnecting} className="w-full mt-4 py-3 rounded-lg font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors disabled:bg-slate-600">
                    {isConnecting ? 'Saving...' : 'Set Goal & Continue'}
                </button>
            </>
        );
    case 5:
        setTimeout(onComplete, 2500); // Auto-complete after showing this screen
        return (
            <>
                <div className="w-16 h-16 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
                <h2 className="text-3xl font-bold text-slate-100 mt-6">Aura is learning about your world...</h2>
                <p className="text-slate-400 mt-2 max-w-md">Your personalized Life OS is being calibrated. Get ready for optimization.</p>
            </>
        )
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg">
        <div className="flex justify-center gap-2 mb-8">
            {steps.map((step, index) => (
                <div key={step.name} className={`h-1.5 flex-1 rounded-full ${index <= currentStep ? 'bg-violet-500' : 'bg-slate-700'}`}></div>
            ))}
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center flex flex-col items-center">
            {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
