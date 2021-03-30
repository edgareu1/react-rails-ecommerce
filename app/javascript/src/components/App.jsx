import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './Navbar';
import PageDefault from './PageDefault';
import PageProductsIndex from './PageProductsIndex';
import PageProductsShow from './PageProductsShow';

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={PageProductsIndex} />
          <Route path="/products/:id" component={PageProductsShow} />
          <Route component={PageDefault} />
        </Switch>
      </AppProvider>
    );
  }
}
