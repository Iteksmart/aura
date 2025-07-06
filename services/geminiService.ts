
import { ProactiveSuggestion, Goal, ScheduleItem, GoalStep, FinancialData, WellnessData, ChatMessage, Automation, RelationshipContact } from '../types';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// This is a mock service. In a real application, you would import and use @google/genai.
// import { GoogleGenAI } from "@google/genai";
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MOCK_SUGGESTIONS: ProactiveSuggestion[] = [
  { id: 's1', title: 'Presentation Prep', description: "You have the 'Project Phoenix' presentation at 10 AM. Your sleep was restless last night, so I've blocked 30 mins now to review your notes.", action: 'Start Review', icon: 'briefcase', color: 'orange' },
  { id: 's5', title: 'New Task from Email', description: "Jane Doe from accounting asked for the 'Q3 Financial Report'. I can add this to your task list with a due date of EOD Friday.", action: 'Create Task', icon: 'task', color: 'blue' },
  { id: 's2', title: 'Prepare for your 2 PM meeting', description: 'You have a stressful meeting with the leadership team. I suggest a 10-minute mindfulness session at 1:45 PM to help you focus.', action: 'Add to Calendar', icon: 'meditation', color: 'purple' },
  { id: 's4', title: 'Reconnect with your network', description: "You haven't spoken to your mentor, Sarah, in 3 months. I found an article about AI ethics she might like.", action: 'Draft Email', icon: 'user', color: 'yellow'},
  { id: 's3', title: 'Optimize weekly budget', description: "You're slightly behind on your savings goal. We can get back on track by reducing daily coffee purchases by $3.", action: 'Adjust Budget', icon: 'budget', color: 'green' },
];

let MOCK_GOALS: Goal[] = [
    { id: 'g1', title: 'Buy a House in 3 Years', category: 'Financial', progress: 25, description: 'Current savings target: $400/month increase.' },
    { id: 'g2', title: 'Run a Half-Marathon', category: 'Fitness', progress: 60, description: 'Next long run: 8 miles on Saturday.' },
];

const MOCK_AUTOMATIONS: Automation[] = [
    { id: 'auto1', title: 'Pay Credit Card Bill', description: 'Automatically pays the minimum balance on your primary credit card 3 days before the due date.', enabled: true, category: 'Finance' },
    { id: 'auto2', title: 'Schedule Weekly Review', description: 'Books a 30-minute slot in your calendar every Sunday evening for a weekly review.', enabled: true, category: 'Productivity' },
    { id: 'auto3', title: 'Grocery List Creation', description: 'Drafts a grocery list in your notes app based on your meal plan and past purchases every Friday.', enabled: false, category: 'Productivity' },
    { id: 'auto4', title: 'Wish Happy Birthday', description: 'Reminds you to send a birthday wish to contacts from your calendar on their special day.', enabled: true, category: 'Productivity' },
    { id: 'auto5', title: 'Log Daily Meditation', description: 'Automatically logs a 10-minute meditation session in your wellness journal when you complete it.', enabled: false, 'category': 'Wellness'},
];


const MOCK_SCHEDULE: ScheduleItem[] = [
    { time: '10:00 AM', title: 'Project Phoenix Presentation', category: 'Work' },
    { time: '12:30 PM', title: 'Lunch with Sarah', category: 'Personal' },
    { time: '02:00 PM', title: 'Leadership Team Sync', category: 'Work' },
    { time: '04:00 PM', title: 'Dentist Appointment', category: 'Personal' },
    { time: '07:00 PM', title: 'Evening Gym Session', category: 'Wellness' },
];

const MOCK_RELATIONSHIPS: RelationshipContact[] = [
  { id: 'r1', name: 'Sarah Chen', role: 'Mentor | Google AI', lastContact: '3 months ago', suggestion: 'Share article on AI ethics', avatarUrl: `https://i.pravatar.cc/150?u=sarah` },
  { id: 'r2', name: 'James Maxwell', role: 'Project Lead', lastContact: 'Yesterday', suggestion: 'Follow up on Project Phoenix feedback', avatarUrl: `https://i.pravatar.cc/150?u=james` },
  { id: 'r3', name: 'Mom', role: 'Family', lastContact: '5 days ago', suggestion: 'Call to check in', avatarUrl: `https://i.pravatar.cc/150?u=mom` },
  { id: 'r4', name: 'Dr. Evans', role: 'Dentist', lastContact: '6 months ago', suggestion: 'Schedule bi-annual check-up', avatarUrl: `https://i.pravatar.cc/150?u=dr_evans` },
  { id: 'r5', name: 'Alex Thompson', role: 'College Friend', lastContact: '1 month ago', suggestion: 'Wish happy birthday tomorrow', avatarUrl: `https://i.pravatar.cc/150?u=alex` }
];

const MOCK_FINANCIAL_DATA: FinancialData = {
    netWorth: 78450.00,
    savingsRate: 18,
    creditScore: 760,
    accounts: [
        { id: 'acc1', name: 'Main Checking', type: 'Checking', balance: 5230.50 },
        { id: 'acc2', name: 'High-Yield Savings', type: 'Savings', balance: 25100.00 },
        { id: 'acc3', name: 'Retirement Fund', type: 'Investment', balance: 48119.50 },
    ],
    transactions: [
        { id: 't1', description: 'Salary Deposit', amount: 2500, date: '2 days ago', category: 'Income' },
        { id: 't2', description: 'Whole Foods Market', amount: -124.3, date: '3 days ago', category: 'Food' },
        { id: 't3', description: 'Rent Payment', amount: -1800, date: '4 days ago', category: 'Housing' },
        { id: 't4', description: 'Netflix Subscription', amount: -15.99, date: '5 days ago', category: 'Entertainment' },
        { id: 't5', description: 'Nike Store', amount: -189.50, date: '6 days ago', category: 'Shopping' },
    ],
    insight: "Your savings rate is strong at 18%. To accelerate your 'Buy a House' goal, consider automating an additional $100 transfer to your High-Yield Savings account each payday."
};

const MOCK_WELLNESS_DATA: WellnessData = {
    sleep: { hours: 5.5, quality: 78 },
    activity: { steps: 8204, goal: 10000 },
    stress: { level: 34, trend: 'down' },
    weeklySleep: [
        { day: 'M', hours: 6.5 }, { day: 'T', hours: 7 }, { day: 'W', hours: 8 },
        { day: 'T', hours: 6 }, { day: 'F', hours: 5.5 }, { day: 'S', hours: 8.5 },
        { day: 'S', hours: 7 },
    ],
    weeklyActivity: [
        { day: 'M', steps: 7500 }, { day: 'T', steps: 9000 }, { day: 'W', steps: 6000 },
        { day: 'T', steps: 11000 }, { day: 'F', steps: 8204 }, { day: 'S', steps: 12500 },
        { day: 'S', steps: 7000 },
    ],
};

// Simulates fetching proactive suggestions
export const getProactiveSuggestions = async (): Promise<ProactiveSuggestion[]> => {
    // Return a shuffled array to make it feel more dynamic
    const shuffled = [...MOCK_SUGGESTIONS].sort(() => 0.5 - Math.random());
    return new Promise(res => setTimeout(() => res(shuffled.slice(0, 3)), 800));
}

// Simulates fetching goals
export const getGoals = async (): Promise<Goal[]> => new Promise(res => setTimeout(() => res([...MOCK_GOALS]), 500));

// Simulates adding a new goal
export const addGoal = async (goal: Omit<Goal, 'id' | 'progress'>): Promise<Goal> => {
    const newGoal: Goal = { ...goal, id: uuidv4(), progress: 0 };
    MOCK_GOALS.push(newGoal);
    return new Promise(res => setTimeout(() => res(newGoal), 400));
}

// Simulates decomposing a goal into steps using AI
export const decomposeGoal = async (goalTitle: string): Promise<GoalStep[]> => {
    console.log(`Decomposing goal: ${goalTitle}`);
    // In a real app:
    /*
    const prompt = `Break down the goal "${goalTitle}" into 5-7 actionable, verifiable steps for a beginner. Format as JSON: {steps: [{id, description, completed: false}]}`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash-preview-04-17', contents: prompt, config: { responseMimeType: "application/json" } });
    // ... parsing logic ...
    return JSON.parse(jsonStr).steps;
    */
    const mockSteps: GoalStep[] = [
        { id: uuidv4(), description: 'Define clear, measurable objectives for the goal.', completed: false },
        { id: uuidv4(), description: 'Research and gather necessary information.', completed: false },
        { id: uuidv4(), description: 'Create a timeline with key milestones.', completed: false },
        { id: uuidv4(), description: 'Allocate resources (time, money, tools).', completed: false },
        { id: 'g-step-5', description: 'Execute the first task to build momentum.', completed: false },
        { id: 'g-step-6', description: 'Set up a weekly review to track progress.', completed: false },
    ];
    return new Promise(res => setTimeout(() => res(mockSteps), 1500));
};


// Simulates fetching schedule
export const getSchedule = async (): Promise<ScheduleItem[]> => new Promise(res => setTimeout(() => res(MOCK_SCHEDULE), 300));

// Simulates fetching a holistic wellness insight
export const getWellnessInsight = async (): Promise<string> => new Promise(res => setTimeout(() => res("I've noticed when you sleep less than 6.5 hours, your productivity on cognitive tasks drops by 18% the next day. I've rescheduled your 6 AM gym session to 7 AM to ensure you get more rest."), 1200));

// Simulates fetching financial data
export const getFinancialData = async (): Promise<FinancialData> => new Promise(res => setTimeout(() => res(MOCK_FINANCIAL_DATA), 1000));

// Simulates fetching wellness data
export const getWellnessData = async (): Promise<WellnessData> => new Promise(res => setTimeout(() => res(MOCK_WELLNESS_DATA), 900));

// Simulates fetching automations
export const getAutomations = async (): Promise<Automation[]> => new Promise(res => setTimeout(() => res(MOCK_AUTOMATIONS), 600));

// Simulates fetching relationship contacts
export const getRelationships = async (): Promise<RelationshipContact[]> => new Promise(res => setTimeout(() => res(MOCK_RELATIONSHIPS), 700));

// Simulates a streaming chat response
export const sendMessageStream = async (message: string, onChunk: (chunk: string) => void): Promise<void> => {
    console.log(`Sending message: ${message}`);
    // In a real app:
    /*
    const chat = ai.chats.create({ model: 'gemini-2.5-flash-preview-04-17' });
    const response = await chat.sendMessageStream({ message });
    for await (const chunk of response) {
        onChunk(chunk.text);
    }
    */
    const response = "Of course. Based on your request, I've analyzed your connected data. Here is a summary of my findings and a few recommendations for you to consider. How would you like to proceed?";
    const words = response.split(' ');
    let i = 0;
    const interval = setInterval(() => {
        if (i < words.length) {
            onChunk(words[i] + ' ');
            i++;
        } else {
            clearInterval(interval);
        }
    }, 50);

    return new Promise(res => setTimeout(() => res(), 50 * words.length));
}
