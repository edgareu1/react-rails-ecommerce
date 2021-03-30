import React, { Component, Fragment } from 'react';

export default class ReviewForm extends Component {
  render() {
    const ratingOptions = [5,4,3,2,1].map(score => {
      return (
        <Fragment key={score}>
          <input
            type="radio"
            value={score}
            name="rating"
            id={`rating-${score}`}
          />
          <label htmlFor={`rating-${score}`}>
            {score}
          </label>
        </Fragment>
      )
    });

    return (
      <form>
        <input
          type="text"
          name="author"
          placeholder="Review Author"
        />
        {ratingOptions}
        <input
          type="text"
          name="content"
          placeholder="Review Content"
        />
        <button type="Submit">Create Review</button>
      </form>
    );
  }
}
