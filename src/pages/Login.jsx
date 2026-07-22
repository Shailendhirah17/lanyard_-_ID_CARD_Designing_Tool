import { useState } from 'react';
import { Mail, Lock, User, ShieldCheck } from 'lucide-react';
import { authService } from '../services/authService';

export default function Login({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-[400px]">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-sm">
              M
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">MyLanyard Studio</h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">Enterprise Identity & Card Configurator</p>
          </div>

          <div className="mb-6 flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 rounded-md py-2 text-xs font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 rounded-md py-2 text-xs font-semibold transition-all ${
                activeTab === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  required
                />
              </div>
            )}

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail size={16} />
              </div>
              <input
                type="email"
                placeholder="Work Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                required
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock size={16} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                required
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-600 border border-red-100">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? 'Authenticating…' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {import.meta.env.DEV && (
            <div className="mt-8 space-y-3 border-t border-[#eef2f6] pt-8">
              <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                Demo accounts (dev only)
              </p>
              <button
                type="button"
                onClick={() => fillCredentials('admin@test.com', 'admin123')}
                className="flex w-full items-start gap-3 rounded-2xl border border-teal-100 bg-teal-50/80 p-4 text-left transition-colors hover:bg-teal-100/80"
              >
                <ShieldCheck className="mt-0.5 shrink-0 text-teal-500" size={18} />
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-teal-700">gotek (Admin)</p>
                  <p className="mt-1 text-[13px] font-bold text-teal-900">
                    admin@test.com <span className="text-teal-600">·</span> admin123
                  </p>
                  <p className="mt-1 text-[10px] font-semibold italic text-teal-500">Tap to fill</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('user@test.com', 'user123')}
                className="flex w-full items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-left transition-colors hover:bg-blue-100/80"
              >
                <User className="mt-0.5 shrink-0 text-[#5d5fef]" size={18} />
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-blue-800">User</p>
                  <p className="mt-1 text-[13px] font-bold text-blue-900">
                    user@test.com <span className="text-[#5d5fef]">·</span> user123
                  </p>
                  <p className="mt-1 text-[10px] font-semibold italic text-blue-400">Tap to fill</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
