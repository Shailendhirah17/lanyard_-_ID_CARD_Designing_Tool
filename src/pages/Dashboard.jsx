import { useState, useEffect, useMemo } from 'react';
import { Plus, Upload, Package, Palette, ArrowRight, Clock, CheckCircle2, Box, Truck, LayoutTemplate, FileSpreadsheet, ChevronRight, Calendar, Layers, ShieldCheck, Activity, FileText, ExternalLink } from 'lucide-react';
import { formatCurrency } from '../lib/pricing';

const STATUS_BADGES = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Processing: 'bg-blue-50 text-blue-700 border-blue-200',
  Shipping: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Out for Delivery': 'bg-purple-50 text-purple-700 border-purple-200',
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const STATUS_STEPS = ['Pending', 'Processing', 'Shipping', 'Out for Delivery', 'Delivered'];

const SAMPLE_PROJECTS = [
  { id: 'PRJ-101', name: 'GOTEK School Kit', date: '2026-07-18', status: 'DRAFT', color: '#4f46e5', category: 'Education', cardsCount: 250 },
  { id: 'PRJ-102', name: 'Corporate Blue ID', date: '2026-07-15', status: 'ORDERED', color: '#0284c7', category: 'Corporate', cardsCount: 150 },
  { id: 'PRJ-103', name: 'Tech Innovator', date: '2026-07-10', status: 'DRAFT', color: '#059669', category: 'Event', cardsCount: 80 },
];

function getGreeting(name) {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  return `${g}${name ? `, ${name.split(' ')[0]}` : ''}`;
}

export default function Dashboard({ onNavigate, user }) {
  const [orders, setOrders] = useState([]);
  const [savedProjects, setSavedProjects] = useState(SAMPLE_PROJECTS);

  useEffect(() => {
    const load = () => {
      const all = JSON.parse(localStorage.getItem('myLanyardOrders') || '[]');
      const userEmail = user?.email || '';
      const mine = all.filter(o => o.userEmail === userEmail);
      setOrders(mine.slice(0, 5));
    };
    load();
    window.addEventListener('orderStatusUpdated', load);
    return () => window.removeEventListener('orderStatusUpdated', load);
  }, [user]);

  const activeOrders = useMemo(() => orders.filter(o => o.status !== 'Delivered'), [orders]);
  const greeting = getGreeting(user?.name);
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 lg:px-0 space-y-6 font-sans text-slate-900">
      
      {/* Executive Workspace Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Enterprise Workspace</span>
            <span>·</span>
            <span>{currentDate}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{greeting}</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Manage lanyard specifications, institutional roster batch runs, and live orders.</p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('Customizer')}
            className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={15} />
            <span>New Custom Design</span>
          </button>
          <button
            onClick={() => onNavigate('IdCardPro')}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Upload size={15} />
            <span>Roster Processor</span>
          </button>
        </div>
      </div>

      {/* Enterprise KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Draft Specs', val: `${savedProjects.filter(p => p.status === 'DRAFT').length} Specifications`, icon: Layers, color: 'text-indigo-600' },
          { label: 'Roster Capacity', val: '10,000 Cards/Batch', icon: FileSpreadsheet, color: 'text-emerald-600' },
          { label: 'Active Orders', val: `${activeOrders.length} In Production`, icon: Package, color: 'text-amber-600' },
          { label: 'System Health', val: 'Operational (100%)', icon: Activity, color: 'text-emerald-500' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
                <Icon size={16} className={kpi.color} />
              </div>
              <p className="text-sm font-bold text-slate-900 font-mono">{kpi.val}</p>
            </div>
          );
        })}
      </div>

      {/* Dual Primary Workflow Launchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Launcher 1: Single Design Studio */}
        <div 
          onClick={() => onNavigate('Customizer')}
          className="bg-white border border-slate-200 border-l-4 border-l-indigo-600 rounded-xl p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs border border-indigo-100">
                01
              </div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Studio Spec
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Custom Lanyard & ID Card Studio
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
              Configure custom strap specs, Pantone colors, clip hardware, and ID card artwork with real-time 3D rendering.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-indigo-600 shrink-0" />
                <span>Interactive 2D & 3D Strap/Card Canvas</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-indigo-600 shrink-0" />
                <span>Student / Employee Wear Avatar Try-On</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-indigo-600 shrink-0" />
                <span>Instant Tiered Volume Pricing & Order Submission</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-600 group-hover:underline">Open Design Studio</span>
            <ArrowRight size={15} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Launcher 2: Institutional Roster Processor */}
        <div 
          onClick={() => onNavigate('IdCardPro')}
          className="bg-white border border-slate-200 border-l-4 border-l-emerald-600 rounded-xl p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs border border-emerald-100">
                02
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Bulk Batch Roster
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Institutional Roster Processor
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
              Upload Excel/CSV student or employee rosters, map data columns to card templates, and auto-generate batch ID cards.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>CSV Roster Spreadsheet & Column Auto-Mapping</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>Batch Student Photo Cropping & Alignment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>High-Volume Institutional Print PDF Export</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 group-hover:underline">Launch Roster Processor</span>
            <ArrowRight size={15} className="text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Quick Access Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: LayoutTemplate, label: 'Template Gallery', sub: '50+ Enterprise ID Layouts', page: 'Templates' },
          { icon: FileSpreadsheet, label: 'Roster Batch Engine', sub: 'Institutional CSV Importer', page: 'IdCardPro' },
          { icon: Package, label: 'Orders & Tracking', sub: 'Production Status & Invoices', page: 'Orders' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={() => onNavigate(item.page)}
              className="flex items-center gap-3.5 p-3.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-left cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                <Icon size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.label}</p>
                <p className="text-[11px] text-slate-500 truncate font-medium">{item.sub}</p>
              </div>
              <ArrowRight size={13} className="text-slate-300 ml-auto shrink-0 group-hover:text-slate-600 transition-colors" />
            </button>
          );
        })}
      </div>

      {/* Recent Specifications / Projects */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Saved Specifications & Projects</h2>
            <p className="text-[11px] text-slate-500 font-medium">Recent artwork drafts and active project files</p>
          </div>
          <button
            onClick={() => onNavigate('Templates')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View Template Library</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {savedProjects.map((prj) => (
            <div
              key={prj.id}
              onClick={() => onNavigate('Customizer')}
              className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-indigo-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm"
                  style={{ backgroundColor: prj.color }}
                >
                  ID
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{prj.name}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{prj.id} · {prj.category}</p>
                </div>
              </div>

              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 ml-2 ${
                prj.status === 'ORDERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-200/60 text-slate-700 border-slate-300'
              }`}>
                {prj.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Production Orders & Fulfillment Status */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Fulfillment & Production Orders</h2>
            <p className="text-[11px] text-slate-500 font-medium">Real-time status of submitted corporate and institutional batches</p>
          </div>
          {orders.length > 0 && (
            <button
              onClick={() => onNavigate('Orders')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Manage All Orders</span>
              <ChevronRight size={14} />
            </button>
          )}
        </div>

        {orders.length > 0 ? (
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {orders.map((ord) => {
              const idx = STATUS_STEPS.indexOf(ord.status);
              const pct = Math.max(20, Math.round(((idx + 1) / STATUS_STEPS.length) * 100));
              return (
                <div
                  key={ord.id}
                  onClick={() => onNavigate('Orders')}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white hover:bg-slate-50/80 transition-colors cursor-pointer gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                      <Package size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-slate-900">{ord.id}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${STATUS_BADGES[ord.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{ord.designName} · {ord.quantity} units</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:ml-auto">
                    <div className="w-32 hidden sm:block">
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1">
                        <span>Status</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 font-mono">{formatCurrency(ord.total)}</span>
                    <ChevronRight size={15} className="text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50/50 border border-slate-200/80 rounded-lg">
            <Package size={28} className="mx-auto text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-700">No Active Production Batches</p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Placed orders will track live printing & courier dispatch here.</p>
            <button
              onClick={() => onNavigate('Customizer')}
              className="mt-3 px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Create Specification</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
