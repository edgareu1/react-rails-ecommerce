import React, { Component } from 'react';
import { AppConsumer } from './AppContext';
import ProductCard from './ProductCard';

export default class ProductsList extends Component {
  render() {
    return (
      <AppConsumer>
        {value => {
          return value.products.map(product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
              >
              </ProductCard>
            );
          });
        }}
      </AppConsumer>
    );
  }
}
