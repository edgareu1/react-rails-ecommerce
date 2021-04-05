import React, { Component, Fragment } from 'react';
import PageHeader from '../PageHeader';
import CartList from './CartList';

export default class PageProductsIndex extends Component {
  render() {
    return (
      <Fragment>
        <PageHeader>Cart</PageHeader>
        <CartList />
      </Fragment>
    );
  }
}
