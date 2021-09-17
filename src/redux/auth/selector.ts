import { RootState } from '../store';

export const isAuthenticatedSelector = (state: RootState) =>
  state.auth.session != null;

export const authUserSelector = (state: RootState) => state.auth.session?.user;
