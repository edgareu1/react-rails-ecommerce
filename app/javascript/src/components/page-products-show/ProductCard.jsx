import React, { Component } from 'react';
import styled from 'styled-components';
import ProductDetails from './ProductDetails';

const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 5px;
  box-shadow: 1px 1px 2px var(--medium-dark);
  margin-bottom: 20px;
`

const CardImg = styled.img`
  height: 450px;
  width: 50%;
  border-radius: 5px 0 0 5px;
`

export default class ProductCard extends Component {
  render() {
    const { name, image_url } = this.props.product;

    return (
      <Container>
        <CardImg src={image_url} alt={name} />
        <ProductDetails product={this.props.product} />
      </Container>
    );
  }
}
