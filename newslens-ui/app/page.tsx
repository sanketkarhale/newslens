"use client";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import createGlobe from 'cobe';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Zap, Activity, Globe, MessageSquare, Database, Cpu, TrendingUp, TrendingDown, BarChart2, Layers, Crosshair, Users, Search } from 'lucide-react';

// --- 1. PREMIUM NAVBAR ---
const PremiumNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-background/50 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="News Lens AI Logo" width={32} height={32} className="rounded-lg shadow-glow" />
        <span className="font-display font-bold text-2xl tracking-tighter text-white">News Lens AI</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-poppins text-sm font-medium text-white/60">
        <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
        <a href="#market" className="hover:text-white transition-colors">Markets</a>
        <a href="#built-for" className="hover:text-white transition-colors">Intelligence</a>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-bold text-white transition-all backdrop-blur-md hidden sm:block">
          Open App
        </Link>
        <Link href="/login" className="px-6 py-2.5 bg-primary hover:bg-primary/80 rounded-full text-sm font-bold text-white shadow-glow transition-all">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

// --- 2. CINEMATIC HERO SECTION ---
const CinematicHero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      router.push(`/dashboard?topic=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
      {/* Background Neural Grids & Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
           <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
           <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase">News Lens AI Core Engine Online</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter leading-[1.1] mb-8 drop-shadow-2xl">
          The AI Layer Between You <br className="hidden md:block"/> and Global Chaos.
        </h1>
        
        <p className="text-lg md:text-2xl text-white/60 font-poppins max-w-3xl mx-auto mb-12 leading-relaxed">
          Real-time intelligence for markets, geopolitics, technology, AI, and global events. Synthesize millions of data points into actionable insights instantly.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 w-full max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="w-full relative flex items-center">
            <Search className="absolute left-6 text-white/50" size={24} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search global intelligence, markets, or geopolitics..."
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] py-5 pl-16 pr-32 text-lg text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-colors shadow-glass"
            />
            <button type="submit" className="absolute right-3 top-2.5 bottom-2.5 px-6 rounded-full bg-primary hover:bg-primary/80 text-white font-bold transition-all shadow-glow flex items-center justify-center">
              Analyze
            </button>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="px-8 py-4 rounded-[2rem] bg-white text-black font-display font-bold hover:scale-105 active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Launch Dashboard
            </Link>
            <a href="#market" className="px-8 py-4 rounded-[2rem] bg-white/5 border border-white/10 text-white font-display font-bold hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2">
              <Activity size={20} className="text-primary"/> Watch Live Intelligence
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// --- 3. LIVE GLOBAL ACTIVITY STRIP ---
const LiveActivityStrip = () => {
  return (
    <div className="w-full border-y border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden py-4 flex items-center">
      <div className="w-full relative flex items-center h-6">
        <motion.div 
          className="flex whitespace-nowrap gap-16 absolute left-0"
          animate={{ x: [0, -2000] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {Array(4).fill("").map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2 font-poppins font-semibold text-sm"><span className="text-emerald-400">Bitcoin +4.2%</span> | Institutional buying surges</span>
              <span className="flex items-center gap-2 font-poppins font-semibold text-sm"><span className="text-primary">AI Breakthrough</span> | OpenAI announces new model</span>
              <span className="flex items-center gap-2 font-poppins font-semibold text-sm"><span className="text-rose-400">Nasdaq falls</span> | Tech stocks correct after rally</span>
              <span className="flex items-center gap-2 font-poppins font-semibold text-sm"><span className="text-tertiary">Startups</span> | India startup funding rises 40% QoQ</span>
              <span className="flex items-center gap-2 font-poppins font-semibold text-sm"><span className="text-warning">Geopolitics</span> | Tensions rise in Eastern Europe</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- 4. HOW IT WORKS SECTION ---
const HowItWorks = () => {
  const steps = [
    { title: "COLLECT", desc: "Aggregates massive streams of global news, RSS feeds, and market data in real-time.", icon: Database },
    { title: "ANALYZE", desc: "Our neural engine reconstructs, deduplicates, and analyzes sentiment instantly.", icon: Cpu },
    { title: "DELIVER", desc: "Personalized, bias-free intelligence feeds directly to your dashboard.", icon: Crosshair },
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-display font-black mb-6">How News Lens AI Works</h2>
        <p className="text-white/50 font-poppins max-w-2xl mx-auto text-lg">We handle the noise so you can focus on the signal.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="bg-surface border border-white/5 rounded-3xl p-10 hover:border-white/20 transition-colors backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
            <step.icon size={48} className="text-primary mb-8" />
            <h3 className="text-2xl font-bold font-display tracking-wide mb-4">{step.title}</h3>
            <p className="text-white/60 font-poppins leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 5. AI ASSISTANT SHOWCASE ---
const AIAssistantShowcase = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
           <h2 className="text-4xl md:text-6xl font-display font-black leading-tight">Your Personal <br/><span className="text-primary">Intelligence Analyst</span></h2>
           <p className="text-xl text-white/60 font-poppins leading-relaxed max-w-xl">
             Meet Sanket AI, your personal intelligence sidekick. Ask complex questions about market movements, geopolitical events, or emerging tech, and get instant, data-backed answers.
           </p>
           <ul className="space-y-4 font-poppins text-white/80 font-medium">
             <li className="flex items-center gap-3"><ShieldCheck className="text-emerald-400"/> Context-aware AI memory</li>
             <li className="flex items-center gap-3"><ShieldCheck className="text-emerald-400"/> Real-time market data access</li>
             <li className="flex items-center gap-3"><ShieldCheck className="text-emerald-400"/> Neutral, unbiased summaries</li>
           </ul>
        </div>
        <div className="flex-1 w-full max-w-lg">
           <div className="bg-surface border border-white/10 rounded-[2rem] p-6 shadow-2xl backdrop-blur-xl relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl opacity-50 -z-10 rounded-full"></div>
              
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                 <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-black">S</div>
                 <div>
                   <h4 className="font-bold">Sanket AI</h4>
                   <p className="text-xs text-emerald-400">Online & Analyzing</p>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex justify-end">
                   <div className="bg-white/10 rounded-2xl rounded-tr-none px-5 py-3 max-w-[80%]">
                     <p className="text-sm">What caused the market crash today?</p>
                   </div>
                 </div>
                 <div className="flex justify-start">
                   <div className="bg-primary/20 border border-primary/30 rounded-2xl rounded-tl-none px-5 py-4 max-w-[90%]">
                     <p className="text-sm leading-relaxed">
                       Based on real-time aggregation across 40+ financial sources, the primary catalysts are:<br/><br/>
                       1. Rising 10-year Treasury yields hitting 4.8%.<br/>
                       2. Geopolitical uncertainty in Eastern Europe.<br/>
                       3. A weaker-than-expected tech earnings report.
                     </p>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- 7. INTERACTIVE WORLD VISUALIZATION (Cobe) ---
const InteractiveWorldVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.15],
      markerColor: [0, 0.83, 1], // primary color
      glowColor: [0.04, 0.06, 0.12], // bg color
      markers: [
        { location: [37.7595, -122.4367], size: 0.05 }, // SF
        { location: [40.7128, -74.006], size: 0.08 }, // NY
        { location: [51.5074, -0.1278], size: 0.06 }, // London
        { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
        { location: [28.6139, 77.2090], size: 0.07 }, // Delhi
      ],
      onRender: (state: any) => {
        state.phi = phi;
        phi += 0.005;
      },
    } as any);

    return () => globe.destroy();
  }, []);

  return (
    <section className="py-24 relative flex flex-col items-center justify-center overflow-hidden min-h-[800px]">
       <div className="text-center relative z-20 mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4">Global Reach. <br/>Micro Precision.</h2>
          <p className="text-white/50 text-lg">Visualizing the pulse of the planet in real-time.</p>
       </div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[800px] opacity-80 z-10 pointer-events-none mix-blend-screen">
         <canvas ref={canvasRef} style={{ width: 800, height: 800 }} />
       </div>
    </section>
  );
};

// --- 8. MARKET SNAPSHOT SECTION ---
const MarketSnapshot = () => {
  const markets = [
    { name: "Bitcoin", ticker: "BTC", price: "$64,230", change: "+4.2%", isUp: true },
    { name: "Gold", ticker: "XAU", price: "$2,340", change: "+1.1%", isUp: true },
    { name: "Nasdaq", ticker: "NDX", price: "17,890", change: "-1.5%", isUp: false },
    { name: "Nifty 50", ticker: "NIFTY", price: "22,450", change: "+0.8%", isUp: true },
    { name: "Crude Oil", ticker: "WTI", price: "$82.50", change: "-0.4%", isUp: false },
  ];

  return (
    <section id="market" className="py-24 px-6 max-w-7xl mx-auto">
       <div className="flex items-center justify-between mb-12">
         <h2 className="text-3xl font-display font-bold">Live Market Impact</h2>
         <Link href="/dashboard?topic=Markets" className="text-primary text-sm font-bold flex items-center gap-2 hover:underline">View All Data &rarr;</Link>
       </div>
       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
         {markets.map((m, i) => (
           <div key={i} className="bg-surface border border-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/5 transition-colors">
             <div className="flex justify-between items-start mb-4">
               <div>
                 <p className="text-white/50 text-xs font-bold">{m.ticker}</p>
                 <p className="font-bold">{m.name}</p>
               </div>
               {m.isUp ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-rose-400" />}
             </div>
             <h4 className="text-2xl font-black">{m.price}</h4>
             <p className={`text-sm font-bold mt-1 ${m.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{m.change}</p>
           </div>
         ))}
       </div>
    </section>
  );
};

// --- 6. FEATURE BENTO GRID ---
const FeatureBentoGrid = () => {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-black mb-4">Intelligence, Redefined.</h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">Everything you need to stay ahead of the curve, packed into one powerful platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {/* Large Feature 1 */}
        <div className="md:col-span-2 bg-surface border border-white/5 rounded-[2rem] p-10 relative overflow-hidden group">
          <div className="absolute -inset-10 bg-gradient-to-br from-primary/10 to-transparent blur-2xl opacity-50"></div>
          <div className="relative z-10 flex flex-col justify-end h-full">
             <Globe className="text-primary mb-4" size={32} />
             <h3 className="text-3xl font-bold font-display mb-2">AI News Reconstruction</h3>
             <p className="text-white/60">We scrape thousands of articles, remove the duplicates, strip the bias, and give you a single, unified truth.</p>
          </div>
        </div>

        {/* Small Feature 1 */}
        <div className="bg-surface border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between">
           <Activity className="text-secondary" size={32}/>
           <div>
             <h3 className="text-xl font-bold mb-2">Sentiment Analysis</h3>
             <p className="text-sm text-white/50">Instantly gauge the Fear and Greed index across any topic.</p>
           </div>
        </div>

        {/* Small Feature 2 */}
        <div className="bg-surface border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between">
           <MessageSquare className="text-emerald-400" size={32}/>
           <div>
             <h3 className="text-xl font-bold mb-2">Voice AI Briefing</h3>
             <p className="text-sm text-white/50">Listen to a personalized global briefing on your commute.</p>
           </div>
        </div>

        {/* Large Feature 2 */}
        <div className="md:col-span-2 bg-surface border border-white/5 rounded-[2rem] p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="relative z-10 flex flex-col justify-end h-full">
             <ShieldCheck className="text-tertiary mb-4" size={32} />
             <h3 className="text-3xl font-bold font-display mb-2">Credibility Detection</h3>
             <p className="text-white/60">Our algorithms detect fake news probabilities, source trust scores, and political biases automatically.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 9. BUILT FOR SECTION ---
const BuiltFor = () => {
  const users = ["Traders", "Students", "Researchers", "AI Enthusiasts", "Startup Founders", "Market Analysts"];
  return (
    <section id="built-for" className="py-24 px-6 border-y border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-sm font-bold tracking-widest text-white/40 uppercase mb-12">Engineered For The Elite</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {users.map((u, i) => (
            <div key={i} className="px-6 py-3 rounded-full border border-white/10 bg-background text-white/70 font-bold hover:text-white hover:border-primary/50 transition-colors cursor-default">
              {u}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 10. PREMIUM MOCKUP SHOWCASE ---
const PremiumMockup = () => {
  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
         <div className="w-full aspect-video bg-surface border border-white/10 rounded-t-[2rem] rounded-b-xl shadow-2xl relative overflow-hidden backdrop-blur-xl p-2 pb-0">
           {/* Fake Browser Chrome */}
           <div className="flex items-center gap-2 px-4 py-3 mb-2">
             <div className="w-3 h-3 rounded-full bg-rose-500"></div>
             <div className="w-3 h-3 rounded-full bg-amber-500"></div>
             <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
             <div className="mx-auto bg-white/5 rounded-md px-32 py-1 text-[10px] text-white/30 font-bold">newslens.ai/dashboard</div>
           </div>
           
           {/* Abstract Dashboard UI */}
           <div className="w-full h-full bg-background rounded-t-xl border-x border-t border-white/5 flex p-6 gap-6 relative">
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
              {/* Sidebar abstract */}
              <div className="w-48 h-full space-y-4">
                <div className="h-8 w-24 bg-white/10 rounded-md"></div>
                <div className="h-4 w-full bg-white/5 rounded-md mt-12"></div>
                <div className="h-4 w-5/6 bg-white/5 rounded-md"></div>
                <div className="h-4 w-full bg-white/5 rounded-md"></div>
              </div>
              {/* Main abstract */}
              <div className="flex-1 h-full space-y-6">
                <div className="flex justify-between items-center">
                   <div className="h-10 w-64 bg-white/10 rounded-lg"></div>
                   <div className="h-10 w-10 bg-primary/20 rounded-full"></div>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                   <div className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
                   <div className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
                   <div className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
                </div>
                {/* Content row */}
                <div className="flex gap-4 h-full">
                   <div className="flex-[2] bg-white/5 rounded-xl border border-white/5 p-4 space-y-4">
                     <div className="h-32 bg-white/10 rounded-lg"></div>
                     <div className="h-32 bg-white/10 rounded-lg"></div>
                   </div>
                   <div className="flex-1 bg-white/5 rounded-xl border border-white/5"></div>
                </div>
              </div>
           </div>
         </div>
      </div>
    </section>
  );
};

// --- 13. FINAL CTA SECTION ---
const FinalCTA = () => {
  return (
    <section className="py-40 px-6 relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-display font-black mb-8 drop-shadow-2xl">Enter The Future Of <br/>Intelligence.</h2>
        <p className="text-xl text-white/60 mb-12 font-poppins">Stop reading the news. Start understanding the world.</p>
        <Link href="/dashboard" className="inline-block px-12 py-6 rounded-full bg-primary hover:bg-primary/80 text-white font-bold text-xl shadow-[0_0_50px_rgba(0,212,255,0.4)] hover:scale-105 active:scale-95 transition-all">
          Launch Dashboard Now
        </Link>
      </div>
    </section>
  );
};

// --- 14. PREMIUM FOOTER ---
const PremiumFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-background pt-20 pb-10 px-6">
       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
         <div className="flex items-center gap-3">
           <Image src="/logo.png" alt="News Lens AI Logo" width={32} height={32} className="rounded-lg" />
           <span className="font-display font-bold text-2xl">News Lens AI</span>
         </div>
         <div className="flex gap-8 text-sm font-semibold text-white/50">
           <a href="#" className="hover:text-white">APIs</a>
           <a href="#" className="hover:text-white">GitHub</a>
           <a href="#" className="hover:text-white">Terms</a>
           <a href="#" className="hover:text-white">Privacy</a>
         </div>
       </div>
       <div className="text-center text-xs text-white/30 font-bold uppercase tracking-widest border-t border-white/5 pt-10">
         Powered by AI-driven intelligence systems <br/>
         <span className="text-primary mt-2 inline-block">Created by Sanket G Karhale</span>
       </div>
    </footer>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function LandingPage() {
  return (
    <div className="bg-background text-on-surface font-sans selection:bg-primary/30">
      <PremiumNavbar />
      <main>
        <CinematicHero />
        <LiveActivityStrip />
        <HowItWorks />
        <AIAssistantShowcase />
        <InteractiveWorldVisual />
        <MarketSnapshot />
        <FeatureBentoGrid />
        <BuiltFor />
        <PremiumMockup />
        <FinalCTA />
      </main>
      <PremiumFooter />
    </div>
  );
}
