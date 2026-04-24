"use client";

'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';

export interface MobileNavProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
  onClose?: () => void;
}

const MobileNav = React.forwardRef<HTMLDivElement, MobileNavProps>(
  ({ isLoggedIn = false, userName, onLogout, onClose }, ref) => {
    return (
      <div
        ref={ref}
        className="fixed inset-0 z-30 top-16 md:hidden"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <nav className="relative bg-white w-full shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-base font-medium text-[#1C1917] hover:bg-gray-100 rounded-md transition-colors"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 text-sm font-medium text-[#1C1917]">
                    {userName}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      onLogout?.();
                      onClose?.();
                    }}
                  >
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block" onClick={onClose}>
                    <Button variant="ghost" className="w-full justify-start">
                      Ingresar
                    </Button>
                  </Link>
                  <Link href="/auth/register" className="block" onClick={onClose}>
                    <Button variant="primary" className="w-full">
                      Registrarse
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
);

MobileNav.displayName = 'MobileNav';

export { MobileNav };
