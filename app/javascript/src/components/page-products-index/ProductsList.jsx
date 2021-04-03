import React, { Component } from 'react';
import { AppConsumer } from '../AppContext';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 35px 25px;
  justify-items: center;
  padding: 20px 25px 0;
  margin: 0 auto 40px;
`

export default class ProductsList extends Component {
  render() {
    return (
      <ProductsGrid>
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
      </ProductsGrid>
    );
  }
}
