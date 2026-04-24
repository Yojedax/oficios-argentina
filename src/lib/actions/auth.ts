'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signUp(formData: {
  email: string;
  password: string;
  full_name: string;
  role: 'client' | 'professional';
}) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.full_name,
        role: formData.role,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Este email ya está registrado. Intentá iniciar sesión.' };
    }
    return { error: 'Ocurrió un error al crear la cuenta. Intentá de nuevo.' };
  }

  return { success: 'Revisá tu email para verificar tu cuenta.' };
}

export async function signIn(formData: { email: string; password: string }) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    if (error.message.includes('Invalid login')) {
      return { error: 'Email o contraseña incorrectos.' };
    }
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Tu email aún no fue verificado. Revisá tu bandeja de entrada.' };
    }
    return { error: 'Error al iniciar sesión. Intentá de nuevo.' };
  }

  redirect('/panel');
}

export async function signOut() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect('/');
}

export async function resetPassword(email: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/panel/configuracion`,
  });

  if (error) {
    return { error: 'Error al enviar el email. Intentá de nuevo.' };
  }

  return { success: 'Te enviamos un email con instrucciones para restablecer tu contraseña.' };
}

export async function getSession() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
}
