"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Zap, TrendingUp, TrendingDown, Eye, MessageSquare, BookOpen, ChevronRight, X, Play, Square, Bookmark } from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get('topic') || 'Global Economy';

  const [activeTopic, setActiveTopic] = useState(initialTopic);
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState<{role: string, content: string}[]>([{ role: 'system', content: 'Hello, I am Sanket AI. How can I assist you with global intelligence today?' }]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analyze?topic=${encodeURIComponent(activeTopic)}&lang=${lang}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, [activeTopic, lang]);

  const speakReport = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(data.analystReport + ". " + data.recommendedAction);
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!chatMsg.trim()) return;
    setChatLog([...chatLog, { role: 'user', content: chatMsg }, { role: 'system', content: `Analyzing your query regarding "${chatMsg}"... Based on current data, the market is reacting to recent headlines. (This is a simulated AI response by Sanket AI).` }]);
    setChatMsg("");
  };

  if (loading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center relative">
        <div className="w-32 h-32 absolute border border-white/5 rounded-full animate-ping"></div>
        <div className="w-16 h-16 border-[4px] border-white/10 border-t-primary rounded-full animate-spin z-10"></div>
        <p className="mt-8 text-sm font-bold tracking-[0.2em] uppercase text-white/50 animate-pulse">Synthesizing Intel...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-10 relative h-full w-full">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">Global Intelligence</h1>
          <p className="text-white/50 font-medium">Monitoring real-time data for: <span className="text-primary">{data.topic}</span></p>
        </div>
        <div className="flex gap-4">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-primary/50"
          >
            <option value="en" className="bg-black">English</option>
            <option value="hi" className="bg-black">Hindi</option>
            <option value="mr" className="bg-black">Marathi</option>
          </select>
          <button 
            onClick={speakReport}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold tracking-wide transition-all ${isSpeaking ? 'bg-primary text-white shadow-glow animate-pulse' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {isSpeaking ? <Square fill="currentColor" size={16} /> : <Play fill="currentColor" size={16} />}
            {isSpeaking ? 'STOP BRIEFING' : 'DAILY BRIEFING'}
          </button>
        </div>
      </div>

      {/* Hero AI Report */}
      <section className="glass-card p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/30 transition-colors"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-primary" size={24} />
            <h2 className="text-xs font-bold tracking-[0.2em] text-primary uppercase">AI Analyst Report</h2>
          </div>
          <p className="text-xl md:text-3xl font-medium text-white/90 leading-relaxed mb-8">
            {data.analystReport}
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 inline-block">
             <span className="text-xs text-white/50 font-bold uppercase tracking-widest block mb-2">Recommended Action</span>
             <span className="text-lg font-bold text-white">{data.recommendedAction}</span>
          </div>
        </div>
      </section>

      {/* Market Impact & Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
           <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase mb-4">Total Signals</h3>
           <div className="text-5xl font-black text-white">{data.totalArticles}</div>
        </div>
        <div className="glass-card p-6 relative overflow-hidden group">
           <div className={`absolute -inset-10 blur-3xl opacity-20 ${data.rawSentiment === 'Positive' ? 'bg-emerald-500' : data.rawSentiment === 'Negative' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
           <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase mb-4 relative z-10">Macro Sentiment</h3>
           <div className={`text-3xl font-black relative z-10 ${data.rawSentiment === 'Positive' ? 'text-emerald-400' : data.rawSentiment === 'Negative' ? 'text-rose-400' : 'text-amber-400'}`}>
             {data.overallSentiment}
           </div>
        </div>
        
        {/* Market Impacts AI Output */}
        <div className="glass-card p-6 lg:col-span-2">
           <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase mb-6">AI Predicted Market Impact</h3>
           <div className="grid grid-cols-2 gap-4">
              {data.marketImpacts && Object.entries(data.marketImpacts).map(([market, impact]: any, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-sm font-semibold text-white/70">{market}</span>
                  <span className={`text-sm font-bold ${impact.includes('+') ? 'text-emerald-400' : impact.includes('-') ? 'text-rose-400' : 'text-amber-400'}`}>
                    {impact}
                  </span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* News Feed Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Live Intel Feed</h2>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold text-white">Latest</button>
             <button className="px-4 py-2 bg-transparent text-white/50 hover:bg-white/5 rounded-lg text-xs font-bold transition-all">Top Rated</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.articles.map((article: any, i: number) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={article.id || i} 
              className="glass-card p-6 flex flex-col h-full cursor-pointer group"
              onClick={() => setSelectedArticle(article)}
            >
              {/* Card Header (Source + Category) */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{article.source.charAt(0)}</div>
                   <span className="text-xs font-bold tracking-widest text-white/70 uppercase">{article.source}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-primary/20 text-primary rounded-full uppercase tracking-wider">{article.aiMetadata?.category || 'General'}</span>
              </div>
              
              {/* Title */}
              <h4 className="text-lg font-bold leading-snug mb-4 group-hover:text-primary transition-colors line-clamp-3">{article.title}</h4>
              
              {/* AI Credibility & Stats */}
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1" title="Credibility Score">
                      {article.aiMetadata?.credibilityScore > 85 ? <ShieldCheck size={14} className="text-emerald-400" /> : <ShieldAlert size={14} className="text-amber-400" />}
                      <span className="text-xs font-bold text-white/70">{article.aiMetadata?.credibilityScore || 80}%</span>
                   </div>
                   <div className="w-1 h-1 rounded-full bg-white/20"></div>
                   <span className="text-xs font-medium text-white/50">{new Date(article.pubDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                 </div>
                 <ChevronRight size={16} className="text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating AI Chat Button */}
      <button 
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-full shadow-glow flex items-center justify-center hover:scale-110 transition-transform z-50 text-white"
      >
        {chatOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Assistant Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-96 h-[30rem] glass-card z-50 flex flex-col border border-white/20 shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center font-bold text-xs shadow-glow text-black">S</div>
              <div>
                <h4 className="text-sm font-bold text-white">Sanket AI</h4>
                <p className="text-[10px] text-primary font-medium tracking-widest uppercase">Online</p>
              </div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white/10 text-white/90 rounded-bl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10 bg-black/20">
              <input 
                type="text" 
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                placeholder="Ask Sanket AI anything..." 
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Browser Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setSelectedArticle(null)}></div>
            <motion.div 
              initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.95 }}
              className="w-full max-w-5xl h-full glass-card relative z-10 flex flex-col md:flex-row overflow-hidden shadow-2xl"
            >
              <button onClick={() => setSelectedArticle(null)} className="absolute top-4 right-4 md:right-auto md:left-4 z-20 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white border border-white/10">
                <X size={20} />
              </button>

              {/* Main Reading Area */}
              <div className="flex-1 overflow-y-auto p-8 md:p-16 md:pl-24 bg-black/40">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/70 uppercase tracking-widest">{selectedArticle.source}</span>
                    <span className="text-xs text-white/40">{new Date(selectedArticle.pubDate).toLocaleString()}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 text-white">{selectedArticle.title}</h1>
                  
                  <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed font-medium">
                    <p>{selectedArticle.content}</p>
                    {/* Simulated full article content */}
                    <p className="mt-6 text-white/50 italic">Full article content is generally locked behind the publisher's site. Please visit the original source to read the entire piece.</p>
                  </div>

                  {selectedArticle.link && selectedArticle.link !== '#' && (
                    <div className="mt-12">
                      <a href={selectedArticle.link} target="_blank" rel="noopener noreferrer" className="ios-btn-primary inline-flex items-center gap-2">
                        <BookOpen size={18} /> Read on {selectedArticle.source}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Summary Sidebar */}
              <div className="w-full md:w-80 bg-surface border-l border-white/5 p-8 flex flex-col h-full overflow-y-auto">
                <h3 className="text-sm font-bold tracking-widest uppercase text-primary flex items-center gap-2 mb-6">
                  <Zap size={16} /> AI Analysis
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Summary</h4>
                    <p className="text-sm text-white/90 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">{selectedArticle.aiMetadata?.summary}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Credibility Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/70">Trust Score</span>
                        <span className="font-bold text-emerald-400">{selectedArticle.aiMetadata?.credibilityScore}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full" style={{width: `${selectedArticle.aiMetadata?.credibilityScore || 80}%`}}></div>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-2">
                        <span className="text-white/70">Fake News Prob.</span>
                        <span className="font-bold text-amber-400">{selectedArticle.aiMetadata?.fakeNewsProbability}%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-2">
                        <span className="text-white/70">Bias</span>
                        <span className="font-bold text-white">{selectedArticle.aiMetadata?.bias}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                     <button className="w-full py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2">
                       <Bookmark size={16} /> Save to Watchlist
                     </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="h-full flex items-center justify-center"><div className="w-10 h-10 border-[3px] border-white/20 border-t-primary rounded-full animate-spin"></div></div>}>
      <DashboardContent />
    </Suspense>
  )
}
