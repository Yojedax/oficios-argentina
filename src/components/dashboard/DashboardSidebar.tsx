"use client";

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserCircle,
  Camera,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { signOut } from '@/lib/actions/auth';

interface DashboardSidebarProps {
  userName: string;
}

const navItems = [
  { href: '/panel', label: 'Mi panel', icon: LayoutDashboard },
  { href: '/panel/perfil', label: 'Mi perfil', icon: UserCircle },
  { href: '/panel/fotos', label: 'Mis fotos', icon: Camera },
  { href: '/panel/resenas', label: 'Mis reseñas', icon: Star },
  { href: '/panel/configuracion', label: 'Configuración', icon: Settings },
];

export default function DashboardSidebar({ userName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-primary-700">
        <p className="text-white/60 text-xs uppercase tracking-wider">Panel profesional</p>
        <p className="text-white font-semibold mt-1 truncate">{userName}</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-primary-700">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-primary-600 text-white rounded-lg shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-primary-600 z-50 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        {sidebar}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 bg-primary-600 min-h-screen fixed left-0 top-0">
        {sidebar}
      </aside>
    </>
  );
}
