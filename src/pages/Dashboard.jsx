import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import SalaryPopup from '../components/SalaryPopup';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [showSalaryPopup, setShowSalaryPopup] = useState(false);

  useEffect(() => {
    api.getResumes().then(setResumes).catch(() => setResumes([]));
  }, []);
  useEffect(() => {
  api.shouldShowSalaryPrompt().then(setShowSalaryPopup).catch(() => {});
  }, []);
  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low/90 backdrop-blur-md border-r border-white/10 z-50 flex flex-col gap-stack-sm p-margin-mobile">
        <div className="mb-stack-lg">
          <h1 className="font-headline text-2xl text-primary font-bold">Checkpoint</h1>
          <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest mt-1">Career Management</p>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <a className="bg-primary-container text-on-primary-container rounded-xl p-3 flex items-center gap-3 font-label" href="#">
            Overview
          </a>
          <a className="text-on-surface-variant p-3 flex items-center gap-3 font-label hover:bg-surface-variant/50 rounded-xl transition-all" href="#">
            Analytics
          </a>
          <a className="text-on-surface-variant p-3 flex items-center gap-3 font-label hover:bg-surface-variant/50 rounded-xl transition-all" href="#">
            History
          </a>
          <Link className="text-on-surface-variant p-3 flex items-center gap-3 font-label hover:bg-surface-variant/50 rounded-xl transition-all" to="/profile">
             Profile
            </Link>
            <a className="text-on-surface-variant p-3 flex items-center gap-3 font-label hover:bg-surface-variant/50 rounded-xl transition-all" href="#">
            Settings
        </a>
        </nav>
        <div className="mt-auto pt-stack-md border-t border-white/5">
          <div className="flex items-center gap-3 mb-6 p-1">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-white/10"></div>
            <div>
              <p className="font-label text-on-surface">User Name</p>
              <p className="font-label text-xs text-on-surface-variant">Free Tier</p>
            </div>
          </div>
          <button className="w-full py-3 px-4 border border-outline/30 rounded-xl text-on-surface font-label hover:bg-surface-variant/30 transition-all">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-margin-desktop min-h-screen">

        <header className="flex justify-between items-end mb-stack-lg">
  <div>
    <h2 className="font-headline text-4xl text-on-surface">Dashboard</h2>
    <p className="font-body text-on-surface-variant mt-1">Real-time status of your career pipeline.</p>
  </div>

  <div className="flex items-center gap-4">
  {resumes.length > 0 && (
    <Link
      to={`/resumes/${resumes[0].id}/analyze`}
      className="border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all py-3 px-6 rounded-xl font-label flex items-center gap-2"
    >
      Analyze a JD
    </Link>
  )}
  {resumes.length > 0 && (
    <Link
      to={`/resumes/${resumes[0].id}/view`}
      className="border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all py-3 px-6 rounded-xl font-label flex items-center gap-2"
    >
      View Resume
    </Link>
  )}
  <button className="liquid-glass-primary py-3 px-6 rounded-xl font-label flex items-center gap-2">
    Upgrade to Pro
  </button>
</div>
</header>

        <div className="grid grid-cols-12 gap-gutter">
          {/* Resume Score */}
          <div className="col-span-12 lg:col-span-4 glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center">
            <h3 className="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-6">Resume Health Score</h3>
            <div className="relative flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle className="text-surface-variant" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" />
                <circle className="text-primary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="33.17" strokeLinecap="round" strokeWidth="12" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline text-5xl text-on-surface leading-none">94</span>
                <span className="font-label text-xs text-primary uppercase">Optimized</span>
              </div>
            </div>
            <p className="mt-8 font-body text-on-surface-variant">Top 2% in Engineering Lead bracket.</p>
          </div>

          {/* Stats */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-stack-md">
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between">
              <p className="font-headline text-5xl font-extrabold text-on-surface">128</p>
              <p className="font-label text-on-surface-variant">JD Matches</p>
            </div>
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between">
              <p className="font-headline text-5xl font-extrabold text-on-surface">06</p>
              <p className="font-label text-on-surface-variant">Interview Invites</p>
            </div>
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between">
              <p className="font-headline text-5xl font-extrabold text-on-surface">42</p>
              <p className="font-label text-on-surface-variant">Applications</p>
            </div>
          </div>

          {/* Recent JD Analysis */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-stack-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-headline text-2xl text-on-surface">Recent JD Analysis</h3>
              <a className="text-primary font-label hover:underline" href="#">View All</a>
            </div>
            <div className="glass-panel rounded-xl p-6 flex items-center justify-between cursor-pointer hover:bg-surface-variant/20">
              <div>
                <h4 className="font-body text-lg font-semibold text-on-surface">Principal Software Engineer</h4>
                <p className="font-body text-on-surface-variant">Stripe • Remote</p>
              </div>
              <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs rounded-full">92% Match</span>
            </div>
            <div className="glass-panel rounded-xl p-6 flex items-center justify-between cursor-pointer hover:bg-surface-variant/20">
              <div>
                <h4 className="font-body text-lg font-semibold text-on-surface">Cloud Architect</h4>
                <p className="font-body text-on-surface-variant">AWS • Seattle, WA</p>
              </div>
              <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs rounded-full">88% Match</span>
            </div>
          </div>

          {/* Version History */}
          <div className="col-span-12 lg:col-span-4 glass-panel rounded-xl p-8">
            <h3 className="font-label text-xs text-on-surface uppercase tracking-widest mb-8">Version History</h3>
            <div className="space-y-8 relative">
              <div className="relative pl-8">
                <div className="absolute left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20"></div>
                <p className="font-label text-primary text-xs">v4.2 - Current</p>
                <h4 className="font-body text-on-surface font-semibold">Standard Executive</h4>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-on-surface-variant/50"></div>
                <p className="font-label text-on-surface-variant text-xs">v4.1</p>
                <h4 className="font-body text-on-surface">Executive Technical Brief</h4>
              </div>
            </div>
            <button className="w-full mt-8 py-3 border border-outline/30 rounded-xl font-label text-on-surface hover:bg-surface-variant/30 transition-all">
              Full Archive
            </button>
          </div>
        </div>
      </main>
      {showSalaryPopup && <SalaryPopup onClose={() => setShowSalaryPopup(false)} />}
    </div>
  );
}