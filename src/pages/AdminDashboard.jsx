import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Package, Truck, CheckCircle2, RefreshCcw, Search, User, MapPin, X, 
  Eye, Info, CreditCard, Palette, Clock, Mail, Phone, Globe, ShieldCheck, Trash2, 
  ExternalLink, Download, Layers, DollarSign, Activity, FileSpreadsheet, LayoutGrid,
  List, ZoomIn, ZoomOut, Maximize2, ArrowUpRight, CheckCircle, Printer, Image,
  Archive, ChevronDown, ChevronUp, Settings2, Tag, Ruler, Scissors, Type,
  FileText, PrinterCheck, ScanSearch, ArchiveIcon
} from 'lucide-react';
import { showToast } from '../components/Toast';
import { formatCurrency } from '../lib/pricing';
import InvoiceModal from '../components/InvoiceModal';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipping', 'Out for Delivery', 'Delivered'];

const STATUS_CONFIG = {
  'Pending':          { color: 'bg-amber-500/10 text-amber-600 border-amber-500/20', dot: 'bg-amber-500', icon: RefreshCcw },
  'Processing':       { color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', dot: 'bg-blue-500', icon: Package },
  'Shipping':         { color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20', dot: 'bg-indigo-500', icon: Truck },
  'Out for Delivery': { color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', dot: 'bg-purple-500', icon: MapPin },
  'Delivered':        { color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', dot: 'bg-emerald-500', icon: CheckCircle2 },
  'Archived':         { color: 'bg-slate-400/10 text-slate-500 border-slate-400/20', dot: 'bg-slate-400', icon: ArchiveIcon },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['Pending'];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      <Icon size={12} />
      <span>{status}</span>
    </span>
  );
};

// ── Spec Row helper ──────────────────────────────────────────────────────────
function SpecRow({ label, value, color }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-[11px] text-slate-400 font-semibold shrink-0">{label}</span>
      <span className={`text-[11px] font-bold text-right ${color || 'text-slate-700'} max-w-[55%] break-words`}>{value}</span>
    </div>
  );
}

// ── Color Swatch + hex ───────────────────────────────────────────────────────
function ColorSwatch({ color, label }) {
  if (!color) return null;
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-3.5 h-3.5 rounded-full border border-slate-200 shadow-sm shrink-0" style={{ backgroundColor: color }} />
      <span className="text-[11px] font-bold text-slate-700 font-mono">{color}</span>
    </div>
  );
}

// ── Inline Preview Image Tile ─────────────────────────────────────────────────
function PreviewTile({ src, label, icon: Icon, onZoom }) {
  const hasImage = src && src !== 'Preview too large for storage' && src !== '';
  return (
    <div className="flex flex-col gap-1">
      <div
        onClick={hasImage ? (e) => { e.stopPropagation(); onZoom(src); } : undefined}
        className={`relative rounded-xl border overflow-hidden flex items-center justify-center bg-slate-50 transition-all ${
          hasImage ? 'cursor-zoom-in hover:border-indigo-400 border-slate-200 group' : 'border-slate-100 cursor-default'
        }`}
        style={{ height: 90 }}
      >
        {hasImage ? (
          <>
            <img src={src} alt={label} className="max-h-full max-w-full object-contain p-1.5" />
            <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors flex items-center justify-center">
              <Maximize2 size={16} className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-slate-300">
            <Icon size={20} />
            <span className="text-[9px] font-semibold text-slate-300">No Preview</span>
          </div>
        )}
      </div>
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider text-center">{label}</span>
    </div>
  );
}

// ── Inline Design Previews + Specifications Card Section ─────────────────────
function OrderPreviewAndSpecs({ order, onZoom }) {
  const [specsOpen, setSpecsOpen] = useState(false);
  const design = order.design || {};

  const accessories = Array.isArray(design.accessories)
    ? design.accessories.join(', ')
    : (design.accessories || 'Badge Holder');

  const customTexts = [
    design.customTextLeft && `Left: "${design.customTextLeft}"`,
    design.customTextCenter && `Center: "${design.customTextCenter}"`,
    design.customTextRight && `Right: "${design.customTextRight}"`,
  ].filter(Boolean);

  return (
    <div className="mt-3 space-y-3" onClick={e => e.stopPropagation()}>

      {/* ── Visual Preview Strip ── */}
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-2xl p-3 border border-slate-100">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Palette size={11} className="text-indigo-400" /> Design Previews
        </p>
        <div className="grid grid-cols-3 gap-2">
          <PreviewTile
            src={order.previewImage}
            label="2D Lanyard"
            icon={Layers}
            onZoom={onZoom}
          />
          <PreviewTile
            src={order.flatFrontPreview || order.flatBackPreview}
            label="Flat Strap"
            icon={Layers}
            onZoom={onZoom}
          />
          <PreviewTile
            src={order.idCardPreview}
            label="ID Card"
            icon={CreditCard}
            onZoom={onZoom}
          />
        </div>
        {/* Both flat views if available */}
        {order.flatFrontPreview && order.flatBackPreview && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <PreviewTile src={order.flatFrontPreview} label="Flat Front" icon={Layers} onZoom={onZoom} />
            <PreviewTile src={order.flatBackPreview} label="Flat Back" icon={Layers} onZoom={onZoom} />
          </div>
        )}
      </div>

      {/* ── Specifications Panel ── */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <button
          onClick={() => setSpecsOpen(o => !o)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors"
        >
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Settings2 size={11} className="text-indigo-400" /> Product Specifications
          </span>
          {specsOpen
            ? <ChevronUp size={14} className="text-slate-400" />
            : <ChevronDown size={14} className="text-slate-400" />}
        </button>

        {specsOpen && (
          <div className="px-3.5 pb-3.5 space-y-4 border-t border-slate-100">

            {/* Lanyard Dimensions */}
            <div>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pt-3 pb-1.5 border-b border-indigo-50">
                📐 Lanyard Size &amp; Dimensions
              </p>
              <SpecRow label="Width" value={design.width || '20mm'} />
              <SpecRow label="Length" value={design.length ? `${design.length}"` : '38"'} />
              <SpecRow label="Style" value={design.lanyardStyle || 'Single Ended'} />
              <SpecRow label="Material" value={design.material || 'Polyester'} />
            </div>

            {/* Color & Printing */}
            <div>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1.5 border-b border-indigo-50">
                🎨 Color &amp; Printing
              </p>
              <div className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold shrink-0">Strap Color</span>
                <ColorSwatch color={design.lanyardColor} />
              </div>
              {design.isDualSided && (
                <div className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-100">
                  <span className="text-[11px] text-slate-400 font-semibold shrink-0">Back Color</span>
                  <ColorSwatch color={design.lanyardColorBack} />
                </div>
              )}
              <SpecRow label="Printing Type" value={design.printingMethod || 'Sublimated'} />
              <SpecRow label="Dual Sided" value={design.isDualSided ? 'Yes' : 'No'} />
            </div>

            {/* Hardware */}
            <div>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1.5 border-b border-indigo-50">
                🔩 Hardware &amp; Accessories
              </p>
              <SpecRow label="Clip / Hook" value={design.clipType || 'Metal Hook'} />
              <SpecRow label="Accessories" value={accessories} />
            </div>

            {/* Custom Text & Branding */}
            {(design.customTextLeft || design.customTextCenter || design.customTextRight || design.fontFamily) && (
              <div>
                <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1.5 border-b border-indigo-50">
                  ✍️ Custom Text &amp; Branding
                </p>
                <SpecRow label="Font" value={design.fontFamily || 'Montserrat'} />
                <div className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-100">
                  <span className="text-[11px] text-slate-400 font-semibold shrink-0">Text Color</span>
                  <ColorSwatch color={design.textColor} />
                </div>
                {customTexts.length > 0 && (
                  <div className="mt-1.5 bg-slate-50 rounded-xl border border-slate-100 p-2.5 font-mono text-[10px] text-slate-600 space-y-0.5">
                    {customTexts.map((t, i) => <p key={i}>{t}</p>)}
                  </div>
                )}
              </div>
            )}

            {/* Logo / Artwork */}
            {(design.logoUrl || design.customPatternUrl) && (
              <div>
                <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1.5 border-b border-indigo-50">
                  🖼 Uploaded Artwork
                </p>
                {design.logoUrl && design.logoUrl !== 'Stored locally' && (
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-[11px] text-slate-400 font-semibold">Logo</span>
                    <div className="flex items-center gap-2">
                      <img src={design.logoUrl} alt="logo" className="w-8 h-8 object-contain rounded bg-slate-100 p-0.5" />
                      <a href={design.logoUrl} download className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-1">
                        <Download size={10} /> DL
                      </a>
                    </div>
                  </div>
                )}
                {design.customPatternUrl && design.customPatternUrl !== 'Stored locally' && (
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[11px] text-slate-400 font-semibold">Pattern</span>
                    <div className="flex items-center gap-2">
                      <img src={design.customPatternUrl} alt="pattern" className="w-8 h-8 object-contain rounded bg-slate-100 p-0.5" />
                      <a href={design.customPatternUrl} download className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-1">
                        <Download size={10} /> DL
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ID Card Info */}
            {(order.idCardPreview || design.idCard) && (
              <div>
                <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1.5 border-b border-indigo-50">
                  🪪 ID Card Details
                </p>
                <SpecRow label="Card Size" value={design.idCard?.size || design.idCardSize || '86×54mm'} />
                <div className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-100">
                  <span className="text-[11px] text-slate-400 font-semibold shrink-0">Front BG</span>
                  <ColorSwatch color={design.idCard?.front?.backgroundColor || design.idCardFrontBg} />
                </div>
                <div className="flex items-start justify-between gap-2 py-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold shrink-0">Back BG</span>
                  <ColorSwatch color={design.idCard?.back?.backgroundColor || design.idCardBackBg} />
                </div>
              </div>
            )}

            {/* Quantity recap */}
            <div>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest pb-1.5 border-b border-indigo-50">
                📦 Order Details
              </p>
              <SpecRow label="Quantity" value={`${design.quantity || order.quantity || 100} units`} />
              <SpecRow label="Design Name" value={order.designName || 'Custom Project'} />
              <SpecRow label="Shipping To" value={order.shippingAddress} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Super Admin Quick Action Buttons ─────────────────────────────────────────
function QuickActions({ order, onPrintPDF, onAdvancedPrint, onPreviewImage, onArchive }) {
  const bestPreview = order.previewImage || order.flatFrontPreview || order.idCardPreview;
  return (
    <div
      className="pt-3 mt-1 border-t border-slate-100"
      onClick={e => e.stopPropagation()}
    >
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">⚡ Quick Actions</p>
      <div className="grid grid-cols-2 gap-1.5">
        {/* Print PDF */}
        <button
          onClick={() => onPrintPDF(order)}
          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-all shadow-sm shadow-indigo-600/20 cursor-pointer group"
          title="Print PDF Invoice"
        >
          <Printer size={13} className="group-hover:scale-110 transition-transform" />
          Print PDF
        </button>

        {/* Advanced Print */}
        <button
          onClick={() => onAdvancedPrint(order)}
          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold transition-all shadow-sm cursor-pointer group"
          title="Open Full Specification & Print View"
        >
          <PrinterCheck size={13} className="group-hover:scale-110 transition-transform" />
          Adv. Print
        </button>

        {/* Preview Image */}
        <button
          onClick={() => onPreviewImage(bestPreview)}
          disabled={!bestPreview}
          className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-bold transition-all shadow-sm cursor-pointer group ${
            bestPreview
              ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/20'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
          title="Zoom &amp; Inspect Design Preview"
        >
          <ScanSearch size={13} className="group-hover:scale-110 transition-transform" />
          Preview
        </button>

        {/* Archive */}
        <button
          onClick={() => onArchive(order)}
          className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-bold transition-all shadow-sm cursor-pointer group ${
            order.status === 'Archived'
              ? 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700'
              : 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600'
          }`}
          title={order.status === 'Archived' ? 'Restore from Archive' : 'Archive this order'}
        >
          <ArchiveIcon size={13} className="group-hover:scale-110 transition-transform" />
          {order.status === 'Archived' ? 'Restore' : 'Archive'}
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  // Zoom & Pan Lightbox
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem('myLanyardOrders') || '[]');
      setOrders(savedOrders);
    };
    loadOrders();
    window.addEventListener('orderStatusUpdated', loadOrders);
    return () => window.removeEventListener('orderStatusUpdated', loadOrders);
  }, []);

  // Lightbox wheel zoom
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;
    const onWheel = (e) => {
      e.preventDefault();
      const zoomFactor = 1.15;
      const newScale = e.deltaY < 0 ? zoomScale * zoomFactor : zoomScale / zoomFactor;
      setZoomScale(Math.max(0.5, Math.min(8, newScale)));
    };
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [zoomImage, zoomScale]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - zoomOffset.x, y: e.clientY - zoomOffset.y });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setZoomOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);
  const resetZoom = () => { setZoomScale(1); setZoomOffset({ x: 0, y: 0 }); };
  const closeZoom = () => { setZoomImage(null); resetZoom(); };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('myLanyardOrders', JSON.stringify(updatedOrders));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    showToast(`Order ${orderId} status updated to ${newStatus}.`, 'success', 'Status Updated');
    window.dispatchEvent(new Event('orderStatusUpdated'));
  };

  const deleteOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}? This action cannot be undone.`)) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('myLanyardOrders', JSON.stringify(updatedOrders));
      if (selectedOrder && selectedOrder.id === orderId) setSelectedOrder(null);
      showToast(`Order ${orderId} has been deleted.`, 'success', 'Order Deleted');
      window.dispatchEvent(new Event('orderStatusUpdated'));
    }
  };

  // ── Quick Action handlers ────────────────────────────────────────────────
  const handlePrintPDF = (order) => {
    setSelectedOrder(order);
    setShowInvoice(true);
    showToast('Opening PDF invoice…', 'info');
  };

  const handleAdvancedPrint = (order) => {
    navigate(`/admin/orders/${order.id}`);
  };

  const handlePreviewImage = (src) => {
    if (src) {
      setZoomImage(src);
    } else {
      showToast('No preview image available for this order.', 'error');
    }
  };

  const handleArchive = (order) => {
    const newStatus = order.status === 'Archived' ? 'Pending' : 'Archived';
    updateOrderStatus(order.id, newStatus);
    showToast(
      order.status === 'Archived'
        ? `Order ${order.id} restored to Pending.`
        : `Order ${order.id} archived successfully.`,
      'success'
    );
  };

  const exportOrdersCSV = () => {
    if (orders.length === 0) { showToast('No orders available to export', 'error'); return; }
    const headers = ['Order ID', 'Customer', 'Email', 'Design Name', 'Total Price', 'Status', 'Date', 'Address'];
    const rows = orders.map(o => [
      o.id, `"${o.customer || ''}"`, `"${o.email || ''}"`,
      `"${o.designName || 'Custom Project'}"`,
      o.price || o.pricing?.totalPrice || 0, o.status || 'Pending',
      `"${o.date || ''}"`, `"${o.shippingAddress || ''}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `orders_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders exported to CSV successfully', 'success');
  };

  // ── Filtered orders ──────────────────────────────────────────────────────
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchSearch = (
        (order.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.designName || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      let matchStatus;
      if (statusFilter === 'all') {
        matchStatus = order.status !== 'Archived';
      } else if (statusFilter === 'archived') {
        matchStatus = order.status === 'Archived';
      } else {
        matchStatus = order.status === statusFilter;
      }
      return matchSearch && matchStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // ── Analytics ────────────────────────────────────────────────────────────
  const totalRevenue = useMemo(() =>
    orders.reduce((sum, o) => sum + (Number(o.price) || Number(o.pricing?.totalPrice) || 0), 0),
    [orders]
  );

  const statusCounts = useMemo(() => {
    const counts = { Pending: 0, Processing: 0, Shipping: 0, 'Out for Delivery': 0, Delivered: 0, Archived: 0 };
    orders.forEach(o => { if (counts[o.status] !== undefined) counts[o.status]++; });
    return counts;
  }, [orders]);

  const activeCount = orders.filter(o => o.status !== 'Archived').length;

  // ── Filter tabs config ───────────────────────────────────────────────────
  const filterTabs = [
    { key: 'all',              label: 'All Active',      count: activeCount },
    { key: 'Pending',          label: 'Pending',         count: statusCounts['Pending'] },
    { key: 'Processing',       label: 'Processing',      count: statusCounts['Processing'] },
    { key: 'Shipping',         label: 'Shipping',        count: statusCounts['Shipping'] },
    { key: 'Out for Delivery', label: 'Out for Delivery',count: statusCounts['Out for Delivery'] },
    { key: 'Delivered',        label: 'Delivered',       count: statusCounts['Delivered'] },
    { key: 'archived',         label: '📦 Archived',    count: statusCounts['Archived'] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">

      {/* ── Executive Header Banner ── */}
      <div className="bg-gradient-to-r from-slate-100 via-white to-indigo-50/30 border-b border-slate-200 pt-8 pb-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
                <ShieldCheck size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Admin Command Center</h1>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live Production
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Manage incoming client print orders, verify vector design specs &amp; track production queues.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setOrders(JSON.parse(localStorage.getItem('myLanyardOrders') || '[]')); showToast('Refreshed orders queue', 'info'); }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCcw size={14} />
              <span>Refresh</span>
            </button>
            <button
              onClick={exportOrdersCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              <FileSpreadsheet size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* ── KPI Stats Bar ── */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              Total Revenue <DollarSign size={14} className="text-emerald-500" />
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{formatCurrency(totalRevenue)}</span>
            <span className="text-[10px] text-emerald-600 mt-1 font-semibold">From {orders.length} total orders</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              Total Orders <ShoppingBag size={14} className="text-indigo-500" />
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{orders.length}</span>
            <span className="text-[10px] text-indigo-600 mt-1 font-semibold">All time received</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              Pending Action <RefreshCcw size={14} className="text-amber-500" />
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-600 mt-2">{statusCounts['Pending']}</span>
            <span className="text-[10px] text-amber-600/80 mt-1 font-semibold">Awaiting review</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              In Production <Package size={14} className="text-blue-500" />
            </span>
            <span className="text-xl sm:text-2xl font-black text-blue-600 mt-2">{statusCounts['Processing']}</span>
            <span className="text-[10px] text-blue-600/80 mt-1 font-semibold">Print line active</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col col-span-2 sm:col-span-1 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              Completed <CheckCircle2 size={14} className="text-emerald-500" />
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 mt-2">{statusCounts['Delivered']}</span>
            <span className="text-[10px] text-emerald-600/80 mt-1 font-semibold">Fully fulfilled</span>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 bg-white border border-slate-200 p-3 rounded-2xl shadow-xs">

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID, client name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === tab.key
                    ? tab.key === 'archived' ? 'bg-slate-600 text-white' : 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid Cards View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${viewMode === 'table' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-400 hover:text-slate-600'}`}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* ── Orders Display ── */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-xs">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Production Orders Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search criteria or status filter.'
                : 'No orders have been submitted yet by customers.'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* ── Grid View ── */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`bg-white border rounded-3xl p-5 hover:shadow-xl transition-all flex flex-col group cursor-pointer ${
                  order.status === 'Archived' ? 'border-slate-200 opacity-80' : 'border-slate-200'
                }`}
                onClick={() => navigate(`/admin/orders/${order.id}`)}
              >
                {/* Order Top Line */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-black text-indigo-600 tracking-wide font-mono bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      {order.id}
                    </span>
                    <span className="text-[11px] text-slate-500 ml-2 font-medium">{order.date}</span>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Customer Info */}
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                      <User size={14} className="text-indigo-500" /> {order.customer || 'Guest Client'}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate max-w-[200px] font-mono mt-0.5">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-600">{formatCurrency(order.price || order.pricing?.totalPrice || 0)}</span>
                    <p className="text-[10px] text-slate-500 font-semibold">{order.design?.quantity || 100} units</p>
                  </div>
                </div>

                {/* ── Inline Design Previews + Specs ── */}
                <OrderPreviewAndSpecs order={order} onZoom={setZoomImage} />

                {/* Quick Status Dropdown + Quick Actions */}
                <div className="pt-3 flex items-center justify-between gap-2 mt-2 border-t border-slate-100" onClick={e => e.stopPropagation()}>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    {[...STATUS_OPTIONS, 'Archived'].map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/admin/orders/${order.id}`); }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 border border-indigo-100 hover:border-indigo-500 text-indigo-700 hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      title="Inspect Specs & Proofs"
                    >
                      <Eye size={13} />
                      <span>Inspect</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteOrder(order.id); }}
                      className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-500 border border-rose-100 text-rose-600 hover:text-white transition-colors cursor-pointer"
                      title="Delete Order"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* ── Super Admin Quick Actions ── */}
                <QuickActions
                  order={order}
                  onPrintPDF={handlePrintPDF}
                  onAdvancedPrint={handleAdvancedPrint}
                  onPreviewImage={handlePreviewImage}
                  onArchive={handleArchive}
                />
              </div>
            ))}
          </div>
        ) : (
          /* ── Table View ── */
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-5 py-4">Order ID</th>
                    <th className="px-5 py-4">Client</th>
                    <th className="px-5 py-4">Preview</th>
                    <th className="px-5 py-4">Specifications</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                  {filteredOrders.map(order => {
                    const design = order.design || {};
                    const bestPreview = order.previewImage || order.flatFrontPreview || order.idCardPreview;
                    return (
                      <tr
                        key={order.id}
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-4">
                          <div>
                            <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 block mb-1">
                              {order.id}
                            </span>
                            <span className="text-[10px] text-slate-400">{order.date}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-900">{order.customer}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{order.email}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{order.designName || 'Custom Project'}</p>
                        </td>
                        <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            {bestPreview && bestPreview !== 'Preview too large for storage' ? (
                              <div
                                onClick={() => setZoomImage(bestPreview)}
                                className="w-14 h-14 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-1 cursor-zoom-in hover:border-indigo-400 transition-colors group"
                              >
                                <img src={bestPreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                              </div>
                            ) : (
                              <div className="w-14 h-14 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                                <Palette size={18} />
                              </div>
                            )}
                            {order.idCardPreview && order.idCardPreview !== bestPreview && (
                              <div
                                onClick={() => setZoomImage(order.idCardPreview)}
                                className="w-10 h-14 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-0.5 cursor-zoom-in hover:border-violet-400 transition-colors"
                              >
                                <img src={order.idCardPreview} alt="ID Card" className="max-w-full max-h-full object-contain" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="space-y-0.5 text-[11px]">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full border border-slate-200 shrink-0" style={{ backgroundColor: design.lanyardColor || '#4f46e5' }} />
                              <span className="font-mono text-slate-600">{design.lanyardColor || '#4f46e5'}</span>
                            </div>
                            <p><span className="text-slate-400">Width:</span> <span className="font-semibold">{design.width || '20mm'}</span></p>
                            <p><span className="text-slate-400">Print:</span> <span className="font-semibold">{design.printingMethod || 'Sublimated'}</span></p>
                            <p><span className="text-slate-400">Clip:</span> <span className="font-semibold">{design.clipType || 'Metal Hook'}</span></p>
                            <p><span className="text-slate-400">Qty:</span> <span className="font-bold text-slate-800">{design.quantity || order.quantity || 100} units</span></p>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-bold text-emerald-600">
                          {formatCurrency(order.price || order.pricing?.totalPrice || 0)}
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-4 text-right" onClick={e => e.stopPropagation()}>
                          <div className="flex flex-col items-end gap-1.5">
                            {/* Row 1: Inspect + Delete */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => navigate(`/admin/orders/${order.id}`)}
                                className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 border border-indigo-100 hover:border-indigo-500 text-indigo-700 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                              >
                                Inspect
                              </button>
                              <button
                                onClick={() => deleteOrder(order.id)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-500 border border-rose-100 text-rose-600 hover:text-white transition-colors cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            {/* Row 2: Quick Actions */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handlePrintPDF(order)}
                                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition-colors cursor-pointer"
                                title="Print PDF"
                              >
                                <Printer size={11} /> PDF
                              </button>
                              <button
                                onClick={() => handleAdvancedPrint(order)}
                                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold transition-colors cursor-pointer"
                                title="Advanced Print"
                              >
                                <PrinterCheck size={11} /> Adv.
                              </button>
                              <button
                                onClick={() => handlePreviewImage(bestPreview)}
                                disabled={!bestPreview}
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${bestPreview ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                                title="Preview Image"
                              >
                                <ScanSearch size={11} /> View
                              </button>
                              <button
                                onClick={() => handleArchive(order)}
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                                  order.status === 'Archived'
                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                                title={order.status === 'Archived' ? 'Restore' : 'Archive'}
                              >
                                <ArchiveIcon size={11} /> {order.status === 'Archived' ? 'Restore' : 'Archive'}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── Interactive Zoom & Pan Lightbox ── */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex flex-col select-none animate-fade-in"
          onMouseUp={handleMouseUp}
        >
          <div className="h-14 bg-slate-950/80 border-b border-slate-800 px-6 flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Proofing Inspector</span>
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                {Math.round(zoomScale * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setZoomScale(s => Math.min(8, s * 1.25))} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer" title="Zoom In">
                <ZoomIn size={16} />
              </button>
              <button onClick={() => setZoomScale(s => Math.max(0.5, s / 1.25))} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer" title="Zoom Out">
                <ZoomOut size={16} />
              </button>
              <button onClick={resetZoom} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer">
                Reset Zoom
              </button>
              <button onClick={closeZoom} className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer ml-4" title="Close Inspector">
                <X size={18} />
              </button>
            </div>
          </div>
          <div
            ref={imageContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            className={`flex-1 overflow-hidden flex items-center justify-center p-8 relative cursor-${isDragging ? 'grabbing' : 'grab'}`}
          >
            <img
              src={zoomImage}
              alt="Inspect Proof"
              draggable={false}
              className="max-w-none transition-transform duration-75 ease-out shadow-2xl rounded-2xl border-4 border-slate-700 bg-white"
              style={{ transform: `translate(${zoomOffset.x}px, ${zoomOffset.y}px) scale(${zoomScale})` }}
            />
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoice && selectedOrder && (
        <InvoiceModal order={selectedOrder} onClose={() => setShowInvoice(false)} />
      )}
    </div>
  );
}
