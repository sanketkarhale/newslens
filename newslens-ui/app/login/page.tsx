"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (res?.error) {
      setError('Invalid credentials');
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] opacity-70"></div>
      </div>
      
      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-on-surface mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>NewsLens</h1>
          <p className="text-on-surface-variant font-medium text-lg">Sign in to your intelligent feed.</p>
        </div>

        <div className="bg-surface/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-2">Email or Mobile Number</label>
              <input 
                type="text" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest/50 border border-white/5 rounded-3xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-on-surface font-medium placeholder:text-outline"
                placeholder="Enter your ID"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface-container-lowest/50 border border-white/5 rounded-3xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-on-surface font-medium placeholder:text-outline"
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && <p className="text-error text-sm text-center font-medium">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-on-primary font-bold rounded-3xl py-4 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 mt-2"
            >
              {loading ? 'Authenticating...' : 'Continue'}
            </button>
            <p className="text-center text-xs text-on-surface-variant font-medium mt-4">If you don't have an account, one will be created.</p>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-on-surface-variant font-medium">Or</span>
              </div>
            </div>

            <button 
              onClick={() => alert('Google Sign-In requires Client ID configuration in .env. Use Email/Mobile for now!')}
              className="mt-6 w-full flex items-center justify-center gap-3 bg-white text-black font-bold rounded-3xl py-4 shadow-xl hover:bg-gray-100 active:scale-[0.98] transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 24c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 21.53 7.7 24 12 24z" />
                <path fill="#FBBC05" d="M5.84 15.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V8.06H2.18C1.43 9.55 1 11.22 1 13s.43 3.45 1.18 4.94l3.66-2.84z" />
                <path fill="#EA4335" d="M12 4.69c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.43 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
