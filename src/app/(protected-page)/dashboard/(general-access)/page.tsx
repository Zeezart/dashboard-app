import { redirect } from 'next/navigation';
import React from 'react';

import Layout from '@/components/dashboard/Layout';

import { readAccess, readUserSession } from '@/app/(protected-page)/actions';

export default async function Dashboard() {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect('/sign-in');
  }

  const { data: permissions } = await readAccess();
  const role = permissions.role;

  return (
    <Layout role={role}>
      <pre>
        DEBUGGING! <br />
        {JSON.stringify(userSession.session.user.user_metadata, null, 2)}
      </pre>

      <pre>
        DEBUGGING PERMISSION! <br />
        {JSON.stringify(role, null, 2)}
      </pre>
    </Layout>
  );
}
