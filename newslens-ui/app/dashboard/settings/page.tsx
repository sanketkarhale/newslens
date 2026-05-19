"use client";

import { useState } from 'react';
import { ShieldCheck, User, Bell, Globe, Cpu, CreditCard, Save } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function SettingsPage() {
  const {
    displayName, setDisplayName,
    email, setEmail,
    aggressiveAi, setAggressiveAi,
    radarAlerts, setRadarAlerts,
    dataSaver, setDataSaver
  } = useSettings();

  const [activeTab, setActiveTab] = useState("Account");

  // Local state for inputs to avoid updating context on every keystroke
  const [localName, setLocalName] = useState(displayName);
  const [localEmail, setLocalEmail] = useState(email);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    setDisplayName(localName);
    setEmail(localEmail);
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

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto pb-32">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">Platform Settings</h1>
        {showSavedToast && (
          <div className="bg-primary/20 border border-primary text-primary px-4 py-2 rounded-full text-sm font-bold animate-pulse">
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
          
          {activeTab === "Account" && (
            <section className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Profile Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center font-black text-3xl text-white shadow-glow">
                    {localName ? localName.charAt(0).toUpperCase() : "S"}
                  </div>
                  <div>
                    <button className="ios-btn-secondary text-sm py-2 px-4">Upload New Avatar</button>
                    <p className="text-xs text-white/40 mt-2">JPEG or PNG, max 2MB.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </section>
          )}

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

          {activeTab !== "Account" && activeTab !== "AI Preferences" && (
            <section className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center justify-center py-20 text-center">
              <ShieldCheck size={48} className="text-white/20 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{activeTab} Settings</h3>
              <p className="text-white/50 text-sm">This module is currently being upgraded for the next platform release.</p>
            </section>
          )}

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
