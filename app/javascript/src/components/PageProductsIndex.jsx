import React, { Component, Fragment } from 'react';
import PageHeader from './PageHeader';
import ProductsList from './ProductsList';

export default class PageProductsIndex extends Component {
  render() {
    return (
      <Fragment>
        <PageHeader>Products</PageHeader>
        <ProductsList></ProductsList>
      </Fragment>
    );
  }
}
