import React, { Component } from 'react';
import { AppConsumer } from '../AppContext';
import CartElement from './CartElement';

export default class CartList extends Component {
  render() {
    return (
      <table className="cart-list">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <AppConsumer>
            {value => {
              return value.cart.map(el => {
                return (
                  <CartElement key={el.id} element={el} />
                );
              });
            }}
          </AppConsumer>
        </tbody>
      </table>
    );
  }
}
