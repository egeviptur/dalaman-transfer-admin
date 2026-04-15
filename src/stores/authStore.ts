import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const DEMO_USER: User = {
  id: '1',
  name: 'Admin',
  email: 'admin@dalaman-transfer.tr',
  role: 'super_admin',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (username: string, password: string) => {
        if (username === 'admin' && password === 'admin') {
          set({ isAuthenticated: true, user: DEMO_USER })
          return true
        }
        return false
      },
      logout: () => {
        set({ isAuthenticated: false, user: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
