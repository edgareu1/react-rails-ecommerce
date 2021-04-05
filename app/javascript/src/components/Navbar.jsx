import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--minor-dark);
  padding: 10px 50px;
  border-bottom: 1px solid var(--medium-dark);
  margin-bottom: 20px;
`

const Logo = styled.span`
  &:after {
    font-family: FontAwesome;
    content: "\f02b";
  }
`

const Cart = styled.span`
  &:after {
    font-family: FontAwesome;
    content: "\f07a";
  }
`

export default class Navbar extends Component {
  render() {
    return (
      <Container id="navbar">
        <Link to={"/"}>
          <Logo />
        </Link>

        <Link to={"/cart"}>
          <Cart />
        </Link>
      </Container>
    );
  }
}
