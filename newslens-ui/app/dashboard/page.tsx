"use client";
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get('topic') || 'Innovation';

  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState(initialTopic);
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakReport = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in your browser.");
      return;
    }
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(data.analystReport + ". " + data.recommendedAction);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const downloadCSV = () => {
    if (!data || !data.articles) return;
    const headers = ['Title', 'Source', 'Sentiment', 'URL'];
    const rows = data.articles.map((a: any) => 
      [`"${a.title.replace(/"/g, '""')}"`, `"${a.source.replace(/"/g, '""')}"`, `"${a.sentiment}"`, `"${a.link}"`].join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeTopic.replace(/[^a-z0-9]/gi, '_')}_articles.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analyze?topic=${encodeURIComponent(activeTopic)}&lang=${lang}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, [activeTopic, lang]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 relative overflow-hidden font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="w-20 h-20 border-[8px] border-white/10 border-t-primary rounded-full animate-spin z-10 shadow-[0_0_30px_rgba(10,132,255,0.5)]"></div>
        <p className="text-xl text-white/80 font-semibold tracking-wide animate-pulse z-10">Synthesizing {activeTopic}...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans text-on-surface">
      {/* Top Floating Nav */}
      <header className="fixed top-6 left-6 right-6 z-50 dynamic-island flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-extrabold text-2xl tracking-tighter text-white hover:text-primary transition-colors">
            NewsLens
          </Link>
          <div className="hidden md:flex gap-8 font-bold text-sm">
            <Link href="/" className="text-white/50 hover:text-white transition-colors">Discover</Link>
            <Link href="/dashboard?topic=Markets" className="text-white/50 hover:text-white transition-colors">Markets</Link>
            <Link href="/dashboard?topic=Technology" className="text-white/50 hover:text-white transition-colors">Technology</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
          >
            <option value="en" className="bg-black">English</option>
            <option value="hi" className="bg-black">Hindi</option>
            <option value="mr" className="bg-black">Marathi</option>
          </select>
          <div className="hidden md:flex items-center bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 focus-within:border-primary/50 transition-colors">
            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              className="bg-transparent border-none focus:outline-none text-white ml-2 placeholder:text-white/30" 
              placeholder="Search analytics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && searchQuery.trim()) setActiveTopic(searchQuery); }}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Metric Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 flex flex-col justify-between h-48">
            <h3 className="text-white/50 font-bold uppercase tracking-widest text-sm">Total Articles</h3>
            <div className="text-6xl font-black text-white">{data.totalArticles}</div>
          </div>
          
          <div className="glass-card p-8 flex flex-col justify-between h-48 relative overflow-hidden group">
            <div className={`absolute -inset-10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${data.rawSentiment === 'Positive' ? 'bg-emerald-500' : data.rawSentiment === 'Negative' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
            <h3 className="text-white/50 font-bold uppercase tracking-widest text-sm relative z-10">Network Sentiment</h3>
            <div className={`text-4xl md:text-5xl font-black relative z-10 ${data.rawSentiment === 'Positive' ? 'text-emerald-400' : data.rawSentiment === 'Negative' ? 'text-rose-400' : 'text-amber-400'}`}>
              {data.overallSentiment}
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between h-48">
            <h3 className="text-white/50 font-bold uppercase tracking-widest text-sm">Focus Topic</h3>
            <div className="text-3xl font-extrabold text-primary break-words leading-tight">{data.topic}</div>
          </div>
        </section>

        {/* AI Insight Hero Card */}
        <section className="glass-card p-10 md:p-14 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-tertiary/10 opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  NewsLens Intelligence
                </h2>
                
                <button 
                  onClick={speakReport}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-bold uppercase tracking-wider ${isSpeaking ? 'bg-primary/20 border-primary/50 text-primary animate-pulse' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'}`}
                >
                  {isSpeaking ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                      Stop
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                      Listen
                    </>
                  )}
                </button>
              </div>
              <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
                "{data.analystReport}"
              </p>
              <div className="mt-8 p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md inline-block">
                <span className="text-xs text-white/50 font-bold tracking-widest uppercase block mb-2">Recommended Action</span>
                <span className="text-xl font-bold text-white">{data.recommendedAction}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Charts & Graphs Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-8">
            <h3 className="text-sm font-bold tracking-widest text-white/50 uppercase mb-8">Sentiment Distribution</h3>
            <div className="flex items-center justify-between gap-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="16"></circle>
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="#32D74B" strokeWidth="16" strokeDasharray={`${(data.sentimentDistribution.pos / 100) * 440} 440`} strokeDashoffset="0"></circle>
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="#FF9F0A" strokeWidth="16" strokeDasharray={`${(data.sentimentDistribution.neu / 100) * 440} 440`} strokeDashoffset={`-${(data.sentimentDistribution.pos / 100) * 440}`}></circle>
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="#FF453A" strokeWidth="16" strokeDasharray={`${(data.sentimentDistribution.neg / 100) * 440} 440`} strokeDashoffset={`-${((data.sentimentDistribution.pos + data.sentimentDistribution.neu) / 100) * 440}`}></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black">{data.sentimentDistribution.pos}%</span>
                  <span className="text-xs text-white/40 font-bold uppercase">Positive</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div><div className="flex justify-between text-sm font-bold mb-1"><span className="text-emerald-400">Positive</span><span>{data.sentimentDistribution.pos}%</span></div><div className="h-1.5 w-full bg-white/10 rounded-full"><div className="h-full bg-emerald-400 rounded-full" style={{width: `${data.sentimentDistribution.pos}%`}}></div></div></div>
                <div><div className="flex justify-between text-sm font-bold mb-1"><span className="text-amber-400">Neutral</span><span>{data.sentimentDistribution.neu}%</span></div><div className="h-1.5 w-full bg-white/10 rounded-full"><div className="h-full bg-amber-400 rounded-full" style={{width: `${data.sentimentDistribution.neu}%`}}></div></div></div>
                <div><div className="flex justify-between text-sm font-bold mb-1"><span className="text-rose-400">Negative</span><span>{data.sentimentDistribution.neg}%</span></div><div className="h-1.5 w-full bg-white/10 rounded-full"><div className="h-full bg-rose-400 rounded-full" style={{width: `${data.sentimentDistribution.neg}%`}}></div></div></div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-sm font-bold tracking-widest text-white/50 uppercase mb-8">Article Sources</h3>
            <div className="space-y-5">
              {data.sources.slice(0,4).map((source: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-white/90">{source.name}</span>
                    <span className="text-white/50">{source.count} articles</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{width: `${(source.count / data.totalArticles) * 100}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Article Feed */}
        <section>
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-2xl font-bold text-white">Live Feed</h2>
            <button onClick={downloadCSV} className="ios-btn-secondary text-sm">Export Data</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.articles.map((article: any, i: number) => (
              <div key={i} className="glass-card p-8 flex flex-col h-full cursor-pointer hover:scale-[1.02] transition-all" onClick={() => setSelectedArticle(article)}>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">{article.source}</span>
                  <div className={`w-3 h-3 rounded-full ${article.sentiment === 'Positive' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : article.sentiment === 'Negative' ? 'bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.8)]' : 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]'}`}></div>
                </div>
                <h4 className="text-xl font-bold leading-tight mb-4 flex-1 line-clamp-3">{article.title}</h4>
                <div className="mt-auto pt-4 border-t border-white/10">
                  <p className="text-sm font-medium text-white/50 line-clamp-2">{article.points[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-12">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedArticle(null)}></div>
          <div className="glass-card w-full max-w-3xl max-h-full overflow-y-auto relative z-10 p-10 md:p-14 border border-white/20 shadow-2xl animate-float" style={{animationDuration: '10s'}}>
            <button onClick={() => setSelectedArticle(null)} className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4 block">{selectedArticle.source}</span>
            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-8">{selectedArticle.title}</h2>
            <div className="space-y-6 text-lg text-white/80 font-medium leading-relaxed">
              <p>{selectedArticle.content}</p>
              {selectedArticle.points && selectedArticle.points.map((p: string, i: number) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-primary mt-1">•</span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
            {selectedArticle.link && selectedArticle.link !== '#' && (
              <div className="mt-10">
                <a href={selectedArticle.link} target="_blank" rel="noopener noreferrer" className="ios-btn-primary inline-block text-center w-full md:w-auto">
                  Read Original Story
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black"><div className="w-16 h-16 border-[6px] border-white/10 border-t-primary rounded-full animate-spin"></div></div>}>
      <DashboardContent />
    </Suspense>
  )
}
