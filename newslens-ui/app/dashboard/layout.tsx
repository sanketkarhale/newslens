"use client";
import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Bell, Bookmark, TrendingUp, Settings, Map, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [breakingNews, setBreakingNews] = useState("AI regulations in EU finalized. Bitcoin hits new resistance level. Asian markets open mixed.");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      router.push(`/dashboard?topic=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: TrendingUp },
    { name: 'Watchlist', href: '/dashboard/watchlist', icon: Bookmark },
    { name: 'Global Map', href: '/dashboard/map', icon: Map },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-surface">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed md:static inset-y-0 left-0 w-64 z-50 glass-card rounded-none rounded-r-[2.5rem] md:rounded-none md:border-y-0 md:border-l-0 flex flex-col md:translate-x-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-8 flex items-center justify-between">
          <Link href="/" className="font-black text-2xl tracking-tighter text-white">NewsLens</Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white/50"><X size={24} /></button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <p className="px-4 text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Menu</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${isActive ? 'bg-primary/20 text-primary border border-primary/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
                <item.icon size={20} />
                <span className="font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-8 border-t border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center font-bold text-white">S</div>
            <div>
              <p className="text-sm font-bold text-white">Sanket K.</p>
              <p className="text-xs text-white/50">Pro Member</p>
            </div>
          </div>
          <p className="text-[10px] text-white/30 text-center uppercase tracking-widest mt-4">Created by Sanket G Karhale</p>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 flex items-center justify-between px-6 md:px-12 border-b border-white/5 z-30 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-white/70 hover:text-white">
              <Menu size={24} />
            </button>
            <button onClick={() => router.back()} className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white">
              <ArrowLeft size={18} />
            </button>
            
            {/* Breaking News Radar */}
            <div className="hidden lg:flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 overflow-hidden w-96">
              <span className="flex w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest whitespace-nowrap">Radar</span>
              <div className="w-full overflow-hidden relative h-5 flex items-center">
                <motion.p 
                  className="text-xs font-medium text-white/80 whitespace-nowrap absolute"
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                >
                  {breakingNews}
                </motion.p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 focus-within:border-primary/50 transition-colors">
              <Search size={18} className="text-white/50" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-white text-sm ml-2 placeholder:text-white/30" 
                placeholder="Global intelligence search..." 
              />
              <button type="submit" className="ml-2 bg-primary hover:bg-primary/80 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
                Search
              </button>
            </form>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white">
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
