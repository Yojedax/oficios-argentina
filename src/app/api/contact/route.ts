import { createAdminClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from_name, from_email, from_phone, message, professional_id } = body;

    // Validación básica
    if (!from_name || !from_email || !message || !professional_id) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben estar completos.' },
        { status: 400 }
      );
    }

    if (message.length < 20) {
      return NextResponse.json(
        { error: 'El mensaje debe tener al menos 20 caracteres.' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Guardar el contacto
    const { error } = await supabase.from('contacts').insert({
      professional_id,
      from_name,
      from_email,
      from_phone: from_phone || null,
      message,
      contact_method: 'form',
    });

    if (error) {
      console.error('Error saving contact:', error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Intentá de nuevo.' },
        { status: 500 }
      );
    }

    // Incrementar contact_count
    try {
      await supabase.rpc('increment_contact_count', { prof_id: professional_id });
    } catch {
      // Si el RPC no existe, ignorar
    }

    // Enviar email via Resend (opcional, si está configurado)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Obtener email del profesional
        const { data: prof } = await supabase
          .from('professional_profiles')
          .select('email_contact, user_id')
          .eq('id', professional_id)
          .single();

        if (prof?.email_contact) {
          await resend.emails.send({
            from: process.env.EMAIL_FROM || 'noreply@oficiosargentina.com.ar',
            to: prof.email_contact,
            subject: `Nueva consulta en Oficios Argentina de ${from_name}`,
            html: `
              <h2>Recibiste una nueva consulta</h2>
              <p><strong>Nombre:</strong> ${from_name}</p>
              <p><strong>Email:</strong> ${from_email}</p>
              ${from_phone ? `<p><strong>Teléfono:</strong> ${from_phone}</p>` : ''}
              <p><strong>Mensaje:</strong></p>
              <p>${message}</p>
              <hr />
              <p style="color: #666; font-size: 12px;">
                Este mensaje fue enviado a través de Oficios Argentina.
              </p>
            `,
          });
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // No fallar si el email no se envía
      }
    }

    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente.' });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
