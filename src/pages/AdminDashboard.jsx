import { useState, useEffect } from 'react';
import { ShoppingBag, Package, Truck, CheckCircle, RefreshCcw, Search, User, MapPin, X, Eye, Info, CreditCard, Palette, Clock, Mail, Phone, Globe, ShieldCheck, Trash2, ExternalLink } from 'lucide-react';
import { showToast } from '../components/Toast';
import { formatCurrency } from '../lib/pricing';
import InvoiceModal from '../components/InvoiceModal';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipping', 'Out for Delivery', 'Delivered'];

const StatusBadge = ({ status }) => {
  const colors = {
    'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
    'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
    'Shipping': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Out for Delivery': 'bg-purple-100 text-purple-700 border-purple-200',
    'Delivered': 'bg-emerald-100 text-emerald-700 border-emerald-200'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border whitespace-nowrap ${colors[status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
      {status}
    </span>
  );
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('myLanyardOrders') || '[]');
    setOrders(savedOrders);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('myLanyardOrders', JSON.stringify(updatedOrders));
    
    // Update selectedOrder if it's the one being updated
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    showToast(
      `Order ${orderId} is now ${newStatus}.`,
      'success',
      'Status Updated'
    );
    
    window.dispatchEvent(new Event('orderStatusUpdated'));
  };

  const sendInvoice = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, invoiceSent: true } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('myLanyardOrders', JSON.stringify(updatedOrders));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, invoiceSent: true });
    }

    showToast(
      `Invoice for ${orderId} has been sent to the client.`,
      'success',
      'Invoice Sent'
    );
    
    window.dispatchEvent(new Event('orderStatusUpdated'));
  };

  const deleteOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}? This action cannot be undone.`)) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('myLanyardOrders', JSON.stringify(updatedOrders));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(null);
      }

      showToast(
        `Order ${orderId} has been deleted.`,
        'success',
        'Order Deleted'
      );
      
      window.dispatchEvent(new Event('orderStatusUpdated'));
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen text-[#1a1a1a]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]">gotek</h1>
          <p className="text-[#919191] mt-1 text-lg">Manage orders and update delivery status.</p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#919191]">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search orders or customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 pr-4 py-3 bg-white border border-[#eef2f6] rounded-2xl w-full md:w-[320px] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]/20 transition-all shadow-sm text-[#1a1a1a] placeholder:text-[#919191]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[24px] border border-[#eef2f6] shadow-sm">
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-[14px] flex items-center justify-center mb-4">
            <RefreshCcw size={20} />
          </div>
          <p className="text-[#919191] text-sm font-medium">Pending</p>
          <p className="text-2xl font-bold text-[#1a1a1a] mt-1">
            {orders.filter(o => o.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-[#eef2f6] shadow-sm">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-[14px] flex items-center justify-center mb-4">
            <Package size={20} />
          </div>
          <p className="text-[#919191] text-sm font-medium">Processing</p>
          <p className="text-2xl font-bold text-[#1a1a1a] mt-1">
            {orders.filter(o => o.status === 'Processing').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-[#eef2f6] shadow-sm">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-[14px] flex items-center justify-center mb-4">
            <Truck size={20} />
          </div>
          <p className="text-[#919191] text-sm font-medium">Shipping</p>
          <p className="text-2xl font-bold text-[#1a1a1a] mt-1">
            {orders.filter(o => o.status === 'Shipping').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-[#eef2f6] shadow-sm">
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-[14px] flex items-center justify-center mb-4">
            <MapPin size={20} />
          </div>
          <p className="text-[#919191] text-sm font-medium">Out for Delivery</p>
          <p className="text-2xl font-bold text-[#1a1a1a] mt-1">
            {orders.filter(o => o.status === 'Out for Delivery').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-[#eef2f6] shadow-sm">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-[14px] flex items-center justify-center mb-4">
            <CheckCircle size={20} />
          </div>
          <p className="text-[#919191] text-sm font-medium">Delivered</p>
          <p className="text-2xl font-bold text-[#1a1a1a] mt-1">
            {orders.filter(o => o.status === 'Delivered').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-[#eef2f6] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8faff] border-b border-[#eef2f6]">
                <th className="px-8 py-5 text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider">PROJECT REF</th>
                <th className="px-8 py-5 text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider">CLIENT NAME</th>
                <th className="px-8 py-5 text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider">DESIGN TYPE</th>
                <th className="px-8 py-5 text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider">DATE</th>
                <th className="px-8 py-5 text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider">CURRENT STAGE</th>
                <th className="px-8 py-5 text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider">QUICK UPDATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6]">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-[#f8faff] transition-all cursor-pointer group"
                >
                  <td className="px-8 py-6">
                    <span className="font-black text-[#5d5fef] bg-[#5d5fef]/5 px-3 py-1.5 rounded-lg border border-[#5d5fef]/10 transition-all group-hover:shadow-md whitespace-nowrap inline-block">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#f8faff] border border-[#eef2f6] flex items-center justify-center text-slate-400 group-hover:bg-[#5d5fef] group-hover:text-white transition-all">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-black text-[#1a1a1a] group-hover:text-[#5d5fef] transition-colors">{order.customer}</p>
                        <p className="text-[11px] font-bold text-[#919191] tracking-tight">{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Palette size={14} className="text-[#5d5fef] opacity-40" />
                      <span className="text-[13px] font-bold text-[#1a1a1a] line-clamp-1">{order.designName || 'Custom Design'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-300" />
                      <span className="text-[13px] font-bold text-[#919191]">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-8 py-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1.5">
                      {STATUS_OPTIONS.map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order.id, status)}
                          disabled={order.status === status}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                            order.status === status 
                              ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-transparent' 
                              : 'bg-white border border-[#eef2f6] text-[#919191] hover:bg-[#5d5fef] hover:text-white hover:border-[#5d5fef] hover:shadow-xl hover:shadow-[#5d5fef]/20 active:scale-90'
                          }`}
                          title={`Mark as ${status}`}
                        >
                          {status === 'Pending' && <RefreshCcw size={16} />}
                          {status === 'Processing' && <Package size={16} />}
                          {status === 'Shipping' && <Truck size={16} />}
                          {status === 'Out for Delivery' && <MapPin size={16} />}
                          {status === 'Delivered' && <CheckCircle size={16} />}
                        </button>
                      ))}
                      <div className="w-px h-6 bg-[#eef2f6] mx-1"></div>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-white border border-[#eef2f6] text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-xl hover:shadow-red-500/20 active:scale-90"
                        title="Delete Order"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <ShoppingBag size={48} className="text-slate-200 mb-4" />
                      <p className="text-[#1a1a1a] font-bold text-lg">No orders found</p>
                      <p className="text-[#919191]">Try searching for something else</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Professional Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in p-4">
          <div className="bg-white rounded-[40px] shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row transform animate-scale-in border border-white/20">
            {/* Left: Design Preview Panel */}
            <div className="md:w-3/5 bg-[#f8faff] p-10 flex flex-col items-center border-r border-[#eef2f6] overflow-y-auto custom-scrollbar">
              <div className="w-full space-y-10 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#5d5fef] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#5d5fef]/20">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#1a1a1a]">Production Proofs</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Specifications</p>
                    </div>
                  </div>
                </div>

                {/* Lanyard Design Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Palette size={14} /> Lanyard Strap (2D Hanging View)
                    </span>
                    <span className="text-[10px] font-bold text-[#5d5fef] bg-[#5d5fef]/5 px-3 py-1 rounded-full border border-[#5d5fef]/10">
                      {selectedOrder.design?.printingMethod || 'Sublimated'}
                    </span>
                  </div>
                  {selectedOrder.previewImage && selectedOrder.previewImage !== 'Preview too large for storage' ? (
                    <div className="relative group">
                      <img 
                        src={selectedOrder.previewImage} 
                        alt="Lanyard Design" 
                        className="w-full h-auto object-contain rounded-[32px] shadow-2xl border-4 border-white bg-white transition-transform duration-500 group-hover:scale-[1.02]" 
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px] pointer-events-none" />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-white/50 rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
                      <Palette size={48} className="mb-4 opacity-20" />
                      <p className="text-xs font-black uppercase tracking-widest">No Lanyard Preview Available</p>
                    </div>
                  )}
                </div>

                {/* Flat Strap Layout Section */}
                {(selectedOrder.flatFrontPreview || selectedOrder.flatBackPreview) && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Palette size={14} /> Flat Print Layout
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedOrder.flatFrontPreview && (
                        <div className="flex flex-col items-center gap-2">
                          <img 
                            src={selectedOrder.flatFrontPreview} 
                            alt="Flat Front Preview" 
                            className="w-full max-h-[300px] object-contain rounded-2xl border-2 border-white shadow-md bg-white" 
                          />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Front Layout</span>
                        </div>
                      )}
                      {selectedOrder.flatBackPreview && (
                        <div className="flex flex-col items-center gap-2">
                          <img 
                            src={selectedOrder.flatBackPreview} 
                            alt="Flat Back Preview" 
                            className="w-full max-h-[300px] object-contain rounded-2xl border-2 border-white shadow-md bg-white" 
                          />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Back Layout</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ID Card Design Section */}
                {selectedOrder.idCardPreview && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <CreditCard size={14} /> ID Card Design
                      </span>
                    </div>
                    <div className="relative group max-w-[280px] mx-auto">
                      <img 
                        src={selectedOrder.idCardPreview} 
                        alt="ID Card Preview" 
                        className="w-full h-auto object-contain rounded-[24px] shadow-lg border-4 border-white bg-white" 
                      />
                    </div>
                  </div>
                )}

                {/* Uploaded Assets Section */}
                {(selectedOrder.design?.logoUrl || selectedOrder.design?.customPatternUrl || selectedOrder.design?.idCardPhotoUrl || selectedOrder.design?.idCardLogoUrl) && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 flex items-center gap-2">
                      <ExternalLink size={14} className="text-[#5d5fef]" /> Client Uploaded Assets
                    </h4>
                    <div className="flex flex-wrap gap-4 bg-white/50 p-4 rounded-3xl border border-slate-200/60">
                      {selectedOrder.design?.logoUrl && selectedOrder.design?.logoUrl !== 'Stored locally' && (
                        <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm shrink-0">
                          <img src={selectedOrder.design.logoUrl} alt="Lanyard Logo" className="w-16 h-16 object-contain rounded-lg bg-slate-50 p-1 border" />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Logo File</span>
                        </div>
                      )}
                      {selectedOrder.design?.customPatternUrl && selectedOrder.design?.customPatternUrl !== 'Stored locally' && (
                        <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm shrink-0">
                          <img src={selectedOrder.design.customPatternUrl} alt="Custom Pattern" className="w-16 h-16 object-contain rounded-lg bg-slate-50 p-1 border" />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Pattern File</span>
                        </div>
                      )}
                      {selectedOrder.design?.idCardPhotoUrl && selectedOrder.design?.idCardPhotoUrl !== 'Stored locally' && (
                        <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm shrink-0">
                          <img src={selectedOrder.design.idCardPhotoUrl} alt="ID Photo" className="w-16 h-16 object-contain rounded-lg bg-slate-50 p-1 border" />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">ID Photo</span>
                        </div>
                      )}
                      {selectedOrder.design?.idCardLogoUrl && selectedOrder.design?.idCardLogoUrl !== 'Stored locally' && (
                        <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm shrink-0">
                          <img src={selectedOrder.design.idCardLogoUrl} alt="ID Logo" className="w-16 h-16 object-contain rounded-lg bg-slate-50 p-1 border" />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">ID Logo</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Technical Specifications Grid */}
                <div className="bg-white rounded-[32px] p-8 border border-[#eef2f6] shadow-sm space-y-6 w-full text-left">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-[#eef2f6] pb-3">
                    <Info size={14} className="text-[#5d5fef]" /> Order Specifications
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-[#919191]">Width:</span>
                      <span className="font-bold text-[#1a1a1a]">{selectedOrder.design?.width || '20mm'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-[#919191]">Length:</span>
                      <span className="font-bold text-[#1a1a1a]">{selectedOrder.design?.length || '38 inches'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-[#919191]">Printing Method:</span>
                      <span className="font-bold text-[#1a1a1a]">{selectedOrder.design?.printingMethod || 'Sublimated'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-[#919191]">Lanyard Style:</span>
                      <span className="font-bold text-[#1a1a1a]">{selectedOrder.design?.lanyardStyle || 'Single Ended'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-[#919191]">Lanyard Color:</span>
                      <span className="font-bold text-[#1a1a1a] flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: selectedOrder.design?.lanyardColor || '#ffffff' }} />
                        {selectedOrder.design?.lanyardColor || '#ffffff'}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-[#919191]">Clip Type:</span>
                      <span className="font-bold text-[#1a1a1a]">{selectedOrder.design?.clipType || 'Metal Hook'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2 col-span-2">
                      <span className="text-[#919191]">Accessories:</span>
                      <span className="font-bold text-[#1a1a1a]">{(selectedOrder.design?.accessories || ['Badge Holder']).join(', ')}</span>
                    </div>
                    
                    {selectedOrder.design?.customTextLeft || selectedOrder.design?.customTextCenter || selectedOrder.design?.customTextRight ? (
                      <div className="col-span-2 pt-2 space-y-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Custom Lanyard Text</span>
                        <div className="bg-[#f8faff] p-4 rounded-2xl border border-[#eef2f6] font-mono text-xs text-slate-600 break-all space-y-1">
                          {selectedOrder.design?.customTextLeft && <p>Left Strap: "{selectedOrder.design.customTextLeft}"</p>}
                          {selectedOrder.design?.customTextCenter && <p>Center Strap: "{selectedOrder.design.customTextCenter}"</p>}
                          {selectedOrder.design?.customTextRight && <p>Right Strap: "{selectedOrder.design.customTextRight}"</p>}
                        </div>
                      </div>
                    ) : null}

                    {selectedOrder.design?.idCardSize ? (
                      <div className="col-span-2 pt-4 border-t border-[#eef2f6] grid grid-cols-2 gap-x-8 gap-y-4">
                        <div className="flex justify-between col-span-2 border-b border-slate-100 pb-2">
                          <span className="text-[#919191]">ID Card Size:</span>
                          <span className="font-bold text-[#1a1a1a]">{selectedOrder.design?.idCardSize}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-[#919191]">Front BG:</span>
                          <span className="font-bold text-[#1a1a1a] flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: selectedOrder.design?.idCardFrontBg || '#ffffff' }} />
                            {selectedOrder.design?.idCardFrontBg || '#ffffff'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-[#919191]">Back BG:</span>
                          <span className="font-bold text-[#1a1a1a] flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: selectedOrder.design?.idCardBackBg || '#ffffff' }} />
                            {selectedOrder.design?.idCardBackBg || '#ffffff'}
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Information & Management */}
            <div className="md:w-2/5 p-12 flex flex-col overflow-y-auto custom-scrollbar bg-white">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-[#5d5fef] uppercase tracking-[0.2em] bg-[#5d5fef]/5 px-3 py-1.5 rounded-xl border border-[#5d5fef]/10 whitespace-nowrap">
                      {selectedOrder.id}
                    </span>
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                  <h3 className="text-3xl font-black text-[#1a1a1a] mt-6 tracking-tight leading-tight">
                    {selectedOrder.designName || 'Custom Lanyard Project'}
                  </h3>
                  <p className="text-slate-400 font-bold mt-2 flex items-center gap-2 text-sm">
                    <Clock size={16} /> Placed on {selectedOrder.date}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-10 flex-1">
                {/* Customer Profile Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Customer Profile</h4>
                  <div className="bg-[#f8faff] rounded-[32px] p-6 border border-[#eef2f6] space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#5d5fef] shadow-sm border border-[#eef2f6]">
                        <User size={28} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-[#1a1a1a]">{selectedOrder.customer}</p>
                        <p className="text-sm font-bold text-[#5d5fef]">{selectedOrder.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 pt-4 border-t border-[#eef2f6]">
                      <div className="flex items-center gap-3 text-slate-500">
                        <Mail size={16} />
                        <span className="text-sm font-medium">{selectedOrder.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <Phone size={16} />
                        <span className="text-sm font-medium">+91 98765 43210</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <Globe size={16} />
                        <span className="text-sm font-medium">Bangalore, India</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Management Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Update Status</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {STATUS_OPTIONS.map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrder.id, status)}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          selectedOrder.status === status
                            ? 'bg-[#5d5fef] border-[#5d5fef] text-white shadow-xl shadow-[#5d5fef]/30'
                            : 'bg-white border-[#eef2f6] text-[#919191] hover:border-[#5d5fef]/30 hover:bg-[#f8faff]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedOrder.status === status ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>
                            {status === 'Pending' && <RefreshCcw size={14} />}
                            {status === 'Processing' && <Package size={14} />}
                            {status === 'Shipping' && <Truck size={14} />}
                            {status === 'Out for Delivery' && <MapPin size={14} />}
                            {status === 'Delivered' && <CheckCircle size={14} />}
                          </div>
                          <span className="text-sm font-black">{status}</span>
                        </div>
                        {selectedOrder.status === status && <CheckCircle size={18} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Summary Section */}
                <div className="space-y-4 pb-4">
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-24 leading-tight">Order Financials</h4>
                    <button 
                      onClick={() => setShowInvoice(true)}
                      className="text-[11px] font-black text-[#5d5fef] hover:text-[#4a4cd9] uppercase tracking-widest flex items-center gap-2 bg-[#f8faff] hover:bg-[#5d5fef]/10 px-6 py-2.5 rounded-full border border-[#eef2f6] hover:border-[#5d5fef]/20 transition-all shadow-sm"
                    >
                      <Eye size={14} />
                      View Invoice
                    </button>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-2">Total Project Value</p>
                        <p className="text-4xl font-black">{formatCurrency(selectedOrder.total)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-2">Quantity</p>
                        <p className="text-2xl font-black">{selectedOrder.quantity || '250'} <span className="text-xs opacity-60">Units</span></p>
                      </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
                      <ShoppingBag size={150} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shared Invoice Modal */}
      {showInvoice && selectedOrder && (
        <InvoiceModal order={selectedOrder} onClose={() => setShowInvoice(false)} />
      )}
    </div>
  );
}
