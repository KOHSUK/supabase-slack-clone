import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

type Props = {
  children: React.ReactNode;
}

export const StoreProvider: React.VFC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
