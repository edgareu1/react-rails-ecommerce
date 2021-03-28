import React, { Component, Fragment } from 'react';
import { AppConsumer } from './AppContext';

export default class Products extends Component {
  render() {
    return (
      <Fragment>
        <h1>Products</h1>

        <AppConsumer>
          {value => {
            return value.products.map(product => {
              return (
                <div key={product.id}>
                  <h2>{product.name}</h2>
                  <img src={product.image_url} alt={product.name} />
                  <p>{product.price}</p>
                </div>
              );
            });
          }}
        </AppConsumer>
      </Fragment>
    );
  }
}
