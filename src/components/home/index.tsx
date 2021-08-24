import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Home: React.VFC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">Home</Typography>
        <Link to="/signin">
          <Typography variant="body2">Sign In</Typography>
        </Link>
      </Box>
    </Container>
  );
};
