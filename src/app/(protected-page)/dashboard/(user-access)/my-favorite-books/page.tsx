import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

import DeleteFavoriteBookButton from '@/components/dashboard/DeleteFavoriteBookButton';

import { readAccess, readUserFavorites } from '@/app/(protected-page)/actions';

export default async function FavoriteBooksPage() {
  // Fetch favorite books data
  const favoriteBooks = await readUserFavorites();
  const { data: permissions } = await readAccess();
  const role = permissions.role;

  return (
    <>
      <Typography variant='h4' gutterBottom>
        My Favorite Books
      </Typography>
      <Grid container spacing={4} padding={2}>
        {favoriteBooks && favoriteBooks.data.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          favoriteBooks.data.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} key={item.book_id}>
              {/* Akses item.books sebagai objek langsung */}
              <Card>
                <CardActionArea
                  sx={{
                    pointerEvents: 'none',
                  }}
                >
                  <CardMedia
                    component='img'
                    height='140'
                    image='/images/book_cover.jpg'
                    alt={item.books.title || 'Book Cover'}
                  />
                  <CardContent>
                    <Typography variant='h6' noWrap>
                      {item.books.title || 'No Title'}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {item.books.author || 'Unknown Author'}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' noWrap>
                      {item.books.description || 'No Description Available'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Box display='flex' flexDirection='column' padding={1}>
                  {/* Baris pertama: "Lihat Selengkapnya" Button */}
                  <Button
                    variant='contained'
                    color='info'
                    size='small'
                    href={`/dashboard/${item.book_id}`}
                    sx={{
                      width: '100%', // Make the button take up the full width of the container
                    }}
                  >
                    Lihat Selengkapnya
                  </Button>

                  {/* Baris kedua: Edit dan Delete Buttons */}
                  {role === 'user' && (
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      gap={1}
                      marginTop={1}
                    >
                      <DeleteFavoriteBookButton
                        book_id={item.book_id}
                        book_title={item.books.title}
                      />
                    </Box>
                  )}
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant='h6' textAlign='center' width='100%'>
            No favorite books yet.
          </Typography>
        )}
      </Grid>
    </>
  );
}
