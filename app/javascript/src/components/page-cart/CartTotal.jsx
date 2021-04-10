import React, { Component } from "react";
import { AppContext } from '../AppContext';
import styled from 'styled-components';
import displayPrice from '../../utils/displayPrice';

const MessageContainer = styled.div`
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
  margin-top: 10px;
`

const Button = styled.button`
  padding: 10px 28px;
  margin-bottom: 10px;
`

export default class CartTotal extends Component {
  static contextType = AppContext;

  state = {
    cartMessage: ''
  }

  handleCheckout = () => {
    let cartMessage;

    if (this.context.cart.length > 0) {
      this.context.checkout();
      cartMessage = 'Purchase was sucessful!';
    } else {
      cartMessage = 'Cart is empty!';
    }

    this.setState({ cartMessage });
  }

  render() {
    const { deliveryCost, cartTotal } = this.context;

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

        <Button className="button-dark" onClick={this.handleCheckout}>
          Checkout
        </Button>

        <MessageContainer>
          {this.state.cartMessage}
        </MessageContainer>
      </div>
    );
  }
}
