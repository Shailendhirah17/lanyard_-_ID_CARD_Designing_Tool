import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Text as KonvaText, Circle, Transformer, RegularPolygon, Star, Ring, Path, Ellipse, Line } from 'react-konva';
import { useIdCardDesignerStore } from '../../store/useIdCardDesignerStore';
import { ZoomIn, ZoomOut, Maximize, RotateCw, Copy, Expand } from 'lucide-react';

const MM_TO_PX = 3.7795275591; // 1 mm = 3.78px approx

function ElementRenderer({ element, isSelected, onSelect }) {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const commonProps = {
    onClick: () => onSelect(element.id),
    onTap: () => onSelect(element.id),
    ref: shapeRef,
    draggable: true,
    x: element.x,
    y: element.y,
    fill: element.fill,
    stroke: element.stroke || null,
    strokeWidth: element.strokeWidth || 0,
    opacity: element.opacity,
    onDragEnd: (e) => {
      useIdCardDesignerStore.getState().updateElement(element.id, {
        x: e.target.x(),
        y: e.target.y(),
      });
    },
    onTransformEnd: (e) => {
      const node = shapeRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      node.scaleX(1);
      node.scaleY(1);
      
      let newProps = {
        x: node.x(),
        y: node.y(),
        rotation: node.rotation(),
      };

      if (element.type === 'shape' || element.type === 'qrcode') {
        newProps.width = Math.max(5, node.width() * scaleX);
        newProps.height = Math.max(5, node.height() * scaleY);
      }
      if (element.type === 'text') {
        newProps.fontSize = Math.max(5, node.fontSize() * scaleX);
        newProps.width = Math.max(10, node.width() * scaleX);
      }
      
      useIdCardDesignerStore.getState().updateElement(element.id, newProps);
    }
  };

  let NodeComponent = null;

  if (element.type === 'text') {
    let fontStyle = 'normal';
    const isBold = element.isBold || element.fontWeight === 'bold' || element.fontWeight === '600';
    const isItalic = element.isItalic;
    
    if (isBold && isItalic) fontStyle = 'bold italic';
    else if (isBold) fontStyle = 'bold';
    else if (isItalic) fontStyle = 'italic';

    NodeComponent = (
      <KonvaText 
        {...commonProps} 
        text={element.text} 
        fontSize={element.fontSize} 
        fontFamily={element.fontFamily || 'Inter'}
        fontStyle={fontStyle}
        textDecoration={element.isUnderline ? 'underline' : ''}
        align={element.align || 'left'}
        width={element.width}
      />
    );
  } else if (element.type === 'shape') {
    const st = element.shapeType;
    const w = element.width || 50;
    const h = element.height || 50;
    const r = w / 2;

    if (st === 'rect') {
      NodeComponent = <Rect {...commonProps} width={w} height={h} />;
    } else if (st === 'rounded_rect') {
      NodeComponent = <Rect {...commonProps} width={w} height={h} cornerRadius={element.cornerRadius || 10} />;
    } else if (st === 'circle') {
      NodeComponent = <Circle {...commonProps} radius={r} offsetX={-r} offsetY={-r} />;
    } else if (st === 'ellipse') {
      NodeComponent = <Ellipse {...commonProps} radiusX={w / 2} radiusY={h / 2} offsetX={-w / 2} offsetY={-h / 2} />;
    } else if (st === 'triangle') {
      NodeComponent = <RegularPolygon {...commonProps} sides={3} radius={r} offsetX={-r} offsetY={-r} />;
    } else if (st === 'diamond') {
      NodeComponent = <RegularPolygon {...commonProps} sides={4} radius={r} rotation={45} offsetX={-r} offsetY={-r} />;
    } else if (st === 'pentagon') {
      NodeComponent = <RegularPolygon {...commonProps} sides={5} radius={r} offsetX={-r} offsetY={-r} />;
    } else if (st === 'hexagon') {
      NodeComponent = <RegularPolygon {...commonProps} sides={6} radius={r} offsetX={-r} offsetY={-r} />;
    } else if (st === 'octagon') {
      NodeComponent = <RegularPolygon {...commonProps} sides={8} radius={r} offsetX={-r} offsetY={-r} />;
    } else if (st === 'star') {
      NodeComponent = <Star {...commonProps} numPoints={5} innerRadius={r * 0.4} outerRadius={r} offsetX={-r} offsetY={-r} />;
    } else if (st === 'burst_star') {
      NodeComponent = <Star {...commonProps} numPoints={8} innerRadius={r * 0.6} outerRadius={r} offsetX={-r} offsetY={-r} />;
    } else if (st === 'ring') {
      NodeComponent = <Ring {...commonProps} innerRadius={r * 0.5} outerRadius={r} offsetX={-r} offsetY={-r} />;
    } else if (st === 'line') {
      NodeComponent = <Line {...commonProps} points={[0, h / 2, w, h / 2]} stroke={element.fill} strokeWidth={element.strokeWidth || 3} />;
    } else if (st === 'heart') {
      const scaleX = w / 100;
      const scaleY = h / 100;
      NodeComponent = <Path {...commonProps} data="M 50 30 C 50 15, 20 10, 10 35 C 0 60, 40 80, 50 95 C 60 80, 100 60, 90 35 C 80 10, 50 15, 50 30 Z" scaleX={scaleX} scaleY={scaleY} />;
    } else if (st === 'shield') {
      const scaleX = w / 100;
      const scaleY = h / 100;
      NodeComponent = <Path {...commonProps} data="M 10 10 L 90 10 L 90 50 C 90 75 50 95 50 95 C 50 95 10 75 10 50 Z" scaleX={scaleX} scaleY={scaleY} />;
    } else if (st === 'badge') {
      const scaleX = w / 100;
      const scaleY = h / 100;
      NodeComponent = <Path {...commonProps} data="M 20 10 L 80 10 L 80 85 L 50 70 L 20 85 Z" scaleX={scaleX} scaleY={scaleY} />;
    } else if (st === 'arrow') {
      const scaleX = w / 100;
      const scaleY = h / 100;
      NodeComponent = <Path {...commonProps} data="M 10 35 L 65 35 L 65 15 L 95 50 L 65 85 L 65 65 L 10 65 Z" scaleX={scaleX} scaleY={scaleY} />;
    } else if (st === 'speech') {
      const scaleX = w / 100;
      const scaleY = h / 100;
      NodeComponent = <Path {...commonProps} data="M 10 10 L 90 10 Q 98 10 98 18 L 98 60 Q 98 68 90 68 L 40 68 L 20 88 L 25 68 L 10 68 Q 2 68 2 60 L 2 18 Q 2 10 10 10 Z" scaleX={scaleX} scaleY={scaleY} />;
    } else {
      NodeComponent = <Rect {...commonProps} width={w} height={h} />;
    }
  } else if (element.type === 'qrcode') {
    NodeComponent = (
      <Rect {...commonProps} width={element.width} height={element.height} fill={element.background} stroke={element.fill} strokeWidth={2} />
    );
  }

  return (
    <>
      {NodeComponent}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

export default function CenterWorkspace() {
  const { 
    activeSide, 
    setActiveSide, 
    flipCard,
    copyFrontToBack,
    zoom, 
    setZoom, 
    cardSettings, 
    frontElements, 
    backElements, 
    selectedId, 
    selectElement 
  } = useIdCardDesignerStore();

  const containerRef = useRef(null);

  // Card dimensions in pixels
  const cardWidth = cardSettings.width * MM_TO_PX;
  const cardHeight = cardSettings.height * MM_TO_PX;

  const elements = activeSide === 'front' ? frontElements : backElements;

  const handleStageClick = (e) => {
    // Clicked on stage (empty area)
    if (e.target === e.target.getStage() || e.target.attrs.id === 'card-bg') {
      selectElement(null);
    }
  };

  const handleFitToScreen = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 100;
      const containerHeight = containerRef.current.clientHeight - 120;
      if (containerWidth > 0 && containerHeight > 0) {
        const scaleX = containerWidth / cardWidth;
        const scaleY = containerHeight / cardHeight;
        const fitZoom = Math.min(scaleX, scaleY);
        setZoom(Math.max(0.3, Math.min(2.5, Number(fitZoom.toFixed(2)))));
        return;
      }
    }
    setZoom(1);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="flex-1 bg-slate-100 relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Top Toolbar (Tabs & Zoom) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-white p-1.5 rounded-2xl border border-slate-200 z-10 shadow-md whitespace-nowrap shrink-0 max-w-max select-none">
        {/* Side Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 shrink-0">
          <button 
            onClick={() => setActiveSide('front')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeSide === 'front' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="whitespace-nowrap">Front Side</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold flex items-center justify-center leading-none ${activeSide === 'front' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
              {frontElements.length}
            </span>
          </button>
          
          <button 
            onClick={() => setActiveSide('back')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeSide === 'back' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="whitespace-nowrap">Back Side</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold flex items-center justify-center leading-none ${activeSide === 'back' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
              {backElements.length}
            </span>
          </button>
        </div>

        {/* Flip Action */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={flipCard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Flip Card (Toggle Front/Back)"
          >
            <RotateCw className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="whitespace-nowrap">Flip</span>
          </button>
        </div>
        
        <div className="w-px h-5 bg-slate-200 shrink-0 mx-0.5" />

        {/* Zoom & Full Size Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setZoom(Math.max(0.2, Number((zoom - 0.1).toFixed(2))))} className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors shrink-0 cursor-pointer" title="Zoom Out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-semibold w-11 text-center text-slate-700 whitespace-nowrap shrink-0">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(Math.min(3, Number((zoom + 0.1).toFixed(2))))} className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors shrink-0 cursor-pointer" title="Zoom In">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={handleFitToScreen} className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-700 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1" title="Fit Card to Screen Size">
            <Maximize className="w-3.5 h-3.5 text-indigo-600" />
            <span className="whitespace-nowrap">Full Size</span>
          </button>
          <button onClick={toggleFullScreen} className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors shrink-0 cursor-pointer" title="Toggle Window Fullscreen">
            <Expand className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-auto p-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        <div 
          className="shadow-2xl shadow-slate-400/50 transition-transform origin-center border border-slate-300/70 rounded-lg"
          style={{ transform: `scale(${zoom})` }}
        >
          <Stage 
            width={cardWidth} 
            height={cardHeight} 
            onMouseDown={handleStageClick}
            onTouchStart={handleStageClick}
            style={{ backgroundColor: cardSettings.background }}
          >
            <Layer>
              <Rect id="card-bg" width={cardWidth} height={cardHeight} fill={cardSettings.background} cornerRadius={cardSettings.roundedCorners} />
              
              {/* Render Elements */}
              {elements.map((el) => (
                <ElementRenderer 
                  key={el.id} 
                  element={el} 
                  isSelected={selectedId === el.id} 
                  onSelect={selectElement} 
                />
              ))}

              {/* Frame Border Overlay */}
              {cardSettings.borderThickness > 0 && (
                <Rect 
                  width={cardWidth} 
                  height={cardHeight} 
                  stroke={cardSettings.borderColor} 
                  strokeWidth={cardSettings.borderThickness * 2} 
                  cornerRadius={cardSettings.roundedCorners} 
                  listening={false} 
                />
              )}

              {/* Lanyard Attachment Slot Punch Holes */}
              {cardSettings.slotType === 'oval' && (
                <Rect 
                  x={cardWidth / 2 - 16} 
                  y={10} 
                  width={32} 
                  height={8} 
                  cornerRadius={4} 
                  fill={cardSettings.slotColor || '#e2e8f0'} 
                  stroke="#64748b" 
                  strokeWidth={1} 
                  listening={false} 
                />
              )}
              {cardSettings.slotType === 'round' && (
                <Circle 
                  x={cardWidth / 2} 
                  y={14} 
                  radius={7} 
                  fill={cardSettings.slotColor || '#e2e8f0'} 
                  stroke="#64748b" 
                  strokeWidth={1} 
                  listening={false} 
                />
              )}
              {cardSettings.slotType === 'double' && (
                <>
                  <Circle 
                    x={cardWidth / 2 - 24} 
                    y={14} 
                    radius={6} 
                    fill={cardSettings.slotColor || '#e2e8f0'} 
                    stroke="#64748b" 
                    strokeWidth={1} 
                    listening={false} 
                  />
                  <Circle 
                    x={cardWidth / 2 + 24} 
                    y={14} 
                    radius={6} 
                    fill={cardSettings.slotColor || '#e2e8f0'} 
                    stroke="#64748b" 
                    strokeWidth={1} 
                    listening={false} 
                  />
                </>
              )}
            </Layer>
          </Stage>
        </div>
      </div>
      
      {/* Bottom helper text */}
      <div className="absolute bottom-6 flex items-center gap-3 text-xs text-slate-500 font-semibold bg-white/90 backdrop-blur-xs px-4 py-1.5 rounded-full border border-slate-200 shadow-xs">
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${activeSide === 'front' ? 'bg-indigo-600' : 'bg-purple-600'}`} />
          Editing: <strong className="text-slate-800 uppercase">{activeSide} Side</strong> ({elements.length} elements)
        </span>
        <span className="text-slate-300">•</span>
        <span>Size: {cardSettings.width}x{cardSettings.height}mm</span>
      </div>
    </div>
  );
}
