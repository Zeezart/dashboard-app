'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import Copyright from '@/components/shared/Copyright';

import { signUpWithEmailAndPassword } from '@/app/(auth)/actions';

// Zod schema
const schema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' }),
  last_name: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  terms: z.literal(true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isPending, startTransition] = useTransition();

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await signUpWithEmailAndPassword(data);
      const { error } = JSON.parse(result);
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.success('Account created successfully');
      }
    });
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                required
                fullWidth
                id='first_name'
                label='First Name'
                autoFocus
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                {...register('first_name')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='last_name'
                label='Last Name'
                autoComplete='family-name'
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                {...register('last_name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                autoComplete='email'
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color='primary' {...register('terms')} />}
                label='I agree to the terms and conditions.'
              />
              {errors.terms && (
                <Typography color='error' variant='body2'>
                  You must agree to the terms and conditions
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/sign-in' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
