// DashboardLayout.tsx
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { ReactNode } from 'react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Copyright from '@/components/shared/Copyright';

import { Role } from '@/types';

type DashboardLayoutProps = {
  children: ReactNode;
  role: Role;
  open: boolean;
  toggleDrawer: () => void;
};

const DashboardLayout = ({
  children,
  role,
  open,
  toggleDrawer,
}: DashboardLayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardHeader open={open} toggleDrawer={toggleDrawer} />
      <DashboardSidebar open={open} toggleDrawer={toggleDrawer} role={role} />

      <Box
        component='div'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {children}
            </Paper>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
