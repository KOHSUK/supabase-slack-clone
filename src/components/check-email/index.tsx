import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const CheckEmail: React.VFC = () => {
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
        <Typography variant="h5">Check your email for login link!</Typography>
        <Link to="/signin">
          <Typography variant="body2">Back to sign in page.</Typography>
        </Link>
      </Box>
    </Container>
  );
};
