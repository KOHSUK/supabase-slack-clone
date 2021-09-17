import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from 'services/supabase';
import { definitions } from 'types/supabase';

export type UserState = {
  user: definitions['users'] | null;
};

const initialState: UserState = {
  user: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, thunkAPI) => {
    try {
      const { body, error } = await supabase
        .from<definitions['users']>('users')
        .select('*')
        .eq('id', userId);

      if (error) thunkAPI.rejectWithValue(error);

      if (!body) {
        return null;
      }

      return body[0];
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    });
  },
});
