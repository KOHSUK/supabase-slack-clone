import React from 'react';
import { useDispatch } from 'react-redux';
import * as asyncActions from 'redux/auth/action';

export const useAuthAction = () => {
  const dispatch = useDispatch();

  const signIn = React.useCallback(
    async (email: string) => {
      await dispatch(asyncActions.signIn(email));
    },
    [dispatch]
  );

  const signOut = React.useCallback(async () => {
    await dispatch(asyncActions.signOut());
  }, [dispatch]);

  return {
    signIn,
    signOut,
  };
};
