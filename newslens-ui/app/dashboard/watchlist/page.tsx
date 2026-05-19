"use client";
import { Bookmark, ShieldCheck, ChevronRight } from "lucide-react";

export default function WatchlistPage() {
  // Mock data for the Watchlist (Since we don't have active auth/session context here yet)
  const savedArticles = [
    {
      id: "1",
      title: "Global Markets Rally as Tech Sector Surges",
      source: "Financial Times",
      category: "Markets",
      sentiment: "Positive",
      credibilityScore: 92,
      pubDate: new Date().toISOString()
    },
    {
      id: "2",
      title: "New European AI Regulations Proposed",
      source: "TechCrunch",
      category: "Technology",
      sentiment: "Neutral",
      credibilityScore: 88,
      pubDate: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  return (
    <div className="p-6 md:p-10 h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Bookmark className="text-primary" size={32} /> My Watchlist
          </h1>
          <p className="text-white/50">Saved articles and tracked intelligence.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article, i) => (
            <div key={i} className="glass-card p-6 flex flex-col h-full cursor-pointer group">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{article.source.charAt(0)}</div>
                   <span className="text-xs font-bold tracking-widest text-white/70 uppercase">{article.source}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-primary/20 text-primary rounded-full uppercase tracking-wider">{article.category}</span>
              </div>
              
              <h4 className="text-lg font-bold leading-snug mb-4 group-hover:text-primary transition-colors line-clamp-3">{article.title}</h4>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1" title="Credibility Score">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      <span className="text-xs font-bold text-white/70">{article.credibilityScore}%</span>
                   </div>
                   <div className="w-1 h-1 rounded-full bg-white/20"></div>
                   <span className="text-xs font-medium text-white/50">{new Date(article.pubDate).toLocaleDateString()}</span>
                 </div>
                 <ChevronRight size={16} className="text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
        
        {savedArticles.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-white/40">
            <Bookmark size={48} className="mb-4 opacity-50" />
            <p className="font-bold">No saved articles yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
