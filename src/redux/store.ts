import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/slice';
import { channelsSlice } from './channels/slice';
import { messagesSlice } from './messages/slice';
import { userSlice } from './user/slice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
    [channelsSlice.name]: channelsSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
