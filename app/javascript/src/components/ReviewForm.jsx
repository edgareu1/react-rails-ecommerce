import React, { Component, Fragment } from 'react';
import { AppContext } from './AppContext';

export default class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      content: '',
      score: ''
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

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      author: this.state.author,
      content: this.state.content,
      score: this.state.score
    };

    this.context.createProduct(data);
  }

  render() {
    const scoreOptions = [5,4,3,2,1].map(score => {
      return (
        <Fragment key={score}>
          <input
            type="radio"
            value={score}
            name="score"
            id={`score-${score}`}
            onChange={this.handleInputChange}
          />

          <label htmlFor={`score-${score}`} />
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
          {scoreOptions}
        </div>

        <input
          type="text"
          name="content"
          placeholder="Review Content"
          value={this.state.content}
          onChange={this.handleInputChange}
        />

        <button type="Submit">Create Review</button>
      </form>
    );
  }
}

ReviewForm.contextType = AppContext;
