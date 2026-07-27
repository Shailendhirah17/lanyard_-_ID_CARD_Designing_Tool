import { useState } from 'react';
import { Mail, Lock, User, ShieldCheck, Eye, EyeOff, Sparkles, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { authService } from '../services/authService';

export default function Login({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = activeTab === 'login'
        ? await authService.login({ email, password })
        : await authService.register({ name, email, password });
      onLogin(user);
    } catch (err) {
      // Offline / Demo fallback for local dev environment
      if (email === 'admin@test.com' && password === 'admin123') {
        const demoAdmin = { id: 'demo-admin', email, name: 'Admin User', isAdmin: true, token: 'demo-token' };
        localStorage.setItem('gotek_token', demoAdmin.token);
        localStorage.setItem('gotek_user', JSON.stringify(demoAdmin));
        onLogin(demoAdmin);
        return;
      }
      if (email === 'user@test.com' && password === 'user123') {
        const demoUser = { id: 'demo-user', email, name: 'John Doe', isAdmin: false, token: 'demo-token' };
        localStorage.setItem('gotek_token', demoUser.token);
        localStorage.setItem('gotek_user', JSON.stringify(demoUser));
        onLogin(demoUser);
        return;
      }
      const msg = err?.response?.data?.message || err?.message || 'Authentication failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (credEmail, credPassword) => {
    setEmail(credEmail);
    setPassword(credPassword);
    setActiveTab('login');
    setError('');
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col lg:flex-row bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
      {/* Left side: Brand Hero / Feature Showcase */}
      <div className="relative flex flex-col justify-between p-8 lg:p-16 lg:w-[52%] bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/60">
        {/* Glow backdrop decorative elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-indigo-500/25">
            M
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white">MyLanyard Studio</span>
            <span className="block text-[11px] font-medium text-indigo-300/80">Enterprise Identity Platform</span>
          </div>
        </div>

        {/* Center Showcase Card */}
        <div className="relative z-10 my-12 lg:my-0 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles size={14} className="text-indigo-400" />
            <span>Next-Gen ID Card & Lanyard Design Suite</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Design, Preview & Order Corporate Cards in Minutes
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Streamline institutional identity management with real-time 3D previews, bulk CSV roster imports, and instant vector printing exports.
            </p>
          </div>

          {/* Interactive Mock Card Preview */}
          <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl max-w-md space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-indigo-300 font-bold text-sm">
                  JD
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Alex Morgan</p>
                <p className="text-xs text-indigo-300 font-medium">Senior Product Designer</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: GTEK-2026-8841</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
                <CheckCircle2 size={12} />
                <span>Verified</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-3/4 rounded-full" />
            </div>
          </div>

          {/* Key Feature List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
            {[
              'Real-Time 3D Lanyard Render',
              'Bulk CSV Student Roster Upload',
              'Custom QR & Barcode Generator',
              'Direct Production Order Tracker'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} MyLanyard Studio Inc. All rights reserved.
        </div>
      </div>

      {/* Right side: Login / Signup Form Card */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12 bg-slate-900">
        <div className="w-full max-w-[420px] space-y-6">
          
          {/* Card Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            
            {/* Header */}
            <div className="mb-6 space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back</h2>
              <p className="text-xs text-slate-400">Sign in to your account or create a new workspace.</p>
            </div>

            {/* Segmented Tab Switcher */}
            <div className="mb-6 flex rounded-xl border border-slate-800 bg-slate-950 p-1">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setError(''); }}
                className={`flex-1 rounded-lg py-2.5 text-xs font-semibold transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('signup'); setError(''); }}
                className={`flex-1 rounded-lg py-2.5 text-xs font-semibold transition-all duration-200 ${
                  activeTab === 'signup'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3.5 text-sm font-medium text-white placeholder:text-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3.5 text-sm font-medium text-white placeholder:text-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  {activeTab === 'login' && (
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); fillCredentials('user@test.com', 'user123'); }} className="text-[11px] font-medium text-indigo-400 hover:underline">
                      Fill Demo User
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-10 text-sm font-medium text-white placeholder:text-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-xs font-medium text-rose-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Authenticating…</span>
                ) : (
                  <>
                    <span>{activeTab === 'login' ? 'Sign In to Studio' : 'Create Account'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Fill Pills for Dev Mode */}
            {import.meta.env.DEV && (
              <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">
                  Quick Demo Accounts (Tap to Fill)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => fillCredentials('admin@test.com', 'admin123')}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all text-left group cursor-pointer"
                  >
                    <Shield className="text-indigo-400 shrink-0" size={16} />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-indigo-300 truncate">Admin</p>
                      <p className="text-[10px] text-slate-400 truncate">admin@test.com</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => fillCredentials('user@test.com', 'user123')}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all text-left group cursor-pointer"
                  >
                    <User className="text-emerald-400 shrink-0" size={16} />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-emerald-300 truncate">User</p>
                      <p className="text-[10px] text-slate-400 truncate">user@test.com</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
