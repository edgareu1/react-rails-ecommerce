import React, { Component, Fragment } from 'react';
import PageHeader from '../PageHeader';
import CartList from './CartList';
import CartTotal from './CartTotal';

export default class PageProductsIndex extends Component {
  render() {
    return (
      <Fragment>
        <PageHeader>Cart</PageHeader>

        <div className="page-container">
          <CartList />
          <CartTotal />
        </div>
      </Fragment>
    );
  }
}
