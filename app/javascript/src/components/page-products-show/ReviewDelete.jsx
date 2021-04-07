import React, { Component } from 'react';
import { AppConsumer } from '../AppContext';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 32px;
  background: transparent;
  border: none;
  margin-right: 15px;
`

const DeleteIcon = styled.span`
  &:after {
    font-family: FontAwesome;
    content: "\f1f8";
  }

  &:hover {
    color: red;
  }
`

export default class ReviewDelete extends Component {
  render() {
    return (
      <AppConsumer>
        {value => {
          return (
            <Button onClick={() => value.deleteReview(this.props.reviewId)}>
              <DeleteIcon />
            </Button>
          );
        }}
      </AppConsumer>
    );
  }
}
