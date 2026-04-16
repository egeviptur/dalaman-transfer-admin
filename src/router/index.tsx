import { createHashRouter, Navigate, Outlet, useLocation } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import { lazy, Suspense } from 'react'
import { useAuthStore } from '../stores/authStore'

// Lazy loaded modules
const LoginPage = lazy(() => import('../modules/auth').then(m => ({ default: m.LoginPage })))
const DashboardPage = lazy(() => import('../modules/dashboard').then(m => ({ default: m.DashboardPage })))
const CalendarPage = lazy(() => import('../modules/calendar').then(m => ({ default: m.CalendarPage })))
const ReservationsPage = lazy(() => import('../modules/reservations').then(m => ({ default: m.ReservationsPage })))
const ContentPage = lazy(() => import('../modules/content').then(m => ({ default: m.ContentPage })))
const VehiclesPage = lazy(() => import('../modules/vehicles').then(m => ({ default: m.VehiclesPage })))
const MembersPage = lazy(() => import('../modules/members').then(m => ({ default: m.MembersPage })))
const SettingsPage = lazy(() => import('../modules/settings').then(m => ({ default: m.SettingsPage })))
const ReportsPage = lazy(() => import('../modules/reports').then(m => ({ default: m.ReportsPage })))
const BackupPage = lazy(() => import('../modules/backup').then(m => ({ default: m.BackupPage })))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
  </div>
)

// Wrapper for lazy components
const LazyComponent = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
)

// Protected route wrapper - requires authentication
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

// Public route wrapper - only for non-authenticated users
const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export const router = createHashRouter([
  {
    path: '/login',
    element: <PublicRoute />,
    children: [
      { index: true, element: <LazyComponent><LoginPage /></LazyComponent> },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <LazyComponent><DashboardPage /></LazyComponent> },
          { path: 'calendar', element: <LazyComponent><CalendarPage /></LazyComponent> },
          { path: 'reservations', element: <LazyComponent><ReservationsPage /></LazyComponent> },
          { path: 'content', element: <LazyComponent><ContentPage /></LazyComponent> },
          { path: 'vehicles', element: <LazyComponent><VehiclesPage /></LazyComponent> },
          { path: 'members', element: <LazyComponent><MembersPage /></LazyComponent> },
          { path: 'settings', element: <LazyComponent><SettingsPage /></LazyComponent> },
          { path: 'reports', element: <LazyComponent><ReportsPage /></LazyComponent> },
          { path: 'backup', element: <LazyComponent><BackupPage /></LazyComponent> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])
