import React, { Component, Fragment } from 'react';
import { AppContext } from './AppContext';

export default class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      content: '',
      rating: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const newProperty = event.target.name;
    const newValue = event.target.value;

    this.setState(() => {
      return { [newProperty]: newValue };
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const data = {
      author: this.state.author,
      content: this.state.content,
      rating: this.state.rating
    };

    const response = await this.context.createProduct(data);
    const errorsContainer = document.querySelector('.form-errors-container');

    if (response.network_error) {
      const errorMessage = 'There was a network error';
      errorsContainer.textContent = errorMessage;

    } else if (response.was_created) {
      errorsContainer.textContent = "";

      this.props.addReview(response.review);

      this.setState(() => {
        return {
          author: '',
          content: '',
          rating: ''
        }
      });

    } else {
      const errorMessage = response.errors[0];
      errorsContainer.textContent = errorMessage;
    }
  }

  render() {
    const ratingOptions = ['5', '4', '3', '2', '1'].map(rating => {
      return (
        <Fragment key={rating}>
          <input
            type="radio"
            value={rating}
            name="rating"
            id={`rating-${rating}`}
            onChange={this.handleInputChange}
            checked={this.state.rating === rating}
          />

          <label htmlFor={`rating-${rating}`} />
        </Fragment>
      )
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="author"
          placeholder="Review Author"
          value={this.state.author}
          onChange={this.handleInputChange}
        />

        <div className="stars">
          {ratingOptions}
        </div>

        <input
          type="text"
          name="content"
          placeholder="Review Content"
          value={this.state.content}
          onChange={this.handleInputChange}
        />

        <button type="Submit">Create Review</button>

        <div className="form-errors-container"></div>
      </form>
    );
  }
}

ReviewForm.contextType = AppContext;
