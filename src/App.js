/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './static/css/style.css';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import AppRoute from './routes/app-route';
import NonAuthRoute from './routes/non-auth-route';
import AuthRoute from './routes/auth-route';
import Store from './redux/store/index';
import { theme } from './theme/themeVariables';
const persistor = persistStore(Store);

const ProviderConfig = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ConfigProvider direction="ltr">
      <ThemeProvider theme={{ ...theme, rtl: false, topMenu: false, darkMode: false }}>
        <Router>
          <Switch>
            <AuthRoute path="/auth" />
            <NonAuthRoute path="/non-auth" />
            <AppRoute path="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProviderConfig />
      </PersistGate>
    </Provider>
  );
}

export default hot(App);
