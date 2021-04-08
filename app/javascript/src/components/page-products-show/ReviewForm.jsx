import React, { Component } from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppContext';
import ReviewInputStars from './ReviewInputStars';

const inputDefaults = `
  background: var(--minor-dark);
  width: 90%;
  padding: 5px 10px;
  border: 1px solid var(--medium-dark);
  border-radius: 4px;
  margin-bottom: 15px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75%;
  padding: 30px 10%;
`

const Input = styled.input`
  ${inputDefaults}
  font-size: 16px;
`

const TextArea = styled.textarea`
  ${inputDefaults}
  font-size: 13px;
  height: 80px;
  resize: vertical;
`

const Button = styled.button`
  color: var(--main-light);
  background-color: var(--medium-dark);
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 1px var(--main-dark);
  width: 90%;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 2px var(--main-dark);
  margin-bottom: 10px;

  &:hover {
    background-color: var(--main-dark);
  }
`

const ErrorContainer = styled.div`
  color: rgba(255, 20, 20, 1);
  font-size: 20px;
  font-weight: bold;
`

 export default class ReviewForm extends Component {
  state = {
    author: '',
    content: '',
    rating: '',
    errorMessage: ''
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  handleInputChange = (event) => {
    const newProperty = event.target.name;
    const newValue = event.target.value;

    this.setState(() => {
      return { [newProperty]: newValue };
    });
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      author: this.state.author,
      content: this.state.content,
      rating: this.state.rating
    };

    const {wasCreated, errorMessage} = await this.context.createReview(data);

    if (wasCreated) {
      for (let key in data) {
        data[key] = '';
      }
    }

    this.setState(() => {
      return { ...data, errorMessage };
    });
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <ReviewInputStars
          onChange={this.handleInputChange}
          rating={this.state.rating}
        />

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

        <ErrorContainer>{this.state.errorMessage}</ErrorContainer>
      </Form>
    );
  }
}

ReviewForm.contextType = AppContext;
