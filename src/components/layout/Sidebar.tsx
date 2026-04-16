import { useAppStore } from '../../stores/appStore'
import { cn } from '../../utils/cn'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Car,
  Wallet,
  ClipboardList,
  FileText,
  Settings,
  BarChart3,
  Database,
  Building2,
  UserCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

// Alt menü öğesi tipi
interface SubMenuItem {
  id: string
  label: string
  path: string
  color?: 'red' | 'orange' | 'default'
}

// Ana menü öğesi tipi
interface MenuItem {
  id: string
  label: string
  icon: React.ElementType
  iconColor: string
  path?: string
  badge?: number
  children?: SubMenuItem[]
}

// Menü verileri
const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Ana Sayfa',
    icon: LayoutDashboard,
    iconColor: 'text-blue-500',
    path: '/dashboard',
  },
  {
    id: 'calendar',
    label: 'Takvim',
    icon: Calendar,
    iconColor: 'text-purple-500',
    path: '/calendar',
  },
  {
    id: 'customers',
    label: 'Müşteriler',
    icon: Users,
    iconColor: 'text-green-500',
    path: '/members',
  },
  {
    id: 'transfers',
    label: 'Transferler',
    icon: Car,
    iconColor: 'text-cyan-500',
    children: [
      { id: 'transfer-add', label: 'Rezervasyon Ekle', path: '/reservations' },
      { id: 'transfer-web', label: 'Web & Partner', path: '/reservations' },
      { id: 'transfer-locations', label: 'Konumlar', path: '/reservations' },
      { id: 'transfer-assignments', label: 'Atamalar', path: '/reservations' },
      { id: 'transfer-completed', label: 'Tamamlanan', path: '/reservations' },
      { id: 'transfer-cancelled', label: 'İptal Edilen', path: '/reservations' },
      { id: 'transfer-deleted', label: 'Silinen', path: '/reservations' },
      { id: 'transfer-flights', label: 'Uçuş Ekle Çıkarılmalar', path: '/reservations' },
      { id: 'transfer-partners', label: 'Partnerler', path: '/reservations' },
      { id: 'transfer-drivers', label: 'Şoförler', path: '/reservations' },
      { id: 'transfer-services', label: 'Ek Hizmetler', path: '/reservations' },
      { id: 'transfer-customers', label: 'Müşteriler', path: '/reservations' },
      { id: 'transfer-vehicles', label: 'Transfer Araçlar', path: '/vehicles' },
      { id: 'transfer-cars', label: 'Araçlar', path: '/vehicles' },
      { id: 'transfer-outbound', label: 'Dış Çıkışlı İşlemler', path: '/reservations' },
      { id: 'transfer-cities', label: 'Hizmet Verilen İller', path: '/reservations' },
      { id: 'transfer-routes', label: 'Hizmet Verilen Yollar', path: '/reservations' },
      { id: 'transfer-prices', label: 'Partner Fiyat Listesi', path: '/reservations' },
      { id: 'transfer-districts', label: 'Şehir / İlçe', path: '/reservations' },
      { id: 'transfer-branches', label: 'Şubeler', path: '/reservations' },
    ],
  },
  {
    id: 'accounting',
    label: 'Muhasebe',
    icon: Wallet,
    iconColor: 'text-emerald-500',
    children: [
      { id: 'acc-dayend', label: 'Gün Sonu', path: '/reports' },
      { id: 'acc-driver-status', label: 'Transfer Şoför Hesap Durumu', path: '/reports' },
      { id: 'acc-rental-status', label: 'Şoförlü Kiralama Şoför Hesap Durumu', path: '/reports' },
      { id: 'acc-transfer-moves', label: 'Transfer Hareketleri', path: '/reports' },
      { id: 'acc-rental-moves', label: 'Şoförlü Kiralama Hareketleri', path: '/reports' },
      { id: 'acc-rentacar-moves', label: 'Rent A Car Hareketleri', path: '/reports' },
      { id: 'acc-outbound-transfer', label: 'Dış Çekim Transfer Hareketleri', path: '/reports' },
      { id: 'acc-outbound-rental', label: 'Dış Çekim Şoförlü Kiralama Hareketleri', path: '/reports' },
      { id: 'acc-partner-transfer', label: 'Partner Transfer Hareketleri', path: '/reports' },
      { id: 'acc-partner-rental', label: 'Partner Şoförlü Kiralama Hareketleri', path: '/reports' },
      { id: 'acc-expense-cats', label: 'Gider Kategorileri', path: '/reports' },
      { id: 'acc-expenses', label: 'Giderler', path: '/reports' },
      { id: 'acc-pos-link', label: 'Pos Linki', path: '/reports' },
      { id: 'acc-pos-moves', label: 'Pos Hareketleri', path: '/reports' },
    ],
  },
  {
    id: 'reservations',
    label: 'Rezervasyon Yönetimi',
    icon: ClipboardList,
    iconColor: 'text-orange-500',
    badge: 1,
    children: [
      { id: 'res-pending', label: 'Bekleyen Rezervasyonlar', path: '/reservations', color: 'default' },
      { id: 'res-completed', label: 'Tamamlanan Rezervasyonlar', path: '/reservations' },
      { id: 'res-cancelled', label: 'İptal Edilen Rezervasyonlar', path: '/reservations' },
    ],
  },
  {
    id: 'content',
    label: 'İçerik Yönetimi',
    icon: FileText,
    iconColor: 'text-pink-500',
    children: [
      { id: 'content-popular', label: 'Popüler', path: '/content' },
      { id: 'content-banner', label: 'Banner', path: '/content' },
      { id: 'content-homepage', label: 'Anasayfa', path: '/content' },
      { id: 'content-rental', label: 'Araç Kiralama', path: '/content' },
      { id: 'content-rental-round', label: 'Araç Kiralama Gidiş Dönüş', path: '/content' },
      { id: 'content-faq', label: 'Sıkça Sorulan', path: '/content' },
      { id: 'content-custom', label: 'Custom Menu', path: '/content' },
      { id: 'content-prices', label: 'Fiyat Listesi', path: '/content' },
      { id: 'content-hotel', label: 'Otel Transferleri', path: '/content' },
      { id: 'content-hotel-round', label: 'Otel Transferleri Gidiş Dönüş', path: '/content' },
      { id: 'content-regions', label: 'Bölge Sayfaları', path: '/content' },
      { id: 'content-contact', label: 'İletişim', path: '/content' },
      { id: 'content-blog', label: 'Bloglar', path: '/content' },
      { id: 'content-categories', label: 'Kategoriler', path: '/content' },
      { id: 'content-reviews', label: 'Yorumlar', path: '/content' },
      { id: 'content-team', label: 'Ekibimiz', path: '/content' },
      { id: 'content-faq-content', label: 'Sıkça Sorulan Sorular', path: '/content' },
      { id: 'content-team-create', label: 'Ekibimiz İçerik Oluştur', path: '/content' },
      { id: 'content-about-create', label: 'Hakkımızda İçerik Oluştur', path: '/content' },
      { id: 'content-delivery-create', label: 'Teslimat Noktaları Oluşturma', path: '/content' },
      { id: 'content-delivery', label: 'Teslimat Noktaları', path: '/content' },
      { id: 'content-privacy', label: 'Gizlilik ve Güvenlik', path: '/content' },
    ],
  },
  {
    id: 'vehicles',
    label: 'Araç Yönetimi',
    icon: Car,
    iconColor: 'text-indigo-500',
    children: [
      { id: 'vehicle-brands', label: 'Markalar', path: '/vehicles' },
      { id: 'vehicle-features', label: 'Özellikler', path: '/vehicles' },
      { id: 'vehicle-list', label: 'Araçlar', path: '/vehicles' },
      { id: 'vehicle-services', label: 'Ek Hizmetler', path: '/vehicles', color: 'red' },
      { id: 'vehicle-showcase', label: 'Vitrin Araçları', path: '/vehicles', color: 'red' },
      { id: 'vehicle-cities', label: 'Hizmet Verilen İller', path: '/vehicles', color: 'red' },
      { id: 'vehicle-routes', label: 'Ücretli Yönler', path: '/vehicles' },
    ],
  },
  {
    id: 'members',
    label: 'Üye Yönetimi',
    icon: UserCircle,
    iconColor: 'text-teal-500',
    children: [
      { id: 'members-newsletter', label: 'E-Bülten Üyeleri', path: '/members' },
      { id: 'members-panel', label: 'Panel Üyeleri', path: '/members', color: 'red' },
    ],
  },
  {
    id: 'corporate',
    label: 'Kurumsal',
    icon: Building2,
    iconColor: 'text-amber-500',
    children: [
      { id: 'corp-faq', label: 'Sıkça Sorulan Sorular', path: '/content' },
      { id: 'corp-reviews', label: 'Yorumlar', path: '/content', color: 'orange' },
      { id: 'corp-contact', label: 'İletişim', path: '/content' },
      { id: 'corp-pages', label: 'Sayfalar', path: '/content' },
      { id: 'corp-rental-terms', label: 'Kiralama Şartları', path: '/content' },
      { id: 'corp-rental-terms-faq', label: 'Kiralama Şartları Sss', path: '/content' },
      { id: 'corp-usage', label: 'Kullanım Koşulları', path: '/content' },
      { id: 'corp-usage-faq', label: 'Kullanım Koşulları Sss', path: '/content' },
      { id: 'corp-payment', label: 'Ödeme, İptal Ve Değişiklik Koşulları', path: '/content' },
      { id: 'corp-payment-faq', label: 'Ödeme, İptal Ve Değişiklik Koşulları Sss', path: '/content' },
      { id: 'corp-tursab', label: 'Türsab Mesafeli Sözleşme', path: '/content' },
      { id: 'corp-tursab-faq', label: 'Türsab Mesafeli Sözleşme Sss', path: '/content' },
      { id: 'corp-kvkk', label: 'Kişisel Verilerin Korunması Kanunu', path: '/content' },
      { id: 'corp-privacy', label: 'Gizlilik Ve Güvenlik', path: '/content' },
    ],
  },
  {
    id: 'settings',
    label: 'Ayarlar',
    icon: Settings,
    iconColor: 'text-slate-500',
    children: [
      { id: 'settings-general', label: 'Genel Ayarlar', path: '/settings' },
      { id: 'settings-currency', label: 'Döviz Kurları', path: '/settings' },
      { id: 'settings-templates', label: 'Şablonlar', path: '/settings' },
      { id: 'settings-mail', label: 'Mail Ayarları', path: '/settings' },
      { id: 'settings-theme', label: 'Tema Ayarları', path: '/settings' },
    ],
  },
  {
    id: 'reports',
    label: 'Raporlar',
    icon: BarChart3,
    iconColor: 'text-rose-500',
    path: '/reports',
  },
  {
    id: 'backup',
    label: 'Yedek',
    icon: Database,
    iconColor: 'text-gray-500',
    path: '/backup',
  },
]

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, setSidebarOpen, expandedMenu, setExpandedMenu } = useAppStore()
  const location = useLocation()

  // URL değiştiğinde mobilde sidebar'ı kapat
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [location.pathname, setSidebarOpen])

  // Menü aç/kapat fonksiyonu (accordion mantığı)
  const handleMenuClick = (menuId: string, hasChildren: boolean) => {
    if (hasChildren) {
      // Aynı menüye tıklandıysa kapat, farklı menüye tıklandıysa aç
      setExpandedMenu(expandedMenu === menuId ? null : menuId)
    }
  }

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
          'fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#1e293b] text-gray-300 transition-transform duration-300 ease-in-out overflow-y-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col min-h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-4 bg-[#0f172a] border-b border-gray-700">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center mr-3">
              <Menu className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Kontrol Paneli</span>
          </div>

          {/* Menu */}
          <nav className="flex-1 py-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isExpanded = expandedMenu === item.id
              const hasChildren = item.children && item.children.length > 0
              const isActive = item.path && location.pathname === item.path

              return (
                <div key={item.id} className="mb-0.5">
                  {/* Ana menü öğesi */}
                  {hasChildren ? (
                    // Açılır menü
                    <button
                      onClick={() => handleMenuClick(item.id, hasChildren)}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-700/50',
                        isExpanded && 'bg-gray-700/30'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={cn(item.iconColor, 'flex-shrink-0')} />
                        <span className="text-gray-200">{item.label}</span>
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="transition-transform duration-200">
                        {isExpanded ? (
                          <ChevronDown size={16} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400" />
                        )}
                      </div>
                    </button>
                  ) : (
                    // Tekli menü
                    <NavLink
                      to={item.path || '#'}
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          setSidebarOpen(false)
                        }
                        setExpandedMenu(null)
                      }}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-700/50',
                          isActive ? 'bg-cyan-600 text-white' : 'text-gray-200'
                        )
                      }
                    >
                      <Icon size={20} className={cn(item.iconColor, 'flex-shrink-0')} />
                      <span>{item.label}</span>
                    </NavLink>
                  )}

                  {/* Alt menüler */}
                  {hasChildren && isExpanded && (
                    <div className="bg-[#0f172a]/50 overflow-hidden transition-all duration-200"
                    >
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.id}
                          to={child.path}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              setSidebarOpen(false)
                            }
                          }}
                          className={({ isActive }) =>
                            cn(
                              'block px-4 py-2.5 pl-12 text-sm transition-colors hover:bg-gray-700/30',
                              child.color === 'red' && 'text-red-400 hover:text-red-300',
                              child.color === 'orange' && 'text-orange-400 hover:text-orange-300',
                              (!child.color || child.color === 'default') && 'text-gray-400 hover:text-gray-200',
                              isActive && 'bg-cyan-600/20 text-cyan-400'
                            )
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
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
