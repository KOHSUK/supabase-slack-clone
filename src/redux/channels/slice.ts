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
  'messages/fetchChannels',
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
  },
});
