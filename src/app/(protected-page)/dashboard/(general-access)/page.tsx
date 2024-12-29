import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link'; // Import Link from Next.js
import React from 'react';

import { readAllBooks } from '@/app/(protected-page)/actions';

import { Book } from '@/types';

export default async function BooksListPage() {
  // Fetch books data
  const booksData = await readAllBooks();

  return (
    <Grid container spacing={4} padding={2}>
      {booksData.map((book: Book) => (
        <Grid item xs={12} sm={6} md={4} key={book.book_id}>
          {/* Wrap CardActionArea with Link */}
          <Link href={`/dashboard/${book.book_id}`} passHref>
            <Card
              sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)', // Slight scale effect
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Add shadow on hover
                },
              }}
            >
              <CardActionArea>
                {/* Optional: Add an image or icon here */}
                <CardMedia
                  component='img'
                  height='140'
                  image='https://via.placeholder.com/200x200.png?text=Book+Cover'
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant='h6' noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {book.author}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' noWrap>
                    {book.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
