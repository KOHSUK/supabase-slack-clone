import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouteProps, Route } from 'react-router-dom';
import { isAuthenticatedSelector } from 'redux/auth/selector';

export const PrivateRoute: React.VFC<RouteProps> = (props) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <Route {...props} />;
};
