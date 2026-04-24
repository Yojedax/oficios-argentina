"use client";

import React from 'react';
import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants';

const Footer = React.forwardRef<HTMLFootElement, React.HTMLAttributes<HTMLFootElement>>(
  (props, ref) => {
    const currentYear = new Date().getFullYear();

    return (
      <footer
        ref={ref}
        className="bg-[#0d2818] text-white"
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-lg font-semibold mb-4">
                  {section}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-300 text-sm">
              Copyright © {currentYear} Oficios Argentina. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export { Footer };
