import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

import AddBookButton from '@/components/dashboard/AddBookButton';
import DeleteBookButton from '@/components/dashboard/DeleteBookButton';
import EditBookButton from '@/components/dashboard/EditBookButton';

import { readAccess, readAllBooks } from '@/app/(protected-page)/actions';

import { Book } from '@/types';

export default async function BooksListPage() {
  // Fetch books data
  const booksData = await readAllBooks();

  const { data: permissions } = await readAccess();
  const role = permissions.role;

  return (
    <>
      <Typography variant='h4' gutterBottom>
        All Books
      </Typography>
      {/* Add Book Button for Admin */}
      {role === 'admin' && (
        <Box display='flex' justifyContent='flex-end' padding={2}>
          <AddBookButton />
        </Box>
      )}

      <Grid container spacing={4} padding={2}>
        {booksData.map((book: Book) => (
          <Grid item xs={12} sm={6} md={4} key={book.book_id}>
            <Card>
              {/* Non-clickable Card except buttons */}
              <CardActionArea
                sx={{
                  pointerEvents: 'none', // Disable hover and pointer on the Card
                }}
              >
                <CardMedia
                  component='img'
                  height='140'
                  image='https://via.placeholder.com/200x200.png?text=Book+Cover'
                  alt={book.title}
                />
                <CardContent>
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
                  <Typography variant='h6' noWrap mt={1}>
                    {book.title}{' '}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {book.author}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' noWrap>
                    {book.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* Action Buttons */}
              <Box display='flex' flexDirection='column' padding={1}>
                {/* Baris pertama: "Lihat Selengkapnya" Button */}
                <Button
                  variant='contained'
                  color='info'
                  size='small'
                  href={`/dashboard/${book.book_id}`}
                  sx={{
                    width: '100%', // Make the button take up the full width of the container
                  }}
                >
                  Lihat Selengkapnya
                </Button>

                {/* Baris kedua: Edit dan Delete Buttons */}
                {role === 'admin' && (
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    gap={1}
                    marginTop={1}
                  >
                    <EditBookButton
                      book_id={book.book_id}
                      initial_title={book.title}
                      initial_author={book.author}
                      initial_description={book.description}
                      initial_stocks={book.stocks}
                    />
                    <DeleteBookButton
                      book_id={book.book_id}
                      book_title={book.title}
                    />
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
