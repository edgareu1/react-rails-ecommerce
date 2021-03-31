import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PageHeader from './PageHeader';
import ReviewForm from './ReviewForm';

const CardContainer = styled.div`
  display: flex;
  width: 100%;
`

const CardImg = styled.img`
  height: 450px;
  width: 50%;
`

const CardContent = styled.div`
  height: 450px;
  width: 50%;
`

export default class ProductDetails extends Component {
  render() {
    const { name, image_url, price, average_rating } = this.props.product;

    return (
      <Fragment>
        <PageHeader>{name}</PageHeader>

        <CardContainer>
          <CardImg
            src={image_url}
            alt={name}
          />
          <CardContent>
            <h3>Rating: {average_rating}</h3>
            <h3>Price: {(Number(price) / 100).toFixed(2)} €</h3>
            <ReviewForm />
          </CardContent>
        </CardContainer>
      </Fragment>
    );
  }
}
