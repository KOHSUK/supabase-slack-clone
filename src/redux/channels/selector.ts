import { RootState } from 'redux/store';
import { channelsAdapter } from './slice';

export const channelsSelectors = channelsAdapter.getSelectors<RootState>(
  (state) => state.channels
);
