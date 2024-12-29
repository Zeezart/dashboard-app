'use client';

// components/Dashboard.tsx
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import Orders from '@/components/dashboard/Orders';
import Sidebar from '@/components/dashboard/Sidebar';
import Copyright from '@/components/shared/Copyright';

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='absolute'>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar open={open} toggleDrawer={toggleDrawer} />

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
              <Orders />
            </Paper>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
