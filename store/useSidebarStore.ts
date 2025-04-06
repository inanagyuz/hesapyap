import { create } from 'zustand';

interface SidebarState {
   width: number;
   setWidth: (width: number) => void;
}

export const useSidebarWidth = create<SidebarState>((set) => ({
   width: 0, // Başlangıç genişliği
   setWidth: (width) => set({ width }),
}));
