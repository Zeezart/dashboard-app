'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { createSupbaseServerClientReadOnly } from '@/lib/supabase';

export async function readUserSession() {
  noStore();
  const supabase = await createSupbaseServerClientReadOnly();
  const session = await supabase.auth.getSession();
  return session;
}
