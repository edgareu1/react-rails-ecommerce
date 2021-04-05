import React, { Component } from 'react';
import displayPrice from '../../utils/displayPrice';

export default class CartElement extends Component {
  render() {
    const { name, price, count, total } = this.props.element;

    return (
      <tr>
        <td>{name}</td>
        <td>{displayPrice(price)}</td>
        <td>{count}</td>
        <td>{displayPrice(total)}</td>
      </tr>
    );
  }
}
