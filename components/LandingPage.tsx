import React, { useState, useEffect } from 'react';
import { BrainCircuitIcon, CheckCircleIcon, ChevronDownIcon, DollarSignIcon, HeartPulseIcon, ShieldCheckIcon, TargetIcon, UsersIcon, ZapIcon, LinkIcon, QuoteIcon } from './icons';

interface LandingPageProps {
  onEnterApp: () => void;
}

// Rebuilt Animated Demo as a proper React component
const AnimatedDemo: React.FC = () => {
  const [screen, setScreen] = useState<'email' | 'todo' | 'calendar'>('email');
  const [showAuraFlash, setShowAuraFlash] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showDeepWork, setShowDeepWork] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [key, setKey] = useState(0); // Key to trigger re-runs of the animation

  useEffect(() => {
    setIsRunning(true);
    setScreen('email');
    setShowNewTask(false);
    setShowDeepWork(false);
    
    // Sequence Timers
    const timer1 = setTimeout(() => {
      setShowAuraFlash(true);
      const timer2 = setTimeout(() => {
        setShowAuraFlash(false);
        setScreen('todo');
        const timer3 = setTimeout(() => setShowNewTask(true), 50);
        return () => clearTimeout(timer3);
      }, 600);
      return () => clearTimeout(timer2);
    }, 2000);

    const timer4 = setTimeout(() => {
      setScreen('calendar');
      const timer5 = setTimeout(() => setShowDeepWork(true), 50);
      return () => clearTimeout(timer5);
    }, 4500);

    const timer6 = setTimeout(() => {
      setIsRunning(false);
      // Schedule the next run
      const timer7 = setTimeout(() => setKey(prev => prev + 1), 3000);
      return () => clearTimeout(timer7);
    }, 7500);

    // Cleanup timers on component unmount or re-run
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer4);
      clearTimeout(timer6);
    };
  }, [key]);

  return (
    <div className="phone-display">
      <div className="w-16 h-2 bg-gray-200 rounded-full mb-4"></div>

      {/* Email Screen */}
      <div className={`screen-content w-full h-full flex-col justify-start items-center p-4 bg-white rounded-xl shadow-inner border border-gray-200 ${screen === 'email' ? 'flex' : 'hidden'}`}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Inbox</h2>
        <div className="w-full bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold">B</div>
          <div className="flex-grow">
            <p className="text-sm font-semibold text-gray-900">Boss Man</p>
            <p className="text-lg font-bold text-gray-900 mt-1">Project Report Deadline!</p>
            <p className="text-gray-600 text-sm mt-1">Hi, just a reminder that the project report is due by EOD Friday.</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-auto">New email received</p>
      </div>

      {/* Todo Screen */}
      <div className={`screen-content w-full h-full flex-col justify-start items-center p-4 bg-white rounded-xl shadow-inner border border-gray-200 ${screen === 'todo' ? 'flex' : 'hidden'}`}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Tasks</h2>
        <ul className="w-full space-y-3">
          <li className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm"><span className="text-gray-700">Review Q2 Budget</span></li>
          <li className={`flex items-center bg-indigo-50 p-3 rounded-lg border border-indigo-200 shadow-sm transition-all duration-500 ease-out ${showNewTask ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-indigo-800 font-semibold">Submit Project Report (EOD Friday)</span>
          </li>
        </ul>
        <p className="text-xs text-gray-400 mt-auto">Task added by Aura</p>
      </div>

      {/* Calendar Screen */}
      <div className={`screen-content w-full h-full flex-col justify-start items-center p-4 bg-white rounded-xl shadow-inner border border-gray-200 ${screen === 'calendar' ? 'flex' : 'hidden'}`}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Calendar - This Week</h2>
        <div className="w-full space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm"><p className="text-sm font-semibold text-gray-700">Tuesday, Jul 1</p></div>
          <div className={`bg-indigo-50 p-3 rounded-lg border border-indigo-200 shadow-sm transition-all duration-500 ease-out ${showDeepWork ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-sm font-semibold text-indigo-800">Wednesday, Jul 2</p>
            <p className="text-indigo-700 text-xs font-bold">1:00 PM - 3:00 PM: Deep Work (Project Report)</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm"><p className="text-sm font-semibold text-gray-700">Thursday, Jul 3</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-auto">Block added by Aura</p>
      </div>

      {showAuraFlash && <div className="aura-flash"></div>}
      <button onClick={() => setKey(k => k + 1)} disabled={isRunning} className="absolute bottom-4 px-4 py-2 bg-indigo-600/50 text-white text-xs font-bold rounded-full shadow-lg hover:bg-indigo-700/50 transition-colors duration-300">
        {isRunning ? 'Running...' : 'Replay Demo'}
      </button>
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-slate-900 text-white font-sans overflow-y-auto">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-violet-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <BrainCircuitIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-100">Aura</h1>
            </div>
            
            {/* Nav Links */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Features</a>
              <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Testimonials</a>
              <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Pricing</a>
            </nav>

            {/* CTA Button */}
            <div>
              <button
                onClick={onEnterApp}
                className="px-4 py-2 bg-slate-800 text-white font-semibold text-sm rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-4 pt-20">
         <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
         <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 leading-tight">
              Drowning in To-Do Lists? <br/> It's Time for an Upgrade.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mt-6 max-w-3xl mx-auto">
              Aura is the AI Life Operating System that puts your life back on autopilot. It unifies your calendar, tasks, health, and finances to proactively manage your day, so you can focus on living it. Stop managing apps. Start orchestrating your life.
            </p>
            <button
                onClick={onEnterApp}
                className="mt-10 px-8 py-4 bg-violet-600 text-white font-semibold rounded-lg shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-transform hover:scale-105"
            >
                Get Back 10 Hours This Week
            </button>
            <p className="mt-3 text-sm text-slate-500">Start for free. No credit card required.</p>
         </div>
         <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="absolute bottom-10 animate-bounce">
            <ChevronDownIcon className="w-8 h-8 text-slate-300" />
        </a>
      </section>

      {/* Visual Demo Section */}
      <section id="features" className="py-24 px-4 bg-slate-600/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-slate-100">From Reactive Chaos to Proactive Calm</h2>
            <p className="text-slate-400 mt-4 leading-relaxed">
              Your brain wasn't built to track 17 projects, 345 emails, and your kid's soccer schedule. The constant context-switching is draining your energy and killing your focus.
            </p>
            <p className="text-slate-400 mt-4 leading-relaxed">
              Aura acts as your personal chief of staff. It connects the dots you don't have time to see, anticipating needs and handling the small stuff automatically, giving you the space to do your best work and be present with the people who matter.
            </p>
          </div>
          <div className="bg-slate-800 p-2 rounded-xl border border-slate-700/50 shadow-2xl shadow-slate-950/50 animate-fade-in-up flex items-center justify-center" style={{'--animation-delay': '0.2s'} as React.CSSProperties}>
              <AnimatedDemo />
          </div>
        </div>
      </section>

      {/* Benefit Translation Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-slate-100">The Aura Pro Advantage: Your $20 Investment for a Priceless Return</h2>
            <p className="text-slate-400 mt-2 max-w-3xl mx-auto">For less than the cost of a few coffees, you're not just buying an app—you're investing in a system that delivers tangible returns in your time, finances, and well-being.</p>
          </header>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden animate-fade-in-up" style={{'--animation-delay': '0.2s'} as React.CSSProperties}>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800">
                  <th className="p-4 font-semibold text-slate-300">Feature (What It Is)</th>
                  <th className="p-4 font-semibold text-slate-300">Benefit (What It Does For You)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                <tr className="hover:bg-slate-800 transition-colors">
                  <td className="p-4 font-semibold text-white">Proactive Intelligence</td>
                  <td className="p-4 text-slate-300">Never miss a deadline again. Frees up 10+ hours of mental energy per week by automating scheduling and task management.</td>
                </tr>
                <tr className="hover:bg-slate-800 transition-colors">
                  <td className="p-4 font-semibold text-white">Goal Decomposition Engine</td>
                  <td className="p-4 text-slate-300">Achieve your biggest goals, guaranteed. Turns "I want to buy a house" into a concrete, step-by-step financial and logistical plan.</td>
                </tr>
                <tr className="hover:bg-slate-800 transition-colors">
                  <td className="p-4 font-semibold text-white">Holistic Wellness Insights</td>
                  <td className="p-4 text-slate-300">Master your energy. Finally understand how your sleep, exercise, and schedule directly impact your focus and mood, with suggestions to optimize all three.</td>
                </tr>
                 <tr className="hover:bg-slate-800 transition-colors">
                  <td className="p-4 font-semibold text-white">Unlimited App Integrations</td>
                  <td className="p-4 text-slate-300">One source of truth. Create a seamless, unified view of your entire life—no more app juggling.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
       {/* How It Works Section */}
        <section className="py-24 px-4 bg-slate-900/50">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-slate-100 mb-12 animate-fade-in-up">Get Started in 3 Simple Steps</h2>
                <div className="grid md:grid-cols-3 gap-8 relative">
                    <div className="absolute top-8 left-0 w-full h-0.5 bg-slate-700 hidden md:block"></div>
                    <div className="relative z-10 animate-fade-in-up" style={{'--animation-delay': '0.1s'} as React.CSSProperties}>
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border-2 border-violet-500 mx-auto mb-4 text-violet-400"><LinkIcon className="w-7 h-7"/></div>
                        <h3 className="text-xl font-semibold text-white">1. Securely Connect</h3>
                        <p className="text-slate-400 mt-2">In minutes, link your calendars, email, health, and financial apps. Our bank-level security means your data is encrypted and safe.</p>
                    </div>
                    <div className="relative z-10 animate-fade-in-up" style={{'--animation-delay': '0.2s'} as React.CSSProperties}>
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border-2 border-violet-500 mx-auto mb-4 text-violet-400"><TargetIcon className="w-7 h-7"/></div>
                        <h3 className="text-xl font-semibold text-white">2. Set a Goal</h3>
                        <p className="text-slate-400 mt-2">Tell Aura what you want to achieve—personally or professionally. This gives your AI a mission to work towards on your behalf.</p>
                    </div>
                    <div className="relative z-10 animate-fade-in-up" style={{'--animation-delay': '0.3s'} as React.CSSProperties}>
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border-2 border-violet-500 mx-auto mb-4 text-violet-400"><ZapIcon className="w-7 h-7"/></div>
                        <h3 className="text-xl font-semibold text-white">3. Experience Proactive Magic</h3>
                        <p className="text-slate-400 mt-2">Aura gets to work immediately. Watch as it organizes your schedule, flags important tasks, and provides insights to optimize your day.</p>
                    </div>
                </div>
            </div>
        </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl font-bold text-slate-100 mb-4 animate-fade-in-up">You're in Good Company</h2>
          <p className="text-center text-slate-500 text-lg mb-12 animate-fade-in-up">As seen in (aspirational)</p>
          <div className="flex justify-center items-center gap-x-8 md:gap-x-12 grayscale opacity-60 animate-fade-in-up" style={{'--animation-delay': '0.2s'} as React.CSSProperties}>
            <p className="font-bold text-2xl">TechCrunch</p>
            <p className="font-bold text-2xl">Forbes</p>
            <p className="font-bold text-2xl">WIRED</p>
          </div>
          <div className="mt-20 grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 animate-fade-in-up" style={{'--animation-delay': '0.3s'} as React.CSSProperties}>
                <QuoteIcon className="w-8 h-8 text-violet-400 mb-4"/>
                <p className="text-slate-300 leading-relaxed">"Aura is my secret weapon. It caught a looming project deadline from a single Slack message and scheduled the work time for me. It saved me from a major fire drill. I can't imagine my work life without it."</p>
                <p className="font-semibold text-white mt-4">— Sarah K., Product Manager</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 animate-fade-in-up" style={{'--animation-delay': '0.4s'} as React.CSSProperties}>
                <QuoteIcon className="w-8 h-8 text-violet-400 mb-4"/>
                <p className="text-slate-300 leading-relaxed">"The Goal Decomposition for buying our first home was a game-changer. Aura broke it down into a savings plan and credit score goals that felt achievable. We hit our down payment goal 6 months ahead of schedule!"</p>
                <p className="font-semibold text-white mt-4">— Mike & Jess T., Aura Family Users</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 animate-fade-in-up" style={{'--animation-delay': '0.5s'} as React.CSSProperties}>
                <QuoteIcon className="w-8 h-8 text-violet-400 mb-4"/>
                <p className="text-slate-300 leading-relaxed">"I always knew sleep was important, but Aura showed me the data: on nights with less than 6.5 hours of sleep, my productivity on code commits dropped by 22%. I've completely changed my evening routine because of it."</p>
                <p className="font-semibold text-white mt-4">— David L., Software Engineer</p>
              </div>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
           <header className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-slate-100">Find the Right Plan for You</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">Start for free, then unlock a new level of personal productivity.</p>
          </header>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col animate-fade-in-up" style={{'--animation-delay': '0.1s'} as React.CSSProperties}>
                    <h3 className="text-2xl font-semibold text-white">Freemium</h3>
                    <p className="text-slate-400 mt-2">The essentials to see your life in one place.</p>
                    <div className="mt-6"><span className="text-5xl font-bold text-white">$0</span><span className="text-slate-400 font-medium">/ month</span></div>
                    <ul className="mt-8 space-y-4 flex-1">
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Unified Dashboard</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Connect up to 3 apps</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">5 AI Suggestions per day</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Basic Goal Tracking</span></li>
                    </ul>
                    <button onClick={onEnterApp} className="w-full mt-10 py-3 rounded-lg font-semibold transition-colors bg-slate-700 hover:bg-slate-600 text-slate-100">Get Started for Free</button>
                </div>
                 <div className="relative bg-slate-800 p-8 rounded-2xl border-2 border-violet-500 flex flex-col transform lg:scale-105 animate-fade-in-up" style={{'--animation-delay': '0.2s'} as React.CSSProperties}>
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"><span className="bg-violet-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">Most Popular</span></div>
                    <h3 className="text-2xl font-semibold text-white">Aura Pro</h3>
                    <p className="text-slate-400 mt-2">The complete AI chief of staff to optimize your entire life.</p>
                    <div className="mt-6"><span className="text-5xl font-bold text-white">$20</span><span className="text-slate-400 font-medium">/ month</span></div>
                    <ul className="mt-8 space-y-4 flex-1">
                         <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" /><span className="text-white font-semibold">Everything in Freemium, plus:</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Unlimited app integrations</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Unlimited AI proactive suggestions</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Advanced Goal Decomposition Engine</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Holistic Wellness & Productivity Insights</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Priority Support</span></li>
                    </ul>
                    <button onClick={onEnterApp} className="w-full mt-10 py-3 rounded-lg font-semibold transition-colors bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/30">Upgrade to Pro & Reclaim Your Time</button>
                </div>
                 <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col animate-fade-in-up" style={{'--animation-delay': '0.3s'} as React.CSSProperties}>
                    <h3 className="text-2xl font-semibold text-white">Aura Family</h3>
                    <p className="text-slate-400 mt-2">A single, collaborative OS for your entire family.</p>
                    <div className="mt-6"><span className="text-5xl font-bold text-white">$30</span><span className="text-slate-400 font-medium">/ month</span></div>
                    <ul className="mt-8 space-y-4 flex-1">
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" /><span className="text-white font-semibold">Everything in Pro, plus:</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Up to 5 family members</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Shared family dashboard</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Collaborative goals & tasks</span></li>
                        <li className="flex items-start gap-3"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">Unified family calendar</span></li>
                    </ul>
                    <button onClick={onEnterApp} className="w-full mt-10 py-3 rounded-lg font-semibold transition-colors bg-slate-700 hover:bg-slate-600 text-slate-100">Get the Family Plan</button>
                </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <ShieldCheckIcon className="w-10 h-10 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">Your Data, Your Control. Period.</h3>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">Trust is the bedrock of Aura. We are fundamentally a privacy and security company first. Aura is built with bank-level AES-256 encryption, both in transit and at rest. We use industry-leading services like Plaid for financial connections, meaning we never see or store your credentials. You have granular control to connect or disconnect services at any time. Your data is used for one purpose only: to serve you. It is never sold or shared.</p>
          <p className="text-slate-500 mt-8 text-sm">&copy; {new Date().getFullYear()} Aura OS. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;