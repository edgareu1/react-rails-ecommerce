import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75%;
  padding: 30px 10%;
`

const Input = styled.input`
  font-size: 16px;
  width: 90%;
  padding: 4px 8px;
  border: 1px solid var(--minor-dark);
  border-radius: 4px;
  margin: 15px 0;
`

const TextArea = styled.textarea`
  font-size: 13px;
  height: 80px;
  width: 90%;
  padding: 4px 8px;
  border: 1px solid var(--minor-dark);
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 15px;
`

const Button = styled.button`
  color: white;
  background-color: var(--minor-dark);
  font-size: 20px;
  font-weight: bold;
  width: 90%;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 4px var(--main-light);
  margin-bottom: 10px;

  &:hover {
    background-color: var(--minor-blue);
  }
`

const ErrorContainer = styled.div`
  color: yellow;
  font-size: 20px;
  font-weight: bold;
`

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
      <Form onSubmit={this.handleSubmit}>
        <div className="stars">
          {ratingOptions}
        </div>

        <Input
          type="text"
          name="author"
          placeholder="Author Name"
          value={this.state.author}
          onChange={this.handleInputChange}
        />

        <TextArea
          name="content"
          placeholder="Write review here"
          value={this.state.content}
          onChange={this.handleInputChange}
        />

        <Button type="Submit">Leave Review</Button>

        <ErrorContainer className="form-errors-container" />
      </Form>
    );
  }
}

ReviewForm.contextType = AppContext;
