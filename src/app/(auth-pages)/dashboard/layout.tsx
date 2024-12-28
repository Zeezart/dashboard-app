import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

import { readUserSession } from '@/lib/actions';
import { useUserStore } from '@/lib/store/user';
import { createSupbaseClient } from '@/lib/supabase';

export default async function Layout({ children }: { children: ReactNode }) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect('/sign-in');
  }

  const supabaseClient = await createSupbaseClient();
  const { data: user } = await supabaseClient
    .from('permissions')
    .select('*')
    .single();

  useUserStore.setState({ user: userSession.session.user });

  return (
    <>
      {children}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
