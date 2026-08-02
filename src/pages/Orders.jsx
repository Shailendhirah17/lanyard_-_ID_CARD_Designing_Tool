import { useState, useEffect, useMemo } from 'react';
import { 
  Package, Truck, CheckCircle2, Box, MapPin, Search, Download, Eye, 
  Clock, Palette, Layers, CreditCard, ChevronDown, ChevronUp,
  Settings2, Tag, Ruler
} from 'lucide-react';
import InvoiceModal from '../components/InvoiceModal';
import OrderDetailsModal from '../components/OrderDetailsModal';
import { formatCurrency } from '../lib/pricing';

const STATUS_STEPS = ['Pending', 'Processing', 'Shipping', 'Out for Delivery', 'Delivered'];
const STATUS_ICONS = { Pending: Box, Processing: Package, Shipping: Truck, 'Out for Delivery': MapPin, Delivered: CheckCircle2 };

const STATUS_COLORS = {
  Pending: 'bg-amber-100 text-amber-700 border-amber-200',
  Processing: 'bg-blue-100 text-blue-700 border-blue-200',
  Shipping: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Out for Delivery': 'bg-purple-100 text-purple-700 border-purple-200',
  Delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${STATUS_COLORS[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
      {status}
    </span>
  );
}

function OrderProgress({ status }) {
  const currentIndex = STATUS_STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-1 mt-3">
      {STATUS_STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-1 flex-1 last:flex-none">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
            i <= currentIndex ? 'bg-indigo-600' : 'bg-slate-200'
          }`}>
            {i < currentIndex && <CheckCircle2 size={12} className="text-white" />}
            {i === currentIndex && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 ${i < currentIndex ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Preview Tile ──────────────────────────────────────────────────────────────
function PreviewTile({ src, label, icon: Icon, onClick }) {
  const hasImage = src && src !== 'Preview too large for storage' && src !== '';
  return (
    <div className="flex flex-col gap-1 flex-1">
      <div
        onClick={hasImage ? onClick : undefined}
        className={`relative rounded-xl border overflow-hidden flex items-center justify-center bg-white transition-all ${
          hasImage
            ? 'cursor-zoom-in hover:border-indigo-400 border-slate-200 group'
            : 'border-dashed border-slate-200 cursor-default'
        }`}
        style={{ height: 80 }}
      >
        {hasImage ? (
          <>
            <img src={src} alt={label} className="max-h-full max-w-full object-contain p-1.5" />
            <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-50/60 transition-colors flex items-center justify-center">
              <Eye size={14} className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-slate-300">
            <Icon size={18} />
          </div>
        )}
      </div>
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide text-center">{label}</span>
    </div>
  );
}

// ── Spec Row ──────────────────────────────────────────────────────────────────
function SpecRow({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start justify-between gap-2 py-1 border-b border-slate-100 last:border-0">
      <span className="text-[11px] text-slate-400 font-medium shrink-0">{label}</span>
      <span className="text-[11px] font-bold text-slate-700 text-right max-w-[55%] break-words">{value}</span>
    </div>
  );
}

// ── Color Swatch ──────────────────────────────────────────────────────────────
function ColorSwatch({ color }) {
  if (!color) return <span className="text-[11px] text-slate-400">—</span>;
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full border border-slate-200 shrink-0" style={{ backgroundColor: color }} />
      <span className="text-[11px] font-bold text-slate-700 font-mono">{color}</span>
    </div>
  );
}

// ── Inline Preview + Specs for user order cards ───────────────────────────────
function OrderPreviewAndSpecs({ order }) {
  const [open, setOpen] = useState(false);
  const [zoomSrc, setZoomSrc] = useState(null);
  const design = order.design || {};

  const hasAnyPreview = order.previewImage || order.flatFrontPreview || order.idCardPreview;
  const accessories = Array.isArray(design.accessories)
    ? design.accessories.join(', ')
    : (design.accessories || null);
  const customTexts = [
    design.customTextLeft && `Left: "${design.customTextLeft}"`,
    design.customTextCenter && `Center: "${design.customTextCenter}"`,
    design.customTextRight && `Right: "${design.customTextRight}"`,
  ].filter(Boolean);

  return (
    <div className="mt-3 space-y-2">

      {/* ── Design Previews Strip ── */}
      <div className="bg-slate-50 rounded-xl border border-slate-100 p-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
          <Palette size={10} className="text-indigo-400" /> Design Preview
        </p>
        <div className="flex items-stretch gap-2">
          <PreviewTile
            src={order.previewImage}
            label="2D View"
            icon={Layers}
            onClick={() => setZoomSrc(order.previewImage)}
          />
          <PreviewTile
            src={order.flatFrontPreview || order.flatBackPreview}
            label="Flat Strap"
            icon={Layers}
            onClick={() => setZoomSrc(order.flatFrontPreview || order.flatBackPreview)}
          />
          <PreviewTile
            src={order.idCardPreview}
            label="ID Card"
            icon={CreditCard}
            onClick={() => setZoomSrc(order.idCardPreview)}
          />
        </div>
        {!hasAnyPreview && (
          <p className="text-[10px] text-slate-400 text-center mt-1">No design previews saved for this order.</p>
        )}
      </div>

      {/* ── Spec Accordion ── */}
      <div className="border border-slate-100 rounded-xl overflow-hidden">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-2.5 bg-white hover:bg-slate-50 text-left transition-colors"
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Settings2 size={10} className="text-indigo-400" /> Order Specifications
          </span>
          {open ? <ChevronUp size={13} className="text-slate-400" /> : <ChevronDown size={13} className="text-slate-400" />}
        </button>

        {open && (
          <div className="bg-white border-t border-slate-100 px-3 pb-3 space-y-3">

            {/* Lanyard size */}
            <div>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pt-2.5 pb-1 border-b border-indigo-50">
                📐 Lanyard Size
              </p>
              <SpecRow label="Width" value={design.width || '20mm'} />
              <SpecRow label="Length" value={design.length ? `${design.length}"` : '38"'} />
              <SpecRow label="Style" value={design.lanyardStyle || 'Single Ended'} />
              <SpecRow label="Material" value={design.material || 'Polyester'} />
            </div>

            {/* Color & Printing */}
            <div>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1 border-b border-indigo-50">
                🎨 Color &amp; Printing
              </p>
              <div className="flex items-start justify-between gap-2 py-1 border-b border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium shrink-0">Strap Color</span>
                <ColorSwatch color={design.lanyardColor} />
              </div>
              <SpecRow label="Printing Type" value={design.printingMethod || 'Sublimated'} />
              {design.isDualSided && (
                <div className="flex items-start justify-between gap-2 py-1 border-b border-slate-100 last:border-0">
                  <span className="text-[11px] text-slate-400 font-medium shrink-0">Back Color</span>
                  <ColorSwatch color={design.lanyardColorBack} />
                </div>
              )}
            </div>

            {/* Hardware */}
            <div>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1 border-b border-indigo-50">
                🔩 Accessories &amp; Hardware
              </p>
              <SpecRow label="Clip / Hook" value={design.clipType || 'Metal Hook'} />
              {accessories && <SpecRow label="Accessories" value={accessories} />}
            </div>

            {/* Custom text */}
            {customTexts.length > 0 && (
              <div>
                <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1 border-b border-indigo-50">
                  ✍️ Custom Text
                </p>
                <div className="mt-1 bg-slate-50 rounded-lg border border-slate-100 p-2 font-mono text-[10px] text-slate-600 space-y-0.5">
                  {customTexts.map((t, i) => <p key={i}>{t}</p>)}
                </div>
              </div>
            )}

            {/* Logo upload */}
            {design.logoUrl && design.logoUrl !== 'Stored locally' && (
              <div>
                <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1 border-b border-indigo-50">
                  🖼 Uploaded Logo
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <img src={design.logoUrl} alt="logo" className="w-10 h-10 object-contain rounded-lg bg-slate-100 p-1 border border-slate-200" />
                  <a
                    href={design.logoUrl}
                    download
                    className="text-[11px] text-indigo-600 font-bold flex items-center gap-1 hover:underline"
                  >
                    <Download size={11} /> Download logo
                  </a>
                </div>
              </div>
            )}

            {/* ID Card */}
            {order.idCardPreview && (
              <div>
                <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1 border-b border-indigo-50">
                  🪪 ID Card
                </p>
                <SpecRow label="Card Size" value={design.idCard?.size || design.idCardSize || '86×54mm'} />
                {design.idCard?.front?.backgroundColor && (
                  <div className="flex items-start justify-between gap-2 py-1 border-b border-slate-100">
                    <span className="text-[11px] text-slate-400 font-medium shrink-0">Front BG</span>
                    <ColorSwatch color={design.idCard.front.backgroundColor} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Zoom Lightbox ── */}
      {zoomSrc && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setZoomSrc(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setZoomSrc(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-xl text-slate-600 hover:text-rose-500 flex items-center justify-center font-bold text-xs z-10 transition-colors"
            >
              ✕
            </button>
            <img
              src={zoomSrc}
              alt="Design preview"
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl bg-white p-3 border border-slate-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    const loadOrders = () => {
      const all = JSON.parse(localStorage.getItem('myLanyardOrders') || '[]');
      const userEmail = user?.email || '';
      let filtered = all.filter(o => o.userEmail === userEmail);
      if (filtered.length === 0 && userEmail === 'user@test.com') {
        filtered = [
          { 
            id: 'PRO-2852', customer: 'Test User', email: 'user@test.com', 
            userEmail: 'user@test.com', date: '2026-03-20', status: 'Processing', 
            total: 12500, designName: 'Elite Corporate Blue', quantity: 250, pricePerUnit: 50,
            design: { width: '20mm', lanyardColor: '#1e3a8a', printingMethod: 'Sublimated', clipType: 'Metal Hook', accessories: ['Badge Holder'], lanyardStyle: 'Single Ended', material: 'Polyester' }
          },
          { 
            id: 'PRO-2853', customer: 'Test User', email: 'user@test.com', 
            userEmail: 'user@test.com', date: '2026-04-10', status: 'Delivered', 
            total: 8500, designName: 'Tech Innovator Green', quantity: 150, pricePerUnit: 56.6,
            design: { width: '15mm', lanyardColor: '#065f46', printingMethod: 'Screen Print', clipType: 'Swivel Hook', accessories: ['Badge Holder', 'Safety Breakaway'], lanyardStyle: 'Double Ended', material: 'Nylon' }
          },
        ];
      }
      setOrders(filtered);
    };
    loadOrders();
    window.addEventListener('orderStatusUpdated', loadOrders);
    return () => window.removeEventListener('orderStatusUpdated', loadOrders);
  }, [user]);

  const filtered = useMemo(() => {
    let list = orders;
    if (activeTab === 'active') list = list.filter(o => o.status !== 'Delivered');
    if (activeTab === 'history') list = list.filter(o => o.status === 'Delivered');
    if (search) list = list.filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.designName?.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [orders, activeTab, search]);

  const tabs = [
    { key: 'active',  label: 'Active Orders', count: orders.filter(o => o.status !== 'Delivered').length },
    { key: 'history', label: 'Completed',      count: orders.filter(o => o.status === 'Delivered').length },
    { key: 'all',     label: 'All Orders',     count: orders.length },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 lg:px-0">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Orders</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track your lanyard and ID card orders</p>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all ${
                activeTab === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === t.key ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'
              }`}>{t.count}</span>
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by order ID or design..."
            className="pl-9 pr-4 py-2 text-[13px] border border-slate-200 rounded-lg bg-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Order List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <Package size={32} className="mx-auto text-slate-300 mb-3" />
          <p className="text-[14px] font-semibold text-slate-500">No orders found</p>
          <p className="text-[12px] text-slate-400 mt-1">Orders you place will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(order => {
            const StatusIcon = STATUS_ICONS[order.status] || Package;
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-200 hover:shadow-md transition-all">

                {/* ── Order Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Left: Order info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[13px] font-bold text-slate-900 font-mono">{order.id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-[13px] text-slate-600 font-medium mb-0.5">{order.designName}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                      <span>{order.quantity} units</span>
                      <span className="font-semibold text-slate-600">{formatCurrency(order.total)}</span>
                    </div>
                    {order.status !== 'Delivered' && <OrderProgress status={order.status} />}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
                    >
                      <Eye size={13} /> Details
                    </button>
                    {order.status === 'Delivered' && (
                      <button
                        onClick={() => { setSelectedOrder(order); setShowInvoice(true); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        <Download size={13} /> Invoice
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Inline Preview + Specs ── */}
                <OrderPreviewAndSpecs order={order} />
              </div>
            );
          })}
        </div>
      )}

      {selectedOrder && !showInvoice && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onShowInvoice={() => setShowInvoice(true)} />
      )}
      {showInvoice && selectedOrder && (
        <InvoiceModal order={selectedOrder} onClose={() => { setShowInvoice(false); setSelectedOrder(null); }} />
      )}
    </div>
  );
}
