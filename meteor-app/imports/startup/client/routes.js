import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import MainLayout from '../../ui/layouts/MainLayout';
import Home from '../../ui/pages/Home';

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
);

render(renderRoutes(), document.getElementById('app'));