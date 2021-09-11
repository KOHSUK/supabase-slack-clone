import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { definitions } from 'types/supabase';

export type Message = definitions['messages'] & {
  author: definitions['users'];
};

export const messagesAdapter = createEntityAdapter<Message>({
  selectId: (message) => message.id,
});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    messageAddedOrUpdated: messagesAdapter.upsertOne,
    messageDeleted: messagesAdapter.removeOne,
    setAllMessages: messagesAdapter.setAll,
  },
});
