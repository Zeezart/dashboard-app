import { AccountBox } from '@mui/icons-material';
import BookIcon from '@mui/icons-material/Book';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

import SignOut from '@/components/shared/SignOut';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary='My Books' />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AccountBox />
      </ListItemIcon>
      <ListItemText primary='Profile' />
    </ListItemButton>
    {/* <ListItemButton> */}
    <SignOut />
    {/* <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary='Log Out' /> */}
    {/* </ListItemButton> */}
  </React.Fragment>
);
