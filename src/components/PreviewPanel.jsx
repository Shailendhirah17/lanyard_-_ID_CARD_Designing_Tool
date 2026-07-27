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
  Layers,
  User
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
    <div className="flex h-full flex-col bg-slate-900 overflow-hidden font-sans select-none">
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />

      {/* Top Professional Canvas Control Bar */}
      <div className="h-12 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 shrink-0 z-30">
        {/* Left: View Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setActivePreviewTab('lanyard')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activePreviewTab === 'lanyard' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutTemplate size={14} />
            <span>Lanyard</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePreviewTab('idcard')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activePreviewTab === 'idcard' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard size={14} />
            <span>ID Card</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePreviewTab('student')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activePreviewTab === 'student' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User size={14} />
            <span>Avatar Try-On</span>
          </button>
        </div>

        {/* Right: Viewport Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => useConfiguratorStore.getState().triggerViewReset()}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title="Reset 3D View"
          >
            <RotateCcw size={15} />
          </button>

          <div className="h-4 w-px bg-slate-800" />

          <button type="button" onClick={undo} disabled={!canUndo} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer">
            <Undo2 size={15} />
          </button>
          <button type="button" onClick={redo} disabled={!canRedo} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer">
            <Redo2 size={15} />
          </button>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-2 px-2">
            <ZoomIn size={14} className="text-indigo-400" />
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <ZoomOut size={14} className="text-slate-500" />
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all cursor-pointer ml-2"
            title="Full Screen Proof"
          >
            <Expand size={15} />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Viewport — Full Height */}
      <div 
        ref={containerRef}
        className="flex-1 w-full relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      >
        <ThreeDBackground className="w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {activePreviewTab === 'student' ? (
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4 overflow-y-auto">
                <StudentWearPreview lanyardColor={design.lanyardColor} idCardSize={design.idCard.size} />
              </div>
            ) : isIdCardStep && activePreviewTab === 'idcard' ? (
              <div className="relative z-10 w-full h-full flex items-center justify-center">
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
                      color: editingText.color, background: 'rgba(255, 255, 255, 0.9)', border: '2px solid #4f46e5', zIndex: 100,
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <LanyardStage stageRef={stageRef} zoom={zoom} currentStep={currentStep} onEditStrap={onEditStrap} />
              </div>
            )}
          </div>
        </ThreeDBackground>
      </div>

      {/* Fullscreen Review Modal */}
      {isExpanded && createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950 p-4">
          <div className="w-full h-full bg-slate-900 rounded-2xl flex flex-col overflow-hidden border border-slate-800">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-950 shrink-0">
              <div>
                <h3 className="text-base font-bold text-white">Full Screen Production Proof</h3>
                <p className="text-xs text-slate-400 font-medium">Scroll to Zoom · Drag to Pan Artwork Proof</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => { setFullZoom(1); setFullPan({x:0, y:0}); }} className="px-3 py-1.5 text-xs font-bold text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700">
                  Reset View
                </button>
                <button onClick={() => setIsExpanded(false)} className="p-2 bg-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div 
              className="flex-1 relative bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center" 
              onWheel={handleFullWheel} 
              onPointerDown={handleFullPointerDown} 
              onPointerMove={handleFullPointerMove} 
              onPointerUp={handleFullPointerUp} 
              onPointerLeave={handleFullPointerUp}
            >
              <div className="transition-transform duration-75 ease-out" style={{ transform: `translate(${fullPan.x}px, ${fullPan.y}px) scale(${fullZoom})` }}>
                <LanyardStage stageRef={null} zoom={1.3} currentStep={currentStep} />
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
