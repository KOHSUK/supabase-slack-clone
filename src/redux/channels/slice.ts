import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { definitions } from 'types/supabase';

export const channelsAdapter = createEntityAdapter<definitions['channels']>({
  selectId: (channel) => channel.id,
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    channelAddedOrUpdated: channelsAdapter.upsertOne,
    channelDeleted: channelsAdapter.removeOne,
  },
});
