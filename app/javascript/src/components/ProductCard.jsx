import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import displayPrice from '../utils/displayPrice';

const cardDimensions = `
  height: 400px;
  width: 400px;
  border-radius: 5px;
`

const cardText = `
  font-size: 20px;
  font-weight: bold;
  background: var(--main-light);
  min-width: 50px;
  padding: 8px 12px;
  border-radius: 2px;
  box-shadow: 1px 1px 2px var(--minor-blue);
`

const OuterCard = styled.div`
  ${cardDimensions}
`

const InnerCard = styled.div`
  position: relative;
  ${cardDimensions}
  box-shadow: 1px 1px 5px var(--minor-dark);
`

const CardImg = styled.img`
  height: 100%;
  width: 100%;
`

const CardTitle = styled.h3`
  position: absolute;
  top: 20px;
  left: 20px;
  ${cardText}
`

const CardPrice = styled.p`
  position: absolute;
  bottom: 20px;
  left: 20px;
  ${cardText}
`

export default class ProductCard extends Component {
  render() {
    const { id, name, image_url, price } = this.props.product;

    return (
      <OuterCard>
        <InnerCard>
          <CardTitle>
            {name.toUpperCase()}
          </CardTitle>

          <Link to={"/products/" + id}>
            <CardImg src={image_url} alt={name}></CardImg>
          </Link>

          <CardPrice>
            {displayPrice(price)}
          </CardPrice>
        </InnerCard>
      </OuterCard>
    );
  }
}
