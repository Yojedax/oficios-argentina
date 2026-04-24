"use client";

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { MobileNav } from './MobileNav';
import { NAV_LINKS } from '@/lib/constants';

export interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}

const Header = React.forwardRef<HTMLHeaderElement, HeaderProps>(
  ({ isLoggedIn = false, userName, onLogout }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <>
        <header
          ref={ref}
          className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                className="flex-shrink-0 font-bold text-xl text-[#1B4332]"
              >
                Oficios Argentina
              </Link>

              <nav className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-[#1C1917] hover:text-[#1B4332] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden md:flex items-center gap-4">
                {isLoggedIn ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#1C1917]">
                      {userName}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onLogout}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" size="sm">
                        Ingresar
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button variant="primary" size="sm">
                        Registrarse
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <div className="md:hidden flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Search className="w-5 h-5 text-[#1C1917]" />
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-[#1C1917]" />
                  ) : (
                    <Menu className="w-5 h-5 text-[#1C1917]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {mobileMenuOpen && (
          <MobileNav
            isLoggedIn={isLoggedIn}
            userName={userName}
            onLogout={onLogout}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </>
    );
  }
);

Header.displayName = 'Header';

export { Header };
