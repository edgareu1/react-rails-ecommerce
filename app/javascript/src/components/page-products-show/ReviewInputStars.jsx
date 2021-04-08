import React, { Component, Fragment } from 'react';

export default class ReviewInputStars extends Component {
  render() {
    const ratingOptions = ['5', '4', '3', '2', '1'].map(rating => {
      return (
        <Fragment key={rating}>
          <input
            type="radio"
            value={rating}
            name="rating"
            id={`rating-${rating}`}
            onChange={this.props.onChange}
            checked={this.props.rating === rating}
          />

          <label htmlFor={`rating-${rating}`} />
        </Fragment>
      )
    });

    return <div className="stars">{ratingOptions}</div>;
  }
}
