import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Check, RotateCw, ZoomIn, ZoomOut, Crop, Move, 
  Maximize2, RefreshCw, Square, Circle, Smartphone, Image as ImageIcon, Sparkles
} from 'lucide-react';

const SHAPE_PATHS = {
  heart: "M 50 30 C 50 15, 20 10, 10 35 C 0 60, 40 80, 50 95 C 60 80, 100 60, 90 35 C 80 10, 50 15, 50 30 Z",
  shield: "M 10 10 L 90 10 L 90 50 C 90 75 50 95 50 95 C 50 95 10 75 10 50 Z",
  badge: "M 20 10 L 80 10 L 80 85 L 50 70 L 20 85 Z",
  arrow: "M 10 35 L 65 35 L 65 15 L 95 50 L 65 85 L 65 65 L 10 65 Z",
  speech: "M 10 10 L 90 10 Q 98 10 98 18 L 98 60 Q 98 68 90 68 L 40 68 L 20 88 L 25 68 L 10 68 Q 2 68 2 60 L 2 18 Q 2 10 10 10 Z",
  star: "M 50 5 L 63 35 L 95 38 L 71 60 L 78 92 L 50 75 L 22 92 L 29 60 L 5 38 L 37 35 Z",
  hexagon: "M 25 5 L 75 5 L 100 50 L 75 95 L 25 95 L 0 50 Z",
  triangle: "M 50 5 L 95 95 L 5 95 Z",
  diamond: "M 50 5 L 95 50 L 50 95 L 5 50 Z",
  pentagon: "M 50 5 L 95 38 L 78 95 L 22 95 L 5 38 Z",
  octagon: "M 30 5 L 70 5 L 95 30 L 95 70 L 70 95 L 30 95 L 5 70 L 5 30 Z",
};

export default function ImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  shapeType = null,
  initialAspect = '1:1',
}) {
  const [img, setImg] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(initialAspect);
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, width: 80, height: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropBoxStart, setCropBoxStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  useEffect(() => {
    if (!imageSrc) return;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      setImg(image);
      setZoom(1);
      setRotation(0);
      resetCropBox('1:1');
    };
    image.src = imageSrc;
  }, [imageSrc]);

  const resetCropBox = (aspectType = aspect) => {
    let w = 80;
    let h = 80;
    if (aspectType === '3:4') {
      w = 60;
      h = 80;
    } else if (aspectType === '4:3') {
      w = 80;
      h = 60;
    }
    setCropBox({
      x: (100 - w) / 2,
      y: (100 - h) / 2,
      width: w,
      height: h,
    });
  };

  const handleAspectChange = (newAspect) => {
    setAspect(newAspect);
    resetCropBox(newAspect);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setCropBoxStart({ x: cropBox.x, y: cropBox.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

    let newX = Math.max(0, Math.min(100 - cropBox.width, cropBoxStart.x + deltaX));
    let newY = Math.max(0, Math.min(100 - cropBox.height, cropBoxStart.y + deltaY));

    setCropBox(prev => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleApplyCrop = () => {
    if (!img) return;

    const outputCanvas = document.createElement('canvas');
    const ctx = outputCanvas.getContext('2d');

    const targetWidth = 600;
    const targetHeight = aspect === '3:4' ? 800 : aspect === '4:3' ? 450 : 600;

    outputCanvas.width = targetWidth;
    outputCanvas.height = targetHeight;

    const normX = cropBox.x / 100;
    const normY = cropBox.y / 100;
    const normW = cropBox.width / 100;
    const normH = cropBox.height / 100;

    const srcX = normX * img.width;
    const srcY = normY * img.height;
    const srcW = normW * img.width;
    const srcH = normH * img.height;

    // Fill clear / white canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    // Apply shape mask clipping
    if (shapeType && SHAPE_PATHS[shapeType]) {
      const pathData = SHAPE_PATHS[shapeType];
      const svgPath = new Path2D(pathData);
      ctx.save();
      ctx.scale(targetWidth / 100, targetHeight / 100);
      ctx.clip(svgPath);
      ctx.restore();
    } else if (shapeType === 'circle' || aspect === 'circle') {
      ctx.beginPath();
      ctx.arc(targetWidth / 2, targetHeight / 2, targetWidth / 2, 0, Math.PI * 2);
      ctx.clip();
    } else if (shapeType === 'rounded_rect') {
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(0, 0, targetWidth, targetHeight, 60);
        ctx.clip();
      }
    }

    ctx.save();
    ctx.translate(targetWidth / 2, targetHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate(-targetWidth / 2, -targetHeight / 2);

    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, targetWidth, targetHeight);
    ctx.restore();

    const croppedDataUrl = outputCanvas.toDataURL('image/png');
    onCropComplete(croppedDataUrl);
    onClose();
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-[100000] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Crop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Crop & Adjust Image</h3>
                {shapeType && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    {shapeType} Mask
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">Drag box to position photo inside mask</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Crop Area Canvas / Interactive Box */}
        <div className="p-6 bg-slate-950 flex flex-col items-center justify-center relative min-h-[340px] select-none overflow-hidden">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative max-w-[420px] max-h-[340px] w-full h-[320px] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900 border border-slate-800"
          >
            {img && (
              <img 
                src={imageSrc} 
                alt="Crop preview" 
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease',
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
                className="pointer-events-none"
              />
            )}

            {/* Dark Mask Overlay outside crop box */}
            <div 
              onMouseDown={handleMouseDown}
              className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
              style={{
                boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.65)`
              }}
            >
              {/* Crop Window with SVG Shape Mask Overlay */}
              <div 
                className={`absolute border-2 border-indigo-400 shadow-2xl transition-all overflow-hidden ${
                  shapeType === 'circle' || aspect === 'circle' ? 'rounded-full' : shapeType === 'rounded_rect' ? 'rounded-2xl' : 'rounded-lg'
                }`}
                style={{
                  left: `${cropBox.x}%`,
                  top: `${cropBox.y}%`,
                  width: `${cropBox.width}%`,
                  height: `${cropBox.height}%`,
                }}
              >
                {/* SVG Mask Outline for SVG paths (heart, shield, star, hexagon, etc.) */}
                {shapeType && SHAPE_PATHS[shapeType] && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md" viewBox="0 0 100 100">
                    <path
                      d={SHAPE_PATHS[shapeType]}
                      fill="rgba(99, 102, 241, 0.15)"
                      stroke="#818cf8"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                  </svg>
                )}

                {/* Grid Overlay Lines */}
                <div className="w-full h-full grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                  <div className="border-r border-b border-white/30" />
                  <div className="border-r border-b border-white/30" />
                  <div className="border-b border-white/30" />
                  <div className="border-r border-b border-white/30" />
                  <div className="border-r border-b border-white/30" />
                  <div className="border-b border-white/30" />
                  <div className="border-r border-white/30" />
                  <div className="border-r border-white/30" />
                  <div />
                </div>
                
                {/* Move Handle Hint */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity bg-indigo-500/20 backdrop-blur-xs">
                  <Move className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="p-5 bg-white space-y-4">
          {/* Aspect Ratio Buttons */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Aspect Ratio Presets</label>
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => handleAspectChange('1:1')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  aspect === '1:1' ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Square className="w-3.5 h-3.5" />
                <span>1:1 Square</span>
              </button>
              <button
                onClick={() => handleAspectChange('3:4')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  aspect === '3:4' ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>3:4 Photo</span>
              </button>
              <button
                onClick={() => handleAspectChange('4:3')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  aspect === '4:3' ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>4:3 Card</span>
              </button>
              <button
                onClick={() => handleAspectChange('circle')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  aspect === 'circle' ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Circle className="w-3.5 h-3.5" />
                <span>Circle</span>
              </button>
              <button
                onClick={() => handleAspectChange('free')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  aspect === 'free' ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Free Form</span>
              </button>
            </div>
          </div>

          {/* Zoom & Rotation */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                <span>Zoom Scale</span>
                <span className="font-mono font-bold text-indigo-600">{Math.round(zoom * 100)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <ZoomOut className="w-4 h-4 text-slate-400" />
                <input 
                  type="range" 
                  min="0.5" 
                  max="3" 
                  step="0.1" 
                  value={zoom} 
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <ZoomIn className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Rotate Image</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRotation(r => (r - 90) % 360)}
                  className="flex-1 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5 -scale-x-100" />
                  <span>-90°</span>
                </button>
                <button
                  onClick={() => setRotation(r => (r + 90) % 360)}
                  className="flex-1 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>+90°</span>
                </button>
                <button
                  onClick={() => { setZoom(1); setRotation(0); resetCropBox(); }}
                  className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Reset"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyCrop}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer transform hover:scale-[1.01] active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Apply Crop & Use Image</span>
          </button>
        </div>

      </div>
    </div>
  );
}
