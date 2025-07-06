
export enum View {
  Dashboard = 'dashboard',
  Goals = 'goals',
  Wellness = 'wellness',
  Finance = 'finance',
  Mind = 'mind',
  Automations = 'automations',
  Settings = 'settings',
  Pricing = 'pricing',
  Relationships = 'relationships',
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  description: string;
}

export interface GoalStep {
    id: string;
    description: string;
    completed: boolean;
}

export interface ProactiveSuggestion {
  id:string;
  title: string;
  description: string;
  action: string;
  icon: 'calendar' | 'meditation' | 'budget' | 'task' | 'user' | 'briefcase';
  color: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  category: 'Work' | 'Personal' | 'Wellness';
}

export interface FinancialAccount {
    id: string;
    name: string;
    type: 'Checking' | 'Savings' | 'Investment';
    balance: number;
}

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: 'Income' | 'Housing' | 'Food' | 'Utilities' | 'Entertainment' | 'Shopping';
}

export interface FinancialData {
    netWorth: number;
    savingsRate: number;
    creditScore: number;
    accounts: FinancialAccount[];
    transactions: Transaction[];
    insight: string;
}

export interface WellnessData {
    sleep: { hours: number; quality: number };
    activity: { steps: number; goal: number };
    stress: { level: number; trend: 'up' | 'down' | 'stable' };
    weeklySleep: { day: string; hours: number }[];
    weeklyActivity: { day: string; steps: number }[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Automation {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    category: 'Finance' | 'Productivity' | 'Wellness';
}

export interface RelationshipContact {
  id: string;
  name: string;
  role: string;
  lastContact: string;
  suggestion: string;
  avatarUrl: string;
}
