import React, { Component } from 'react';
import { AppContext } from '../AppContext';
import styled from 'styled-components';
import displayPrice from '../../utils/displayPrice';

const Button = styled.button`
  width: 30px;
  margin: 0 8px;
`

export default class CartElement extends Component {
  static contextType = AppContext;

  handleDecrement = () => {
    this.context.decrement(this.props.element.id);
  }

  handleIncrement = () => {
    this.context.increment(this.props.element.id);
  }

  render() {
    const { name, price, count, total } = this.props.element;

    return (
      <tr>
        <td>{name}</td>
        <td>{displayPrice(price)}</td>

        <td>
          <Button className="button-dark" onClick={this.handleDecrement}>
            -
          </Button>

          {count}

          <Button className="button-dark" onClick={this.handleIncrement}>
            +
          </Button>
        </td>

        <td>{displayPrice(total)}</td>
      </tr>
    );
  }
}
