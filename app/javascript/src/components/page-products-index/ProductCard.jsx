import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../AppContext';
import styled from 'styled-components';
import displayPrice from '../../utils/displayPrice';

// Style variables
const styleCardDimensions = `
  height: 400px;
  width: 400px;
  border-radius: 5px;
`

const styleCardText = `
  position: absolute;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background: var(--main-light);
  padding: 10px 15px;
  white-space: nowrap;
  overflow: hidden;
`

// HTML elements
const Container = styled.div`
  ${styleCardDimensions}
  position: relative;
  box-shadow: 1px 1px 2px var(--medium-dark);
`

const CardImg = styled.img`
  height: 100%;
  width: 100%;
`

const CardTitle = styled.h3`
  ${styleCardText}
  top: 0;
  left: 0;
  width: 100%;
`

const CardPrice = styled.p`
  ${styleCardText}
  bottom: 0;
  left: 0;
  border-radius: 0 5%;
`

const CardButton = styled.button`
  ${styleCardText}
  right: 0;
  bottom: 0;
  font-size: 24px;
  padding: 12px 18px;
  border: none;
  border-radius: 5% 0;

  &:disabled {
    background: var(--minor-light);

    span {
      color: var(--medium-dark);
    }
  }
`

const Cart = styled.span`
  &:after {
    font-family: FontAwesome;
    content: "\f07a";
  }
`

export default class ProductCard extends Component {
  handleClick = () => {
    this.context.addToCart(this.props.product.id);
  }

  render() {
    const { id, name, image_url, price, inCart } = this.props.product;

    return (
      <Container>
        <Link to={"/products/" + id}>
          <CardImg src={image_url} alt={name}></CardImg>
        </Link>

        <CardTitle>
          {name.toUpperCase()}
        </CardTitle>

        <CardPrice>
          {displayPrice(price)}
        </CardPrice>

        <CardButton disabled={inCart} onClick={this.handleClick}>
          <Cart />
        </CardButton>
      </Container>
    );
  }
}

ProductCard.contextType = AppContext;
