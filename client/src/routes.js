import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import BuyModule from './pages/buy';
import BorrowModule from './pages/borrow';
import Login from './pages/login';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/buy' component={BuyModule} />
        <Route path='/borrow' component={BorrowModule} />
        <Route path='/login' component={Login} />
      </Switch>
    );
  }
}

export default Routes;
