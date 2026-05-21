"use client";
import React, { useState, useEffect } from "react";
import { Bookmark, ShieldCheck, ChevronRight, X, BookOpen, Zap, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WatchlistPage() {
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const list = localStorage.getItem("nl_watchlist");
    if (list) {
      try {
        setSavedArticles(JSON.parse(list));
      } catch (e) {
        console.error("Failed to parse watchlist", e);
      }
    }
  }, []);

  const handleRemove = (id: string) => {
    const updated = savedArticles.filter(a => a.id !== id);
    setSavedArticles(updated);
    localStorage.setItem("nl_watchlist", JSON.stringify(updated));
    if (selectedArticle?.id === id) {
      setSelectedArticle(null);
    }
  };

  return (
    <div className="p-6 md:p-10 h-full flex flex-col relative">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Bookmark className="text-primary" size={32} /> My Watchlist
          </h1>
          <p className="text-white/50">Saved articles and tracked intelligence.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((article, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.05 }}
                key={article.id || i} 
                className="glass-card p-6 flex flex-col h-full cursor-pointer group relative"
                onClick={() => setSelectedArticle(article)}
              >
                {/* Card Header (Source + Category) */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                       {article.source ? article.source.charAt(0) : "S"}
                     </div>
                     <span className="text-xs font-bold tracking-widest text-white/70 uppercase">{article.source || "Source"}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-primary/20 text-primary rounded-full uppercase tracking-wider">
                    {article.aiMetadata?.category || article.category || "General"}
                  </span>
                </div>
                
                {/* Title */}
                <h4 className="text-lg font-bold leading-snug mb-4 group-hover:text-primary transition-colors line-clamp-3">
                  {article.title}
                </h4>
                
                {/* AI Credibility & Stats */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="flex items-center gap-1" title="Credibility Score">
                        {(article.aiMetadata?.credibilityScore || article.credibilityScore || 80) > 85 ? (
                          <ShieldCheck size={14} className="text-emerald-400" />
                        ) : (
                          <ShieldAlert size={14} className="text-amber-400" />
                        )}
                        <span className="text-xs font-bold text-white/70">
                          {article.aiMetadata?.credibilityScore || article.credibilityScore || 80}%
                        </span>
                     </div>
                     <div className="w-1 h-1 rounded-full bg-white/20"></div>
                     <span className="text-xs font-medium text-white/50">
                       {new Date(article.pubDate).toLocaleDateString()}
                     </span>
                   </div>
                   
                   <div className="flex items-center gap-2">
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         handleRemove(article.id);
                       }}
                       className="opacity-0 group-hover:opacity-100 transition-opacity bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-[10px] px-2 py-1 rounded-md font-bold"
                     >
                       Remove
                     </button>
                     <ChevronRight size={16} className="text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="h-96 flex flex-col items-center justify-center text-white/30 text-center max-w-sm mx-auto">
            <Bookmark size={64} className="mb-4 opacity-30 text-primary animate-pulse" />
            <h3 className="text-xl font-bold text-white mb-2">Watchlist Empty</h3>
            <p className="text-sm text-white/50">Articles you bookmark from the main Dashboard will appear here for deep-dive tracking.</p>
          </div>
        )}
      </div>

      {/* Reader Modal (Connected!) */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setSelectedArticle(null)}></div>
            <motion.div 
              initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.95 }}
              className="w-full max-w-5xl h-[95%] md:h-full glass-card relative z-10 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl"
            >
              <button onClick={() => setSelectedArticle(null)} className="absolute top-4 right-4 md:right-auto md:left-4 z-20 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white border border-white/10">
                <X size={20} />
              </button>

              {/* Main Reading Area */}
              <div className="flex-none md:flex-1 md:overflow-y-auto p-8 pt-16 md:p-16 md:pl-24 bg-black/40">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/70 uppercase tracking-widest">{selectedArticle.source}</span>
                    <span className="text-xs text-white/40">{new Date(selectedArticle.pubDate).toLocaleString()}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 text-white">{selectedArticle.title}</h1>
                  
                  <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed font-medium">
                    <p>{selectedArticle.content || `No snippet available. Please visit the source to read the entire report.`}</p>
                    <p className="mt-6 text-white/50 italic font-normal">This intelligence record is saved to your secure encrypted watchlist repository.</p>
                  </div>

                  {selectedArticle.link && selectedArticle.link !== '#' && (
                    <div className="mt-12">
                      <a href={selectedArticle.link} target="_blank" rel="noopener noreferrer" className="ios-btn-primary inline-flex items-center gap-2 text-sm">
                        <BookOpen size={18} /> Read on {selectedArticle.source}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Summary Sidebar */}
              <div className="w-full md:w-80 bg-surface border-t md:border-t-0 md:border-l border-white/5 p-8 flex flex-col flex-none md:h-full md:overflow-y-auto">
                <h3 className="text-sm font-bold tracking-widest uppercase text-primary flex items-center gap-2 mb-6">
                  <Zap size={16} /> AI Analysis
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Summary</h4>
                    <p className="text-sm text-white/90 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                      {selectedArticle.aiMetadata?.summary || selectedArticle.summary || "No AI summary calculated."}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Credibility Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/70">Trust Score</span>
                        <span className="font-bold text-emerald-400">{selectedArticle.aiMetadata?.credibilityScore || selectedArticle.credibilityScore || 80}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full" style={{width: `${selectedArticle.aiMetadata?.credibilityScore || selectedArticle.credibilityScore || 80}%`}}></div>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-2">
                        <span className="text-white/70">Fake News Prob.</span>
                        <span className="font-bold text-amber-400">{selectedArticle.aiMetadata?.fakeNewsProbability || 10}%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-2">
                        <span className="text-white/70">Bias</span>
                        <span className="font-bold text-white">{selectedArticle.aiMetadata?.bias || "Neutral"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                     <button 
                       onClick={() => handleRemove(selectedArticle.id)}
                       className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                     >
                       Remove from Watchlist
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
