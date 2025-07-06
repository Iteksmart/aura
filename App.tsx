
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { View, Toast as ToastType } from './types';
import GoalsView from './components/GoalsView';
import WellnessView from './components/WellnessView';
import FinanceView from './components/FinanceView';
import MindView from './components/MindView';
import SettingsView from './components/SettingsView';
import ToastContainer from './components/ToastContainer';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import AutomationView from './components/AutomationView';
import PricingView from './components/PricingView';
import RelationshipView from './components/RelationshipView';
import OnboardingWizard from './components/OnboardingWizard';
import LandingPage from './components/LandingPage';


const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState<boolean>(!sessionStorage.getItem('aura_session_entered'));
  const [isOnboarding, setIsOnboarding] = useState<boolean>(!localStorage.getItem('aura_onboarding_complete'));
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const handleEnterApp = () => {
    sessionStorage.setItem('aura_session_entered', 'true');
    setShowLanding(false);
  };

  const handleReturnToLanding = () => {
    setShowLanding(true);
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = uuidv4();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const completeOnboarding = () => {
    localStorage.setItem('aura_onboarding_complete', 'true');
    setIsOnboarding(false);
    addToast("Welcome to Aura! Your AI Life OS is now active.", 'success');
  }

  if (showLanding) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  if (isOnboarding) {
      return <OnboardingWizard onComplete={completeOnboarding} />
  }

  const renderView = () => {
    switch (activeView) {
      case View.Dashboard:
        return <Dashboard addToast={addToast} />;
      case View.Goals:
        return <GoalsView addToast={addToast}/>;
      case View.Wellness:
        return <WellnessView />;
      case View.Finance:
        return <FinanceView addToast={addToast}/>;
      case View.Mind:
        return <MindView />;
      case View.Automations:
        return <AutomationView addToast={addToast}/>;
      case View.Relationships:
        return <RelationshipView addToast={addToast}/>;
      case View.Settings:
        return <SettingsView addToast={addToast} />;
      case View.Pricing:
        return <PricingView setActiveView={setActiveView} />;
      default:
        return <Dashboard addToast={addToast} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 font-sans">
      <ToastContainer toasts={toasts} setToasts={setToasts} />
      <Sidebar activeView={activeView} setActiveView={setActiveView} addToast={addToast} onReturnToLanding={handleReturnToLanding} />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;