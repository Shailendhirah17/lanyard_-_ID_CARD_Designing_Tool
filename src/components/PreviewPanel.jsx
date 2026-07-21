import { createPortal } from 'react-dom';
import {
  ChevronUp,
  ChevronDown,
  Expand,
  Undo2,
  Redo2,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Printer,
  RotateCcw,
  RotateCw,
  Save,
  X,
  CreditCard,
  LayoutTemplate,
  Move,
  MousePointer2,
  Layout,
  Box,
  Layers
} from 'lucide-react';

import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { useConfiguratorStore } from '../store/useConfiguratorStore';
import LanyardStage from './LanyardStage';
import IdCardPreview from './IdCardPreview';
import StudentWearPreview from './StudentWearPreview';
import ThreeDBackground from './ThreeDBackground';
import { Group, Layer, Stage } from 'react-konva';

function PreviewPanel({ stageRef, idCardStageRef, zoom, setZoom, currentStep, onEditStrap }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState('lanyard'); 
  const [isBlurred, setIsBlurred] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 700 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [currentStep, activePreviewTab]);
  
  const design = useConfiguratorStore((s) => s.design);
  const { size, showBothSides } = design.idCard;

  const isHorizontal = size === '100x70';
  const cardW = isHorizontal ? 283 : (size === '70x100' ? 198 : 153);
  const cardH = isHorizontal ? 198 : (size === '70x100' ? 283 : 244);
  const baseCardW = cardW;
  const baseCardH = cardH;

  // Expanded View zoom and pan
  const [fullZoom, setFullZoom] = useState(1);
  const [fullPan, setFullPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartInfo = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const handleFullWheel = (e) => {
    e.stopPropagation();
    const scaleBy = 1.05;
    const newZoom = e.deltaY > 0 ? fullZoom / scaleBy : fullZoom * scaleBy;
    setFullZoom(Math.min(Math.max(0.2, newZoom), 5));
  };

  const handleFullPointerDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartInfo.current = {
      x: e.clientX,
      y: e.clientY,
      px: fullPan.x,
      py: fullPan.y,
    };
  };

  const handleFullPointerMove = (e) => {
    if (!isDragging) return;
    setFullPan({
      x: dragStartInfo.current.px + (e.clientX - dragStartInfo.current.x),
      y: dragStartInfo.current.py + (e.clientY - dragStartInfo.current.y),
    });
  };

  const handleFullPointerUp = () => {
    setIsDragging(false);
  };

  const undo = useConfiguratorStore((state) => state.undo);
  const redo = useConfiguratorStore((state) => state.redo);
  const canUndo = useConfiguratorStore((state) => state.past.length > 0);
  const canRedo = useConfiguratorStore((state) => state.future.length > 0);

  const isReviewStep = currentStep === 3;
  const isIdCardStep = currentStep === 2 || isReviewStep;
  const idCardState = useConfiguratorStore((state) => state.design.idCard);

  // Editing functionality
  const [editingText, setEditingText] = useState(null);
  const [activeImageUpload, setActiveImageUpload] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !activeImageUpload) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const { id, sideName } = activeImageUpload;
      const side = sideName || useConfiguratorStore.getState().design.idCard.activeSide;
      const elements = useConfiguratorStore.getState().design.idCard[side].elements;
      const newElements = elements.map(el => el.id === id ? { ...el, src: dataUrl } : el);
      useConfiguratorStore.getState().setField(`idCard.${side}.elements`, newElements);
      setActiveImageUpload(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === 'PrintScreen' || 
        (e.ctrlKey && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S'))
      ) {
        e.preventDefault();
        // Removed intrusive alert
      }
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        const { selected, activeSide } = useConfiguratorStore.getState().design.idCard;
        if (selected) {
          const elements = useConfiguratorStore.getState().design.idCard[activeSide].elements;
          useConfiguratorStore.getState().setField(`idCard.${activeSide}.elements`, elements.filter(el => el.id !== selected));
          useConfiguratorStore.getState().setField('idCard.selected', null);
        }
      }
    };
    
    const handleFocus = () => setIsBlurred(false);
    const handleBlur = () => setIsBlurred(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    const handleContextMenu = (e) => { e.preventDefault(); };
    window.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const cardCount = idCardState.showBothSides ? 2 : 1;
  const gap = 40;
  
  const totalW = isHorizontal ? baseCardW : ((baseCardW * cardCount) + (gap * (cardCount - 1)));
  const totalH = (isHorizontal && idCardState.showBothSides) ? ((baseCardH * 2) + gap) : baseCardH;
  const cardScale = Math.min(Math.min(750 / totalW, 600 / totalH), 2.2); 
  
  const cx = (containerSize.width / zoom - totalW * cardScale) / 2;
  const cy = (containerSize.height / zoom - totalH * cardScale) / 2;

  useEffect(() => {
    if (isIdCardStep) setActivePreviewTab('idcard');
  }, [isIdCardStep]);

  return (
    <div className={`flex h-full flex-col ${isBlurred ? 'blur-md' : ''} transition-all duration-300 no-print`}>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
      
      <div 
        ref={containerRef}
        className="flex-1 min-h-[400px] md:min-h-[500px] lg:h-[700px] xl:h-full w-full rounded-[32px] bg-[#f0f2f5] relative overflow-hidden shrink-0 border border-[#eef2f6] shadow-sm select-none"
      >
        <ThreeDBackground className={isBlurred ? 'blur-sm grayscale opacity-50 transition-all duration-500' : 'transition-all duration-500'}>
          <div className={`absolute inset-0 flex items-center justify-center z-10`}>
            {isReviewStep ? (
              <div className="w-full h-full flex flex-col gap-6 overflow-y-auto p-4 bg-transparent panel-scroll relative z-10">
                <div className="flex-1 flex items-center justify-center min-h-[550px] relative">
                  <div className="absolute top-6 right-8 flex items-center justify-center z-20 group">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 hover:bg-black/10 backdrop-blur-md rounded-full border border-black/5 transition-all text-black/40 hover:text-indigo-600">
                      <span className="text-[10px] font-black uppercase tracking-widest">3D PROOF</span>
                      <RotateCw size={12} className="group-hover:rotate-180 transition-transform duration-700" />
                    </div>
                  </div>
                  <LanyardStage zoom={zoom} stageRef={stageRef} currentStep={currentStep} showIdCard={true} onEditStrap={onEditStrap} />
                  <StudentWearPreview lanyardColor={design.lanyardColor} idCardSize={design.idCard.size} />
                </div>
              </div>
            ) : isIdCardStep && activePreviewTab === 'idcard' ? (
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 z-40 bg-transparent pointer-events-none" onContextMenu={(e) => e.preventDefault()} />
                <Stage width={containerSize.width} height={containerSize.height} scaleX={zoom} scaleY={zoom} ref={idCardStageRef}>
                  <Layer>
                    <Group x={cx} y={cy} scaleX={cardScale} scaleY={cardScale}>
                      <IdCardPreview 
                        isReviewStep={isReviewStep}
                        onSelectElement={(id, sideName) => {
                          useConfiguratorStore.getState().setField('idCard.selected', id);
                          if (sideName) useConfiguratorStore.getState().setField('idCard.activeSide', sideName);
                        }}  
                        onUpdateElement={(id, pos, sideName) => {
                          const side = sideName || idCardState.activeSide;
                          const elements = idCardState[side].elements;
                          useConfiguratorStore.getState().setField(`idCard.${side}.elements`, elements.map(el => el.id === id ? { ...el, ...pos } : el));
                        }} 
                        onDblClickElement={(id, sideName, e) => {
                          const side = sideName || idCardState.activeSide;
                          const el = idCardState[side].elements.find(el => el.id === id);
                          if (!el) return;
                          if (el.type === 'text') {
                            const node = e.target;
                            const textPosition = node.absolutePosition();
                            const scaleY = node.getAbsoluteScale().y;
                            setEditingText({
                              id, side, value: el.content, fontStyle: el.fontStyle, color: el.fill, align: el.align || 'left',
                              fontSize: (el.fontSize || 12) * scaleY, x: textPosition.x, y: textPosition.y,
                              width: node.width() * node.getAbsoluteScale().x + 10, height: node.height() * scaleY + 10,
                            });
                          } else if (el.type === 'image') {
                            setActiveImageUpload({ id, sideName: side });
                            if (fileInputRef.current) fileInputRef.current.click();
                          }
                        }}
                      />
                    </Group>
                  </Layer>
                </Stage>
                {editingText && (
                  <textarea
                    value={editingText.value}
                    onChange={(e) => setEditingText({ ...editingText, value: e.target.value })}
                    onBlur={() => {
                      const elements = idCardState[editingText.side].elements;
                      useConfiguratorStore.getState().setField(`idCard.${editingText.side}.elements`, elements.map(el => el.id === editingText.id ? { ...el, content: editingText.value } : el));
                      setEditingText(null);
                    }}
                    autoFocus
                    style={{
                      position: 'absolute', top: editingText.y, left: editingText.x, width: editingText.width, height: editingText.height,
                      fontSize: editingText.fontSize, fontFamily: 'sans-serif', fontWeight: editingText.fontStyle?.includes('bold') ? 'bold' : 'normal',
                      color: editingText.color, background: 'rgba(255, 255, 255, 0.8)', border: '2px solid #5d5fef', zIndex: 100,
                    }}
                  />
                )}
              </div>
            ) : (
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="absolute top-6 right-8 flex items-center justify-center z-20 group">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 hover:bg-black/10 backdrop-blur-md rounded-full border border-black/5 transition-all text-black/40 hover:text-indigo-600">
                  <span className="text-[10px] font-black uppercase tracking-widest">3D</span>
                  <RotateCw size={12} className="group-hover:rotate-180 transition-transform duration-700" />
                </div>
              </div>
              <LanyardStage stageRef={stageRef} zoom={zoom} currentStep={currentStep} onEditStrap={onEditStrap} />
            </div>
            )}
          </div>
        </ThreeDBackground>

        {/* Floating Toggle Buttons (Lanyard / ID Card) */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          {isIdCardStep && !isExpanded && (
            <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-[#eef2f6] rounded-[14px] p-1 shadow-md pointer-events-auto">
              <button onClick={() => setActivePreviewTab('lanyard')} className={`flex items-center gap-2 px-3 py-1.5 rounded-[10px] text-[11px] font-bold ${activePreviewTab === 'lanyard' ? 'bg-[#5d5fef] text-white' : 'text-[#919191] hover:bg-[#f8faff]'}`}><LayoutTemplate size={14} /> Lanyard</button>
              <button onClick={() => setActivePreviewTab('idcard')} className={`flex items-center gap-2 px-3 py-1.5 rounded-[10px] text-[11px] font-bold ${activePreviewTab === 'idcard' ? 'bg-[#5d5fef] text-white' : 'text-[#919191] hover:bg-[#f8faff]'}`}><CreditCard size={14} /> ID Card</button>
            </div>
          )}

          {!isExpanded && (
            <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-auto">
              <div className="flex items-center bg-white/90 backdrop-blur-sm border border-[#eef2f6] rounded-[14px] p-1 shadow-md">

                <button 
                  type="button" 
                  onClick={() => useConfiguratorStore.getState().triggerViewReset()}
                  className={`p-1.5 rounded-[10px] transition-all flex items-center justify-center ${activePreviewTab === 'lanyard' ? 'text-[#5d5fef] hover:bg-[#5d5fef] hover:text-white' : 'text-slate-300 pointer-events-none'}`}
                  title="Reset 3D View"
                >
                  <RotateCcw size={14} />
                </button>
                <div className="w-[1px] h-4 bg-[#eef2f6] mx-1" />
                <button type="button" onClick={undo} disabled={!canUndo} className="p-1.5 rounded-[10px] text-[#1a1a1a] hover:bg-[#5d5fef] hover:text-white disabled:opacity-30 transition-all"><Undo2 size={14} /></button>
                <button type="button" onClick={redo} disabled={!canRedo} className="p-1.5 rounded-[10px] text-[#1a1a1a] hover:bg-[#5d5fef] hover:text-white disabled:opacity-30 transition-all"><Redo2 size={14} /></button>
                <div className="w-[1px] h-4 bg-[#eef2f6] mx-1" />
                <div className="flex items-center gap-2 px-2">
                  <ZoomIn size={14} className="text-[#5d5fef]" />
                  <input type="range" min="0.5" max="1.5" step="0.05" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-16 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5d5fef]" />
                  <ZoomOut size={14} className="text-[#919191]" />
                </div>
              </div>
              <button type="button" onClick={() => setIsExpanded(true)} className="p-2 bg-[#5d5fef] text-white rounded-[12px] shadow-md hover:bg-[#4a4cd9] transition-all flex items-center justify-center"><Expand size={16} /></button>
            </div>
          )}
          
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MousePointer2, label: 'Technical Accuracy', sub: 'Production Ready' },
          { icon: Move, label: 'Real-time Sync', sub: 'Instant updates' },
          { icon: CreditCard, label: 'Secured Design', sub: 'Protected Proof' },
        ].map((item, i) => (
          <div key={i} onClick={item.onClick} className="flex items-center gap-4 p-4 rounded-[24px] bg-[#f8faff] border border-[#eef2f6] hover:bg-white transition-all cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white text-[#5d5fef] shadow-sm"><item.icon size={18} /></div>
            <div><p className="text-[14px] font-bold text-[#1a1a1a]">{item.label}</p><p className="text-[12px] text-[#919191]">{item.sub}</p></div>
          </div>
        ))}
      </div>

      {isExpanded && createPortal(
        <div className={`fixed inset-0 z-[999999] flex items-center justify-center bg-[#0f172a] select-none p-4 ${isBlurred ? 'blur-2xl' : ''}`}>
          <div className="w-full h-full bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative border border-white/20">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md z-[100] shrink-0">
              <div className="flex flex-col"><h3 className="text-[20px] font-extrabold text-[#1a1a1a]">Production Proof Review</h3><p className="text-[13px] text-slate-500 font-medium">Technical verification · Scroll to Zoom, Drag to Pan</p></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1.5 shadow-sm">
                  <button onClick={() => setFullZoom(Math.max(0.2, fullZoom - 0.2))} className="p-2 text-slate-500 hover:text-indigo-600 rounded-xl"><ZoomOut size={18} /></button>
                  <span className="text-[13px] font-bold text-slate-700 w-16 text-center">{Math.round(fullZoom * 100)}%</span>
                  <button onClick={() => setFullZoom(Math.min(5, fullZoom + 0.2))} className="p-2 text-slate-500 hover:text-indigo-600 rounded-xl"><ZoomIn size={18} /></button>
                  <div className="w-[1px] h-6 bg-slate-200 mx-2"></div>
                  <button onClick={() => { setFullZoom(1); setFullPan({x:0, y:0}); useConfiguratorStore.getState().triggerViewReset(); }} className="px-4 py-2 text-[12px] font-bold text-slate-600 rounded-xl hover:bg-white transition-all">Reset</button>
                </div>
                <button onClick={() => setIsExpanded(false)} className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm"><X size={20} /></button>
              </div>
            </div>

            <div className="flex-1 relative bg-[#fafafa] overflow-hidden cursor-grab active:cursor-grabbing" onWheel={handleFullWheel} onPointerDown={handleFullPointerDown} onPointerMove={handleFullPointerMove} onPointerUp={handleFullPointerUp} onPointerLeave={handleFullPointerUp}>
              {/* Watermark removed as requested */}
              <div className="absolute inset-0 z-50 bg-transparent pointer-events-none" onContextMenu={(e) => e.preventDefault()} />
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out" style={{ transform: `translate(${fullPan.x}px, ${fullPan.y}px) scale(${fullZoom})` }}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-16 p-20 select-none">
                  <div className="bg-white rounded-[40px] border border-slate-100 p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"><LanyardStage stageRef={null} zoom={1.5} currentStep={currentStep} /></div>
                  {isIdCardStep && (
                    <div className="bg-white rounded-[40px] border border-slate-100 p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                      <Stage width={800} height={800} scaleX={1} scaleY={1}><Layer><Group x={(800 - (totalW * cardScale)) / 2} y={(800 - (totalH * cardScale)) / 2} scaleX={cardScale} scaleY={cardScale}><IdCardPreview isReviewStep={true} onSelectElement={() => {}} onUpdateElement={() => {}} /></Group></Layer></Stage>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

const PreviewPanelMemo = memo(PreviewPanel);
export default PreviewPanelMemo;
