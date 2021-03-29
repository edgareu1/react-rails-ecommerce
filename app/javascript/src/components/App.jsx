import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Default from './Default';
import Navbar from './Navbar';
import Product from './Product';
import Products from './Products';

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/products/:id" component={Product} />
          <Route component={Default} />
        </Switch>
      </AppProvider>
    );
  }
}
