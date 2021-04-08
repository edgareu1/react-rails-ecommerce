import React, { Component } from 'react';
import styled from 'styled-components';
import ReviewElementHeader from './ReviewElementHeader';

const Container = styled.div`
  background: var(--main-light);
  padding: 12px 18px;
  border-radius: 3px;
  box-shadow: 1px 1px 2px var(--medium-dark);
  margin: 20px 0 10px;
`

export default class ReviewElement extends Component {
  render() {
    const review = this.props.review;

    return (
      <Container>
        <ReviewElementHeader review={review} />
        <p>{review.content}</p>
      </Container>
    );
  }
}
