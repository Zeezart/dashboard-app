'use client';

import { ReactNode, useState } from 'react';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

import { Role } from '@/types';

const Layout = ({ children, role }: { children: ReactNode; role: Role }) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  return (
    <DashboardLayout role={role} open={open} toggleDrawer={toggleDrawer}>
      {children}
    </DashboardLayout>
  );
};

export default Layout;
