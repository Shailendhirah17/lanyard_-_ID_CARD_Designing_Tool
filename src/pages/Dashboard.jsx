import { useState, useEffect, useMemo } from 'react';
import { Plus, Upload, Package, Palette, ArrowRight, Clock, CheckCircle2, Box, Truck, LayoutTemplate, FileSpreadsheet, ChevronRight, Sparkles, Calendar, Layers, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../lib/pricing';

const STATUS_COLORS = {
  Pending: 'text-amber-700 bg-amber-50/80 border-amber-200/80',
  Processing: 'text-blue-700 bg-blue-50/80 border-blue-200/80',
  Shipping: 'text-indigo-700 bg-indigo-50/80 border-indigo-200/80',
  'Out for Delivery': 'text-purple-700 bg-purple-50/80 border-purple-200/80',
  Delivered: 'text-emerald-700 bg-emerald-50/80 border-emerald-200/80',
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
    <div
      onClick={() => onOpen(project)}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 overflow-hidden text-left cursor-pointer"
    >
      <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: `${project.color}10` }}>
        <div 
          className="w-16 h-20 rounded-xl shadow-md border border-white/80 flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: project.color }}
        >
          <div className="w-7 h-7 rounded-full bg-white/25 border border-white/30" />
          <div className="w-10 h-1 rounded-full bg-white/60" />
          <div className="w-7 h-0.5 rounded-full bg-white/40" />
        </div>
        {project.status === 'ordered' ? (
          <span className="absolute top-2.5 right-2.5 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-md">
            Ordered
          </span>
        ) : (
          <span className="absolute top-2.5 right-2.5 bg-slate-900/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md">
            Draft
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[13px] font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{project.name}</p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] text-slate-400 font-medium">{new Date(project.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{project.category}</span>
        </div>
      </div>
    </div>
  );
}

function ActiveOrderRow({ order, onClick }) {
  const idx = STATUS_STEPS.indexOf(order.status);
  const pct = Math.max(15, Math.round(((idx + 1) / STATUS_STEPS.length) * 100));
  return (
    <div
      onClick={() => onClick(order)}
      className="w-full flex items-center gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all text-left cursor-pointer group"
    >
      <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
        <Package size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-bold text-slate-900 font-mono tracking-tight">{order.id}</span>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${STATUS_COLORS[order.status] || 'text-slate-600 bg-slate-50 border-slate-200'}`}>
            {order.status}
          </span>
        </div>
        <p className="text-[12px] text-slate-500 truncate font-medium">{order.designName} · {order.quantity} units</p>
        <div className="mt-2.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0 text-xs font-semibold">
        <span>Track</span>
        <ChevronRight size={16} />
      </div>
    </div>
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
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 lg:px-0 space-y-8 font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Calendar size={13} className="text-indigo-600" />
            <span>{currentDate}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{greeting} 👋</h1>
          <p className="text-xs text-slate-500 font-medium">Select a workflow to design custom lanyards or manage institutional roster orders.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('Customizer')}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <Plus size={16} />
            <span>New Custom Design</span>
          </button>
          <button
            onClick={() => onNavigate('IdCardPro')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <Upload size={16} />
            <span>Bulk Roster Import</span>
          </button>
        </div>
      </div>

      {/* 2 Primary Workflow Pathway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Pathway 1: Studio Customizer */}
        <div 
          onClick={() => onNavigate('Customizer')}
          className="group relative bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-7 shadow-xl shadow-indigo-950/20 hover:shadow-2xl hover:border-indigo-500/50 hover:scale-[1.005] transition-all duration-300 cursor-pointer overflow-hidden border border-indigo-800/40 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
                <Palette size={24} />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-[11px] font-semibold">
                <Sparkles size={12} className="text-indigo-300" /> Studio Spec
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-white mb-2">
              Custom Lanyard & ID Studio
            </h2>
            <p className="text-xs text-indigo-200/80 leading-relaxed font-normal mb-6 max-w-md">
              Configure single or event lanyards with interactive 3D preview canvas, custom logo uploads, vector typography, and instant unit pricing.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-indigo-800/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <Layers size={14} /> 3D Canvas · Avatar Try-On · Live Export
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
              <span>Open Studio</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* Pathway 2: Bulk Institutional Roster */}
        <div 
          onClick={() => onNavigate('IdCardPro')}
          className="group relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:border-emerald-500/40 hover:scale-[1.005] transition-all duration-300 cursor-pointer overflow-hidden border border-slate-800 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                <FileSpreadsheet size={24} />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
                <ShieldCheck size={12} className="text-emerald-400" /> Schools & Corporate
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-white mb-2">
              Bulk Institutional Roster Order
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-normal mb-6 max-w-md">
              Upload Excel/CSV student rosters, map database columns to ID card templates, batch crop photo rosters, and get volume discounts.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <FileSpreadsheet size={14} /> Auto Mapping · Batch Crop · Bulk Tier Pricing
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
              <span>Start Bulk Upload</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: LayoutTemplate, label: 'Browse Templates', sub: 'Ready-made ID card designs', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', page: 'Templates' },
          { icon: Upload, label: 'Bulk CSV Import', sub: 'Roster batch processing', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', page: 'IdCardPro' },
          { icon: Package, label: 'Order History & Tracking', sub: 'View status & tax invoices', color: 'text-amber-600 bg-amber-50 border-amber-100', page: 'Orders' },
        ].map(({ icon: Icon, label, sub, color, page }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className="group flex items-center gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all text-left cursor-pointer"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${color}`}>
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate font-medium">{sub}</p>
            </div>
            <ArrowRight size={14} className="text-slate-300 ml-auto shrink-0 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>

      {/* Recent Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Projects</h2>
            <p className="text-xs text-slate-400 font-medium">Continue editing saved drafts or start a new design</p>
          </div>
          <button
            onClick={() => onNavigate('Templates')}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            <span>Explore All Templates</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {savedProjects.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={() => onNavigate('Customizer')} />
          ))}
          <div
            onClick={() => onNavigate('Customizer')}
            className="group flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/20 transition-all duration-200 aspect-[4/3] p-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Plus size={20} />
            </div>
            <p className="text-[12px] font-bold text-slate-600 group-hover:text-indigo-600">Create New Project</p>
          </div>
        </div>
      </section>

      {/* Active Orders */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Active Orders</h2>
            <p className="text-xs text-slate-400 font-medium">Live production & shipment tracking</p>
          </div>
          {activeOrders.length > 0 && (
            <button
              onClick={() => onNavigate('Orders')}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              <span>View All Orders</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {activeOrders.length > 0 ? (
          <div className="space-y-3">
            {activeOrders.map(o => (
              <ActiveOrderRow key={o.id} order={o} onClick={() => onNavigate('Orders')} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-indigo-600 border border-indigo-100">
              <Truck size={22} />
            </div>
            <p className="text-sm font-bold text-slate-800">No Active Production Orders</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto font-medium">
              When you place orders via Design Studio or Bulk Import, live shipment updates will appear here.
            </p>
            <button
              onClick={() => onNavigate('Customizer')}
              className="mt-4 px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20 cursor-pointer inline-flex items-center gap-2"
            >
              <Plus size={15} />
              <span>Start First Order</span>
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
