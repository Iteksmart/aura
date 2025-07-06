import React, { useState, useEffect } from 'react';
import { FinancialData, FinancialAccount, Transaction } from '../types';
import { getFinancialData } from '../services/geminiService';
import { DollarSignIcon, PiggyBankIcon, TargetIcon, BrainCircuitIcon, UserIcon } from './icons';

interface FinanceViewProps {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
        <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">{title}</span>
            <div className="text-slate-500">{icon}</div>
        </div>
        <p className="text-3xl font-bold text-slate-100 mt-2">{value}</p>
    </div>
);

const ReferralCard: React.FC<{addToast: FinanceViewProps['addToast']}> = ({addToast}) => {
    return (
        <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 p-5 rounded-xl border border-violet-500/30 flex items-start gap-5">
            <div className="flex-shrink-0 bg-violet-500/10 p-3 rounded-full">
                <UserIcon className="w-6 h-6 text-violet-300" />
            </div>
            <div>
                <h3 className="font-semibold text-slate-200 mb-1">Accelerate Your Goals</h3>
                <p className="text-slate-300 leading-relaxed text-sm">Your financial profile is strong. Connect with a vetted financial advisor to optimize your 'Buy a House' strategy.</p>
                <button 
                    onClick={() => addToast('We are connecting you with top-rated advisors!', 'info')}
                    className="mt-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                    Find an Advisor
                </button>
            </div>
        </div>
    )
}

const FinanceView: React.FC<FinanceViewProps> = ({ addToast }) => {
    const [data, setData] = useState<FinancialData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const financialData = await getFinancialData();
                setData(financialData);
            } catch (error) {
                console.error("Failed to fetch financial data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    if (loading) {
        return <div className="p-8"><div className="w-full h-64 bg-slate-800 rounded-xl animate-pulse"></div></div>;
    }

    if (!data) {
        return <div className="p-8 text-center text-slate-400">Could not load financial data.</div>;
    }

    return (
        <div className="p-8 space-y-8 h-full bg-slate-900 overflow-y-auto">
            <header>
                <h1 className="text-4xl font-bold text-slate-100">Financial Overview</h1>
                <p className="text-slate-400 mt-1">Your financial health, analyzed by Aura.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Net Worth" value={formatCurrency(data.netWorth)} icon={<DollarSignIcon className="w-6 h-6"/>} />
                <StatCard title="Savings Rate" value={`${data.savingsRate}%`} icon={<PiggyBankIcon className="w-6 h-6"/>} />
                <StatCard title="Credit Score" value={data.creditScore} icon={<TargetIcon className="w-6 h-6"/>} />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-8">
                     <section>
                        <h2 className="text-2xl font-semibold text-slate-200 mb-4">Accounts</h2>
                        <div className="space-y-4">
                            {data.accounts.map(acc => (
                                <div key={acc.id} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-slate-100">{acc.name}</p>
                                        <p className="text-sm text-slate-400">{acc.type}</p>
                                    </div>
                                    <p className="font-bold text-xl text-slate-100">{formatCurrency(acc.balance)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                     <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-5 rounded-xl border border-green-500/30 flex items-start gap-5">
                        <div className="flex-shrink-0 bg-green-500/10 p-3 rounded-full">
                            <BrainCircuitIcon className="w-6 h-6 text-green-300" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-200 mb-1">Aura's Financial Tip</h3>
                            <p className="text-slate-300 leading-relaxed">{data.insight}</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-8">
                     <section className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50 h-full">
                        <h2 className="text-2xl font-semibold text-slate-200 mb-6">Recent Transactions</h2>
                        <div className="space-y-5">
                            {data.transactions.map(t => (
                                <div key={t.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-slate-200">{t.description}</p>
                                        <p className="text-sm text-slate-400">{t.date}</p>
                                    </div>
                                    <p className={`font-semibold ${t.amount > 0 ? 'text-green-400' : 'text-slate-300'}`}>
                                        {t.amount > 0 ? `+${formatCurrency(t.amount)}` : formatCurrency(t.amount)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <ReferralCard addToast={addToast} />
                </div>
            </div>
        </div>
    );
};

export default FinanceView;