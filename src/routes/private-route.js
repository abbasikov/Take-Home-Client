import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, withLayout: Layout, ...rest }) => {
  const history = useHistory();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (!token || token === '') history.push('/auth/sign-in');
  }, [token]);

  return token && <Route path={rest.path} component={Component} />;
};

export default PrivateRoute;
