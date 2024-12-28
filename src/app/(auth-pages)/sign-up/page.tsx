import { redirect } from 'next/navigation';
import React from 'react';

import { readUserSession } from '@/lib/actions';

import SignUpForm from '@/components/auth/SignUpForm';

export default async function page() {
  const { data: userSession } = await readUserSession();

  if (userSession.session) {
    return redirect('/dashboard');
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <SignUpForm />
    </div>
  );
}
