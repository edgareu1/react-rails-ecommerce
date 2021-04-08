import React, { Component } from 'react';
import { AppContext } from '../AppContext';
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  font-size: 32px;
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
  handleDelete = () => {
    this.context.deleteReview(this.props.reviewId);
  }

  render() {
    return (
      <Button onClick={this.handleDelete}>
        <DeleteIcon />
      </Button>
    );
  }
}

ReviewDelete.contextType = AppContext;
