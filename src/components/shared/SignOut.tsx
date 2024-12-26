import { Logout } from '@mui/icons-material';
import SyncIcon from '@mui/icons-material/Sync';
import { Button } from '@mui/material';
import React, { useTransition } from 'react';
import toast from 'react-hot-toast';

import { logout } from '@/app/(auth)/actions';

export default function SignOut() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await logout();
        toast.success('You have been logged out.');
      } catch (error) {
        toast.error('Failed to log out.');
      }
    });
  };

  return (
    <div className='flex w-full'>
      <Button
        startIcon={<Logout />}
        className='w-full gap-6 flex items-center justify-start'
        onClick={handleSignOut}
        disabled={isPending}
      >
        SignOut {isPending && <SyncIcon className='animate-spin' />}
      </Button>
    </div>
  );
}
