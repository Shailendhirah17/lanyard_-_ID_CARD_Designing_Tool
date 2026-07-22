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
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-gradient-to-b from-[#f0f4ff] to-[#f8faff] px-4 py-12 sm:py-16">
      <div className="w-full max-w-[420px]">
        <div className="rounded-[28px] border border-[#e8ecf4] bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black tracking-tight text-[#5d5fef] sm:text-4xl">MyLanyard</h1>
            <p className="mt-2 text-sm font-semibold text-[#64748b]">Design your identity today</p>
          </div>

          <div className="mb-8 flex rounded-2xl border border-[#eef2f6] bg-[#f8faff] p-1">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 rounded-xl py-3 text-sm font-black transition-all ${
                activeTab === 'login'
                  ? 'bg-[#5d5fef] text-white shadow-md shadow-indigo-500/25'
                  : 'text-[#64748b] hover:text-[#5d5fef]'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 rounded-xl py-3 text-sm font-black transition-all ${
                activeTab === 'signup'
                  ? 'bg-[#5d5fef] text-white shadow-md shadow-indigo-500/25'
                  : 'text-[#64748b] hover:text-[#5d5fef]'
              }`}
            >
              Signup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#94a3b8]">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-[#eef2f6] bg-[#f8faff] py-4 pl-11 pr-4 font-bold text-[#1a1a1a] placeholder:text-[#b2b2b2] transition-all focus:outline-none focus:ring-2 focus:ring-[#5d5fef]/25"
                  required
                />
              </div>
            )}

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#94a3b8]">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#eef2f6] bg-[#f8faff] py-4 pl-11 pr-4 font-bold text-[#1a1a1a] placeholder:text-[#b2b2b2] transition-all focus:outline-none focus:ring-2 focus:ring-[#5d5fef]/25"
                required
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#94a3b8]">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-[#eef2f6] bg-[#f8faff] py-4 pl-11 pr-4 font-bold text-[#1a1a1a] placeholder:text-[#b2b2b2] transition-all focus:outline-none focus:ring-2 focus:ring-[#5d5fef]/25"
                required
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 border border-red-100">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-2xl bg-[#5d5fef] py-4 text-lg font-black text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-[#4a4cd9] active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? 'Please wait…' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
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
