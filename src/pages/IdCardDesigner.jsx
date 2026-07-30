import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Download, Undo, Redo } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LeftSidebar from '../components/id-card-designer/LeftSidebar';
import CenterWorkspace from '../components/id-card-designer/CenterWorkspace';
import RightSidebar from '../components/id-card-designer/RightSidebar';
import { useIdCardDesignerStore } from '../store/useIdCardDesignerStore';

export default function IdCardDesigner() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { undo, redo, historyIndex, history, clearCanvas } = useIdCardDesignerStore();

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'blank') {
      clearCanvas();
      const timer = setTimeout(() => {
        useIdCardDesignerStore.getState().clearCanvas();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams, clearCanvas]);

  const handleExport = () => {
    alert('Exporting feature coming soon');
  };

  const handleSave = () => {
    alert('Design saved!');
  };

  return (
    <div className="flex-1 flex bg-slate-50 text-slate-800 overflow-hidden font-sans relative h-full">
      {/* Main Workspace 3-Panel Layout */}
      <LeftSidebar />
      <CenterWorkspace />
      <RightSidebar />
    </div>
  );
}
