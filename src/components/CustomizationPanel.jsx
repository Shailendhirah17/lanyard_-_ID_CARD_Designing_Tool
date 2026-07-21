import {
  CheckCircle2,
  CreditCard,
  ImagePlus,
  Link2,
  Palette,
  Paperclip,
  Printer,
  Ruler,
  Shield,
  Type,
  Upload,
  Zap,
  Square,
  Eye,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Layers,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Save,
  Trash2,
  Circle,
  TrendingDown,
  ShoppingBag,
  ShieldCheck,
  Move,
  Copy,
  Repeat,
  ArrowRightLeft,
  LayoutTemplate,
  Camera,
  Crop
} from 'lucide-react';
import PhotoEditor from './PhotoEditor';


import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  accessoryOptions,
  clipTypes,
  fonts,
  gradientPresets,
  pantonePalette,
  presetColors,
  printingMethods,
  widths,
  lengths,
} from '../data/options';
import { parseColorCode, toHexColor } from '../lib/colorUtils';
import { prepareUploadAsset } from '../lib/fileReaders';
import { calculatePricing, formatCurrency } from '../lib/pricing';
import { generateTryOn } from '../services/fashnService';
import { useConfiguratorStore } from '../store/useConfiguratorStore';
import DropzoneField from './DropzoneField';
import { cardSizes } from '../data/cardConfig';
import { showToast } from './Toast';
import { getAllTemplates, getTemplatesByOrientation, getTemplatesByCategory } from '../data/schoolIdTemplates';

function OptionGrid({ items, selected, onChange, icon: Icon }) {
  const activeClasses = 'border-[#5d5fef] bg-[#5d5fef]/5 text-[#5d5fef] shadow-sm';
  const accentClasses = 'text-[#5d5fef]';

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const active = selected === item.label;
        return (
          <button
            key={item.label}
            type="button"
            title={item.description}
            onClick={() => onChange(item.label)}
            className={`min-h-[80px] rounded-[20px] border-2 p-3 text-left transition-all duration-300 relative overflow-hidden ${
              active ? activeClasses : 'border-[#eef2f6] bg-white text-[#1a1a1a] hover:border-[#5d5fef]/30 hover:bg-[#f8faff]'
            }`}
          >
            {item.image && (
              <div className="absolute top-0 right-0 w-16 h-16 opacity-40 rounded-bl-[20px] overflow-hidden pointer-events-none">
                <img src={item.image} alt="" className="w-full h-full object-cover mix-blend-multiply" />
              </div>
            )}
            <div className="flex items-start justify-between gap-2 mb-2 relative z-10">
              <div className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${active ? 'bg-[#5d5fef] text-white' : 'bg-[#f8faff] text-[#5d5fef]'}`}>
                {Icon ? <Icon size={16} /> : <CheckCircle2 size={16} />}
              </div>
              {active ? <CheckCircle2 size={16} className={accentClasses} /> : null}
            </div>
            <div className="text-[12px] font-black text-[#1a1a1a] tracking-tight relative z-10">{item.label}</div>
            <div className="mt-0.5 text-[10px] text-[#919191] line-clamp-1 font-medium relative z-10">{item.description}</div>
          </button>
        );
      })}
    </div>
  );
}

function FieldLabel({ label, hint }) {
  return (
    <div className="mb-1.5 flex flex-col gap-0.5">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      {hint ? <span className="text-[9px] text-slate-400/70 lowercase italic">{hint}</span> : null}
    </div>
  );
}

function Accordion({ title, icon: Icon, children, isOpen, onClick }) {
  return (
    <div className="border-b border-[#eef2f6] last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 hover:bg-[#f8faff] transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-[#5d5fef] text-white' : 'bg-[#f8faff] text-[#5d5fef] group-hover:bg-[#5d5fef]/10'}`}>
            <Icon size={18} />
          </div>
          <span className={`text-[14px] font-bold ${isOpen ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/70 group-hover:text-[#1a1a1a]'}`}>
            {title}
          </span>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-[#919191]" /> : <ChevronDown size={16} className="text-[#919191]" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}



function SummaryRow({ label, value, isColor }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
      <span className="text-[11px] font-bold text-slate-400/80 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-2 font-black text-[12px] text-slate-800">
        {isColor && <div className="w-2.5 h-2.5 rounded-full border border-slate-200" style={{ backgroundColor: value }} />}
        {value}
      </div>
    </div>
  );
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-[14px] border border-[#eef2f6] bg-[#f8faff] px-4 py-3 text-[13px] text-[#1a1a1a] outline-none transition-all focus:border-[#5d5fef] focus:bg-white focus:ring-4 focus:ring-[#5d5fef]/10 ${className}`}
      {...props}
    />
  );
}

function Select(props) {
  return (
    <select
      className="w-full rounded-[14px] border border-[#eef2f6] bg-[#f8faff] px-4 py-3 text-[13px] text-[#1a1a1a] outline-none transition-all focus:border-[#5d5fef] focus:bg-white focus:ring-4 focus:ring-[#5d5fef]/10 appearance-none"
      {...props}
    />
  );
}

function NumericStepper({ label, value, min, max, step = 1, onChange, unit = '', hint = '' }) {
  const val = Number(value) || 0;
  const update = (newVal) => {
    const clamped = Math.min(max, Math.max(min, newVal));
    onChange({ target: { value: clamped.toString() } });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">{label} {hint && <span className="text-slate-400 ml-1 font-normal lowercase italic">{hint}</span>}</div>
      </div>
      <div className="flex items-center justify-between bg-[#f8faff] rounded-[20px] border-2 border-[#eef2f6] p-1 shadow-sm">
        <button 
          onClick={() => update(val - step)}
          className="w-12 h-11 flex items-center justify-center rounded-[16px] bg-white text-slate-500 hover:text-red-500 border border-transparent hover:border-red-100 shadow-sm transition-all active:scale-90"
        >
          <div className="w-3 h-[2px] bg-current rounded-full" />
        </button>
        <div className="flex flex-col items-center justify-center flex-1">
           <div className="text-[15px] font-black text-[#5d5fef] font-mono leading-none">{value}{unit}</div>
        </div>
        <button 
          onClick={() => update(val + step)}
          className="w-12 h-11 flex items-center justify-center rounded-[16px] bg-white text-[#5d5fef] border border-transparent hover:border-indigo-100 shadow-sm transition-all active:scale-90 font-black text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}

function MovementPad({ label, hValue, vValue, onHChange, onVChange, hMin, hMax, vMin, vMax }) {
  const step = 5;
  const h = Math.round(Number(hValue) || 0);
  const v = Math.round(Number(vValue) || 0);
  
  const updateH = (delta) => onHChange({ target: { value: Math.min(hMax, Math.max(hMin, h + delta)).toString() } });
  const updateV = (delta) => onVChange({ target: { value: Math.min(vMax, Math.max(vMin, v + delta)).toString() } });
  const reset = () => { onHChange({ target: { value: "0" } }); onVChange({ target: { value: "0" } }); };

  return (
    <div className="space-y-4 p-5 bg-white rounded-[32px] border-2 border-[#eef2f6] shadow-sm">
      <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3 mb-2">
        <div className="flex items-center gap-2">
           <Move size={16} className="text-[#5d5fef]" />
           <span className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{label}</span>
        </div>
        <button onClick={reset} className="text-[10px] font-black text-slate-300 hover:text-red-500 uppercase tracking-widest transition-colors">Reset</button>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-6 py-2">
        <div className="grid grid-cols-3 gap-2 p-3 bg-[#f8faff] rounded-[32px] border border-[#eef2f6]">
          <div />
          <button onClick={() => updateV(-step)} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white hover:bg-indigo-50 text-[#5d5fef] border-2 border-transparent hover:border-indigo-100 transition-all shadow-sm active:scale-90"><ChevronUp size={24} strokeWidth={3} /></button>
          <div />
          
          <button onClick={() => updateH(-step)} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white hover:bg-indigo-50 text-[#5d5fef] border-2 border-transparent hover:border-indigo-100 transition-all shadow-sm active:scale-90"><ChevronLeft size={24} strokeWidth={3} /></button>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
             <div className="text-[9px] font-black text-white/80 leading-tight">POS</div>
             <div className="text-[10px] font-black leading-tight">{h},{v}</div>
          </div>
          <button onClick={() => updateH(step)} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white hover:bg-indigo-50 text-[#5d5fef] border-2 border-transparent hover:border-indigo-100 transition-all shadow-sm active:scale-90"><ChevronRight size={24} strokeWidth={3} /></button>
          
          <div />
          <button onClick={() => updateV(step)} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white hover:bg-indigo-50 text-[#5d5fef] border-2 border-transparent hover:border-indigo-100 transition-all shadow-sm active:scale-90"><ChevronDown size={24} strokeWidth={3} /></button>
          <div />
        </div>

        <div className="flex gap-4 text-[11px] font-mono font-bold">
           <div className="flex items-center gap-1 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <span className="uppercase text-[9px]">Horiz:</span>
              <span className="text-indigo-600">{h}px</span>
           </div>
           <div className="flex items-center gap-1 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <span className="uppercase text-[9px]">Vert:</span>
              <span className="text-indigo-600">{v}px</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function extractDominantColor(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 10;
        canvas.height = 10;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 10, 10);
        const imgData = ctx.getImageData(0, 0, 10, 10).data;
        
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < imgData.length; i += 4) {
          const alpha = imgData[i + 3];
          if (alpha < 150) continue;
          r += imgData[i];
          g += imgData[i + 1];
          b += imgData[i + 2];
          count++;
        }
        
        if (count === 0) {
          resolve('#5d5fef');
          return;
        }
        
        const avgR = Math.round(r / count);
        const avgG = Math.round(g / count);
        const avgB = Math.round(b / count);
        const hex = "#" + ((1 << 24) + (avgR << 16) + (avgG << 8) + avgB).toString(16).slice(1);
        resolve(hex);
      } catch (e) {
        resolve('#5d5fef');
      }
    };
    img.onerror = () => resolve('#5d5fef');
    img.src = imageUrl;
  });
}

export default function CustomizationPanel({ currentStep, setCurrentStep, onSubmit, loading, stageRef }) {
  const design = useConfiguratorStore((state) => state.design);
  const setField = useConfiguratorStore((state) => state.setField);
  const toggleAccessory = useConfiguratorStore((state) => state.toggleAccessory);
  const setUploadAsset = useConfiguratorStore((state) => state.setUploadAsset);
  const patternInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [expandedSection, setExpandedSection] = useState('strap');
  const [activeImageUpload, setActiveImageUpload] = useState(null);
  const [templateFilter, setTemplateFilter] = useState({
    orientation: 'all',
    category: 'all',
    search: ''
  });
  const [couponCode, setCouponCode] = useState('');
  const [aiProgressText, setAiProgressText] = useState('');
  const [aiProgressPct, setAiProgressPct] = useState(0);
  const [hubPhotoSrc, setHubPhotoSrc] = useState(null);
  const hubFileInputRef = useRef(null);

  const handleUniformUpload = async (file) => {
    if (!file) return;
    try {
      const asset = await prepareUploadAsset(file);
      if (!asset || !asset.previewUrl) {
        showToast('Failed to read image', 'error');
        return;
      }
      
      setField('premiumUniformFileName', asset.name);
      
      // Instantly apply the uploaded pattern to the 3D character using CSS
      const dominantColor = await extractDominantColor(asset.previewUrl);
      setField('premiumUniformColor', dominantColor);
      setField('premiumUniformTextureUrl', asset.previewUrl);
      
      showToast('Uniform pattern applied successfully!', 'success');
    } catch (e) {
      console.error(e);
      showToast('Error processing uniform image', 'error');
    }
  };

  const steps = [
    { title: 'Strap & Hardware', subtitle: 'Lanyard dimensions & clips', icon: Ruler },
    { title: 'Strap Design', subtitle: 'Colors, logos & patterns', icon: Palette },
    { title: 'ID Card Designer', subtitle: 'Design your identity card', icon: CreditCard },
    { title: 'Review & Order', subtitle: 'Check your design', icon: ShoppingBag },
  ];

  const goNext = () => setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
  const goBack = () => setCurrentStep(Math.max(0, currentStep - 1));

  const pricing = useMemo(() => calculatePricing(design), [design]);

  const customColorState = useMemo(() => parseColorCode(design.customColorCode), [design.customColorCode]);
  const colorPickerValue = useMemo(
    () => {
      // Return a safe hex. If it's a gradient or not valid, just use design color if it is a hex, else #000000
      if (design.lanyardColor && design.lanyardColor.startsWith('#')) return design.lanyardColor;
      return toHexColor(customColorState.valid ? customColorState.normalized : '#5d5fef');
    },
    [customColorState, design.lanyardColor],
  );
  const hasCustomColorError = design.customColorCode.trim() !== '' && !customColorState.valid && !design.customColorCode.includes('linear-gradient') && !design.customColorCode.includes('radial-gradient');

  const handleUpload = async (file, key) => {
    if (!file) return;
    const asset = await prepareUploadAsset(file);
    setUploadAsset(key, asset.file, asset.previewUrl, asset.name);
  };

  const handleColorCodeChange = (value) => {
    setField('customColorCode', value);
    if (value.includes('linear-gradient') || value.includes('radial-gradient')) {
      setField('lanyardColor', value);
      return;
    }
    const parsed = parseColorCode(value);
    if (parsed.valid) {
      setField('lanyardColor', parsed.normalized);
    }
  };

  const syncColourSelection = (value, pantone = design.pantone) => {
    setField('lanyardColor', value);
    setField('customColorCode', value);
    if (pantone) setField('pantone', pantone);
  };

  // Template filtering and application functions
  const getFilteredTemplates = () => {
    let templates = getAllTemplates();
    
    // Filter by orientation
    if (templateFilter.orientation && templateFilter.orientation !== 'all') {
      templates = templates.filter(t => t.orientation === templateFilter.orientation);
    }
    
    // Filter by category
    if (templateFilter.category && templateFilter.category !== 'all') {
      templates = templates.filter(t => t.category === templateFilter.category);
    }
    
    // Filter by search term
    if (templateFilter.search && templateFilter.search.trim()) {
      const searchTerm = templateFilter.search.toLowerCase();
      templates = templates.filter(t => 
        t.name.toLowerCase().includes(searchTerm) ||
        t.category.toLowerCase().includes(searchTerm) ||
        t.orientation.toLowerCase().includes(searchTerm)
      );
    }
    
    return templates;
  };

  const applyTemplate = (template) => {
    // Set the card size
    setField('idCard.size', template.size);
    
    // Apply front template
    setField('idCard.front.backgroundColor', template.front.backgroundColor);
    setField('idCard.front.elements', template.front.elements.map(el => ({
      ...el,
      id: el.id.replace(/\${ts}/g, Date.now().toString())
    })));
    
    // Apply back template
    setField('idCard.back.backgroundColor', template.back.backgroundColor);
    setField('idCard.back.elements', template.back.elements.map(el => ({
      ...el,
      id: el.id.replace(/\${ts}/g, Date.now().toString())
    })));
    
    // Show success message
    showToast(`${template.name} template applied successfully!`);
  };

  const toggleSection = (section) => {
    const isOpening = expandedSection !== section;
    setExpandedSection(isOpening ? section : null);
    
    // Sync currentStep for PreviewPanel
    if (isOpening) {
      switch(section) {
        case 'strap': setCurrentStep(0); break;
        case 'design': setCurrentStep(1); break;
        case 'id-card': setCurrentStep(2); break;
        case 'review': setCurrentStep(3); break;
      }
    }
  };

  const content = [
    <div key="strap-hardware" className="space-y-6">
      <div>
        <FieldLabel label="Lanyard Width" hint="Choose the strap width" />
        <OptionGrid items={widths} selected={design.width} onChange={(value) => setField('width', value)} icon={Ruler} />
      </div>
      <div className="pt-4 border-t border-[#eef2f6]">
        <FieldLabel label="Lanyard Length" hint="Choose the strap length" />
        <OptionGrid items={lengths} selected={design.length || '38'} onChange={(value) => setField('length', value)} icon={Ruler} />
      </div>
      <div className="pt-4 border-t border-[#eef2f6]">
        <FieldLabel label="Clip Type" hint="Choose your attachment" />
        <OptionGrid items={clipTypes} selected={design.clipType} onChange={(value) => setField('clipType', value)} icon={Paperclip} />
      </div>
      <div className="pt-4 border-t border-[#eef2f6]">
        <FieldLabel label="Safety & Accessories" hint="Optional extras" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {accessoryOptions.map((item) => {
            const active = design.accessories.includes(item.label);
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => toggleAccessory(item.label)}
                className={`flex min-h-[80px] flex-col rounded-[20px] border-2 p-3 text-left transition-all duration-300 ${active ? 'border-[#5d5fef] bg-[#5d5fef]/5 text-[#5d5fef]' : 'border-[#eef2f6] bg-white text-[#1a1a1a] hover:border-[#5d5fef]/30'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${active ? 'bg-[#5d5fef] text-white' : 'bg-[#f8faff] text-[#5d5fef]'}`}>
                    <Shield size={16} />
                  </div>
                  {active && <CheckCircle2 size={16} />}
                </div>
                <div className="text-[13px] font-bold leading-tight">{item.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6 border-t border-[#eef2f6] space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-[#5d5fef] to-[#7c3aed] text-white shadow-md">
            <Zap size={14} />
          </div>
          <div>
            <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-wider">Uniform Customizer</h4>
            <p className="text-[10px] text-slate-400 font-medium">Select a color or upload a pattern to apply to the characters</p>
          </div>
        </div>

        <div className="p-5 rounded-[24px] border border-indigo-100 bg-indigo-50/10 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-indigo-600 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              Uniform Mode
            </span>
            <button
              type="button"
              onClick={() => {
                setField('premiumUniformColor', '#f1f5f9');
                setField('premiumUniformTextureUrl', '');
                setField('premiumUniformFileName', '');
                showToast('Uniform customization reset.', 'info');
              }}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-wider transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Uniform Color Picker */}
          <div className="space-y-2">
            <FieldLabel label="Uniform Base Color" hint="Extracted by AI or custom selected" />
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={design.premiumUniformColor || '#f1f5f9'}
                onChange={(e) => setField('premiumUniformColor', e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
              />
              <input
                type="text"
                value={design.premiumUniformColor || ''}
                onChange={(e) => setField('premiumUniformColor', e.target.value)}
                placeholder="#f1f5f9"
                className="flex-1 rounded-xl border border-slate-200 bg-[#f8faff] px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#5d5fef] uppercase"
              />
            </div>
          </div>

          {/* Uniform Image Uploader */}
          <div className="space-y-2">
            <FieldLabel label="Uniform Pattern / Fabric" hint="Upload pattern to apply to character's shirt" />
            
            <div className="space-y-3">
              <DropzoneField
                label="Upload Uniform Image"
                hint="PNG, JPG, or WEBP — Instantly apply pattern to 3D characters"
                accept=".png,.jpg,.jpeg,.webp"
                fileName={design.premiumUniformFileName || 'No file selected'}
                onFileSelect={handleUniformUpload}
              />

                {design.premiumUniformFileName && (
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 min-w-0">
                      {design.premiumUniformTextureUrl && (
                        <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                          <img src={design.premiumUniformTextureUrl} className="w-full h-full object-cover" alt="" />
                        </div>
                      )}
                      <span className="text-[11px] font-bold text-slate-600 truncate">{design.premiumUniformFileName}</span>
                    </div>
                      <button
                      type="button"
                      onClick={() => {
                        setField('premiumUniformTextureUrl', '');
                        setField('premiumUniformFileName', '');

                      }}
                      className="text-[10px] font-black text-red-400 hover:text-red-600 transition-colors uppercase tracking-wider"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>,

    <div key="strap-design-entry" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-indigo-50 border border-indigo-100 rounded-[28px] p-6 flex flex-col gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#5d5fef] text-white shadow-xl shadow-indigo-200">
          <Palette size={28} />
        </div>
        <div>
          <h3 className="text-[18px] font-black text-[#1a1a1a] tracking-tight">Professional Strap Designer</h3>
          <p className="text-[13px] text-slate-500 font-medium mt-1 leading-relaxed">
            Customize colors, patterns, and logos in our dedicated high-precision editor.
          </p>
        </div>
        <button 
          onClick={() => {
            // Trigger strap editor for center zone by default
            if (window.dispatchEvent) {
              window.dispatchEvent(new CustomEvent('open-strap-editor', { detail: { zone: 'center' } }));
            }
          }}
          className="w-full py-4 bg-[#5d5fef] hover:bg-[#4a4cd9] text-white rounded-[20px] font-black text-[14px] shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Palette size={18} />
          OPEN STRAP DESIGNER
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={() => {
            if (window.dispatchEvent) {
              window.dispatchEvent(new CustomEvent('open-strap-editor', { detail: { zone: 'center' } }));
            }
          }}
          className="w-full p-4 rounded-2xl border-2 border-[#eef2f6] bg-white flex items-center gap-4 text-left transition-all hover:border-[#5d5fef] hover:shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <ImagePlus size={20} />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-[#1a1a1a]">Graphics & Logos</div>
            <div className="text-[11px] text-[#919191]">Independent strap branding</div>
          </div>
        </button>
        <button 
          onClick={() => {
            if (window.dispatchEvent) {
              window.dispatchEvent(new CustomEvent('open-strap-editor', { detail: { zone: 'center' } }));
            }
          }}
          className="w-full p-4 rounded-2xl border-2 border-[#eef2f6] bg-white flex items-center gap-4 text-left transition-all hover:border-[#5d5fef] hover:shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <Palette size={20} />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-[#1a1a1a]">Color & Patterns</div>
            <div className="text-[11px] text-[#919191]">Surface textures & gradients</div>
          </div>
        </button>
        <button 
          onClick={() => {
            if (window.dispatchEvent) {
              window.dispatchEvent(new CustomEvent('open-strap-editor', { detail: { zone: 'center' } }));
            }
          }}
          className="w-full p-4 rounded-2xl border-2 border-[#eef2f6] bg-white flex items-center gap-4 text-left transition-all hover:border-[#5d5fef] hover:shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <Type size={20} />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-[#1a1a1a]">Typography</div>
            <div className="text-[11px] text-[#919191]">Custom text & font styles</div>
          </div>
        </button>
      </div>
    </div>,

    <div key="id-card" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => {
          window.dispatchEvent(new CustomEvent('navigate-to-cropping-hub'));
        }}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-2xl font-bold text-[13px] shadow-md shadow-blue-200/40 transition-all active:scale-[0.97] flex items-center justify-center gap-2 group"
      >
        <Crop size={16} className="group-hover:scale-110 transition-transform" />
        Open Customizer
        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Compact Hero Card */}
      <div className="relative overflow-hidden rounded-[24px] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60 p-5">
        {/* Decorative glow */}
        <div className="absolute -top-8 -right-8 w-28 h-28 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-violet-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5d5fef] to-[#7c3aed] text-white shadow-lg shadow-indigo-200/50">
            <CreditCard size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-black text-slate-900 tracking-tight leading-tight">ID Card Designer</h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
              100+ templates · Drag & drop · Custom branding
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => {
            if (window.dispatchEvent) {
              window.dispatchEvent(new CustomEvent('open-id-card-editor'));
            }
          }}
          className="relative z-10 w-full mt-4 py-2.5 bg-gradient-to-r from-[#5d5fef] to-[#7c3aed] hover:from-[#4a4cd9] hover:to-[#6d28d9] text-white rounded-full font-bold text-[12px] shadow-md shadow-indigo-200/40 transition-all active:scale-[0.97] flex items-center justify-center gap-2 group"
        >
          <CreditCard size={14} className="group-hover:scale-110 transition-transform" />
          Open Designer
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Compact Feature Badges */}
      <div className="flex gap-2">
        <button 
          onClick={() => {
            if (window.dispatchEvent) {
              window.dispatchEvent(new CustomEvent('open-id-card-editor'));
            }
          }}
          className="text-left w-full flex-1 flex items-center gap-2.5 p-3 rounded-2xl border border-[#eef2f6] bg-white hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
            <LayoutTemplate size={14} />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-slate-800 leading-tight">Templates</div>
            <div className="text-[9px] text-slate-400 leading-tight">Pro layouts</div>
          </div>
        </button>
        <button 
          onClick={() => {
            if (window.dispatchEvent) {
              window.dispatchEvent(new CustomEvent('open-id-card-editor'));
            }
          }}
          className="text-left w-full flex-1 flex items-center gap-2.5 p-3 rounded-2xl border border-[#eef2f6] bg-white hover:border-violet-300 hover:bg-violet-50/50 transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500 shrink-0">
            <Type size={14} />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-slate-800 leading-tight">Smart Fields</div>
            <div className="text-[9px] text-slate-400 leading-tight">Auto-mapped</div>
          </div>
        </button>
      </div>
    </div>,


    <div key="review-order" className="space-y-6">
      <div className="rounded-[28px] border-2 border-[#eef2f6] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-6 w-1 bg-[#5d5fef] rounded-full" />
          <h3 className="text-[16px] font-black text-[#1a1a1a]">Order Summary</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
             <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#5d5fef]">
                 <CheckCircle2 size={16} />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lanyard Style</p>
                 <p className="text-[12px] font-black text-slate-800">{design.lanyardStyle}</p>
               </div>
             </div>
             <span className="text-[11px] font-black text-[#5d5fef] uppercase tracking-tighter">Selected</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-50">
             <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#5d5fef]">
                 <Ruler size={16} />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dimensions</p>
                 <p className="text-[12px] font-black text-slate-800">{design.width} Width</p>
               </div>
             </div>
             <span className="text-[11px] font-black text-slate-400 uppercase">{design.width}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-50">
             <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#5d5fef]">
                 <Palette size={16} />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Color</p>
                 <p className="text-[12px] font-black text-slate-800">{design.pantone || 'Custom HEX'}</p>
               </div>
             </div>
             <div className="w-5 h-5 rounded-lg border border-slate-100 shadow-sm" style={{ backgroundColor: design.lanyardColor }} />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-50">
             <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#5d5fef]">
                 <Paperclip size={16} />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clip Attachment</p>
                 <p className="text-[12px] font-black text-slate-800">{design.clipType}</p>
               </div>
             </div>
             <span className="text-[11px] font-black text-slate-400 uppercase">{design.clipType}</span>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border-2 border-indigo-100 bg-indigo-50/30 p-6">
        <div className="flex items-center justify-between mb-6">
           <div className="text-[11px] font-black text-indigo-400 uppercase tracking-[2px]">Pricing Breakdown</div>
           <TrendingDown size={18} className="text-indigo-600" />
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-[13px] font-bold text-slate-600">
            <span>Price per unit ({design.quantity} units)</span>
            <span>{formatCurrency(pricing.pricePerUnit)}</span>
          </div>
          <div className="flex justify-between text-[13px] font-bold text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrency(pricing.subtotal)}</span>
          </div>
          <div className="flex justify-between text-[13px] font-bold text-slate-400">
            <span>GST (18%)</span>
            <span>{formatCurrency(pricing.tax)}</span>
          </div>
          <div className="h-[1px] bg-indigo-100 my-2" />
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[11px] font-black text-indigo-400 uppercase tracking-wider">Total Amount</p>
              <p className="text-[28px] font-black text-indigo-600 leading-tight">{formatCurrency(pricing.total)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold italic">Inclusive of all taxes</p>
            </div>
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full py-5 bg-[#5d5fef] hover:bg-[#4a4cd9] disabled:bg-slate-300 text-white rounded-[24px] font-black text-[18px] shadow-2xl shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <>
              PLACE ORDER NOW
              <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
            </>
          )}
        </button>
      </div>

      <div className="p-6 rounded-[28px] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
            <ShieldCheck size={120} />
         </div>
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
               <Shield size={16} className="text-[#5d5fef]" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Checkout</span>
            </div>
            <h4 className="text-[18px] font-black mb-2 tracking-tight">100% Satisfaction Guarantee</h4>
            <p className="text-[12px] text-slate-400 font-medium leading-relaxed mb-6">
               Your design will be manually reviewed by our professional artists to ensure perfect alignment and color accuracy before production.
            </p>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5d5fef]" />
                  <span className="text-[10px] font-black uppercase tracking-tight">SSL SECURED</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5d5fef]" />
                  <span className="text-[10px] font-black uppercase tracking-tight">PRO REVIEW</span>
               </div>
            </div>
         </div>
      </div>
    </div>,
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 0) {
        // From Step 0, direct to designer
        setCurrentStep(1);
        window.dispatchEvent(new CustomEvent('open-strap-editor', { 
          detail: { zone: 'center', autoNext: true } 
        }));
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex h-full bg-[#f4f7fa] overflow-hidden relative border-r border-slate-100 p-4 gap-4">
      {/* ── Left Vertical Sidebar Tabs (Inspired by Reference) ────────────────────────── */}
      <div className="w-[85px] flex flex-col bg-white shrink-0 z-20 relative rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden">
        {/* Quick Actions Top */}
        <div className="p-4 flex flex-col gap-3 border-b border-slate-50">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('navigate-dashboard'))}
            className="w-full aspect-square rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#5d5fef] hover:bg-indigo-50 transition-all group"
            title="Back to Dashboard"
          >
            <ChevronLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="flex-1 flex flex-col py-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;

            const handleTabClick = (index) => {
              setCurrentStep(index);
              if (index === 1) {
                // Trigger strap editor with auto-next
                window.dispatchEvent(new CustomEvent('open-strap-editor', { 
                  detail: { zone: 'center', autoNext: true } 
                }));
              }
            };

            return (
              <div key={idx} className="flex flex-col">
                <button
                  onClick={() => handleTabClick(idx)}
                  className={`flex flex-col items-center justify-center py-6 gap-2 transition-all relative group ${
                    isActive ? 'text-[#5d5fef]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {/* Selection Indicator Pill (Left side as per typical UI or Right as per previous) */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute left-0 top-4 bottom-4 w-1 bg-[#5d5fef] rounded-r-full shadow-[2px_0_8px_rgba(93,95,239,0.3)]"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  </div>

                  <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-[#5d5fef]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}>
                    {idx === 0 ? 'Edit' : idx === 1 ? 'Design' : idx === 2 ? 'Card' : 'Order'}
                  </span>
                  
                  {isCompleted && !isActive && (
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                  )}
                </button>
                
                {/* Reference-style subtle divider */}
                {idx < steps.length - 1 && (
                  <div className="mx-6 h-[1px] bg-slate-50" />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Save Action Bottom */}
        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('save-project'))}
            className="w-full aspect-square rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all group"
            title="Save Project"
          >
            <Save size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform mb-1" />
            <span className="text-[9px] font-black uppercase tracking-tighter group-hover:text-emerald-600">Save</span>
          </button>
        </div>
      </div>

      {/* ── Main Content Area (Expanded View) ────────────────────────── */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-white/50">
        <div className="flex-1 overflow-y-auto panel-scroll custom-scrollbar px-8 py-10">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-10"
              >
                {/* Dynamic Header */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-[#5d5fef] rounded-full" />
                    <h2 className="text-[18px] font-black text-slate-800 tracking-tight leading-none">
                      {steps[currentStep].title}
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium ml-3">
                    {steps[currentStep].subtitle}
                  </p>
                </div>

                {/* Step Content */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                  {content[currentStep]}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="px-8 py-4 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-between z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
          <div className="w-[80px] flex justify-start">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              title="Previous"
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                currentStep === 0 
                  ? 'opacity-0 pointer-events-none' 
                  : 'text-slate-400 hover:text-[#5d5fef] hover:bg-slate-100 active:scale-95 border border-transparent'
              }`}
            >
              <ChevronLeft size={20} strokeWidth={3} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-4 bg-slate-50/50 py-2 rounded-full border border-slate-100/50">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentStep 
                    ? 'w-6 bg-[#5d5fef] shadow-[0_0_8px_rgba(93,95,239,0.4)]' 
                    : i < currentStep 
                      ? 'w-1.5 bg-emerald-400' 
                      : 'w-1.5 bg-slate-200'
                }`} 
              />
            ))}
          </div>

          <div className="w-[80px] flex justify-end">
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                title="Continue"
                className="group w-10 h-10 flex items-center justify-center bg-[#5d5fef] hover:bg-[#4a4cd9] text-white rounded-full transition-all active:scale-95"
              >
                <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <button
                onClick={onSubmit}
                title="Finish"
                className="flex items-center justify-center w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-all active:scale-95"
              >
                <CheckCircle2 size={18} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
