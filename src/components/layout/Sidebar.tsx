import { useAppStore } from '../../stores/appStore'
import { cn } from '../../utils/cn'
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  FileText,
  Car,
  Users,
  Settings,
  BarChart3,
  Database,
  Menu,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  { id: 'dashboard', label: 'Ana Sayfa', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'calendar', label: 'Takvim', icon: Calendar, path: '/calendar' },
  { id: 'reservations', label: 'Rezervasyonlar', icon: ClipboardList, path: '/reservations' },
  { id: 'content', label: 'İçerik Yönetimi', icon: FileText, path: '/content' },
  { id: 'vehicles', label: 'Araç Yönetimi', icon: Car, path: '/vehicles' },
  { id: 'members', label: 'Üye Yönetimi', icon: Users, path: '/members' },
  { id: 'settings', label: 'Ayarlar', icon: Settings, path: '/settings' },
  { id: 'reports', label: 'Raporlar', icon: BarChart3, path: '/reports' },
  { id: 'backup', label: 'Yedek', icon: Database, path: '/backup' },
]

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md lg:hidden"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar-bg text-sidebar-text transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-700">
            <span className="text-xl font-bold text-white">Dalaman Transfer</span>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false)
                    }
                  }}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-active text-white'
                        : 'hover:bg-sidebar-hover'
                    )
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
            v1.0.0
          </div>
        </div>
      </aside>
    </>
  )
}
