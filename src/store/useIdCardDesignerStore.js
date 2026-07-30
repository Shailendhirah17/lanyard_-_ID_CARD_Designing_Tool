import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultCardSettings = {
  width: 54, // mm (CR80 standard size is 54x86 mm)
  height: 86, // mm
  orientation: 'portrait', // 'portrait' | 'landscape'
  background: '#ffffff',
  material: 'PVC', // 'PVC' | 'Matte' | 'Glossy' | 'Transparent' | 'Metal'
  borderThickness: 0,
  borderColor: '#e2e8f0',
  roundedCorners: 12,
  frameStyle: 'none',
  slotType: 'oval',
  slotColor: '#cbd5e1',
};

const initialState = {
  frontElements: [],
  backElements: [],
  selectedId: null,
  activeSide: 'front', // 'front' | 'back'
  cardSettings: { ...defaultCardSettings },
  zoom: 1,
  history: [],
  historyIndex: -1,
  uploadedImages: [],
};

const safeStorage = {
  getItem: (name) => {
    try {
      const str = localStorage.getItem(name);
      return str ? JSON.parse(str) : null;
    } catch (e) {
      console.warn('[Zustand Storage] Failed to read item:', e);
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (e) {
      console.warn('[Zustand Storage] QuotaExceededError handled gracefully:', e);
      try {
        const payload = typeof value === 'string' ? JSON.parse(value) : value;
        if (payload?.state?.uploadedImages) {
          payload.state.uploadedImages = payload.state.uploadedImages.slice(0, 3);
        }
        localStorage.setItem(name, JSON.stringify(payload));
      } catch (err) {
        console.error('[Zustand Storage] Storage fallback reached:', err);
      }
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch (e) {
      console.warn('[Zustand Storage] Failed to remove item:', e);
    }
  },
};

export const useIdCardDesignerStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Uploaded Images Gallery Actions
      addUploadedImage: (img) => set((state) => ({
        uploadedImages: [
          {
            id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            url: img.url,
            name: img.name || 'Uploaded Image',
            uploadedAt: Date.now(),
          },
          ...(state.uploadedImages || []).slice(0, 15), // keep max 15 gallery items
        ],
      })),

      removeUploadedImage: (id) => set((state) => ({
        uploadedImages: (state.uploadedImages || []).filter((img) => img.id !== id),
      })),

      // Actions
      setActiveSide: (side) => set({ activeSide: side, selectedId: null }),
      
      flipCard: () => set((state) => ({
        activeSide: state.activeSide === 'front' ? 'back' : 'front',
        selectedId: null
      })),

      copyFrontToBack: () => set((state) => {
        const copied = (state.frontElements || []).map(el => ({
          ...el,
          id: `${el.id}_back_${Math.random().toString(36).substring(2, 7)}`
        }));
        const newState = { backElements: copied, activeSide: 'back', selectedId: null };
        get().saveHistory(newState);
        return newState;
      }),
      
      setZoom: (zoom) => set({ zoom }),
      
      selectElement: (id) => set({ selectedId: id }),
      
      updateCardSettings: (settings) => set((state) => {
        const newState = { cardSettings: { ...state.cardSettings, ...settings } };
        get().saveHistory(newState);
        return newState;
      }),

      addElement: (element) => set((state) => {
        const targetSide = state.activeSide === 'front' ? 'frontElements' : 'backElements';
        const newElements = [...(state[targetSide] || []), element];
        const newState = { [targetSide]: newElements, selectedId: element.id };
        get().saveHistory(newState);
        return newState;
      }),

      updateElement: (id, newProps) => set((state) => {
        const targetSide = state.activeSide === 'front' ? 'frontElements' : 'backElements';
        const newElements = (state[targetSide] || []).map((el) => (el.id === id ? { ...el, ...newProps } : el));
        const newState = { [targetSide]: newElements };
        get().saveHistory(newState);
        return newState;
      }),

      removeElement: (id) => set((state) => {
        const targetSide = state.activeSide === 'front' ? 'frontElements' : 'backElements';
        const newElements = (state[targetSide] || []).filter((el) => el.id !== id);
        const newState = { [targetSide]: newElements, selectedId: state.selectedId === id ? null : state.selectedId };
        get().saveHistory(newState);
        return newState;
      }),

      bringForward: (id) => set((state) => {
        const targetSide = state.activeSide === 'front' ? 'frontElements' : 'backElements';
        const elements = [...(state[targetSide] || [])];
        const index = elements.findIndex((el) => el.id === id);
        if (index < elements.length - 1) {
          const temp = elements[index];
          elements[index] = elements[index + 1];
          elements[index + 1] = temp;
          const newState = { [targetSide]: elements };
          get().saveHistory(newState);
          return newState;
        }
        return state;
      }),

      sendBackward: (id) => set((state) => {
        const targetSide = state.activeSide === 'front' ? 'frontElements' : 'backElements';
        const elements = [...(state[targetSide] || [])];
        const index = elements.findIndex((el) => el.id === id);
        if (index > 0) {
          const temp = elements[index];
          elements[index] = elements[index - 1];
          elements[index - 1] = temp;
          const newState = { [targetSide]: elements };
          get().saveHistory(newState);
          return newState;
        }
        return state;
      }),

      // History Management
      saveHistory: (newStatePartial) => set((state) => {
        const nextState = { ...state, ...newStatePartial };
        const snapshot = {
          frontElements: nextState.frontElements,
          backElements: nextState.backElements,
          cardSettings: nextState.cardSettings,
        };
        
        const newHistory = (state.history || []).slice(0, (state.historyIndex ?? -1) + 1);
        newHistory.push(snapshot);
        
        // Keep max 20 states in memory
        if (newHistory.length > 20) {
          newHistory.shift();
        }
        
        return {
          ...newStatePartial,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      }),

      undo: () => set((state) => {
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          const previousState = state.history[newIndex];
          return {
            ...previousState,
            historyIndex: newIndex,
            selectedId: null,
          };
        }
        return state;
      }),

      redo: () => set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1;
          const nextState = state.history[newIndex];
          return {
            ...nextState,
            historyIndex: newIndex,
            selectedId: null,
          };
        }
        return state;
      }),

      clearCanvas: () => set((state) => {
        try {
          localStorage.removeItem('id-card-designer-storage');
        } catch (e) {}

        const newState = {
          frontElements: [],
          backElements: [],
          selectedId: null,
          history: [],
          historyIndex: -1,
          cardSettings: {
            ...defaultCardSettings,
            background: '#ffffff',
            borderThickness: 0,
            borderColor: '#e2e8f0',
            frameStyle: 'none',
          },
        };
        return newState;
      }),
      
    }),
    {
      name: 'id-card-designer-storage',
      storage: safeStorage,
      partialize: (state) => ({
        frontElements: state.frontElements,
        backElements: state.backElements,
        cardSettings: state.cardSettings,
        uploadedImages: state.uploadedImages,
      }),
    }
  )
);
