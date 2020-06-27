import React from 'react';
import { Switch, Route } from "react-router";

import Login from './pages/Login';
import Dashboard from './pages/private/Dashboard';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
    </Switch>
  );
}

export default App;
