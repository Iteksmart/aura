
import React from 'react';
import { View } from '../types';
import { HomeIcon, TargetIcon, HeartPulseIcon, DollarSignIcon, BrainCircuitIcon, SettingsIcon, LogOutIcon, ZapIcon, SparklesIcon, UsersIcon } from './icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onReturnToLanding: () => void;
}

const NavItem: React.FC<{
  view: View;
  activeView: View;
  setActiveView: (view: View) => void;
  children: React.ReactNode;
  label: string;
}> = ({ view, activeView, setActiveView, children, label }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-violet-600 text-white shadow-lg'
          : 'text-slate-400 hover:bg-slate-700 hover:text-white'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
      <span className="ml-4 font-medium">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, addToast, onReturnToLanding }) => {
  
  const handleUpgradeClick = () => {
    setActiveView(View.Pricing);
  }

  return (
    <div className="w-64 h-full bg-slate-800/50 backdrop-blur-sm p-4 flex flex-col border-r border-slate-700/50">
      <button onClick={onReturnToLanding} className="flex items-center mb-10 px-2 text-left w-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg">
        <div className="w-10 h-10 bg-gradient-to-tr from-violet-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
            <BrainCircuitIcon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold ml-3 text-slate-100">Aura</h1>
      </button>

      <nav className="flex-1 flex flex-col gap-2">
        <NavItem view={View.Dashboard} activeView={activeView} setActiveView={setActiveView} label="Dashboard">
          <HomeIcon className="w-6 h-6" />
        </NavItem>
        <NavItem view={View.Goals} activeView={activeView} setActiveView={setActiveView} label="Goals">
          <TargetIcon className="w-6 h-6" />
        </NavItem>
        <NavItem view={View.Wellness} activeView={activeView} setActiveView={setActiveView} label="Wellness">
          <HeartPulseIcon className="w-6 h-6" />
        </NavItem>
        <NavItem view={View.Finance} activeView={activeView} setActiveView={setActiveView} label="Finance">
          <DollarSignIcon className="w-6 h-6" />
        </NavItem>
         <NavItem view={View.Relationships} activeView={activeView} setActiveView={setActiveView} label="Relationships">
          <UsersIcon className="w-6 h-6" />
        </NavItem>
        <NavItem view={View.Automations} activeView={activeView} setActiveView={setActiveView} label="Automations">
          <ZapIcon className="w-6 h-6" />
        </NavItem>
        <NavItem view={View.Mind} activeView={activeView} setActiveView={setActiveView} label="Aura Mind">
          <BrainCircuitIcon className="w-6 h-6" />
        </NavItem>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <div className="bg-gradient-to-tr from-violet-500/30 to-cyan-400/30 p-4 rounded-lg text-center border border-violet-500/50">
            <SparklesIcon className="w-8 h-8 mx-auto text-yellow-300" />
            <h3 className="text-white font-semibold mt-2">Upgrade to Pro</h3>
            <p className="text-slate-300 text-sm mt-1">Unlock the full power of Aura AI.</p>
            <button 
                onClick={handleUpgradeClick}
                className="w-full mt-4 bg-white/90 hover:bg-white text-slate-900 font-bold py-2 rounded-md text-sm transition-colors">
                Upgrade Now
            </button>
        </div>

         <NavItem view={View.Settings} activeView={activeView} setActiveView={setActiveView} label="Settings">
            <SettingsIcon className="w-6 h-6" />
         </NavItem>
         <button
            onClick={() => addToast('You have been logged out.', 'info')}
            className="flex items-center w-full px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200"
         >
            <LogOutIcon className="w-6 h-6" />
            <span className="ml-4 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;