import { ShieldCheck, User, Bell, Globe, Cpu, CreditCard, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto pb-32">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">Platform Settings</h1>
      <p className="text-white/50 font-medium mb-12">Configure your AI intelligence dashboard preferences.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings Navigation/Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { name: "Account", icon: User, active: true },
            { name: "AI Preferences", icon: Cpu, active: false },
            { name: "Notifications", icon: Bell, active: false },
            { name: "Localization", icon: Globe, active: false },
            { name: "Billing", icon: CreditCard, active: false },
          ].map((item) => (
            <button key={item.name} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${item.active ? 'bg-primary text-white shadow-glow font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white font-medium'}`}>
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Profile Section */}
          <section className="glass-card p-8">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Profile Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center font-black text-3xl text-white shadow-glow">
                  S
                </div>
                <div>
                  <button className="ios-btn-secondary text-sm py-2 px-4">Upload New Avatar</button>
                  <p className="text-xs text-white/40 mt-2">JPEG or PNG, max 2MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Display Name</label>
                  <input type="text" defaultValue="Sanket G. Karhale" className="ios-input text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" defaultValue="founder@newslens.ai" className="ios-input text-sm" />
                </div>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="glass-card p-8">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">System Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Aggressive AI Sentiment</h4>
                  <p className="text-xs text-white/50 mt-1">AI will provide blunt, unfiltered market analysis.</p>
                </div>
                <div className="w-12 h-6 rounded-full bg-primary relative cursor-pointer shadow-glow">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Real-time Radar Alerts</h4>
                  <p className="text-xs text-white/50 mt-1">Show breaking news ticker in the navigation bar.</p>
                </div>
                <div className="w-12 h-6 rounded-full bg-primary relative cursor-pointer shadow-glow">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Data Saver Mode</h4>
                  <p className="text-xs text-white/50 mt-1">Reduce background API polling for mobile devices.</p>
                </div>
                <div className="w-12 h-6 rounded-full bg-white/10 border border-white/20 relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <button className="ios-btn-primary flex items-center gap-2">
              <Save size={18} /> Save Preferences
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
