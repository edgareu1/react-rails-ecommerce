import React, { Component } from 'react';

export default class ReviewElement extends Component {
  render() {
    const { author, content, rating } = this.props.review;

    return (
      <div>
        <h6>{author} -/- {rating}/5</h6>
        <p>{content}</p>
      </div>
    );
  }
}
