export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'operator' | 'accounting' | 'editor' | 'driver';
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Site {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  primaryColor: string;
  isActive: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
  permissions?: string[];
}
