import { RootState } from 'redux/store';
import { messagesAdapter } from './slice';

export const messagesSelectors = messagesAdapter.getSelectors<RootState>(
  (state) => state.messages
);
