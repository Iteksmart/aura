
import React, { useState, useEffect } from 'react';
import { RelationshipContact } from '../types';
import { getRelationships } from '../services/geminiService';
import { UsersIcon, BrainCircuitIcon, UserIcon } from './icons';

interface RelationshipViewProps {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ContactCard: React.FC<{ contact: RelationshipContact, onAction: (msg: string) => void }> = ({ contact, onAction }) => (
    <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <img src={contact.avatarUrl} alt={contact.name} className="w-16 h-16 rounded-full border-2 border-slate-600 flex-shrink-0" />
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-100">{contact.name}</h3>
            <p className="text-sm text-violet-400 font-medium">{contact.role}</p>
            <p className="text-xs text-slate-400 mt-1">Last contact: {contact.lastContact}</p>
        </div>
        <div className="w-full sm:w-auto bg-slate-900/50 p-4 rounded-lg border border-slate-700 flex-1 sm:flex-initial">
             <div className="flex items-center gap-2 mb-2">
                <BrainCircuitIcon className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-semibold text-slate-300">Aura Suggestion</h4>
            </div>
            <p className="text-slate-300 text-sm mb-3">{contact.suggestion}</p>
            <button
                onClick={() => onAction(`Action for "${contact.suggestion}" has been initiated.`)}
                className="w-full text-center font-semibold py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors duration-200 text-sm">
                Take Action
            </button>
        </div>
    </div>
);


const RelationshipView: React.FC<RelationshipViewProps> = ({ addToast }) => {
    const [contacts, setContacts] = useState<RelationshipContact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            try {
                const data = await getRelationships();
                setContacts(data);
            } catch (error) {
                console.error("Failed to fetch relationship data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const handleActionClick = (message: string) => {
        addToast(message, 'success');
    }

    return (
        <div className="p-8 space-y-8 h-full bg-slate-900 overflow-y-auto">
            <header>
                <h1 className="text-4xl font-bold text-slate-100">Relationship Hub</h1>
                <p className="text-slate-400 mt-1">Nurture your network, powered by Aura.</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-4">
                {loading ? (
                    [...Array(4)].map((_, i) => <div key={i} className="h-28 bg-slate-800 rounded-xl animate-pulse"></div>)
                ) : contacts.length > 0 ? (
                    contacts.map(contact => (
                        <ContactCard key={contact.id} contact={contact} onAction={handleActionClick} />
                    ))
                ) : (
                    <div className="text-center p-10 bg-slate-800/60 rounded-xl border border-slate-700/50">
                        <UsersIcon className="w-12 h-12 mx-auto text-slate-500" />
                        <h3 className="mt-4 text-lg font-semibold text-white">No Contacts Found</h3>
                        <p className="mt-1 text-slate-400">Connect your contacts in Settings to start nurturing your network.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelationshipView;
