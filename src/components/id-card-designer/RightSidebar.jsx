import { useState, useRef } from 'react';
import { 
  Settings2, Trash2, ArrowUpToLine, ArrowDownToLine, Copy, 
  UploadCloud, Crop, Sparkles, Image as ImageIcon, RefreshCw
} from 'lucide-react';
import { useIdCardDesignerStore } from '../../store/useIdCardDesignerStore';
import ImageCropModal from './ImageCropModal';

export default function RightSidebar() {
  const { 
    activeSide, 
    frontElements, 
    backElements, 
    selectedId, 
    updateElement, 
    removeElement,
    bringForward,
    sendBackward,
    addElement,
    cardSettings,
    updateCardSettings,
    addUploadedImage
  } = useIdCardDesignerStore();

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropModalSrc, setCropModalSrc] = useState(null);
  const [cropShapeType, setCropShapeType] = useState(null);
  const cropCallbackRef = useRef(null);
  const shapeFileInputRef = useRef(null);
  const imageFileInputRef = useRef(null);

  const elements = activeSide === 'front' ? frontElements : backElements;
  const selectedElement = elements.find(el => el.id === selectedId);

  const handleDuplicate = () => {
    if (!selectedElement) return;
    const newElement = {
      ...selectedElement,
      id: `${selectedElement.type}_${Date.now()}`,
      x: selectedElement.x + 10,
      y: selectedElement.y + 10,
    };
    addElement(newElement);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    removeElement(selectedId);
  };

  const handleOpenCrop = (imageSrc, onComplete, st = null) => {
    setCropModalSrc(imageSrc);
    setCropShapeType(st);
    cropCallbackRef.current = onComplete;
    setCropModalOpen(true);
  };

  // Render properties based on element type
  const renderProperties = () => {
    if (!selectedElement) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Card & Frame Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Orientation</label>
                <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <button 
                    onClick={() => updateCardSettings({ orientation: 'portrait', width: 54, height: 86 })}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${cardSettings.orientation === 'portrait' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Portrait
                  </button>
                  <button 
                    onClick={() => updateCardSettings({ orientation: 'landscape', width: 86, height: 54 })}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${cardSettings.orientation === 'landscape' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Landscape
                  </button>
                </div>
              </div>

              {/* Frame Border Customization */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="text-[11px] font-bold text-slate-800 block">Frame & Border Customization</span>
                
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Frame Border Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={cardSettings.borderColor || '#4f46e5'} onChange={(e) => updateCardSettings({ borderColor: e.target.value })} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer" />
                    <input type="text" value={cardSettings.borderColor || '#4f46e5'} onChange={(e) => updateCardSettings({ borderColor: e.target.value })} className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1 text-sm text-slate-800 uppercase focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-slate-600">Border Thickness</label>
                    <span className="text-xs font-mono font-bold text-indigo-600">{cardSettings.borderThickness || 0}px</span>
                  </div>
                  <input type="range" min="0" max="10" step="0.5" value={cardSettings.borderThickness || 0} onChange={(e) => updateCardSettings({ borderThickness: Number(e.target.value) })} className="w-full accent-indigo-600 cursor-pointer" />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Lanyard Slot Cutout</label>
                  <select value={cardSettings.slotType || 'oval'} onChange={(e) => updateCardSettings({ slotType: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium">
                    <option value="oval">Oval Slot (Standard Lanyard Clip)</option>
                    <option value="round">Single Round Hole (Swivel Hook)</option>
                    <option value="double">Double Dual Holes (Dual Clips)</option>
                    <option value="none">No Slot Hole</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Width (mm)</label>
                  <input type="number" value={cardSettings.width} onChange={(e) => updateCardSettings({ width: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Height (mm)</label>
                  <input type="number" value={cardSettings.height} onChange={(e) => updateCardSettings({ height: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Background Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={cardSettings.background} onChange={(e) => updateCardSettings({ background: e.target.value })} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer" />
                  <input type="text" value={cardSettings.background} onChange={(e) => updateCardSettings({ background: e.target.value })} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 uppercase focus:outline-none focus:border-indigo-500 focus:bg-white" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Material</label>
                <select value={cardSettings.material} onChange={(e) => updateCardSettings({ material: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white">
                  <option value="PVC">PVC (Standard)</option>
                  <option value="Matte">Matte Finish</option>
                  <option value="Glossy">Glossy Finish</option>
                  <option value="Transparent">Transparent</option>
                  <option value="Metal">Metal Finish</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Corner Radius</label>
                <input type="range" min="0" max="30" value={cardSettings.roundedCorners} onChange={(e) => updateCardSettings({ roundedCorners: Number(e.target.value) })} className="w-full accent-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200">
          <div className="flex items-center gap-1">
            <button onClick={() => bringForward(selectedId)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors" title="Bring Forward">
              <ArrowUpToLine className="w-4 h-4" />
            </button>
            <button onClick={() => sendBackward(selectedId)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors" title="Send Backward">
              <ArrowDownToLine className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleDuplicate} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors" title="Duplicate">
              <Copy className="w-4 h-4" />
            </button>
            <button onClick={handleDelete} className="p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors" title="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SHAPE PROPERTIES + IMAGE INSIDE SHAPE MODULE */}
        {selectedElement.type === 'shape' && (
          <div className="space-y-4">
            {/* Image Inside Shape Section */}
            <div className="p-3.5 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 border border-indigo-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4 text-indigo-600" />
                  <span>Image Inside Shape Mask</span>
                </span>
                {selectedElement.imageSrc && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Filled</span>
                )}
              </div>

              {selectedElement.imageSrc ? (
                <div className="space-y-2">
                  <div className="w-full h-24 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center p-1 relative">
                    <img src={selectedElement.imageSrc} alt="Shape fill" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleOpenCrop(selectedElement.imageSrc, (croppedUrl) => updateElement(selectedId, { imageSrc: croppedUrl, imageZoom: 1, imageOffsetX: 0, imageOffsetY: 0 }), selectedElement.shapeType)}
                      className="flex-1 py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Crop className="w-3.5 h-3.5" />
                      <span>Crop Image</span>
                    </button>
                    <button
                      onClick={() => updateElement(selectedId, { imageSrc: null, imageZoom: 1, imageOffsetX: 0, imageOffsetY: 0 })}
                      className="py-1.5 px-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      title="Remove image from shape"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Fine-Tuning Image Fit & Position inside Shape */}
                  <div className="pt-2 border-t border-indigo-200/60 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Image Fit & Alignment</span>
                    
                    <div>
                      <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-0.5">
                        <span>Image Zoom</span>
                        <span className="font-mono font-bold text-indigo-600">{Math.round((selectedElement.imageZoom || 1) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.05"
                        value={selectedElement.imageZoom || 1}
                        onChange={(e) => updateElement(selectedId, { imageZoom: Number(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <div>
                        <label className="text-[10px] font-medium text-slate-600 block mb-0.5">Pan X</label>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          step="1"
                          value={selectedElement.imageOffsetX || 0}
                          onChange={(e) => updateElement(selectedId, { imageOffsetX: Number(e.target.value) })}
                          className="w-full accent-indigo-600 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-medium text-slate-600 block mb-0.5">Pan Y</label>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          step="1"
                          value={selectedElement.imageOffsetY || 0}
                          onChange={(e) => updateElement(selectedId, { imageOffsetY: Number(e.target.value) })}
                          className="w-full accent-indigo-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => updateElement(selectedId, { imageZoom: 1, imageOffsetX: 0, imageOffsetY: 0 })}
                      className="w-full py-1 text-[10px] font-bold text-indigo-600 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Reset Fit & Position
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => shapeFileInputRef.current?.click()}
                  className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Image into Shape</span>
                </button>
              )}

              <input
                ref={shapeFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const src = ev.target.result;
                    addUploadedImage({ url: src, name: file.name });
                    updateElement(selectedId, { imageSrc: src });
                  };
                  reader.readAsDataURL(file);
                  e.target.value = '';
                }}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Fill Color (Fallback)</label>
              <div className="flex items-center gap-2">
                <input type="color" value={selectedElement.fill || '#3b82f6'} onChange={(e) => updateElement(selectedId, { fill: e.target.value })} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer" />
                <input type="text" value={selectedElement.fill || '#3b82f6'} onChange={(e) => updateElement(selectedId, { fill: e.target.value })} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 uppercase focus:outline-none focus:border-indigo-500 focus:bg-white" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Shape Border Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={selectedElement.stroke || '#000000'} onChange={(e) => updateElement(selectedId, { stroke: e.target.value })} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer" />
                <input type="text" value={selectedElement.stroke || '#000000'} onChange={(e) => updateElement(selectedId, { stroke: e.target.value })} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 uppercase focus:outline-none focus:border-indigo-500 focus:bg-white" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-600">Border Thickness</label>
                <span className="text-xs font-mono font-bold text-indigo-600">{selectedElement.strokeWidth || 0}px</span>
              </div>
              <input type="range" min="0" max="20" step="1" value={selectedElement.strokeWidth || 0} onChange={(e) => updateElement(selectedId, { strokeWidth: Number(e.target.value) })} className="w-full accent-indigo-600 cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-600">Opacity</label>
                <span className="text-xs font-mono font-bold text-indigo-600">{Math.round((selectedElement.opacity || 1) * 100)}%</span>
              </div>
              <input type="range" min="0" max="1" step="0.05" value={selectedElement.opacity || 1} onChange={(e) => updateElement(selectedId, { opacity: Number(e.target.value) })} className="w-full accent-indigo-600 cursor-pointer" />
            </div>
          </div>
        )}

        {/* IMAGE ELEMENT PROPERTIES */}
        {selectedElement.type === 'image' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Image Customization</span>
              
              <div className="w-full h-28 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center p-1">
                <img src={selectedElement.src || selectedElement.url} alt="Element" className="max-h-full max-w-full object-contain" />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenCrop(selectedElement.src || selectedElement.url, (croppedUrl) => updateElement(selectedId, { src: croppedUrl }))}
                  className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Crop className="w-4 h-4" />
                  <span>Crop Image</span>
                </button>
                
                <button
                  onClick={() => imageFileInputRef.current?.click()}
                  className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  title="Replace image"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <input
                ref={imageFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const src = ev.target.result;
                    addUploadedImage({ url: src, name: file.name });
                    updateElement(selectedId, { src });
                  };
                  reader.readAsDataURL(file);
                  e.target.value = '';
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Width (px)</label>
                <input type="number" value={Math.round(selectedElement.width || 80)} onChange={(e) => updateElement(selectedId, { width: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Height (px)</label>
                <input type="number" value={Math.round(selectedElement.height || 80)} onChange={(e) => updateElement(selectedId, { height: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-600">Corner Radius</label>
                <span className="text-xs font-mono font-bold text-indigo-600">{selectedElement.cornerRadius || 0}px</span>
              </div>
              <input type="range" min="0" max="50" step="1" value={selectedElement.cornerRadius || 0} onChange={(e) => updateElement(selectedId, { cornerRadius: Number(e.target.value) })} className="w-full accent-indigo-600 cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-600">Opacity</label>
                <span className="text-xs font-mono font-bold text-indigo-600">{Math.round((selectedElement.opacity || 1) * 100)}%</span>
              </div>
              <input type="range" min="0" max="1" step="0.05" value={selectedElement.opacity || 1} onChange={(e) => updateElement(selectedId, { opacity: Number(e.target.value) })} className="w-full accent-indigo-600 cursor-pointer" />
            </div>
          </div>
        )}

        {selectedElement.type === 'qrcode' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">QR Value / URL</label>
              <input type="text" value={selectedElement.qrValue} onChange={(e) => updateElement(selectedId, { qrValue: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Foreground Color</label>
              <input type="color" value={selectedElement.fill} onChange={(e) => updateElement(selectedId, { fill: e.target.value })} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer block" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Background Color</label>
              <input type="color" value={selectedElement.background} onChange={(e) => updateElement(selectedId, { background: e.target.value })} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer block" />
            </div>
          </div>
        )}

      </div>
    );
  };

  if (selectedElement && selectedElement.type === 'text') {
    return null;
  }

  return (
    <div className="w-[300px] shrink-0 bg-white border-l border-slate-200 p-5 overflow-y-auto custom-scrollbar z-10 text-slate-800">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
        <Settings2 className="w-5 h-5 text-indigo-600" />
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Properties</h2>
      </div>
      
      {renderProperties()}

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={cropModalSrc}
        shapeType={cropShapeType}
        onClose={() => setCropModalOpen(false)}
        onCropComplete={(croppedUrl) => {
          if (cropCallbackRef.current) {
            cropCallbackRef.current(croppedUrl);
          }
        }}
      />
    </div>
  );
}
