import React, { Component } from 'react';
import styled from 'styled-components';
import displayPrice from '../../utils/displayPrice';
import iconStyle from '../../utils/iconStyle';
import ReviewForm from './reviews/ReviewForm';

const Container = styled.div`
  background: var(--main-light);
  height: 450px;
  width: 50%;
  border-radius: 0 5px 5px 0;
`

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 25%;
  padding: 15px 10%;
  border-bottom: 1px solid var(--medium-dark);

  h3 {
    font-size: 26px;
  }
`

const Star = styled.span`
  ${iconStyle('005')}
  color: var(--star-gold);
  padding-left: 8px;
`

export default class ProductDetails extends Component {
  render() {
    const { price, average_rating } = this.props.product;

    return (
      <Container>
        <CardDetails>
          <h3>
            Rating: {average_rating}
            <Star />
          </h3>

          <h3>Price: {displayPrice(price)}</h3>
        </CardDetails>

        <ReviewForm />
      </Container>
    );
  }
}
