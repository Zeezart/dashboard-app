'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import { IconButton, InputAdornment } from '@mui/material';
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
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import Copyright from '@/components/shared/Copyright';

import { signUpWithEmailAndPassword } from '@/app/(auth)/actions';

// Zod schema
const schema = z.object({
  full_name: z
    .string()
    .min(4, { message: 'Your name must be at least 4 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  terms: z.literal(true, {
    message: 'You must agree to the terms and conditions',
  }),
  confirm_password: z
    .string()
    .min(6, { message: 'Confirm Password must match Password' }),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isPending, startTransition] = useTransition();

  const password = watch('password'); // Watch password input

  async function onSubmit(data: FormData) {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { confirm_password, terms, ...payload } = data;

    startTransition(async () => {
      try {
        const result = await signUpWithEmailAndPassword(payload);
        if (typeof result !== 'string') {
          throw new Error('Unexpected result type');
        }

        // Assuming result contains useful information
        toast.success('Signup successful!');
      } catch (e) {
        // Handle and display error from Supabase
        toast.error(
          e instanceof Error
            ? e.message
            : 'An error occurred during signup. Please try again.'
        );
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
            <Grid item xs={12}>
              <TextField
                autoComplete='given-name'
                required
                fullWidth
                id='full_name'
                label='Full Name'
                autoFocus
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
                {...register('full_name')}
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
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='new-password'
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Confirm Password'
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirm_password'
                autoComplete='confirm-password'
                error={!!errors.confirm_password}
                helperText={
                  errors.confirm_password
                    ? errors.confirm_password.message
                    : password !== watch('confirm_password') &&
                      'Passwords do not match'
                }
                {...register('confirm_password', {
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle confirm password visibility'
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge='end'
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
            endIcon={isPending && <SyncIcon className='animate-spin' />}
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
