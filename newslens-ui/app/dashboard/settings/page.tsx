"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Bell, Globe, Cpu, CreditCard, Save, Check, History, Download } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function SettingsPage() {
  const {
    displayName, setDisplayName,
    email, setEmail,
    aggressiveAi, setAggressiveAi,
    radarAlerts, setRadarAlerts,
    dataSaver, setDataSaver,
    defaultLanguage, setDefaultLanguage,
    activePlan, setActivePlan,
    emailDigest, setEmailDigest,
    pushEnabled, setPushEnabled,
    soundEnabled, setSoundEnabled,
    paymentCard, setPaymentCard,
    isLoaded
  } = useSettings();

  const [activeTab, setActiveTab] = useState("Account");

  // Local state for inputs to avoid updating context on every keystroke
  const [localName, setLocalName] = useState(displayName);
  const [localEmail, setLocalEmail] = useState(email);
  const [localLang, setLocalLang] = useState(defaultLanguage);
  const [localPlan, setLocalPlan] = useState(activePlan);
  const [localEmailDigest, setLocalEmailDigest] = useState(emailDigest);
  const [localPush, setLocalPush] = useState(pushEnabled);
  const [localSound, setLocalSound] = useState(soundEnabled);

  // Local card state
  const [ccNum, setCcNum] = useState("");
  const [ccExpiry, setCcExpiry] = useState("");
  const [ccCvv, setCcCvv] = useState("");
  const [cardError, setCardError] = useState("");

  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sync context to local states on mount and update
  useEffect(() => {
    if (isLoaded) {
      setLocalName(displayName);
      setLocalEmail(email);
      setLocalLang(defaultLanguage);
      setLocalPlan(activePlan);
      setLocalEmailDigest(emailDigest);
      setLocalPush(pushEnabled);
      setLocalSound(soundEnabled);
    }
  }, [displayName, email, defaultLanguage, activePlan, emailDigest, pushEnabled, soundEnabled, isLoaded]);

  const handleSave = () => {
    setDisplayName(localName);
    setEmail(localEmail);
    setDefaultLanguage(localLang);
    setActivePlan(localPlan);
    setEmailDigest(localEmailDigest);
    setPushEnabled(localPush);
    setSoundEnabled(localSound);

    // If card number is entered, format and save payment card
    if (ccNum.trim()) {
      const cleanNum = ccNum.replace(/\s+/g, '');
      if (cleanNum.length < 15 || cleanNum.length > 16 || isNaN(Number(cleanNum))) {
        setCardError("Please enter a valid card number (15 or 16 digits).");
        return;
      }
      setCardError("");
      
      let cardType = "Visa";
      if (cleanNum.startsWith("5")) cardType = "Mastercard";
      else if (cleanNum.startsWith("3")) cardType = "American Express";
      else if (cleanNum.startsWith("6")) cardType = "Discover";
      
      const lastDigits = cleanNum.slice(-4);
      setPaymentCard(`${cardType} ending in ${lastDigits}`);
      setCcNum("");
      setCcExpiry("");
      setCcCvv("");
    } else {
      setCardError("");
    }

    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const tabs = [
    { name: "Account", icon: User },
    { name: "AI Preferences", icon: Cpu },
    { name: "Notifications", icon: Bell },
    { name: "Localization", icon: Globe },
    { name: "Billing", icon: CreditCard },
  ];

  // Helper to get cost of current plan
  const getPlanCost = (plan: string) => {
    if (plan === "Enterprise Core") return "$99.00";
    if (plan === "Pro Analyst") return "$29.00";
    return "$0.00";
  };

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto pb-32">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">Platform Settings</h1>
        {showSavedToast && (
          <div className="bg-primary/20 border border-primary text-primary px-6 py-2 rounded-full text-sm font-bold animate-pulse shadow-glow">
            Preferences Saved!
          </div>
        )}
      </div>
      <p className="text-white/50 font-medium mb-12">Configure your AI intelligence dashboard preferences.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings Navigation/Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((item) => (
            <button 
              key={item.name} 
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${activeTab === item.name ? 'bg-primary text-white shadow-glow font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white font-medium'}`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Account Tab */}
          {activeTab === "Account" && (
            <section className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-4">Profile Information</h3>
                <div className="flex items-center gap-6 mt-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center font-black text-3xl text-white shadow-glow">
                    {localName ? localName.charAt(0).toUpperCase() : "S"}
                  </div>
                  <div>
                    <button className="ios-btn-secondary text-sm py-2 px-4">Upload New Avatar</button>
                    <p className="text-xs text-white/40 mt-2">JPEG or PNG, max 2MB.</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Display Name</label>
                  <input 
                    type="text" 
                    value={localName} 
                    onChange={(e) => setLocalName(e.target.value)}
                    className="ios-input text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={localEmail} 
                    onChange={(e) => setLocalEmail(e.target.value)}
                    className="ios-input text-sm" 
                  />
                </div>
              </div>
            </section>
          )}

          {/* 2. AI Preferences Tab */}
          {activeTab === "AI Preferences" && (
            <section className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">System Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Aggressive AI Sentiment</h4>
                    <p className="text-xs text-white/50 mt-1">AI will provide blunt, unfiltered market analysis.</p>
                  </div>
                  <div 
                    onClick={() => setAggressiveAi(!aggressiveAi)}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${aggressiveAi ? 'bg-primary shadow-glow' : 'bg-white/10 border border-white/20'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${aggressiveAi ? 'bg-white right-1' : 'bg-white/50 left-1'}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Real-time Radar Alerts</h4>
                    <p className="text-xs text-white/50 mt-1">Show breaking news ticker in the navigation bar.</p>
                  </div>
                  <div 
                    onClick={() => setRadarAlerts(!radarAlerts)}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${radarAlerts ? 'bg-primary shadow-glow' : 'bg-white/10 border border-white/20'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${radarAlerts ? 'bg-white right-1' : 'bg-white/50 left-1'}`}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Data Saver Mode</h4>
                    <p className="text-xs text-white/50 mt-1">Reduce background API polling for mobile devices.</p>
                  </div>
                  <div 
                    onClick={() => setDataSaver(!dataSaver)}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${dataSaver ? 'bg-primary shadow-glow' : 'bg-white/10 border border-white/20'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${dataSaver ? 'bg-white right-1' : 'bg-white/50 left-1'}`}></div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 3. Notifications Tab (New!) */}
          {activeTab === "Notifications" && (
            <section className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4 space-y-6">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Notifications Setup</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Desktop Push Alerts</h4>
                    <p className="text-xs text-white/50 mt-1">Receive high-priority system alerts inside the browser.</p>
                  </div>
                  <div 
                    onClick={() => setLocalPush(!localPush)}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${localPush ? 'bg-primary shadow-glow' : 'bg-white/10 border border-white/20'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${localPush ? 'bg-white right-1' : 'bg-white/50 left-1'}`}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Radar Sound Alerts</h4>
                    <p className="text-xs text-white/50 mt-1">Play sub-audible high-tech pinging sound on neural updates.</p>
                  </div>
                  <div 
                    onClick={() => setLocalSound(!localSound)}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${localSound ? 'bg-primary shadow-glow' : 'bg-white/10 border border-white/20'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${localSound ? 'bg-white right-1' : 'bg-white/50 left-1'}`}></div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Email Digest Frequency</label>
                  <select 
                    value={localEmailDigest}
                    onChange={(e) => setLocalEmailDigest(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50"
                  >
                    <option value="instant" className="bg-black text-white">Instant Alert (Realtime)</option>
                    <option value="daily" className="bg-black text-white">Daily Intelligence Digest</option>
                    <option value="weekly" className="bg-black text-white">Weekly Market Overview</option>
                    <option value="off" className="bg-black text-white">Turn Off All Email Updates</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* 4. Localization Tab (New!) */}
          {activeTab === "Localization" && (
            <section className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4 space-y-6">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Language & Region</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Default Intelligence Language</label>
                  <p className="text-[10px] text-white/40 mb-2">Select your primary query translation model (applied on dashboard loading).</p>
                  <select 
                    value={localLang}
                    onChange={(e) => setLocalLang(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50"
                  >
                    <option value="en" className="bg-black text-white">English (US/Global)</option>
                    <option value="hi" className="bg-black text-white">Hindi (हिंदी - भारत)</option>
                    <option value="mr" className="bg-black text-white">Marathi (मराठी - महाराष्ट्र)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Time Format</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50">
                      <option value="12" className="bg-black text-white">12-hour (AM/PM)</option>
                      <option value="24" className="bg-black text-white">24-hour Standard</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Macro Region Filter</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50">
                      <option value="global" className="bg-black text-white">Global Feed (All Sources)</option>
                      <option value="in" className="bg-black text-white">India Only Coverage</option>
                      <option value="us" className="bg-black text-white">US & Europe Core</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 5. Billing & Subscription Tab (New!) */}
          {activeTab === "Billing" && (
            <section className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-4">Billing & Subscriptions</h3>
                <p className="text-xs text-white/50 mt-2">Manage your plan, check invoices, and update billing methods.</p>
              </div>

              {/* Tiers Selectors */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Select Membership Tier</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Free Tier", price: "$0/mo", desc: "Basic RSS Feeds" },
                    { title: "Pro Analyst", price: "$29/mo", desc: "AI Insights & Voice Briefs" },
                    { title: "Enterprise Core", price: "$99/mo", desc: "Unlimited Queries & Teams" }
                  ].map((p) => {
                    const isSelected = localPlan === p.title;
                    return (
                      <div 
                        key={p.title}
                        onClick={() => setLocalPlan(p.title)}
                        className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between ${isSelected ? 'border-primary bg-primary/10 shadow-glow' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-white'}`}>{p.title}</span>
                          {isSelected && <Check size={16} className="text-primary" />}
                        </div>
                        <div className="mt-4">
                          <span className="text-xl font-black text-white">{p.price}</span>
                          <p className="text-[10px] text-white/50 mt-1">{p.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Card Section */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <div>
                  <h4 className="text-sm font-bold text-white">Active Payment Method</h4>
                  <p className="text-xs text-white/50 mt-1">Currently charging: <span className="text-primary font-bold">{paymentCard}</span></p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <span className="text-xs font-bold text-white/70 block">Update Credit Card Info</span>
                  {cardError && <p className="text-xs text-rose-400 font-bold">{cardError}</p>}
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <input 
                        type="text" 
                        value={ccNum}
                        onChange={(e) => setCcNum(e.target.value)}
                        placeholder="Card Number (e.g. 4111 2222 3333 4444)" 
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50" 
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        value={ccExpiry}
                        onChange={(e) => setCcExpiry(e.target.value)}
                        placeholder="MM/YY" 
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 text-center" 
                      />
                    </div>
                    <div>
                      <input 
                        type="password" 
                        value={ccCvv}
                        onChange={(e) => setCcCvv(e.target.value)}
                        placeholder="CVV" 
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 text-center" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoices List */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <History size={16} className="text-primary" /> Invoice History
                </h4>
                <div className="overflow-hidden border border-white/5 rounded-2xl bg-white/5">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-bold tracking-widest bg-white/5">
                        <th className="p-4">Invoice ID</th>
                        <th className="p-4">Billing Date</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs text-white/80 font-medium">
                      {[
                        { id: "NL-2026-042", date: "May 10, 2026", amt: getPlanCost(localPlan), status: "Paid" },
                        { id: "NL-2026-031", date: "Apr 10, 2026", amt: getPlanCost(localPlan), status: "Paid" }
                      ].map((inv) => (
                        <tr key={inv.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                          <td className="p-4 text-white font-bold">{inv.id}</td>
                          <td className="p-4">{inv.date}</td>
                          <td className="p-4">{inv.amt}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                              {inv.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="text-primary hover:underline font-bold inline-flex items-center gap-1">
                              <Download size={12} /> PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Action Toolbar */}
          <div className="flex justify-end pt-4">
            <button onClick={handleSave} className="ios-btn-primary flex items-center gap-2">
              <Save size={18} /> Save Preferences
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
