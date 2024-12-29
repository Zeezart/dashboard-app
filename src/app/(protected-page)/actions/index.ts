'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { createSupabaseClient } from '@/lib/supabase';

export async function readUserSession() {
  noStore();
  const supabase = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });
  const session = await supabase.auth.getSession();
  return session;
}

export async function readAccess() {
  noStore();
  const supabaseClient = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });

  // bisa data, bisa error
  const permissions = await supabaseClient
    .from('permissions')
    .select('*')
    .single();

  return permissions;
}
