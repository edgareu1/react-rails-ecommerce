import React, { Component } from 'react';
import styled from 'styled-components';
import ReviewElement from './ReviewElement';

const Container = styled.div`
  padding: 15px 10px 40px;
`

const Title = styled.h3`
  font-size: 32px;
  padding-left: 8px;
`

export default class ReviewsList extends Component {
  render() {
    return (
      <Container>
        <Title>Reviews</Title>

        <div className="reviews-list">
          {this.props.reviews.map(review => {
            return <ReviewElement key={review.id} review={review} />;
          })}
        </div>
      </Container>
    );
  }
}
