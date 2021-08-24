import { createAsyncThunk } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'services/supabase/supabase-client';

export const signIn = createAsyncThunk<
  Session | null,
  string,
  { rejectValue: Error }
>('auth/signIn', async (email, thunkApi) => {
  const { error, session } = await supabase.auth.signIn(
    { email },
    { redirectTo: 'http://localhost:3000/messages' }
  );
  if (error) {
    return thunkApi.rejectWithValue(error);
  }

  return session;
});

export const signOut = createAsyncThunk<void, void, { rejectValue: Error }>(
  'auth/signOut',
  async (_, thunkApi) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
