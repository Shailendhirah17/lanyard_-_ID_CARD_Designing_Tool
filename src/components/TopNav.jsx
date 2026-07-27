import { Home, Palette, LayoutTemplate, Package, ShieldCheck, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const NAV_ITEMS = [
  { key: 'Dashboard', label: 'Home', icon: Home },
  { key: 'Customizer', label: 'Design Studio', icon: Palette },
  { key: 'Templates', label: 'Templates', icon: LayoutTemplate },
  { key: 'Orders', label: 'Orders', icon: Package },
];

export default function TopNav({ activePage, onNavigate, user, onLogout, isAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navigate = (key) => {
    onNavigate(key);
    setMobileOpen(false);
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <>
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 lg:px-6 shrink-0 z-50 relative">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer mr-8 shrink-0" onClick={() => navigate('Dashboard')}>
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">M</div>
          <span className="text-[14px] font-bold text-slate-900 hidden sm:block">MyLanyard</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const active = activePage === key;
            return (
              <button key={key} onClick={() => navigate(key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon size={15} className={active ? 'text-indigo-600' : 'text-slate-400'} />
                {label}
              </button>
            );
          })}
          {isAdmin && (
            <button onClick={() => navigate('AdminDashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                activePage === 'AdminDashboard' ? 'bg-rose-50 text-rose-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck size={15} className={activePage === 'AdminDashboard' ? 'text-rose-500' : 'text-slate-400'} />
              Admin
            </button>
          )}
        </nav>

        {/* Right: User Menu + Mobile Hamburger */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setUserMenuOpen(v => !v)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">{initials}</div>
              <span className="hidden sm:block text-[13px] font-medium text-slate-700 max-w-[120px] truncate">{user?.name || user?.email}</span>
              <ChevronDown size={13} className="text-slate-400 hidden sm:block" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-[12px] font-semibold text-slate-900 truncate">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <button onClick={() => { setUserMenuOpen(false); onLogout(); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
                >
                  <LogOut size={14} />Sign Out
                </button>
              </div>
            )}
          </div>
          <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative ml-auto w-64 bg-white h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">M</div>
                <span className="text-[14px] font-bold text-slate-900">MyLanyard</span>
              </div>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
                const active = activePage === key;
                return (
                  <button key={key} onClick={() => navigate(key)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                      active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={16} className={active ? 'text-indigo-600' : 'text-slate-400'} />{label}
                  </button>
                );
              })}
              {isAdmin && (
                <button onClick={() => navigate('AdminDashboard')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] text-slate-600 hover:bg-slate-100"
                >
                  <ShieldCheck size={16} className="text-slate-400" />Admin
                </button>
              )}
            </nav>
            <div className="p-3 border-t border-slate-100">
              <button onClick={() => { setMobileOpen(false); onLogout(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} />Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
