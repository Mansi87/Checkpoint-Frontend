import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../utils/auth';

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low/90 backdrop-blur-md border-r border-white/10 flex flex-col gap-stack-sm p-margin-mobile z-50">
        <div className="mb-stack-lg">
          <h1 className="font-headline text-2xl text-primary tracking-tight">Checkpoint</h1>
          <p className="font-label text-xs text-on-surface-variant opacity-70">Career Management</p>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          {/* <a className="flex items-center gap-3 text-on-surface-variant p-3 hover:bg-surface-variant/50 rounded-xl transition-all" href="#">Analytics</a>
          <a className="flex items-center gap-3 text-on-surface-variant p-3 hover:bg-surface-variant/50 rounded-xl transition-all" href="#">History</a> */}
          <Link className="flex items-center gap-3 text-on-surface-variant p-3 hover:bg-surface-variant/50 rounded-xl transition-all" to="/dashboard">Overview</Link>
          <a className="flex items-center gap-3 bg-primary-container text-on-primary-container rounded-xl p-3" href="#">Profile</a>
          {/* <a className="flex items-center gap-3 text-on-surface-variant p-3 hover:bg-surface-variant/50 rounded-xl transition-all" href="#">Settings</a> */}
        </nav>
        <div className="mt-auto pt-stack-md border-t border-white/5">
          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-full border border-primary/30 bg-surface-container-highest"></div>
            <div className="flex flex-col">
              <span className="font-label text-on-surface truncate max-w-[120px]">User Name</span>
              <span className="font-label text-xs text-primary">Free Tier</span>
            </div>
            <button onClick={() => signOut(navigate)} className="w-full py-3 px-4 border border-outline/30 rounded-xl text-on-surface font-label hover:bg-surface-variant/30 transition-all">
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 min-h-screen px-margin-desktop py-stack-lg max-w-[1440px]">
        <header className="flex justify-between items-end mb-stack-lg">
          <div>
            <h2 className="font-headline text-4xl text-on-surface tracking-tight">Profile</h2>
            <p className="font-body text-on-surface-variant mt-2 max-w-xl">
              Update your professional identity and resume details.
            </p>
          </div>
          <button className="liquid-glass-primary font-label px-8 py-3 rounded-full flex items-center gap-2">
            Save Changes
          </button>
        </header>

        <div className="grid grid-cols-12 gap-gutter">
          {/* Column 1 */}
          <section className="col-span-8 flex flex-col gap-gutter">
            <div className="glass-panel p-stack-md rounded-xl">
              <h3 className="font-label text-primary uppercase tracking-[0.1em] mb-stack-md text-xs">Core Identity</h3>
              <div className="grid grid-cols-2 gap-stack-md">
                <div className="flex flex-col gap-2">
                  <label className="font-label text-xs text-on-surface-variant/60">Full Name</label>
                  <input className="bg-black/40 border border-white/10 rounded-lg p-3 font-body text-on-surface focus:outline-none focus:border-primary transition-all" type="text" placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label text-xs text-on-surface-variant/60">Current Title</label>
                  <input className="bg-black/40 border border-white/10 rounded-lg p-3 font-body text-on-surface focus:outline-none focus:border-primary transition-all" type="text" placeholder="e.g. Software Engineer" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label text-xs text-on-surface-variant/60">Email Address</label>
                  <input className="bg-black/40 border border-white/10 rounded-lg p-3 font-body text-on-surface focus:outline-none focus:border-primary transition-all" type="email" placeholder="you@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label text-xs text-on-surface-variant/60">LinkedIn Alias</label>
                  <input className="bg-black/40 border border-white/10 rounded-lg p-3 font-body text-on-surface focus:outline-none focus:border-primary transition-all" type="text" placeholder="your-linkedin-handle" />
                </div>
              </div>
            </div>

            <div className="glass-panel p-stack-md rounded-xl">
              <div className="flex justify-between items-center mb-stack-md">
                <h3 className="font-label text-primary uppercase tracking-[0.1em] text-xs">Skills Stack</h3>
                <button className="text-on-surface-variant hover:text-primary transition-colors font-label text-xs">+ Add New</button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full border border-primary/50 bg-primary/5 text-primary font-label text-sm">React</span>
                <span className="px-4 py-2 rounded-full border border-primary/50 bg-primary/5 text-primary font-label text-sm">Java</span>
                <span className="px-4 py-2 rounded-full bg-primary text-on-primary font-label text-sm">Spring Boot</span>
              </div>
            </div>
          </section>

          {/* Column 2 */}
          <section className="col-span-4 flex flex-col gap-gutter">
            <div className="glass-panel p-stack-md rounded-xl">
              <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">Performance</span>
              <h4 className="font-headline text-2xl text-on-surface mb-stack-md">Profile Strength</h4>
              <div className="relative w-32 h-32 mx-auto mb-stack-md">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-white/5" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8" />
                  <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.42" strokeDashoffset="36.44" strokeWidth="8" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-headline text-2xl font-bold text-on-surface">90%</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}