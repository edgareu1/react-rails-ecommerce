import React, { Component } from 'react';
import styled from 'styled-components';
import { AppConsumer } from '../AppContext';
import displayPrice from '../../utils/displayPrice';

const Button = styled.button`
  width: 30px;
  margin: 0 8px;
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
                <Button
                  className="button-dark"
                  onClick={() => { value.decrement(id) }}
                >
                  -
                </Button>
                {count}
                <Button
                  className="button-dark"
                  onClick={() => { value.increment(id) }}
                >
                  +
                </Button>
              </td>

              <td>{displayPrice(total)}</td>
            </tr>
          );
        }}
      </AppConsumer>
    );
  }
}
