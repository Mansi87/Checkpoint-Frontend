import BlobBackground from '../components/BlobBackground';

export default function Home() {
  return (
    <div className="bg-background selection:bg-primary selection:text-on-primary min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-surface-container/90 backdrop-blur-xl border-b border-white/10 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto left-0 right-0">
        <span className="font-headline text-2xl font-bold text-on-surface">Checkpoint</span>
        <div className="hidden md:flex items-center gap-gutter">
          <a className="font-body text-primary border-b-2 border-primary pb-1" href="#">Dashboard</a>
          <a className="font-body text-on-surface-variant hover:text-primary transition-colors" href="#">Resume</a>
          <a className="font-body text-on-surface-variant hover:text-primary transition-colors" href="#">Profile</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block font-label text-on-surface-variant hover:text-primary transition-colors">Sign Out</button>
          <button className="liquid-glass-primary px-6 py-2 rounded-xl font-label active:scale-95 transition-transform duration-200">Upgrade</button>
        </div>
      </nav>

      <main className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        <BlobBackground />

        <div className="relative z-10 text-center px-margin-mobile max-w-4xl mx-auto">
          <h1 className="fade-in-up font-headline text-6xl md:text-7xl mb-6 leading-tight text-white tracking-tighter">
            YOUR CAREER, <br /> <span className="text-primary">QUANTIFIED.</span>
          </h1>
          <p className="fade-in-up delay-1 font-body text-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
            The elite career management engine for high-performance professionals. Centralize your progress, optimize your impact, and navigate your professional trajectory with clinical precision.
          </p>
          <div className="fade-in-up delay-2 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="liquid-glass-primary px-10 py-4 rounded-full font-label w-full sm:w-auto text-lg uppercase tracking-wider">
              Get Started
            </button>
            <button className="glass-button-secondary px-10 py-4 rounded-full font-label w-full sm:w-auto flex items-center justify-center gap-2 text-lg uppercase tracking-wider">
              Watch Demo
            </button>
          </div>
        </div>
      </main>

      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 glass-panel rounded-3xl p-8">
            <h3 className="font-headline text-2xl mb-2">Performance Analytics</h3>
            <p className="text-on-surface-variant mb-8 max-w-md">Real-time data visualization of your career trajectory and skill acquisition velocity.</p>
            <div className="h-64 w-full bg-surface-container rounded-xl flex items-end gap-2 p-4">
              <div className="flex-1 bg-primary/20 rounded-t-lg h-24"></div>
              <div className="flex-1 bg-primary/30 rounded-t-lg h-48"></div>
              <div className="flex-1 bg-primary/20 rounded-t-lg h-32"></div>
              <div className="flex-1 bg-primary/60 rounded-t-lg h-56"></div>
              <div className="flex-1 bg-primary/40 rounded-t-lg h-40"></div>
              <div className="flex-1 bg-primary/80 rounded-t-lg h-64"></div>
              <div className="flex-1 bg-primary/50 rounded-t-lg h-52"></div>
            </div>
          </div>

          <div className="md:col-span-4 glass-panel rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6"></div>
              <h3 className="font-headline text-2xl mb-2">Executive Presence</h3>
              <p className="text-on-surface-variant">Refined professional identity management with dynamic resume generation.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase">Active</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs uppercase text-primary">High Performance</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-stack-lg border-t border-white/5 py-stack-lg bg-background">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto gap-8">
          <span className="font-label text-on-surface">Checkpoint © 2026</span>
          <div className="flex gap-gutter">
            <a className="text-on-surface-variant hover:text-primary" href="#">Privacy</a>
            <a className="text-on-surface-variant hover:text-primary" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}