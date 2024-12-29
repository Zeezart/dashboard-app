import { VerifiedUser } from '@mui/icons-material';
import BookIcon from '@mui/icons-material/Book';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import SignOut from '@/components/shared/SignOut';

const drawerWidth = 240;

const DashboardSidebar = ({ role }: { role: string }) => {
  const menuItems = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      link: '/dashboard',
    },
    {
      label: 'My Books',
      icon: <BookIcon />,
      link: '/dashboard/my-books',
      role: 'user',
    },
    {
      label: 'User Order',
      icon: <BookIcon />,
      link: '/dashboard/user-order',
      role: 'admin',
    },
    {
      label: 'All User',
      icon: <VerifiedUser />,
      link: '/dashboard/all-user',
      role: 'admin',
    },
    {
      label: 'My Profile',
      icon: <DashboardIcon />,
      link: '/dashboard/my-profile',
    },
  ];

  return (
    <MuiDrawer
      variant='permanent'
      sx={{
        '& .MuiDrawer-paper': {
          position: 'relative',
          whiteSpace: 'nowrap',
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Toko Buku Online
        </Typography>
      </Toolbar>
      <Divider />
      <List component='nav'>
        {menuItems
          .filter((item) => !item.role || item.role === role)
          .map((item, index) => (
            <ListItemButton key={index} component={Link} href={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        <Divider sx={{ my: 1 }} />
        <ListItem>
          <SignOut />
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default DashboardSidebar;
