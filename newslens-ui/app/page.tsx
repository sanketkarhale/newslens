"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [cyberMode, setCyberMode] = useState(false);

  const handleAnalyze = () => {
    if (!topic.trim()) return;
    setLoading(true);
    let finalTopic = topic;
    if (cyberMode) {
      finalTopic = `cybersecurity OR vulnerability OR breach OR malware ${topic}`;
    }
    router.push(`/dashboard?topic=${encodeURIComponent(finalTopic)}`);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser does not support Voice Recognition.");
      return;
    }
    setIsListening(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTopic(transcript);
      setIsListening(false);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans transition-colors duration-1000 ${cyberMode ? 'bg-[#050505]' : ''}`}>
      {/* Dynamic Background Elements */}
      <div className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] mix-blend-screen animate-pulse-glow transition-colors duration-1000 ${cyberMode ? 'bg-red-500/20' : 'bg-primary/20'}`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] mix-blend-screen animate-pulse-glow transition-colors duration-1000 ${cyberMode ? 'bg-cyan-500/20' : 'bg-tertiary/20'}`} style={{ animationDelay: '2s' }}></div>

      {/* Floating Top Nav */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 dynamic-island px-10 py-4 flex items-center gap-16 z-50 animate-float ${cyberMode ? 'border-red-500/30' : ''}`}>
        <span className="font-extrabold text-2xl tracking-tighter text-white">NewsLens</span>
        <div className="hidden md:flex gap-8 font-bold text-sm items-center">
          <a href="/" className="text-white">Discover</a>
          <a href="/dashboard?topic=Markets" className="text-white/50 hover:text-white transition-colors">Markets</a>
          <a href="/dashboard?topic=Technology" className="text-white/50 hover:text-white transition-colors">Technology</a>
          
          <button 
            onClick={() => setCyberMode(!cyberMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${cyberMode ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Threat Intel
          </button>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <div className="z-10 text-center px-4 max-w-5xl mx-auto mt-10">
        <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-tight">
          Understand the <br/> world, instantly.
        </h1>
        <p className="text-xl md:text-3xl text-on-surface-variant/70 font-semibold mb-20 max-w-3xl mx-auto leading-relaxed">
          The most advanced AI news engine. Ask anything. See everything.
        </p>

        {/* Apple-style Search Bar */}
        <div className="relative max-w-3xl mx-auto group z-20">
          <div className={`absolute -inset-1 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 ${cyberMode ? 'bg-gradient-to-r from-red-500 via-black to-cyan-500' : 'bg-gradient-to-r from-primary via-secondary to-tertiary'}`}></div>
          <div className={`relative flex items-center bg-surface/60 backdrop-blur-[50px] border rounded-[3rem] p-3 shadow-glass ${cyberMode ? 'border-red-500/20' : 'border-white/10'}`}>
            <svg className="w-10 h-10 text-white/40 ml-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAnalyze(); }}
              placeholder={isListening ? "Listening..." : cyberMode ? "Search threat vectors..." : "Search a topic or entity..."}
              className={`w-full bg-transparent border-none text-2xl font-bold px-6 py-6 focus:outline-none ${cyberMode ? 'text-red-100 placeholder:text-red-100/30' : 'text-white placeholder:text-white/20'}`}
            />
            
            <button 
              onClick={startListening}
              className={`p-4 rounded-full mr-4 transition-all flex items-center justify-center ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'}`}
              title="Voice Assistant"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            </button>

            <button 
              onClick={handleAnalyze}
              disabled={loading || !topic.trim()}
              className={`font-extrabold text-xl px-12 py-6 rounded-[2.5rem] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 mr-1 whitespace-nowrap ${cyberMode ? 'bg-red-600 text-white shadow-[0_0_40px_rgba(220,38,38,0.4)]' : 'bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.3)]'}`}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* Minimalist Trending Pills */}
        <div className="mt-24 flex flex-wrap justify-center gap-4">
          {['Quantum Computing', 'SpaceX', 'Global Markets'].map((t) => (
            <button 
              key={t}
              onClick={() => setTopic(t)}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-white/70 font-bold text-lg transition-all hover:scale-105 active:scale-95"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 text-center w-full z-10">
        <p className="text-white/20 text-xs font-bold tracking-[0.3em] uppercase">All credits go to Mr. Sanket Gajanan Karhale</p>
      </div>
    </div>
  );
}
