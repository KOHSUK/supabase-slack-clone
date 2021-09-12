import React from 'react';
import { Paper, Stack, styled, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { messagesSelectors } from 'redux/messages/selector';

const Message = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  width: '100%',
}));

export const Messages: React.VFC = () => {
  const messages = useSelector(messagesSelectors.selectAll);

  return (
    <Stack>
      {messages.map((message) => (
        <Message>
          <Typography variant="caption">{message.author?.username}</Typography>
          <Typography variant="body1">{message.message}</Typography>
        </Message>
      ))}
    </Stack>
  );
};
