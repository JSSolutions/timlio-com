import React from 'react';
import { Provider } from 'react-redux';
import renderRoutes from './routes';

const Root = ({ store }) => (
  <Provider store={store}>
    {renderRoutes()}
  </Provider>
);

export default Root;