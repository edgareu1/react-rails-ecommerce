import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import displayPrice from '../../utils/displayPrice';

const cardDimensions = `
  height: 400px;
  width: 400px;
  border-radius: 5px;
`

const cardText = `
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background: var(--main-light);
  padding: 10px 15px;
  white-space: nowrap;
  overflow: hidden;
`

const OuterCard = styled.div`
  ${cardDimensions}
`

const InnerCard = styled.div`
  ${cardDimensions}
  position: relative;
  box-shadow: 1px 1px 2px var(--medium-dark);
`

const CardImg = styled.img`
  height: 100%;
  width: 100%;
`

const CardTitle = styled.h3`
  ${cardText}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

const CardPrice = styled.p`
  ${cardText}
  position: absolute;
  bottom: 0;
  left: 0;
  border-top-right-radius: 5%;
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
