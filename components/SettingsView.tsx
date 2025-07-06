import React, { useState, useEffect } from 'react';
import { Toast } from '../types';
import { CheckCircleIcon, DollarSignIcon, GoogleIcon, HeartPulseIcon, LinkIcon, OuraIcon, SlackIcon, AppleIcon, MicrosoftIcon } from './icons';

interface SettingsViewProps {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

interface Integration {
  id: string;
  name: string;
  category: 'Productivity' | 'Health' | 'Finance';
  icon: React.ReactNode;
}

const availableIntegrations: Integration[] = [
  { id: 'google', name: 'Google Workspace', category: 'Productivity', icon: <GoogleIcon className="w-7 h-7" /> },
  { id: 'outlook', name: 'Microsoft Outlook', category: 'Productivity', icon: <MicrosoftIcon className="w-7 h-7 text-[#0078D4]" /> },
  { id: 'apple', name: 'Apple Calendar', category: 'Productivity', icon: <AppleIcon className="w-7 h-7 text-slate-300" /> },
  { id: 'slack', name: 'Slack', category: 'Productivity', icon: <SlackIcon className="w-7 h-7" /> },
  { id: 'oura', name: 'Oura Ring', category: 'Health', icon: <OuraIcon className="w-7 h-7" /> },
  { id: 'myfitnesspal', name: 'MyFitnessPal', category: 'Health', icon: <HeartPulseIcon className="w-7 h-7 text-sky-400" /> },
  { id: 'mint', name: 'Mint', category: 'Finance', icon: <DollarSignIcon className="w-7 h-7 text-green-400" /> },
];

const IntegrationCard: React.FC<{
  integration: Integration,
  apiKey: string | undefined,
  onSave: (id: string, key: string) => void,
  onDisconnect: (id: string) => void
}> = ({ integration, apiKey, onSave, onDisconnect }) => {
  
  const [keyInput, setKeyInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const isConnected = !!apiKey;

  const handleSave = () => {
    if (keyInput) {
      onSave(integration.id, keyInput);
      setIsEditing(false);
    }
  };
  
  const handleDisconnectClick = () => {
      onDisconnect(integration.id);
      setIsEditing(false);
      setKeyInput('');
  }

  const handleConnectClick = () => {
      setKeyInput(apiKey || '');
      setIsEditing(true);
  }

  return (
    <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/50 flex flex-col">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-700">{integration.icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{integration.name}</h3>
          <p className="text-sm text-slate-400">{integration.category}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
            {isConnected ? (
                <>
                    <CheckCircleIcon className="w-6 h-6 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Connected</span>
                </>
            ) : (
                <span className="text-sm font-medium text-slate-500">Not Connected</span>
            )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="mt-4 space-y-3">
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Enter API Key or use OAuth..."
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 rounded-md bg-slate-600 hover:bg-slate-500 text-white text-sm font-semibold">Cancel</button>
            {isConnected && <button onClick={handleDisconnectClick} className="px-3 py-1.5 rounded-md bg-red-600/80 hover:bg-red-600 text-white text-sm font-semibold">Disconnect</button>}
            <button onClick={handleSave} className="px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold">Save</button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-end">
            <button onClick={handleConnectClick} className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-semibold flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                <span>{isConnected ? 'Manage' : 'Connect'}</span>
            </button>
        </div>
      )}
    </div>
  );
};


const SettingsView: React.FC<SettingsViewProps> = ({ addToast }) => {
  const [apiKeys, setApiKeys] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    try {
      const storedKeys = localStorage.getItem('aura-api-keys');
      if (storedKeys) {
        setApiKeys(JSON.parse(storedKeys));
      }
    } catch (e) {
      console.error("Failed to parse API keys from localStorage", e);
    }
  }, []);

  const handleSaveKey = (id: string, key: string) => {
    const newKeys = { ...apiKeys, [id]: key };
    setApiKeys(newKeys);
    localStorage.setItem('aura-api-keys', JSON.stringify(newKeys));
    const integrationName = availableIntegrations.find(i => i.id === id)?.name || 'Integration';
    addToast(`${integrationName} connected successfully!`, 'success');
  };

  const handleDisconnect = (id: string) => {
    const { [id]: _, ...remainingKeys } = apiKeys;
    setApiKeys(remainingKeys);
    localStorage.setItem('aura-api-keys', JSON.stringify(remainingKeys));
    const integrationName = availableIntegrations.find(i => i.id === id)?.name || 'Integration';
    addToast(`${integrationName} has been disconnected.`, 'info');
  };
  
  const renderIntegrations = (category: Integration['category']) => (
     <div className="space-y-4">
        {availableIntegrations
          .filter(int => int.category === category)
          .map(int => (
            <IntegrationCard 
                key={int.id}
                integration={int}
                apiKey={apiKeys[int.id]}
                onSave={handleSaveKey}
                onDisconnect={handleDisconnect}
            />
          ))
        }
     </div>
  )

  return (
    <div className="p-8 space-y-8 h-full bg-slate-900 overflow-y-auto">
      <header>
        <h1 className="text-4xl font-bold text-slate-100">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your integrations and preferences.</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-10">
        <section>
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Productivity Integrations</h2>
            {renderIntegrations('Productivity')}
        </section>
        <section>
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Health Integrations</h2>
            {renderIntegrations('Health')}
        </section>
        <section>
            <h2 className="text-2xl font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Finance Integrations</h2>
            {renderIntegrations('Finance')}
        </section>
      </div>

    </div>
  );
};

export default SettingsView;