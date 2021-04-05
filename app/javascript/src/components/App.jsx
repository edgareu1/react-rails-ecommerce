import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './Navbar';
import PageDefault from './PageDefault';
import PageCart from './page-cart/PageCart';
import PageProductsIndex from './page-products-index/PageProductsIndex';
import PageProductsShow from './page-products-show/PageProductsShow';

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={PageProductsIndex} />
          <Route exact path="/cart" component={PageCart} />
          <Route path="/products/:id" component={PageProductsShow} />
          <Route component={PageDefault} />
        </Switch>
      </AppProvider>
    );
  }
}
