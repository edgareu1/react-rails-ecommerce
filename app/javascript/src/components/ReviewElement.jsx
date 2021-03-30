import React, { Component } from 'react';

export default class ReviewElement extends Component {
  render() {
    const { author, content, score } = this.props.review;

    return (
      <div>
        <h6>{author} -/- {score}/5</h6>
        <p>{content}</p>
      </div>
    );
  }
}
