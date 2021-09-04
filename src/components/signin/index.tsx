import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';
import { useAuth } from 'hooks/use-auth';
import { useNavigate } from 'react-router';

type FormInput = {
  email: string;
};

export const Signin: React.VFC = () => {
  const { control, handleSubmit } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (data.email) {
      await signIn(data.email);
      navigate('/check-email');
    }
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
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'This field is required.',
            }}
            render={({ field, fieldState }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={field.value}
                onChange={field.onChange}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
