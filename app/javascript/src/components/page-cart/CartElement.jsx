import React, { Component } from 'react';
import styled from 'styled-components';
import { AppConsumer } from '../AppContext';
import displayPrice from '../../utils/displayPrice';

const Button = styled.button`
  color: var(--main-light);
  background-color: var(--medium-dark);
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 1px var(--main-dark);
  padding: 0 8px;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 2px var(--main-dark);
  margin: 0 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--main-dark);
  }
`

export default class CartElement extends Component {
  render() {
    const { id, name, price, count, total } = this.props.element;

    return (
      <AppConsumer>
        {value => {
          return (
            <tr>
              <td>{name}</td>
              <td>{displayPrice(price)}</td>
              <td>
                <Button onClick={() => { value.decrement(id) }}>-</Button>
                {count}
                <Button onClick={() => { value.increment(id) }}>+</Button>
              </td>
              <td>{displayPrice(total)}</td>
            </tr>
          );
        }}
      </AppConsumer>
    );
  }
}
