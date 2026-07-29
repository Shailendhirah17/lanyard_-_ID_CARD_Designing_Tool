import { useState } from 'react';
import { ArrowLeft, Save, Download, Undo, Redo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LeftSidebar from '../components/id-card-designer/LeftSidebar';
import CenterWorkspace from '../components/id-card-designer/CenterWorkspace';
import RightSidebar from '../components/id-card-designer/RightSidebar';
import { useIdCardDesignerStore } from '../store/useIdCardDesignerStore';

export default function IdCardDesigner() {
  const navigate = useNavigate();
  const { undo, redo, historyIndex, history } = useIdCardDesignerStore();

  const handleExport = () => {
    alert('Exporting feature coming soon');
  };

  const handleSave = () => {
    alert('Design saved!');
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 text-slate-800 overflow-hidden font-sans">
      {/* Top Header */}
      <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 shadow-xs">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">ID Card Designer</h1>
            <p className="text-xs text-slate-500 font-medium">Workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 mr-4 border-r border-slate-200 pr-5">
            <button 
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button 
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-xs transition-all"
          >
            <Save className="w-4 h-4 text-slate-500" />
            Save Draft
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 text-white transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <Download className="w-4 h-4" />
            Export Card
          </button>
        </div>
      </header>

      {/* Main Workspace 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        <LeftSidebar />
        <CenterWorkspace />
        <RightSidebar />
      </div>
    </div>
  );
}
