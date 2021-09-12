import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { supabase } from 'services/supabase';
import { definitions } from 'types/supabase';

export type Message = definitions['messages'] & {
  author: definitions['users'] | null;
};

export const messagesAdapter = createEntityAdapter<Message>({
  selectId: (message) => message.id,
});

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (channelId: number, thunkAPI) => {
    try {
      const { body, error } = await supabase
        .from<Message>('messages')
        .select(`*, author:user_id (*)`)
        .eq('channel_id', channelId)
        .order('inserted_at', { ascending: true });

      console.log('channel_id', channelId);
      console.log('messages:', body);

      if (error) thunkAPI.rejectWithValue(error);

      return body;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    messageAddedOrUpdated: messagesAdapter.upsertOne,
    messageDeleted: messagesAdapter.removeOne,
    setAllMessages: messagesAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      if (action.payload) {
        messagesAdapter.setAll(state, action.payload);
      }
    });
  },
});
