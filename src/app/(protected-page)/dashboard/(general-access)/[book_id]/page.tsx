import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Button, CardContent, CardMedia, Typography } from '@mui/material';
// import { useState } from 'react';
import Link from 'next/link';

import { bookDetailById } from '@/app/(protected-page)/actions';
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

  // State for favorite button toggle
  // const [isFavorite, setIsFavorite] = useState(false);

  // const toggleFavorite = () => {
  //   setIsFavorite((prev) => !prev);
  //   // You can add functionality here to update the favorite status in your database
  // };

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
      <Typography variant='h4' gutterBottom>
        {book?.title}
      </Typography>

      {/* Book Image */}
      <CardMedia
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

      {/* Favorite Button */}
      <Button
        startIcon={<BookmarkBorderIcon />}
        // <BookmarkAddedIcon />
        variant='contained'
        color='primary'
        // color={isFavorite ? 'secondary' : 'primary'}
        // onClick={toggleFavorite}
      >
        Add to favorites
      </Button>
    </CardContent>
  );
}
