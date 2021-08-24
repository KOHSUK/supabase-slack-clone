import React from 'react';
import { Button, Box, Container, Typography } from '@material-ui/core';
import { useAuthAction } from 'hooks/redux/auth/use-auth-action';

export const Messages: React.VFC = () => {
  const { signOut } = useAuthAction();

  const handleClick = async () => {
    await signOut();
  };

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
        <Typography variant="h5" marginBottom={(theme) => theme.spacing(1)}>
          Messages
        </Typography>
        <Button onClick={handleClick} variant="contained">
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};
