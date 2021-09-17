import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
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

      if (error) thunkAPI.rejectWithValue(error);

      return body;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addMessage = createAsyncThunk<
  Message | null | undefined,
  { message: string; channel_id: string },
  { state: RootState }
>('messages/addMessage', async ({ message, channel_id }, thunkAPI) => {
  try {
    const author = thunkAPI.getState().user.user;

    if (!author) return null;

    const { body, error } = await supabase
      .from<definitions['messages']>('messages')
      .insert([{ message, channel_id, user_id: author.id }]);

    if (error) thunkAPI.rejectWithValue(error);

    if (!body) return null;

    return { ...body[0], author } as Message;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

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
    builder.addCase(addMessage.fulfilled, (state, action) => {
      if (action.payload) {
        messagesAdapter.addOne(state, action.payload);
      }
    });
  },
});
