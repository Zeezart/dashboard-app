'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { createSupabaseAdmin, createSupabaseClient } from '@/lib/supabase';

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

export async function readAllUsers() {
  const supabaseAdmin = await createSupabaseAdmin({
    isBrowser: false, // This is a server-side query
    readOnly: false,
  });

  // Query the all_users view to fetch user data with pagination
  const allUserData = await supabaseAdmin.auth.admin.listUsers();

  if (allUserData.error) {
    // Properly handle the error
    throw new Error(allUserData.error.message);
  }

  return allUserData;
}

export async function readAllBooks() {
  noStore();
  const supabase = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });

  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return books;
}
