import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  
  currentSite: string
  setCurrentSite: (site: string) => void
  
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Yeni: Açık menü durumu (accordion için)
  expandedMenu: string | null
  setExpandedMenu: (menuId: string | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      currentSite: 'dalaman',
      setCurrentSite: (site) => set({ currentSite: site }),
      
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      // Yeni: Accordion state
      expandedMenu: null,
      setExpandedMenu: (menuId) => set({ expandedMenu: menuId }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ 
        sidebarOpen: state.sidebarOpen, 
        currentSite: state.currentSite,
        expandedMenu: state.expandedMenu,
      }),
    }
  )
)
