import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { supabase } from 'services/supabase';
import { definitions } from 'types/supabase';

export const channelsAdapter = createEntityAdapter<definitions['channels']>({
  selectId: (channel) => channel.id,
  sortComparer: (a, b) => a.slug.localeCompare(b.slug),
});

export type Channel = definitions['channels'];

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_: void, thunkAPI) => {
    try {
      const { body, error } = await supabase
        .from<Channel>('channels')
        .select('*');

      if (error) thunkAPI.rejectWithValue(error);

      return body;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ slug, user_id }: { slug: string; user_id: string }, thunkAPI) => {
    try {
      const { body, error } = await supabase
        .from<definitions['channels']>('channels')
        .insert([{ slug, created_by: user_id }]);

      if (error) thunkAPI.rejectWithValue(error);

      if (!body) {
        return null;
      }

      return { ...body[0], author: null } as definitions['channels'];
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    channelAddedOrUpdated: channelsAdapter.upsertOne,
    channelDeleted: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      if (action.payload) {
        channelsAdapter.setAll(state, action.payload);
      }
    });
    builder.addCase(addChannel.fulfilled, (state, action) => {
      if (action.payload) {
        channelsAdapter.addOne(state, action.payload);
      }
    });
  },
});
