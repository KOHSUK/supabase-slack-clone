import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/slice';
import { channelsSlice } from './channels/slice';
import { messagesSlice } from './messages/slice';
import { usersSlice } from './users/slice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
    [channelsSlice.name]: channelsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
