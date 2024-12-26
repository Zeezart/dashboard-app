/* eslint-disable no-console */
'use server';

import { redirect } from 'next/navigation';

import { createSupbaseServerClient } from '@/lib/supabase';

export async function loginWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupbaseServerClient();

  // Login dengan email dan password
  const result = await supabase.auth.signInWithPassword(data);

  // Cek jika ada error dalam result
  if (result.error) {
    throw new Error(result.error.message);
  }

  const user = result.data.user;

  // Jika login berhasil dan user belum ada di profile, insert ke profile
  if (user) {
    // Cek jika user sudah ada di tabel profile
    const { data: profileData, error: profileError } = await supabase
      .from('profile')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!profileData && !profileError) {
      // Jika user belum ada di profile, insert data baru
      await supabase.from('profile').insert([
        {
          id: user.id, // ID pengguna yang sudah login
          first_name: user.user_metadata?.first_name || '', // Ambil nama depan dari metadata
          last_name: user.user_metadata?.last_name || '', // Ambil nama belakang dari metadata
          role: 'user', // Atur role sesuai kebutuhan
        },
      ]);
    }
  }

  // Kembalikan hasil dalam format JSON string
  return JSON.stringify(result); // pastikan hasilnya dalam format string
}

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  role: string;
}) {
  const supabase = await createSupbaseServerClient();

  // Daftarkan user dengan email dan password
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  // Cek jika ada error dalam result
  if (result.error) {
    throw new Error(result.error.message);
  }

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
      const { data: insertData, error } = await supabase
        .from('profile')
        .insert([
          {
            id: session.user.id,
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.role,
          },
        ]);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', insertData);
      }
    }
  });

  // Kembalikan hasil dalam format JSON string
  return JSON.stringify(result); // pastikan hasilnya dalam format string
}

export async function logout() {
  const supabase = await createSupbaseServerClient();
  await supabase.auth.signOut();
  redirect('/sign-in');
}
