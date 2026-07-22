import { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  ArrowRight,
  CreditCard,
  Palette,
  CheckCircle2,
  Package,
  Truck,
  Box,
  MapPin,
  Eye,
  Download,
  Plus,
  Search,
  User,
  Calendar,
  Truck as TruckIcon,
  HelpCircle,
  ChevronRight,
  Heart,
  LayoutGrid,
  Upload,
  Sparkles,
  ShieldCheck,
  Zap,
  Mail,
  Phone,
} from 'lucide-react';
import { formatCurrency } from '../lib/pricing';
import { useConfiguratorStore } from '../store/useConfiguratorStore';
import { showToast } from '../components/Toast';
import InvoiceModal from '../components/InvoiceModal';
import OrderDetailsModal from '../components/OrderDetailsModal';
import { UploadTrendLineChart, ElementUsageBarChart } from '../components/dashboard/MiniCharts';
import {
  getStoredDesign,
  getStrapUploadHistory,
  bucketUploadHistoryByDay,
  countElementTypes,
  computeDashboardKpis,
} from '../lib/dashboardAnalytics';

const OrderProgress = ({ status }) => {
  const steps = ['Pending', 'Processing', 'Shipping', 'Out for Delivery', 'Delivered'];
  const currentIndex = steps.indexOf(status);

  return (
    <div className="mt-6">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-1.5 relative">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className={`absolute left-1/2 top-4 w-full h-[2px] -z-10 ${
                index < currentIndex ? 'bg-[#5d5fef]' : 'bg-[#eef2f6]'
              }`} />
            )}
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
              index <= currentIndex 
                ? 'bg-[#5d5fef] border-[#5d5fef] text-white shadow-lg shadow-[#5d5fef]/25 scale-110' 
                : 'bg-white border-[#eef2f6] text-[#919191] scale-100'
            }`}>
              {step === 'Pending' && <Box size={16} />}
              {step === 'Processing' && <Package size={16} />}
              {step === 'Shipping' && <TruckIcon size={16} />}
              {step === 'Out for Delivery' && <MapPin size={16} />}
              {step === 'Delivered' && <CheckCircle2 size={16} />}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest text-center w-20 transition-colors duration-300 ${
              index <= currentIndex ? 'text-[#1a1a1a]' : 'text-[#919191]'
            }`}>{step}</span>
          </div>
        ))}
      </div>
      <div className="h-2 w-full bg-[#f8faff] rounded-full overflow-hidden border border-[#eef2f6] p-0.5">
        <div 
          className="h-full bg-gradient-to-r from-[#5d5fef] via-[#82e9ff] to-[#5d5fef] bg-[length:200%_100%] animate-gradient transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default function Dashboard({ onNavigate, user }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [designSnapshot, setDesignSnapshot] = useState(() => getStoredDesign());
  const [ordersDetailOpen, setOrdersDetailOpen] = useState(false);
  const loadPreset = useConfiguratorStore((state) => state.loadPreset);
  const resetDesign = useConfiguratorStore((state) => state.resetDesign);

  const refreshDesignSnapshot = () => setDesignSnapshot(getStoredDesign());

  useEffect(() => {
    const onStorage = (e) => {
      if (!e.key || e.key === 'lanyard-configurator-design') refreshDesignSnapshot();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', refreshDesignSnapshot);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', refreshDesignSnapshot);
    };
  }, []);

  useEffect(() => {
    const loadUserOrders = () => {
      const allOrders = JSON.parse(localStorage.getItem('myLanyardOrders') || '[]');
      const userEmail = user?.email || '';
      let filteredOrders = allOrders.filter(o => o.userEmail === userEmail);
      
      if (filteredOrders.length === 0 && userEmail === 'user@test.com') {
        const sampleOrders = [
          {
            id: 'PRO-2852',
            customer: 'Alexander Wright',
            email: 'user@test.com',
            userEmail: 'user@test.com',
            date: '2026-03-20',
            status: 'Processing',
            total: 12500,
            designName: 'Elite Corporate Blue',
            quantity: 250,
            pricePerUnit: 50,
            previewImage: ''
          },
          {
            id: 'PRO-2853',
            customer: 'Alexander Wright',
            email: 'user@test.com',
            userEmail: 'user@test.com',
            date: '2026-04-10',
            status: 'Delivered',
            total: 8500,
            designName: 'Tech Innovator Green',
            quantity: 150,
            pricePerUnit: 56.6,
            previewImage: ''
          }
        ];
        localStorage.setItem('myLanyardOrders', JSON.stringify([...allOrders, ...sampleOrders]));
        filteredOrders = sampleOrders;
      }
      setOrders(filteredOrders);
    };

    loadUserOrders();
    window.addEventListener('orderStatusUpdated', loadUserOrders);
    return () => window.removeEventListener('orderStatusUpdated', loadUserOrders);
  }, [user]);

  const kpis = useMemo(() => computeDashboardKpis(designSnapshot), [designSnapshot]);

  const secondaryOrderMetrics = useMemo(() => {
    const active = orders.filter((o) => o.status !== 'Delivered').length;
    const completed = orders.filter((o) => o.status === 'Delivered').length;
    const totalSpend = orders.reduce((sum, o) => sum + o.total, 0);
    return { active, completed, totalSpend };
  }, [orders]);

  const uploadTrendPoints = useMemo(
    () => bucketUploadHistoryByDay(getStrapUploadHistory(), 7),
    [designSnapshot],
  );

  const elementUsageSeries = useMemo(() => {
    const counts = countElementTypes(designSnapshot);
    return [
      { key: 'text', label: 'Text', value: counts.text, tone: 'primary' },
      { key: 'image', label: 'Images', value: counts.image, tone: 'ok' },
      { key: 'other', label: 'Other', value: counts.other, tone: 'muted' },
    ];
  }, [designSnapshot]);

  const handlePresetClick = (template) => {
    loadPreset(template.preset);
    onNavigate('Customizer');
    showToast('Template loaded — continue in the design workspace.', 'success', 'Preset applied');
  };

  const filteredOrdersList = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.designName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           order.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [orders, searchQuery, filterStatus]);

  const visibleOrders = useMemo(
    () => (ordersDetailOpen ? filteredOrdersList : filteredOrdersList.slice(0, 1)),
    [ordersDetailOpen, filteredOrdersList],
  );

  const featuredTemplates = [
    { 
      id: 1, name: 'Corporate Elite', description: 'Minimalist professional design', color: '#1e293b',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=600&fit=crop',
      preset: { lanyardColor: '#1e293b', fontColor: '#ffffff', fontFamily: 'Montserrat', lanyardDesignStyle: 'repeated', customTextCenter: 'CORPORATE ELITE', customTextLeft: 'CORPORATE ELITE', customTextRight: 'CORPORATE ELITE' }
    },
    { 
      id: 2, name: 'Tech Innovator', description: 'Modern digital-first aesthetic', color: '#0f172a',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=600&fit=crop',
      preset: { lanyardColor: '#0f172a', fontColor: '#82e9ff', fontFamily: 'Montserrat', lanyardDesignStyle: 'central-logo', customTextCenter: 'TECH TEAM', customTextLeft: 'TECH TEAM', customTextRight: 'TECH TEAM' }
    },
    { 
      id: 3, name: 'Eco Sustainable', description: 'Earth-friendly organic theme', color: '#064e3b',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=600&fit=crop',
      preset: { lanyardColor: '#064e3b', fontColor: '#ffffff', fontFamily: 'Montserrat', lanyardDesignStyle: 'repeated', customTextCenter: 'SUSTAINABLE', customTextLeft: 'SUSTAINABLE', customTextRight: 'SUSTAINABLE' }
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faff]">
      <div className="dash-page max-w-7xl mx-auto space-y-8">
        {/* Intent Selection Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-indigo-500 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Palette size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Custom Design Studio</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Design custom lanyards and ID cards with real-time 3D canvas and student avatar previews.
              </p>
            </div>
            <button
              onClick={() => { resetDesign(); onNavigate('Customizer'); }}
              className="mt-6 w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              Start New Design <ArrowRight size={14} />
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-indigo-500 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Layers size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Bulk Institutional Order</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                For schools, colleges, and companies. Upload student/staff lists and batch-match photos automatically.
              </p>
            </div>
            <button
              onClick={() => onNavigate('IdCardPro')}
              className="mt-6 w-full rounded-lg bg-slate-900 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              Open Bulk Batch Hub <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <section className="dash-kpi-cluster" aria-label="Primary studio metrics">
          <div className="rounded-3xl border border-[#eef2f6] bg-white p-6 shadow-sm">
            <p className="dash-kpi-secondary">Total uploads</p>
            <p className="dash-kpi-primary mt-2 text-[#007bff]">{kpis.totalUploads}</p>
            <p className="mt-3 text-xs font-semibold text-slate-500">Strap, logo, pattern &amp; ID assets</p>
          </div>
          <div className="rounded-3xl border border-[#eef2f6] bg-white p-6 shadow-sm">
            <p className="dash-kpi-secondary">Active elements</p>
            <p className="dash-kpi-primary mt-2 text-[#1a1a1a]">{kpis.activeElements}</p>
            <p className="mt-3 text-xs font-semibold text-slate-500">Strap layers + ID card objects</p>
          </div>
          <div className="rounded-3xl border border-[#eef2f6] bg-white p-6 shadow-sm">
            <p className="dash-kpi-secondary">Saved inspirations</p>
            <p className="dash-kpi-primary mt-2 text-[#28a745]">{kpis.savedInspirations}</p>
            <p className="mt-3 text-xs font-semibold text-slate-500">Applies from the inspiration library</p>
          </div>
        </section>

        <section className="grid gap-6 text-sm text-slate-600 md:grid-cols-3" aria-label="Secondary order metrics">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total spend</span>
            <p className="mt-1 font-black text-slate-800">{formatCurrency(secondaryOrderMetrics.totalSpend)}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active orders</span>
            <p className="mt-1 font-black text-slate-800">{secondaryOrderMetrics.active}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Completed</span>
            <p className="mt-1 font-black text-[#28a745]">{secondaryOrderMetrics.completed}</p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2" aria-label="Analytics">
          <UploadTrendLineChart
            title="Strap upload trend (last 7 days)"
            points={uploadTrendPoints}
            yAxisLabel="Axis: daily upload count (units)"
            xAxisLabel="Time (days, most recent on the right)"
            unit="count"
          />
          <ElementUsageBarChart
            title="Strap element usage (current draft)"
            series={elementUsageSeries}
            yAxisLabel="Axis: element count (units)"
            xAxisLabel="Category (element type)"
          />
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="space-y-8 lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="dash-primary-widget flex flex-col justify-between rounded-[28px] border border-[#eef2f6] bg-white p-6 shadow-sm">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Start designing</p>
                  <h2 className="mt-2 text-xl font-black text-[#1a1a1a]">Open the workspace</h2>
                  <p className="mt-2 text-sm font-medium text-slate-500">Strap editor, uploads, and inspirations in one flow.</p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('Customizer')}
                  className="dash-btn-primary mt-6 inline-flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Start designing
                </button>
              </div>
              <div className="dash-supporting-widget flex flex-col justify-between rounded-[28px] border border-[#eef2f6] bg-white p-6 shadow-sm">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Templates</p>
                  <h2 className="mt-2 text-lg font-black text-[#1a1a1a]">Jump to presets</h2>
                  <p className="mt-2 text-sm font-medium text-slate-500">Lanyard looks bundled below with badge starters.</p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => document.getElementById('templates-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="dash-btn-primary inline-flex flex-1 items-center justify-center gap-2"
                  >
                    <LayoutGrid size={18} />
                    Browse templates
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('Customizer');
                      showToast('ID card templates live in step 3 of the configurator.', 'success');
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-[#007bff] px-4 py-3 text-sm font-black text-[#007bff] transition hover:bg-[#007bff]/5"
                  >
                    <Upload size={18} />
                    Upload new
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <section className="bg-white p-8 rounded-[40px] border border-[#eef2f6] shadow-sm space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">Active Production Proofs</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-1">Real-time status updates</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search orders..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2.5 bg-[#f8faff] border border-[#eef2f6] rounded-xl text-xs font-bold outline-none focus:border-[#5d5fef] transition-all w-48"
                    />
                  </div>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 bg-[#f8faff] border border-[#eef2f6] rounded-xl text-xs font-bold outline-none cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {filteredOrdersList.length > 0 ? (
                <div className="space-y-6">
                  {visibleOrders.map((order) => (
                    <div 
                      key={order.id} 
                      onClick={() => setSelectedOrder(order)}
                      className="group p-6 rounded-[32px] border border-[#eef2f6] hover:border-[#5d5fef]/30 hover:bg-[#f8faff] transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row gap-6 relative z-10">
                        {/* Design Preview */}
                        <div className="w-full md:w-32 h-40 bg-white rounded-[24px] overflow-hidden border border-[#eef2f6] p-2 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                          {order.previewImage && order.previewImage !== 'Preview too large for storage' ? (
                            <img src={order.previewImage} alt="Preview" className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-200">
                              <Palette size={32} />
                              <span className="text-[8px] font-black uppercase tracking-widest">No Preview</span>
                            </div>
                          )}
                        </div>

                        {/* Order Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-[#5d5fef] uppercase tracking-widest bg-[#5d5fef]/5 px-3 py-1 rounded-lg border border-[#5d5fef]/10">
                                  {order.id}
                                </span>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${
                                  order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <h3 className="text-2xl font-black text-[#1a1a1a] tracking-tight">{order.designName}</h3>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                                <Calendar size={12} />
                                Ordered on {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-black text-[#1a1a1a] tracking-tight">{formatCurrency(order.total)}</p>
                              <p className="text-[10px] font-black text-[#5d5fef] mt-1">{order.quantity} Units @ {formatCurrency(order.pricePerUnit)}</p>
                            </div>
                          </div>
                          
                          <OrderProgress status={order.status} />

                          <div className="flex items-center justify-between pt-4 border-t border-[#eef2f6]">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                                  {i}
                                </div>
                              ))}
                              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#5d5fef] flex items-center justify-center text-[10px] font-black text-white">
                                +{order.quantity}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#eef2f6] rounded-xl text-[10px] font-black text-slate-600 hover:bg-[#5d5fef] hover:text-white transition-all group/btn">
                                <Download size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                                INVOICE
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-[#5d5fef] text-white rounded-xl text-[10px] font-black hover:bg-[#4a4cd9] shadow-lg shadow-[#5d5fef]/20 transition-all group/btn">
                                <Eye size={14} className="group-hover/btn:scale-110 transition-transform" />
                                TRACK ORDER
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Decorative background shape */}
                      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#5d5fef]/5 rounded-full group-hover:scale-150 transition-transform duration-1000" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-[#eef2f6] rounded-[32px] bg-[#f8faff]/50">
                  <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-slate-200">
                    <ShoppingBag size={48} />
                  </div>
                  <h3 className="text-xl font-black text-[#1a1a1a]">No orders found</h3>
                  <p className="text-slate-400 font-medium max-w-xs mx-auto mt-2 text-sm">We couldn't find any orders matching your current filters.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setFilterStatus('All');}}
                    className="mt-6 text-[#5d5fef] font-black text-xs uppercase tracking-widest hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {filteredOrdersList.length > 1 ? (
                <div className="flex justify-center border-t border-[#eef2f6] pt-6">
                  <button
                    type="button"
                    onClick={() => setOrdersDetailOpen((o) => !o)}
                    className="text-sm font-black uppercase tracking-widest text-[#007bff] hover:underline"
                  >
                    {ordersDetailOpen ? 'Show less' : 'View details — full order list'}
                  </button>
                </div>
              ) : null}
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-1">
            <div className="dash-supporting-widget rounded-[32px] border border-[#eef2f6] bg-[#1a1a1a] p-6 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#82e9ff]">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#82e9ff]">Resources</span>
              </div>
              <h3 className="mt-4 text-xl font-black leading-tight">Enterprise &amp; support</h3>
              <p className="mt-2 text-xs font-medium leading-relaxed text-white/60">
                Same contacts and upgrade path — grouped to keep this column compact (supporting widget scale).
              </p>
              <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs font-bold">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-white/90 hover:text-[#82e9ff]">
                  <Phone size={14} /> +91 98765 43210
                </a>
                <a href="mailto:support@mylanyard.com" className="flex items-center gap-2 text-white/90 hover:text-[#82e9ff]">
                  <Mail size={14} /> support@mylanyard.com
                </a>
              </div>
              <button
                type="button"
                className="dash-btn-primary mt-6 w-full border border-white/20 bg-[#007bff] hover:brightness-95"
              >
                Contact sales
              </button>
            </div>

            <div className="dash-supporting-widget relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#5d5fef] to-[#82e9ff] p-6 text-white shadow-lg">
              <Zap className="absolute -right-4 -top-4 h-24 w-24 text-white/10" />
              <h4 className="text-lg font-black">Go Pro Plus</h4>
              <ul className="mt-3 space-y-2 text-[10px] font-black uppercase tracking-wider text-white/90">
                {['Unlimited exports', 'Priority production', 'Pattern storage'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-white/40" /> {item}
                  </li>
                ))}
              </ul>
              <button type="button" className="mt-4 w-full rounded-2xl bg-white py-3 text-xs font-black text-[#5d5fef] shadow-md">
                Upgrade
              </button>
            </div>
          </aside>
        </div>

        <section id="templates-section" className="animate-fade-in pt-6" style={{ animationDelay: '0.4s' }}>
          <div className="dash-template-bundle">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a]">Template library</h2>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Lanyard and badge starters (max 16px spacing between groups)
                </p>
              </div>
              <button
                type="button"
                className="text-xs font-black uppercase tracking-widest text-[#007bff] hover:underline"
              >
                View all presets
              </button>
            </div>

            <div className="dash-template-bundle__row">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Lanyard templates</h3>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {featuredTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handlePresetClick(template)}
                      className="group cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handlePresetClick(template);
                      }}
                    >
                      <div className="relative overflow-hidden rounded-[40px] border border-[#eef2f6] bg-white p-4 shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                        <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[32px] bg-[#f8faff]">
                          <img
                            src={template.image}
                            alt={template.name}
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <p className="mb-1 text-xl font-black text-white">{template.name}</p>
                            <p className="text-xs font-medium text-white/70">{template.description}</p>
                          </div>
                          <div className="absolute right-6 top-6 flex h-10 w-10 scale-50 items-center justify-center rounded-xl bg-white/90 text-[#5d5fef] opacity-0 shadow-lg backdrop-blur-md transition-all group-hover:scale-100 group-hover:opacity-100">
                            <Heart size={20} />
                          </div>
                        </div>
                        <div className="px-4 pb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xl font-black text-[#1a1a1a]">{template.name}</h4>
                              <div className="mt-2 flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: template.color }} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                  {template.preset.lanyardColor}
                                </span>
                              </div>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8faff] text-[#5d5fef] transition-all group-hover:bg-[#5d5fef] group-hover:text-white">
                              <ArrowRight size={20} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Badge templates</h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600">
                  Horizontal and vertical ID layouts live in the configurator&apos;s ID Card step — same data model as your current draft.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('Customizer');
                      showToast('Open the sidebar → ID Card step for badge templates.', 'success');
                    }}
                    className="dash-btn-primary inline-flex w-full items-center justify-center gap-2"
                  >
                    <CreditCard size={18} />
                    Open badge designer
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('Learning')}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-700 transition hover:border-[#007bff] hover:text-[#007bff]"
                  >
                    <Sparkles size={16} />
                    Learning: badge tips
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Hint */}
        <div className="text-center py-10 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">© 2026 MyLanyard Design Studio • Professional Grade Branding</p>
        </div>
      </div>

      {/* Invoice Modal Integration */}
      {showInvoice && selectedOrder && (
        <InvoiceModal 
          order={selectedOrder} 
          isOpen={showInvoice} 
          onClose={() => setShowInvoice(false)} 
        />
      )}

      {/* Order Details Modal Integration */}
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          isOpen={!!selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
}
