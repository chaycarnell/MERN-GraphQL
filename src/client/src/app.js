import React from 'react';
import { Dashboard } from './pages/pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Render = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        {/* <Route path="/someroute">
          <SomeComponent />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default Render;
