import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';
import { definitions } from 'types/supabase';

export type CurrentUserState = {
  user: User | null;
  userRoles: definitions['user_roles'][];
};

const initialState: CurrentUserState = {
  user: null,
  userRoles: [],
};

type SetUserPayload = {
  user: User | null;
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      state.user = action.payload.user;
    },
  },
});
