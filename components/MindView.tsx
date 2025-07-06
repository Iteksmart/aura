import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { sendMessageStream } from '../services/geminiService';
import { SendIcon, BrainCircuitIcon } from './icons';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const MindView: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 'initial', role: 'model', text: "Hello, Alex. I am Aura. How can I help you optimize your life today?" }
    ]);
    const [input, setInput] = useState('');
    const [isResponding, setIsResponding] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isResponding) return;

        const userMessage: ChatMessage = { id: uuidv4(), role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsResponding(true);

        const modelMessageId = uuidv4();
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);
        
        await sendMessageStream(input, (chunk) => {
            setMessages(prev => prev.map(msg => 
                msg.id === modelMessageId 
                    ? { ...msg, text: msg.text + chunk } 
                    : msg
            ));
        });

        setIsResponding(false);
    };

    return (
        <div className="p-8 h-full bg-slate-900 flex flex-col">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-slate-100">Aura Mind</h1>
                <p className="text-slate-400 mt-1">Your personal AI, ready to chat.</p>
            </header>

            <div className="flex-1 overflow-y-auto pr-4 space-y-6">
                {messages.map((msg, index) => (
                    <div key={msg.id} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="w-10 h-10 bg-gradient-to-tr from-violet-500 to-cyan-400 rounded-full flex-shrink-0 flex items-center justify-center">
                                <BrainCircuitIcon className="w-6 h-6 text-white" />
                            </div>
                        )}
                        <div className={`max-w-xl p-4 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-br-lg' : 'bg-slate-800 text-slate-300 rounded-bl-lg'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}{isResponding && msg.role === 'model' && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse"></span>}</p>
                        </div>
                    </div>
                ))}
                 <div ref={messagesEndRef} />
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700/50">
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Aura anything..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pr-14 pl-5 py-4 text-white focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
                        disabled={isResponding}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isResponding}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-violet-600 text-white hover:bg-violet-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                    >
                        <SendIcon className="w-5 h-5"/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MindView;
