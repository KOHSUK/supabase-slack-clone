import { RootState } from '../store';

export const isAuthenticatedSelector = (state: RootState) =>
  state.auth.session != null;
