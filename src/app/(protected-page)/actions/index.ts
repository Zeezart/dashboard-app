'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { createSupabaseAdmin, createSupabaseClient } from '@/lib/supabase';

import { Book } from '@/types';

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

export async function bookDetailById(book_id: string): Promise<Book | null> {
  const supabase = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });

  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('book_id', book_id)
    .single(); // single record!

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete operation for books, requires writable access
export async function deleteBook(book_id: string) {
  const supabase = await createSupabaseClient({
    readOnly: false,
    isBrowser: false,
  });

  const result = await supabase.from('books').delete().eq('book_id', book_id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function addBook(data: {
  title: string;
  author: string;
  description: string;
}) {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });

  const result = await supabase.from('books').insert({
    title: data.title,
    author: data.author,
    description: data.description,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function updateBook(
  data: {
    title: string;
    author: string;
    description: string;
  },
  book_id: string
) {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });

  const result = await supabase
    .from('books')
    .update({
      title: data.title,
      author: data.author,
      description: data.description,
    })
    .eq('book_id', book_id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}
