import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'services/supabase';
import { signIn, signOut } from './action';

export type AuthState = {
  session: Session | null;
  loading: boolean;
  error: Error | null | undefined;
};

const initialState: AuthState = {
  session: supabase.auth.session(),
  loading: false,
  error: null,
};

type SetSessionPayload = {
  session: Session | null;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SetSessionPayload>) => ({
      ...state,
      session: action.payload.session,
    }),
  },
  extraReducers: (builder) => {
    // signIn
    builder.addCase(signIn.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(signIn.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      session: action.payload,
    }));
    builder.addCase(signIn.rejected, (state, action) => ({
      ...state,
      loading: false,
      session: null,
      error: action.payload,
    }));

    // signOut
    builder.addCase(signOut.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(signOut.fulfilled, (state) => ({
      ...state,
      loading: false,
      session: null,
      error: null,
    }));
    builder.addCase(signOut.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }));
  },
});
