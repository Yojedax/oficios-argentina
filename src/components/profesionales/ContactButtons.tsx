"use client";

'use client';

import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface ContactButtonsProps {
  phone?: string;
  onContactForm?: () => void;
  className?: string;
}

const ContactButtons = React.forwardRef<HTMLDivElement, ContactButtonsProps>(
  ({ phone, onContactForm, className }, ref) => {
    const whatsappLink = phone
      ? `https://wa.me/${phone.replace(/\D/g, '')}`
      : '';
    const phoneLink = phone ? `tel:${phone}` : '';

    return (
      <div
        ref={ref}
        className={cn('flex flex-col sm:flex-row gap-3', className)}
      >
        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              variant="primary"
              size="md"
              className="w-full"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </a>
        )}

        {phoneLink && (
          <a href={phoneLink} className="flex-1">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              style={{ backgroundColor: '#0088cc' }}
            >
              <Phone className="w-5 h-5" />
              Llamar
            </Button>
          </a>
        )}

        {onContactForm && (
          <Button
            variant="outline"
            size="md"
            onClick={onContactForm}
            className="flex-1 sm:flex-none"
          >
            <Mail className="w-5 h-5" />
            Formulario
          </Button>
        )}
      </div>
    );
  }
);

ContactButtons.displayName = 'ContactButtons';

export { ContactButtons };
