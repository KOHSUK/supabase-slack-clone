import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouteProps, Route } from 'react-router-dom';
import { isAuthenticatedSelector } from 'redux/auth/selector';

export const PublicRoute: React.VFC<RouteProps> = (props) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  if (isAuthenticated) {
    return <Navigate to="/channels" />;
  }

  return <Route {...props} />;
};
