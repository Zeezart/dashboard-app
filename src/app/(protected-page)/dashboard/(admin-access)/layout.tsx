// import { redirect } from 'next/navigation';
// import React, { ReactNode } from 'react';

// import { readUserSession } from '@/app/(protected-page)/actions';

// export default async function Layout({
//   children,
// }: {
//   children: ReactNode;
//   role: string;
// }) {
//   const { data: userSession } = await readUserSession();

//   if (!userSession.session) {
//     return redirect('/sign-in');
//   }

//   return <>{children}</>;
// }

import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

import { readAccess, readUserSession } from '@/app/(protected-page)/actions';

export default async function Dashboard({
  children,
}: {
  children: ReactNode;
  role: string;
}) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect('/sign-in');
  }

  const { data: permissions } = await readAccess();
  const role = permissions.role;

  return <DashboardLayout role={role}>{children}</DashboardLayout>;
}
