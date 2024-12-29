import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

import { readAllUsers } from '@/app/(protected-page)/actions';

export default async function AllUsersPage() {
  // Fetch users with pagination in server side
  const usersData = await readAllUsers();

  if (usersData.error) {
    return (
      <Typography variant='h6' color='error'>
        Error fetching users
      </Typography>
    );
  }

  const users = usersData.data.users;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Last Sign In</TableCell>
            <TableCell>Provider</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.user_metadata.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.last_sign_in_at}</TableCell>
              <TableCell>{user.app_metadata.provider}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
