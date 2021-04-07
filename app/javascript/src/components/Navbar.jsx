import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AppConsumer } from './AppContext';
import styled from 'styled-components';

const IconLogo = styled.span`
  &:after {
    font-family: FontAwesome;
    content: "\f02b";
  }
`

const IconCart = styled.span`
  &:after {
    font-family: FontAwesome;
    content: "\f07a";
  }
`

export default class Navbar extends Component {
  render() {
    return (
      <div id="navbar">
        <Link to={"/"}>
          <IconLogo />
        </Link>

        <Link to={"/cart"}>
          <AppConsumer>
            {value => {
              return (
                <span className="cart-number">
                  {value.cartNum !== 0 ? `(${value.cartNum})` : ''}
                </span>
              );
            }}
          </AppConsumer>

          <IconCart />
        </Link>
      </div>
    );
  }
}
