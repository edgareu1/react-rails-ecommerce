import React, { Component } from "react";
import styled from 'styled-components';
import { AppConsumer } from '../AppContext';
import displayPrice from '../../utils/displayPrice';

const Button = styled.button`
  color: var(--main-light);
  background-color: var(--medium-dark);
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 1px var(--main-dark);
  padding: 10px 28px;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 2px var(--main-dark);
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--main-dark);
  }
`

export default class CartTotal extends Component {
  render() {
    return (
      <AppConsumer>
        {value => {
          const { deliveryCost, cartTotal, checkout } = value;

          return (
            <div className="cart-total">
              <table>
                <tbody>
                  <tr>
                    <td>Delivery:</td>
                    <td>{displayPrice(deliveryCost)}</td>
                  </tr>

                  <tr>
                    <td>Total:</td>
                    <td>{displayPrice(cartTotal)}</td>
                  </tr>
                </tbody>
              </table>

              <Button onClick={checkout}>Checkout</Button>
            </div>
          );
        }}
      </AppConsumer>
    );
  }
}
