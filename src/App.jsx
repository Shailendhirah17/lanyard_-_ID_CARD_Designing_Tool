import { useMemo, useRef, useState, useEffect, lazy, Suspense } from 'react';
import CustomizationPanel from './components/CustomizationPanel';
import PreviewPanel from './components/PreviewPanel';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MobileNav from './components/MobileNav';
import { calculatePricing, formatCurrency } from './lib/pricing';
import { useConfiguratorStore } from './store/useConfiguratorStore';
import { Save, PlusCircle, CheckCircle2, X, FileText, Calendar, Truck, ShieldCheck, Mail, Loader2 } from 'lucide-react';
import ToastContainer, { showToast } from './components/Toast';
import { useAuth } from './hooks/useAuth';

// LANYARD-501: Code-split heavy pages and modal editors with React.lazy
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Learning = lazy(() => import('./pages/Learning'));
const StudentPreviewSection = lazy(() => import('./components/StudentPreviewSection'));
const IdCardPro = lazy(() => import('./pages/IdCardPro'));
const StrapEditor = lazy(() => import('./components/StrapEditor'));
const IdCardEditor = lazy(() => import('./components/IdCardEditor'));

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

// LANYARD-402: Attach JWT to upload requests
async function uploadFile(file) {
  if (!file) return '';
  const formData = new FormData();
  formData.append('file', file);
  const token = localStorage.getItem('gotek_token');
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/api/uploads`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) throw new Error('Upload failed');
  const payload = await response.json();
  return payload.url;
}

export default function App() {
  const stageRef = useRef(null);
  const idCardStageRef = useRef(null);
  const [zoom, setZoom] = useState(0.65);

  // LANYARD-401: Derive auth state from context instead of parallel localStorage state
  const { user, isLoading, signOut, updateUser } = useAuth();

  const handleLogin = (userData) => {
    // Login.jsx has already called authService.login() which set localStorage.
    // We must also push userData into AuthContext so `if (!user)` becomes false
    // and the app navigates away from the Login screen.
    updateUser(userData);
    if (userData.isAdmin) {
      setActivePage('AdminDashboard');
    } else {
      setActivePage('Dashboard');
    }
  };

  const handleLogout = () => {
    signOut();
    setActivePage('Dashboard');
  };
  const [activePage, setActivePageState] = useState('Dashboard');
  
  const setActivePage = (page, pushState = true) => {
    setActivePageState(page);
    if (pushState === true) {
      window.history.pushState({ page }, '', '');
    }
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [editingStrapZone, setEditingStrapZone] = useState(null);
  const [isEditingIdCard, setIsEditingIdCard] = useState(false);
  const [submitState, setSubmitState] = useState({ loading: false, message: '', error: false });
  const [saveMessage, setSaveMessage] = useState('');
  const design = useConfiguratorStore((state) => state.design);
  const uploads = useConfiguratorStore((state) => state.uploads);
  const saveLocal = useConfiguratorStore((state) => state.saveLocal);
  const pricing = useMemo(() => calculatePricing(design), [design]);

  useEffect(() => {
    // Initial state on mount
    if (!window.history.state) {
      window.history.replaceState({ page: 'Dashboard' }, '', '');
    } else if (window.history.state.page) {
      setActivePageState(window.history.state.page);
    }

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setActivePageState(event.state.page);
      } else {
        setActivePageState('Dashboard');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Navigate admin users automatically after login
  useEffect(() => {
    if (user?.isAdmin) {
      setActivePage('AdminDashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [autoNextAfterEditor, setAutoNextAfterEditor] = useState(false);

  useEffect(() => {
    const handleOpenEditor = (e) => {
      if (e.detail?.zone) {
        setEditingStrapZone(e.detail.zone);
        setAutoNextAfterEditor(!!e.detail.autoNext);
      }
    };
    
    const handleOpenIdCardEditor = () => setIsEditingIdCard(true);

    window.addEventListener('open-strap-editor', handleOpenEditor);
    window.addEventListener('open-id-card-editor', handleOpenIdCardEditor);
    
    const handleDashboardNav = () => setActivePage('Dashboard');
    const handleSaveProject = () => handleSaveDraft();
    const handleOpenCroppingHub = () => setActivePage('IdCardPro');
    
    window.addEventListener('navigate-dashboard', handleDashboardNav);
    window.addEventListener('save-project', handleSaveProject);
    window.addEventListener('navigate-to-cropping-hub', handleOpenCroppingHub);

    // LANYARD-702: Keyboard shortcut for saving draft (Cmd+S / Ctrl+S)
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSaveDraft();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('open-strap-editor', handleOpenEditor);
      window.removeEventListener('open-id-card-editor', handleOpenIdCardEditor);
      window.removeEventListener('navigate-dashboard', handleDashboardNav);
      window.removeEventListener('save-project', handleSaveProject);
      window.removeEventListener('navigate-to-cropping-hub', handleOpenCroppingHub);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const handleSaveDraft = () => {
    saveLocal();
    setSaveMessage('Draft saved successfully!');
    showToast('Draft saved successfully to local workspace.', 'success', 'Design Saved');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const submitDesign = async () => {
    try {
      setSubmitState({ loading: true, message: '', error: false });
      
      // Simulate ₹2 payment for demo
      const confirmPayment = window.confirm("Demo Payment Simulation: Pay ₹2 to place order?");
      if (!confirmPayment) {
        setSubmitState({ loading: false, message: 'Payment cancelled.', error: true });
        return;
      }

      const previewImage = stageRef.current?.toDataURL({ pixelRatio: 2 }) || '';
      const idCardPreviewImage = idCardStageRef.current?.toDataURL({ pixelRatio: 2 }) || '';
      
      // Capture ID Card if available
      let idCardPreview = '';
      try {
        const idCardStage = document.querySelector('.id-card-stage-container stage');
        // This is a bit tricky since the ID card stage is deep inside PreviewPanel
        // We might need to expose a way to get it, or just use the combined preview if that's what stageRef is.
        // Actually, stageRef is passed to LanyardStage, not the whole panel.
      } catch (e) {
        console.warn("Could not capture separate ID card preview", e);
      }
      let logoUrl = design.logoUrl;
      let customPatternUrl = design.customPatternUrl;
      let photoUrl = design.idCard.photoUrl;
      let cardLogoUrl = design.idCard.logoUrl;

      // Only attempt upload if files exist, but handle server absence gracefully
      if (uploads.strapLogoFile || uploads.customPatternFile || uploads.idPhotoFile || uploads.idLogoFile) {
        try {
          const results = await Promise.allSettled([
            uploads.strapLogoFile ? uploadFile(uploads.strapLogoFile) : Promise.resolve(design.logoUrl),
            uploads.customPatternFile ? uploadFile(uploads.customPatternFile) : Promise.resolve(design.customPatternUrl),
            uploads.idPhotoFile ? uploadFile(uploads.idPhotoFile) : Promise.resolve(design.idCard.photoUrl),
            uploads.idLogoFile ? uploadFile(uploads.idLogoFile) : Promise.resolve(design.idCard.logoUrl),
          ]);
          
          if (results[0].status === 'fulfilled') logoUrl = results[0].value;
          if (results[1].status === 'fulfilled') customPatternUrl = results[1].value;
          if (results[2].status === 'fulfilled') photoUrl = results[2].value;
          if (results[3].status === 'fulfilled') cardLogoUrl = results[3].value;
          
        } catch (e) {
          console.warn("Server upload failed, proceeding with local data for demo.", e);
        }
      }

      const orderId = `ORD-${Math.floor(Math.random() * 9000) + 1000}`;
      
      // Strip design object of large base64 images for storage if needed
      // but keep essential data for the tracking view
      const storedDesign = { ...design };
      if (storedDesign.logoUrl?.startsWith('data:')) storedDesign.logoUrl = 'Stored locally';
      if (storedDesign.customPatternUrl?.startsWith('data:')) storedDesign.customPatternUrl = 'Stored locally';
      if (storedDesign.idCard?.photoUrl?.startsWith('data:')) {
        storedDesign.idCard = { ...storedDesign.idCard, photoUrl: 'Stored locally' };
      }

      // Send order request to backend API
      let finalOrderId = orderId;
      try {
        const res = await fetch(`${API_URL}/api/design-requests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            design: {
              ...storedDesign,
              customText: design.customTextLeft || design.customTextCenter || design.customTextRight || '',
              previewImage: previewImage.length > 500000 ? '' : previewImage,
            },
            order: {
              quantity: design.quantity,
              pricePerUnit: pricing.pricePerUnit,
              totalPriceInInr: pricing.total,
            },
          }),
        });

        if (res.ok) {
          const apiData = await res.json();
          if (apiData.orderId) {
            finalOrderId = `ORD-${apiData.orderId}`;
          }
        }
      } catch (e) {
        console.warn('Backend API request failed, saving order locally for demo.', e);
      }

      const newOrder = {
        id: finalOrderId,
        customer: user?.name || 'Guest User',
        email: user?.email || 'guest@test.com',
        userEmail: user?.email || 'guest@test.com', // Track which user owns this order
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        total: pricing.total,
        designName: design.idCard.name || 'Custom Lanyard',
        design: storedDesign, 
        quantity: design.quantity,
        pricePerUnit: pricing.pricePerUnit,
        previewImage: previewImage.length > 500000 ? 'Preview too large for storage' : previewImage,
        idCardPreview: idCardPreviewImage.length > 500000 ? 'ID Card preview too large' : idCardPreviewImage
      };

      // Save to localStorage with quota handling
      try {
        const existingOrders = JSON.parse(localStorage.getItem('myLanyardOrders') || '[]');
        localStorage.setItem('myLanyardOrders', JSON.stringify([newOrder, ...existingOrders].slice(0, 10))); // Keep only last 10
      } catch (e) {
        console.warn("Storage quota exceeded, clearing old orders", e);
        localStorage.setItem('myLanyardOrders', JSON.stringify([newOrder])); // Just save the latest
      }

      try {
        saveLocal();
      } catch (e) {
        console.warn("Draft save failed", e);
      }
      setSubmitState({ 
        loading: false, 
        message: `Order ${finalOrderId} placed successfully!`, 
        error: false,
        orderDetails: newOrder // Store details for the receipt view
      });
      
      // Simulate Email Notification
      setTimeout(() => {
        showToast(
          `A confirmation email has been sent to ${newOrder.email}`,
          'success',
          'Email Sent'
        );
      }, 1500);

      // Notify components
      window.dispatchEvent(new Event('orderStatusUpdated'));
    } catch (error) {
      setSubmitState({ loading: false, message: error.message, error: true });
    }
  };

  const customizationPanel = (
    <CustomizationPanel 
      currentStep={currentStep} 
      setCurrentStep={setCurrentStep} 
      onSubmit={submitDesign} 
      loading={submitState.loading} 
      pricing={pricing}
      stageRef={stageRef}
    />
  );

  const renderPage = () => {
    switch (activePage) {
      case 'AdminDashboard':
        return user?.isAdmin ? <AdminDashboard /> : <Dashboard onNavigate={setActivePage} user={user} />;
      case 'Dashboard':
        return <Dashboard onNavigate={setActivePage} user={user} />;
      case 'Learning':
        return <Learning onNavigate={setActivePage} />;
      case 'Customizer':
        return (
          <div className="flex flex-col h-full lg:block">
            <div className="flex-1 min-h-[50vh] lg:h-full relative shrink-0">
              <PreviewPanel 
                stageRef={stageRef} 
                idCardStageRef={idCardStageRef} 
                zoom={zoom} 
                setZoom={setZoom} 
                currentStep={currentStep} 
                onEditStrap={(zone) => setEditingStrapZone(zone)}
              />
            </div>
            <div className="lg:hidden flex-1 border-t border-slate-200 bg-white">
              {customizationPanel}
            </div>
          </div>
        );
      case 'StudentWear':
        return <StudentPreviewSection />;
      case 'Validation':
      case 'BulkCustomizer':
      case 'IdCardPro':
        return <IdCardPro />;
      default:
        return <Dashboard onNavigate={setActivePage} user={user} />;
    }
  };


  if (isLoading) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-[#f8faff]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#5d5fef] border-t-transparent" />
          <p className="text-sm font-semibold text-slate-500">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-[#f8faff]">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-[#f8faff] lg:flex-row">
      <Suspense fallback={null}>
        {editingStrapZone && (
          <StrapEditor 
            zone={editingStrapZone} 
            onClose={(saved) => {
              setEditingStrapZone(null);
              if (saved && autoNextAfterEditor) {
                setCurrentStep(prev => Math.min(prev + 1, 3));
              }
              setAutoNextAfterEditor(false);
            }} 
          />
        )}

        {isEditingIdCard && (
          <IdCardEditor 
            onClose={() => setIsEditingIdCard(false)} 
          />
        )}
      </Suspense>

      <>
          {/* Sidebar for Desktop */}
          <div className="hidden lg:block">
            <Sidebar 
              activePage={activePage} 
              onNavigate={setActivePage} 
              isAdmin={user.isAdmin} 
              onLogout={handleLogout}
              onSave={handleSaveDraft}
              saveMessage={saveMessage}
            >
              {activePage === 'Customizer' && customizationPanel}
            </Sidebar>
          </div>

          {/* Mobile Nav for Tablet/Mobile */}
          <MobileNav 
            activePage={activePage} 
            onNavigate={setActivePage} 
            isAdmin={user.isAdmin} 
            onLogout={handleLogout}
            user={user}
          />
          
          <main className="relative min-h-0 flex-1 overflow-y-auto custom-scrollbar">
            {(activePage === 'Dashboard' || activePage === 'AdminDashboard' || activePage === 'Learning') && (
              <div className="p-4 lg:p-8 pb-0">
                <DashboardHeader
                  user={user}
                  breadcrumb={
                    activePage === 'Dashboard'
                      ? 'Home > Dashboard > Overview'
                      : activePage === 'Learning'
                        ? 'Home > Learning'
                        : activePage === 'StudentWear'
                          ? 'Home > Student Wear Preview'
                          : 'Home > Admin > Overview'
                  }
                />
              </div>
            )}
            
            <div className={(activePage === 'Customizer' || activePage === 'StudentWear') ? 'h-full' : 'p-4 lg:p-8 pt-0'}>
              <Suspense fallback={
                <div className="flex min-h-[400px] items-center justify-center">
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-lg border border-slate-100 text-[#5d5fef]">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="font-bold text-sm text-slate-700">Loading module…</span>
                  </div>
                </div>
              }>
                {renderPage()}
              </Suspense>
            </div>

            {submitState.orderDetails && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in p-4 overflow-y-auto">
                <div className="bg-white rounded-[40px] shadow-2xl max-w-2xl w-full my-auto transform animate-scale-in overflow-hidden border border-white/20">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-center text-white relative">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-xl border border-white/30">
                      <CheckCircle2 size={56} className="text-white drop-shadow-lg" />
                    </div>
                    <h2 className="text-4xl font-black mb-2 tracking-tight">Order Confirmed!</h2>
                    <p className="text-emerald-50 opacity-90 text-lg font-medium">Your order has been successfully placed</p>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                  </div>

                  <div className="p-10">
                    <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8">
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                        <Truck size={28} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">Estimated Delivery</h4>
                        <p className="text-slate-500 font-medium">3-5 business working days</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10 mb-10">
                      <div>
                        <div className="flex items-center gap-2 text-slate-400 mb-3">
                          <FileText size={14} />
                          <span className="text-xs font-bold uppercase tracking-widest">Order Details</span>
                        </div>
                        <p className="text-slate-800 font-black text-xl mb-1">{submitState.orderDetails.id}</p>
                        <p className="text-slate-500 font-bold">{submitState.orderDetails.designName}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-slate-400 mb-3 justify-end">
                          <Calendar size={14} />
                          <span className="text-xs font-bold uppercase tracking-widest">Order Date</span>
                        </div>
                        <p className="text-slate-800 font-black text-xl mb-1">
                          {new Date(submitState.orderDetails.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                        <p className="text-slate-500 font-bold">{submitState.orderDetails.quantity} Units</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t-2 border-dashed border-slate-100 mb-10">
                      <div className="flex justify-between text-slate-500 font-bold">
                        <span>Price per Unit</span>
                        <span>{formatCurrency(submitState.orderDetails.pricePerUnit)}</span>
                      </div>
                      <div className="flex justify-between text-slate-800 font-black text-2xl pt-2">
                        <span>Amount Paid</span>
                        <span className="text-emerald-600">{formatCurrency(submitState.orderDetails.total)}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4 mb-10">
                      <ShieldCheck className="text-blue-500 shrink-0 mt-1" size={20} />
                      <p className="text-[13px] text-blue-700 font-bold leading-relaxed">
                        Admin will update you the progress for each step. You can track your order live from the user dashboard.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSubmitState({ loading: false, message: '', error: false, orderDetails: null });
                        setActivePage('Dashboard');
                      }}
                      className="w-full bg-[#5d5fef] text-white py-5 rounded-[24px] font-black text-xl shadow-2xl shadow-[#5d5fef]/30 hover:bg-[#4a4cd9] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                    >
                      Go to Dashboard
                      <PlusCircle size={24} className="group-hover:rotate-90 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <ToastContainer />
            
            {submitState.error && submitState.message && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg z-[110] flex items-center gap-3">
                <span className="text-sm font-bold">{submitState.message}</span>
                <button 
                  onClick={() => setSubmitState({ ...submitState, message: '', error: false })}
                  className="bg-white/20 p-1 rounded-full hover:bg-white/30"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </main>
        </>
    </div>
  );
}