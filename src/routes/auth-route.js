import React, { useEffect } from 'react';
import { Redirect, Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from '../containers/SignIn';

import NotFound from '../containers/NotFound';
import PublicRoute from './public-route';
import PrivateRoute from './private-route';

// eslint-disable-next-line import/extensions
import { setAuthToken } from '../config/axios/axios-configuration';

const AuthRoute = () => {
  const history = useHistory();
  const { token } = useSelector(state => state.auth);

  setAuthToken(token);

  useEffect(() => {
    if (token) return history.push('/home');
  }, [token]);

  return (
    <Switch>
      {!token && <PublicRoute path="/auth/sign-in" component={SignIn} />}
      <Redirect from="*" to="/" />
      <Route path="/not-found" component={NotFound} />
    </Switch>
  );
};

export default AuthRoute;
