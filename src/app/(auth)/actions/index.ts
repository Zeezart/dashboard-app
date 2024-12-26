'use server';

import { redirect } from 'next/navigation';

import { createSupbaseServerClient } from '@/lib/supabase';

export async function loginWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupbaseServerClient();

  const result = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);
}

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
}) {
  const supabase = await createSupbaseServerClient();

  // Sign up the user
  const { data: user, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        last_name: data.last_name,
        first_name: data.first_name,
        role: 'user',
      },
    },
  });

  if (authError) {
    return JSON.stringify({ error: authError });
  }

  // Insert user details into the 'member' table
  // const { data: memberData, error: memberError } = await supabase
  //   .from('member')
  //   .insert([
  //     {
  //       email: data.email,
  //       first_name: data.first_name,
  //       last_name: data.last_name,
  //     },
  //   ]);

  // if (memberError) {
  //   return JSON.stringify({ error: memberError });
  // }

  return JSON.stringify({ user });
}

export async function logout() {
  const supabase = await createSupbaseServerClient();
  await supabase.auth.signOut();
  redirect('/sign-up');
}
