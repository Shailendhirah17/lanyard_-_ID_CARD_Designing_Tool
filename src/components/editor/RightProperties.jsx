import { useState } from 'react';
import {
  Move, RotateCcw, Maximize2, Layers, Clock, Trash2, Lock, Eye, EyeOff,
  ChevronDown, ChevronRight, Minus, Plus, Bold, Italic, Underline,
  AlignLeft, AlignCenter, AlignRight, Copy, Clipboard, X, GripVertical,
  SlidersHorizontal, LayoutGrid
} from 'lucide-react';
import AllViewsPanel from './AllViewsPanel';

// --- Slider Control ---
function Slider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-slate-400">{label}</span>
        <span className="text-[10px] font-mono text-slate-600">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange?.(Number(e.target.value))}
        className="w-full h-1 accent-indigo-600 cursor-pointer"
      />
    </div>
  );
}

// --- NumberInput ---
function NumberInput({ label, value, min, max, step = 1, unit = '', onChange }) {
  return (
    <div>
      <label className="text-[10px] font-medium text-slate-400 block mb-1">{label}</label>
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
        <button
          onClick={() => onChange?.(Math.max(min ?? -Infinity, (value || 0) - step))}
          className="px-2 py-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
        ><Minus size={10} /></button>
        <input
          type="number" value={value || 0} min={min} max={max} step={step}
          onChange={e => onChange?.(Number(e.target.value))}
          className="flex-1 text-center text-[11px] font-mono text-slate-700 border-0 outline-none bg-transparent w-0 min-w-0"
        />
        <button
          onClick={() => onChange?.(Math.min(max ?? Infinity, (value || 0) + step))}
          className="px-2 py-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
        ><Plus size={10} /></button>
      </div>
      {unit && <span className="text-[9px] text-slate-400 ml-1">{unit}</span>}
    </div>
  );
}

// --- Section heading ---
function Section({ label, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors"
      >
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        {open ? <ChevronDown size={11} className="text-slate-400" /> : <ChevronRight size={11} className="text-slate-400" />}
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

// --- Layer Item ---
function LayerItem({ layer, selected, onSelect, onToggleVisible, onDelete }) {
  return (
    <div
      onClick={() => onSelect?.(layer.id)}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer group transition-all ${
        selected ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-slate-50 border border-transparent'
      }`}
    >
      <GripVertical size={11} className="text-slate-300 shrink-0 cursor-grab" />
      <div className="w-5 h-5 rounded border border-slate-200 bg-slate-100 shrink-0 flex items-center justify-center text-[8px] font-bold text-slate-400">
        {layer.type?.[0]?.toUpperCase() || 'L'}
      </div>
      <span className="text-[11px] font-medium text-slate-700 flex-1 truncate">{layer.name || `Layer ${layer.id}`}</span>
      <button onClick={e => { e.stopPropagation(); onToggleVisible?.(layer.id); }}
        className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-slate-200 transition-all">
        {layer.visible !== false ? <Eye size={10} className="text-slate-500" /> : <EyeOff size={10} className="text-slate-400" />}
      </button>
      <button onClick={e => { e.stopPropagation(); onDelete?.(layer.id); }}
        className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-red-50 transition-all">
        <Trash2 size={10} className="text-red-400" />
      </button>
    </div>
  );
}

export default function RightProperties({
  projectType = 'lanyard',
  selectedElement,
  layers = [],
  history = [],
  onChangeElement,
  onSelectLayer,
  onToggleLayerVisible,
  onDeleteLayer,
  onHistoryRestore,
}) {
  const [tab, setTab] = useState('properties'); // 'properties' | 'layers' | 'history' | 'views'
  const [activeView, setActiveView] = useState('full-3d');

  const el = selectedElement;

  return (
    <div className="editor-right-panel w-64 bg-white border-l border-slate-200 flex flex-col h-full shrink-0">
      {/* Tab switcher */}
      <div className="flex border-b border-slate-100 shrink-0">
        {[
          { key: 'properties', label: 'Props', icon: SlidersHorizontal },
          { key: 'layers', label: 'Layers', icon: Layers },
          { key: 'views', label: 'Views', icon: LayoutGrid },
          { key: 'history', label: 'History', icon: Clock },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-all ${
              tab === key ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* Properties Tab */}
      {tab === 'properties' && (
        <div className="flex-1 overflow-y-auto panel-scroll">
          {!el ? (
            <div className="p-4 space-y-4">
              <div className="text-center py-2">
                <p className="text-[12px] font-bold text-slate-800 capitalize">{projectType.replace('-', ' ')} Settings</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Global project properties</p>
              </div>

              {projectType === 'lanyard' ? (
                <div className="space-y-3">
                  <Section label="Lanyard Strap">
                    <div>
                      <label className="text-[10px] font-medium text-slate-400 block mb-1">Left Strap Text</label>
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full text-[11px] border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                        onChange={e => {
                          const setField = useConfiguratorStore.getState().setField;
                          setField('customTextLeft', e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-slate-400 block mb-1">Center Text / Role</label>
                      <input
                        type="text"
                        placeholder="STAFF / VIP"
                        className="w-full text-[11px] border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                        onChange={e => {
                          const setField = useConfiguratorStore.getState().setField;
                          setField('customTextCenter', e.target.value);
                        }}
                      />
                    </div>
                  </Section>
                </div>
              ) : (
                <div className="space-y-3">
                  <Section label="ID Card Canvas">
                    <p className="text-[10px] text-slate-500">Standard CR-80 Size (85.6mm x 54mm)</p>
                  </Section>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Element header */}
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <p className="text-[12px] font-bold text-slate-800">{el.type?.charAt(0).toUpperCase() + el.type?.slice(1) || 'Element'}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{el.id?.slice(0, 12)}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors" title="Duplicate">
                    <Copy size={11} className="text-slate-500" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                    <Trash2 size={11} className="text-red-400" />
                  </button>
                </div>
              </div>

              <Section label="Transform">
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput label="X" value={Math.round(el.x || 0)} onChange={v => onChangeElement?.({ x: v })} />
                  <NumberInput label="Y" value={Math.round(el.y || 0)} onChange={v => onChangeElement?.({ y: v })} />
                  <NumberInput label="W" value={Math.round(el.width || el.w || 0)} min={1} onChange={v => onChangeElement?.({ width: v })} />
                  <NumberInput label="H" value={Math.round(el.height || el.h || 0)} min={1} onChange={v => onChangeElement?.({ height: v })} />
                </div>
                <Slider label="Rotation" value={Math.round(el.rotation || 0)} min={-180} max={180} unit="°" onChange={v => onChangeElement?.({ rotation: v })} />
                <Slider label="Opacity" value={Math.round((el.opacity ?? 1) * 100)} min={0} max={100} unit="%" onChange={v => onChangeElement?.({ opacity: v / 100 })} />
              </Section>

              <Section label="Appearance">
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-medium text-slate-400 block mb-1">Fill Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={el.fill || el.color || '#4f46e5'}
                        onChange={e => onChangeElement?.({ fill: e.target.value })}
                        className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                      />
                      <input type="text" value={el.fill || el.color || '#4f46e5'}
                        onChange={e => onChangeElement?.({ fill: e.target.value })}
                        className="flex-1 text-[11px] font-mono border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-400 block mb-1">Stroke Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={el.stroke || '#000000'}
                        onChange={e => onChangeElement?.({ stroke: e.target.value })}
                        className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                      />
                      <NumberInput label="" value={el.strokeWidth || 0} min={0} max={20} unit="px"
                        onChange={v => onChangeElement?.({ strokeWidth: v })} />
                    </div>
                  </div>
                  <Slider label="Corner Radius" value={el.cornerRadius || el.radius || 0} min={0} max={50} unit="px"
                    onChange={v => onChangeElement?.({ cornerRadius: v })} />
                </div>
              </Section>

              {(el.type === 'text' || el.text !== undefined) && (
                <Section label="Typography">
                  <div>
                    <label className="text-[10px] font-medium text-slate-400 block mb-1">Font Family</label>
                    <select value={el.fontFamily || 'Inter'}
                      onChange={e => onChangeElement?.({ fontFamily: e.target.value })}
                      className="w-full text-[12px] border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-400 bg-white"
                    >
                      {['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Open Sans', 'Lato', 'Arial'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <NumberInput label="Size" value={el.fontSize || 12} min={6} max={200} unit="px"
                      onChange={v => onChangeElement?.({ fontSize: v })} />
                    <NumberInput label="Line Height" value={el.lineHeight || 1.2} min={0.5} max={3} step={0.1}
                      onChange={v => onChangeElement?.({ lineHeight: v })} />
                  </div>
                  <div className="flex gap-1">
                    {[
                      { icon: Bold, prop: 'fontStyle', value: 'bold' },
                      { icon: Italic, prop: 'fontStyle', value: 'italic' },
                      { icon: Underline, prop: 'textDecoration', value: 'underline' },
                    ].map(({ icon: Icon, prop, value }) => (
                      <button key={value}
                        onClick={() => onChangeElement?.({ [prop]: el[prop] === value ? 'normal' : value })}
                        className={`flex-1 py-1.5 rounded-lg border transition-all ${
                          el[prop] === value ? 'bg-indigo-50 border-indigo-300 text-indigo-600' : 'border-slate-200 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <Icon size={12} className="mx-auto" />
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {[
                      { icon: AlignLeft, align: 'left' },
                      { icon: AlignCenter, align: 'center' },
                      { icon: AlignRight, align: 'right' },
                    ].map(({ icon: Icon, align }) => (
                      <button key={align}
                        onClick={() => onChangeElement?.({ align })}
                        className={`flex-1 py-1.5 rounded-lg border transition-all ${
                          (el.align || 'left') === align ? 'bg-indigo-50 border-indigo-300 text-indigo-600' : 'border-slate-200 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <Icon size={12} className="mx-auto" />
                      </button>
                    ))}
                  </div>
                </Section>
              )}
            </>
          )}
        </div>
      )}

      {/* Layers Tab */}
      {tab === 'layers' && (
        <div className="flex-1 overflow-y-auto panel-scroll">
          <div className="p-3 space-y-1">
            {layers.length === 0 ? (
              <div className="text-center py-8">
                <Layers size={24} className="text-slate-200 mx-auto mb-2" />
                <p className="text-[11px] text-slate-400">No layers yet</p>
                <p className="text-[10px] text-slate-300">Add elements to the canvas</p>
              </div>
            ) : (
              layers.map(layer => (
                <LayerItem key={layer.id} layer={layer}
                  selected={selectedElement?.id === layer.id}
                  onSelect={onSelectLayer}
                  onToggleVisible={onToggleLayerVisible}
                  onDelete={onDeleteLayer}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* History Tab */}
      {tab === 'history' && (
        <div className="flex-1 overflow-y-auto panel-scroll">
          <div className="p-3 space-y-1">
            {history.length === 0 ? (
              <div className="text-center py-8">
                <Clock size={24} className="text-slate-200 mx-auto mb-2" />
                <p className="text-[11px] text-slate-400">No history yet</p>
                <p className="text-[10px] text-slate-300">Your actions will be tracked here</p>
              </div>
            ) : (
              history.map((item, i) => (
                <button key={i} onClick={() => onHistoryRestore?.(i)}
                  className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors ${i === 0 ? 'font-semibold' : ''}`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                  <span className="text-[11px] text-slate-600 flex-1 truncate">{item.label || `Step ${history.length - i}`}</span>
                  <span className="text-[9px] text-slate-400 font-mono shrink-0">{item.time || '--:--'}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Views Tab */}
      {tab === 'views' && (
        <div className="flex-1 overflow-y-auto panel-scroll">
          <AllViewsPanel
            activeView={activeView}
            onSelectView={(key) => {
              setActiveView(key);
            }}
          />
          <div className="px-3 pb-4 space-y-2">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3 space-y-1.5">
              <p className="text-[9px] font-bold text-indigo-700 uppercase tracking-widest">Quick Guide</p>
              <p className="text-[10px] text-indigo-600 leading-relaxed">
                Click a view thumbnail to switch the active design view. Changes made in any view are reflected in all thumbnails in real time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

