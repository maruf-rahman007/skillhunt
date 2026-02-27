import React from 'react';
import { 
  Search, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Users, 
  ArrowRight, 
  Activity,
  Globe
} from 'lucide-react';

const LandingPage = () => {
    
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 selection:bg-indigo-500/30 font-sans">
      

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Skill Hunt 2026: Sub-System Active
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Developer Intelligence <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
              Redefined.
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Centralize candidate discovery, monitoring, and recruitment analytics. A scalable sub-system built for modern technical recruitment agencies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group">
              Explore Sub-System <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto border border-white/10 hover:bg-white/5 text-white px-8 py-4 rounded-xl font-bold transition-all">
              Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview / Bento Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Feature - Monitoring */}
          <div className="md:col-span-2 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between">
            <div>
              <Activity className="text-indigo-500 mb-4 w-10 h-10" />
              <h3 className="text-2xl font-bold text-white mb-2">Live Monitoring</h3>
              <p className="text-slate-400 max-w-md">
                Automatically track profile updates, new projects, and technical stack changes across public sources.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
               <div className="h-2 w-24 bg-indigo-600/20 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-2/3 animate-pulse" />
               </div>
               <div className="h-2 w-16 bg-white/5 rounded-full" />
            </div>
          </div>

          {/* Feature 2 - Analytics */}
          <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-colors">
            <BarChart3 className="text-indigo-500 mb-4 w-10 h-10" />
            <h3 className="text-2xl font-bold text-white mb-2">Analytics</h3>
            <p className="text-slate-400">
              Visualize your recruitment funnel with structured graphical representations.
            </p>
          </div>

          {/* Feature 3 - Search */}
          <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-colors">
            <Search className="text-indigo-500 mb-4 w-10 h-10" />
            <h3 className="text-2xl font-bold text-white mb-2">Smart Discovery</h3>
            <p className="text-slate-400">
              Search by name, location, or stack with zero-lag profile navigation.
            </p>
          </div>

          {/* Feature 4 - Security */}
          <div className="md:col-span-2 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] flex items-center gap-8">
            <div className="hidden sm:block p-4 bg-indigo-500/10 rounded-2xl">
              <ShieldCheck className="w-12 h-12 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise Security</h3>
              <p className="text-slate-400">
                Secure access control, session persistence, and credential protection for sensitive data.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-bold text-white mb-1">10k+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Profiles Tracked </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-1">Near RT</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Update Speed </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-1">0%</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Redundancy [cite: 73]</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-1">Global</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Market Ready [cite: 7]</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © 2026 CSE-TECH. Built for Skill Hunt-2026.
          </div>
          <div className="flex gap-6 text-slate-400 text-sm">
             <a href="#" className="hover:text-white transition-colors underline decoration-indigo-500/50 underline-offset-4">SRS Documentation</a>
             <a href="#" className="hover:text-white transition-colors underline decoration-indigo-500/50 underline-offset-4">Architecture Design</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;