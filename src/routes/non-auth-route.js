/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SignUp from '../containers/signup';
import { setAuthToken } from '../config/axios/axios-configuration';

const NonAuthRoute = () => {
  const history = useHistory();
  const { token } = useSelector(state => state.auth);
  setAuthToken(token);

  useEffect(() => {
    if (token) return history.push('/home');
  }, [token]);

  return <Switch>{!token && <Route path="/non-auth/register" component={SignUp} />}</Switch>;
};

export default NonAuthRoute;
