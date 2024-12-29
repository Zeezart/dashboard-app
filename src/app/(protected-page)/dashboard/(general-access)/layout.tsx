import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

import { readUserSession } from '@/app/(protected-page)/actions';

export default async function Layout({ children }: { children: ReactNode }) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect('/sign-in');
  }

  // Pass the session and permissions as props to children
  return (
    <>
      {/* Display user session details */}
      {/* <pre>
        DEBUGGING! <br />
        {JSON.stringify(userSession.session.user.user_metadata, null, 2)}
      </pre> */}

      {/* Display role in permission details */}
      {/* <pre>
        DEBUGGING PERMISSION! <br /> {JSON.stringify(permissions.role, null, 2)}
      </pre> */}

      {children}
    </>
  );
}
