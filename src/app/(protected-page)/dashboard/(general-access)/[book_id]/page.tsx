import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import AddFavoriteBookButton from '@/components/dashboard/AddFavoriteBookButton';
import OrderBookButton from '@/components/dashboard/OrderBookButton';

import { bookDetailById, readAccess } from '@/app/(protected-page)/actions';
import NotFound from '@/app/not-found';

export default async function BookDetailsPage({
  params: { book_id },
}: {
  params: { book_id: string };
}) {
  // Fetch book data based on the book_id from Supabase
  const book = await bookDetailById(book_id);

  if (!book) {
    return <NotFound />; // If book not found, show 404 page
  }

  const { data: permissions } = await readAccess();
  const role = permissions.role;

  return (
    <CardContent>
      {/* Back Button */}
      <Link href='/dashboard' passHref>
        <Button
          startIcon={<ChevronLeftRoundedIcon />}
          variant='outlined'
          color='primary'
          sx={{ marginBottom: 2 }}
        >
          Back to Dashboard
        </Button>
      </Link>

      {/* Book Title */}
      <Typography variant='h4' gutterBottom className='mb-1'>
        {book?.title}
      </Typography>

      {role === 'user' && <AddFavoriteBookButton book_id={book_id} />}

      {/* Book Image */}
      <CardMedia
        className='mt-4'
        component='img'
        image='https://via.placeholder.com/200x200.png?text=Book+Cover'
        alt={book.title}
        sx={{ width: '200px', height: '260px', objectFit: 'cover' }}
      />

      {/* Author */}
      <Typography variant='subtitle1' color='textSecondary' paragraph>
        <strong>Author:</strong> {book?.author}
      </Typography>

      {/* Description */}
      <Typography variant='body1' paragraph>
        <strong>Description:</strong> {book?.description}
      </Typography>

      <Box className='flex flex-row justify-start w-fit h-fit items-center gap-2 mb-4'>
        <Typography variant='body1' paragraph>
          <strong>Book Stocks Status:</strong>{' '}
        </Typography>
        <Chip
          label={
            book.stocks === 0
              ? 'Sold Out!'
              : book.stocks <= 10
              ? 'Low Stock!'
              : 'Ready Stock!'
          }
          color={
            book.stocks === 0
              ? 'error'
              : book.stocks <= 10
              ? 'warning'
              : 'primary'
          }
        />
      </Box>
      <Box className='flex flex-col space-y-4 w-fit '>
        {role === 'user' && <OrderBookButton book_id={book_id} />}
      </Box>
    </CardContent>
  );
}
