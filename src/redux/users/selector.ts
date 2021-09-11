import { RootState } from 'redux/store';
import { usersAdapter } from './slice';

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
);
