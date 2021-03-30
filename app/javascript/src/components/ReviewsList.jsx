import React, { Component } from 'react';
import ReviewElement from './ReviewElement';

export default class ReviewsList extends Component {
  render() {
    return (
      <div>
        {this.props.reviews.map(review => {
          return (
            <ReviewElement
              key={review.id}
              review={review}
            />
          );
        })}
      </div>
    );
  }
}
