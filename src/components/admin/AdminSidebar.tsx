"use client";

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Star,
  Flag,
  FolderOpen,
  LogOut,
  Shield,
} from 'lucide-react';
import { signOut } from '@/lib/actions/auth';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/profesionales', label: 'Profesionales', icon: Users },
  { href: '/admin/resenas', label: 'Reseñas', icon: Star },
  { href: '/admin/reportes', label: 'Reportes', icon: Flag },
  { href: '/admin/categorias', label: 'Categorías', icon: FolderOpen },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside className="w-64 bg-gray-900 min-h-screen fixed left-0 top-0 hidden lg:flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-secondary-500" />
          <div>
            <p className="text-white font-semibold text-sm">Oficios Argentina</p>
            <p className="text-gray-400 text-xs">Panel de administración</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors mb-1"
        >
          Ver sitio público
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
