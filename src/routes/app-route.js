import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../containers/Home';
import History from '../containers/History';

import Layout from '../layout';

import PrivateRoute from './private-route';

import { setAuthToken } from '../config/axios/axios-configuration';

const AppRoute = () => {
  const { token } = useSelector(state => state.auth);
  setAuthToken(token);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/history" component={History} />

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Layout(AppRoute);
