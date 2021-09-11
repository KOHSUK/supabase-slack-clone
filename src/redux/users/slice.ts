import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { definitions } from 'types/supabase';

export const usersAdapter = createEntityAdapter<definitions['users']>({
  selectId: (user) => user.id,
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAddedOrUpdated: usersAdapter.upsertOne,
    setAllUsers: usersAdapter.setAll,
  },
});
