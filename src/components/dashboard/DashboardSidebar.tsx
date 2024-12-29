// DashboardSidebar.tsx
import { VerifiedUser } from '@mui/icons-material';
import BookIcon from '@mui/icons-material/Book';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import SignOut from '@/components/shared/SignOut';

import { Role } from '@/types';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
  role: Role;
}

const DashboardSidebar = ({ open, toggleDrawer, role }: SidebarProps) => {
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
      role: 'user', // Only visible to user role
    },
    {
      label: 'User Order',
      icon: <BookIcon />,
      link: '/dashboard/user-order',
      role: 'admin', // Only visible to admin role
    },
    {
      label: 'All User',
      icon: <VerifiedUser />,
      link: '/dashboard/all-user',
      role: 'admin', // Only visible to admin role
    },
    {
      label: 'My Profile',
      icon: <DashboardIcon />,
      link: '/dashboard/my-profile',
    },
  ];

  return (
    <Drawer variant='permanent' open={open}>
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

        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
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
    </Drawer>
  );
};

export default DashboardSidebar;
