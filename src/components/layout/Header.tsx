import { Bell, User, LogOut } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-900">Panel</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={18} className="text-primary-600" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-500">{user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Çıkış Yap"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
