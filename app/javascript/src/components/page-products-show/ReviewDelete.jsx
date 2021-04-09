import React, { Component } from 'react';
import { AppContext } from '../AppContext';
import styled from 'styled-components';
import iconStyle from '../../utils/iconStyle';

const Button = styled.button`
  background: transparent;
  font-size: 32px;
  border: none;
  margin-right: 15px;
`

const DeleteIcon = styled.span`
  ${iconStyle('1f8')}

  &:hover {
    color: red;
  }
`

export default class ReviewDelete extends Component {
  static contextType = AppContext;

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
