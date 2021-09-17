import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { messagesSelectors } from 'redux/messages/selector';
import { addMessage } from 'redux/messages/slice';
import { useParams } from 'react-router-dom';

const Message = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  width: '100%',
  marginBottom: theme.spacing(2),
}));

type FormInput = {
  message: string;
};

export const Messages: React.VFC = () => {
  const messages = useSelector(messagesSelectors.selectAll);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { message: '' },
  });
  const dispatch = useDispatch();
  const { channelId } = useParams();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (data.message && channelId) {
      dispatch(
        addMessage({
          message: data.message,
          channel_id: channelId,
        })
      );
    }
    reset();
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <Stack>
        {messages.map((message) => (
          <Message key={message.id}>
            <Typography variant="caption">
              {message.author?.username}
            </Typography>
            <Typography variant="body1">{message.message}</Typography>
          </Message>
        ))}
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              id="message"
              name="message"
              fullWidth
              placeholder="Send a message"
              sx={{ position: 'absolute', bottom: 0 }}
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
            />
          )}
        />
      </form>
    </Box>
  );
};
