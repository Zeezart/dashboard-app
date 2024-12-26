import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

import { readUserSession } from '@/lib/actions';
import { useUserStore } from '@/lib/store/user';

export default async function Layout({ children }: { children: ReactNode }) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect('/sign-in');
  }

  useUserStore.setState({ user: userSession.session.user });

  return <>{children}</>;
}
