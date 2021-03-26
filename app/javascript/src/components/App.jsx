import React, { Component, Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';
import Default from './Default';
import Navbar from './Navbar';
import Product from './Product';
import Products from './Products';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/product/:id" component={Product} />
          <Route component={Default} />
        </Switch>
      </Fragment>
    );
  }
}
