import React from 'react';
import { useDispatch } from 'react-redux';
import { authSlice } from 'redux/auth/slice';
import { supabase } from 'services/supabase/supabase-client';

type Props = {
  children: React.ReactNode;
};

export const AuthListener: React.VFC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const session = supabase.auth.session();

  React.useEffect(() => {
    if (session) {
      // すでにログインしている場合
      dispatch(authSlice.actions.setSession({ session }));
    }

    // メールの確認等で認証された場合
    supabase.auth.onAuthStateChange((_event, _session) => {
      dispatch(authSlice.actions.setSession({ session: _session }));
    });
  }, [dispatch, session]);

  return <>{children}</>;
};
