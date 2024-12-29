import { redirect } from 'next/navigation';
import React, { ComponentType } from 'react';

import { readAccess, readUserSession } from '@/app/(protected-page)/actions';

interface WithAuthOptions {
  requiredRole?: string; // Role yang diizinkan (opsional)
}

export function withAuth<P>(
  WrappedComponent: ComponentType<P>,
  options?: WithAuthOptions
) {
  return async function AuthenticatedComponent(props: P) {
    const { data: userSession } = await readUserSession();

    // Redirect jika tidak ada sesi pengguna
    if (!userSession.session) {
      redirect('/sign-in');
    }

    const { data: permissions } = await readAccess();
    const role = permissions.role;

    // Redirect jika role tidak sesuai
    if (options?.requiredRole && options.requiredRole !== role) {
      redirect('/dashboard');
    }

    return (
      <WrappedComponent
        {...props}
        userSession={userSession.session}
        role={role}
      />
    );
  };
}
