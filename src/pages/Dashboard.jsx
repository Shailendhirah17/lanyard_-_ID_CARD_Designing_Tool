import { useState, useEffect, useMemo } from 'react';
import { Plus, Upload, Package, Palette, ArrowRight, Clock, CheckCircle2, Box, Truck, LayoutTemplate, FileSpreadsheet, ChevronRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../lib/pricing';

const STATUS_COLORS = {
  Pending: 'text-amber-600 bg-amber-50 border-amber-200',
  Processing: 'text-blue-600 bg-blue-50 border-blue-200',
  Shipping: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  'Out for Delivery': 'text-purple-600 bg-purple-50 border-purple-200',
  Delivered: 'text-emerald-600 bg-emerald-50 border-emerald-200',
};

const STATUS_STEPS = ['Pending', 'Processing', 'Shipping', 'Out for Delivery', 'Delivered'];

const SAMPLE_PROJECTS = [
  { id: 1, name: 'GOTEK School Kit', date: '2026-07-18', status: 'draft', color: '#4f46e5', category: 'School' },
  { id: 2, name: 'Corporate Blue ID', date: '2026-07-15', status: 'ordered', color: '#0891b2', category: 'Corporate' },
  { id: 3, name: 'Tech Innovator', date: '2026-07-10', status: 'draft', color: '#059669', category: 'Event' },
];

function getGreeting(name) {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  return `${g}${name ? `, ${name.split(' ')[0]}` : ''}`;
}

function ProjectCard({ project, onOpen }) {
  return (
    <button
      onClick={() => onOpen(project)}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 overflow-hidden text-left cursor-pointer"
    >
      <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: `${project.color}15` }}>
        <div className="w-16 h-20 rounded-lg shadow-md border border-white/60 flex flex-col items-center justify-center gap-1.5 transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: project.color }}>
          <div className="w-8 h-8 rounded-full bg-white/30" />
          <div className="w-10 h-1 rounded-full bg-white/50" />
          <div className="w-8 h-0.5 rounded-full bg-white/40" />
        </div>
        {project.status === 'ordered' && (
          <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">Ordered</div>
        )}
      </div>
      <div className="p-3.5">
        <p className="text-[13px] font-bold text-slate-900 truncate">{project.name}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-slate-400 font-medium">{new Date(project.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{project.category}</span>
        </div>
      </div>
    </button>
  );
}

function ActiveOrderRow({ order, onClick }) {
  const idx = STATUS_STEPS.indexOf(order.status);
  const pct = Math.round(((idx + 1) / STATUS_STEPS.length) * 100);
  return (
    <button
      onClick={() => onClick(order)}
      className="w-full flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-sm transition-all text-left cursor-pointer"
    >
      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
        <Package size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-bold text-slate-900 font-mono">{order.id}</span>
          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${STATUS_COLORS[order.status] || 'text-slate-600 bg-slate-50 border-slate-200'}`}>
            {order.status}
          </span>
        </div>
        <p className="text-[12px] text-slate-500 truncate font-medium">{order.designName} · {order.quantity} units</p>
        <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-400 shrink-0" />
    </button>
  );
}

export default function Dashboard({ onNavigate, user }) {
  const [orders, setOrders] = useState([]);
  const [savedProjects, setSavedProjects] = useState(SAMPLE_PROJECTS);

  useEffect(() => {
    const load = () => {
      const all = JSON.parse(localStorage.getItem('myLanyardOrders') || '[]');
      const userEmail = user?.email || '';
      const mine = all.filter(o => o.userEmail === userEmail);
      setOrders(mine.slice(0, 3));
    };
    load();
    window.addEventListener('orderStatusUpdated', load);
    return () => window.removeEventListener('orderStatusUpdated', load);
  }, [user]);

  const activeOrders = useMemo(() => orders.filter(o => o.status !== 'Delivered'), [orders]);

  const greeting = getGreeting(user?.name);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 lg:px-0 space-y-8 font-sans">
      
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{greeting} 👋</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Select a workflow to start designing your custom cards & lanyards.</p>
        </div>
      </div>

      {/* 2 Primary Workflow Pathway Launchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Pathway 1: Custom Studio */}
        <div 
          onClick={() => onNavigate('Customizer')}
          className="group relative bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-950/20 hover:shadow-2xl hover:scale-[1.01] transition-all cursor-pointer overflow-hidden border border-indigo-700/30 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center mb-6 text-indigo-300 shadow-inner">
              <Palette size={24} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/20 text-indigo-200 text-[11px] font-semibold mb-3">
              <Sparkles size={12} /> Single & Event Orders
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white mb-2">
              Custom Lanyard & ID Studio
            </h2>
            <p className="text-xs text-indigo-200/80 leading-relaxed font-normal mb-6 max-w-sm">
              Design custom lanyards & ID cards with interactive 3D rendering, logo placement, and instant checkout.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
            <span>Open Studio</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Pathway 2: Bulk Roster Order */}
        <div 
          onClick={() => onNavigate('IdCardPro')}
          className="group relative bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all cursor-pointer overflow-hidden border border-slate-800 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400 shadow-inner">
              <FileSpreadsheet size={24} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-semibold mb-3">
              <span>Schools & Corporations</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white mb-2">
              Bulk Institutional Roster Order
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-normal mb-6 max-w-sm">
              Upload Excel/CSV student rosters, auto-generate batch ID cards, map fields, and get volume discounts.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
            <span>Start Bulk Roster Upload</span>
            <ArrowRight size={16} />
          </div>
        </div>

      </div>

      {/* Quick shortcuts */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: LayoutTemplate, label: 'Browse Templates', sub: 'Ready-made ID card designs', color: 'text-indigo-600 bg-indigo-50', page: 'Templates' },
          { icon: Upload, label: 'Bulk Import', sub: 'Upload CSV for batch orders', color: 'text-emerald-600 bg-emerald-50', page: 'IdCardPro' },
          { icon: Package, label: 'Track Orders', sub: 'View order status & invoices', color: 'text-amber-600 bg-amber-50', page: 'Orders' },
        ].map(({ icon: Icon, label, sub, color, page }) => (
          <button key={page} onClick={() => onNavigate(page)}
            className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-sm transition-all text-left cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-slate-900">{label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate font-medium">{sub}</p>
            </div>
            <ArrowRight size={14} className="text-slate-300 ml-auto shrink-0 group-hover:text-indigo-600 transition-colors" />
          </button>
        ))}
      </section>

      {/* Recent Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold text-slate-900">Recent Projects</h2>
          <button
            onClick={() => onNavigate('Templates')}
            className="flex items-center gap-1 text-[12px] font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            Browse Templates <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {savedProjects.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={() => onNavigate('Customizer')} />
          ))}
          <button
            onClick={() => onNavigate('Customizer')}
            className="group flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-200 aspect-[4/3] p-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:bg-indigo-200 transition-colors">
              <Plus size={20} />
            </div>
            <p className="text-[12px] font-bold text-slate-600 group-hover:text-indigo-600">New Design</p>
          </button>
        </div>
      </section>

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold text-slate-900">Active Orders</h2>
            <button onClick={() => onNavigate('Orders')}
              className="flex items-center gap-1 text-[12px] font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              View all <ArrowRight size={13} />
            </button>
          </div>
          <div className="space-y-2">
            {activeOrders.map(o => (
              <ActiveOrderRow key={o.id} order={o} onClick={() => onNavigate('Orders')} />
            ))}
          </div>
        </section>
      )}

      {/* Empty orders state */}
      {activeOrders.length === 0 && (
        <section className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Truck size={22} className="text-slate-400" />
          </div>
          <p className="text-[14px] font-bold text-slate-700">No active orders yet</p>
          <p className="text-[12px] text-slate-400 mt-1 font-medium">Place your first order from the Design Studio or Bulk Import</p>
          <button onClick={() => onNavigate('Customizer')}
            className="mt-4 px-5 py-2.5 bg-indigo-600 text-white text-[13px] font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 cursor-pointer"
          >
            Start Designing
          </button>
        </section>
      )}

    </div>
  );
}
