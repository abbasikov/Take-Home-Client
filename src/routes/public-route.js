/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ component: Component, ...rest }) => (
  <div>
    <Route {...rest} render={props => <Component {...props} />} />
  </div>
);

export default PublicRoute;
