import SyncIcon from '@mui/icons-material/Sync';
import { Button } from '@mui/material';
import React, { useTransition } from 'react';

import { cn } from '@/lib/utils';

import { logout } from '@/app/(auth)/actions';

export default function SignOut() {
  const [isPending, startTransition] = useTransition();
  const onSubmit = async () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <form action={onSubmit}>
      <Button className='w-full flex items-center justify-center'>
        SignOut{' '}
        <SyncIcon className={cn(' animate-spin', { hidden: !isPending })} />
      </Button>
    </form>
  );
}
