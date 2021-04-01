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

    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
  }

  handleAuthorChange(event) {
    const newAuthor = event.target.value;

    this.setState(() => {
      return { author: newAuthor };
    });
  }

  handleContentChange(event) {
    const newContent = event.target.value;

    this.setState(() => {
      return { content: newContent };
    });
  }

  handleScoreChange(event) {
    const newScore = event.target.value;

    this.setState(() => {
      return { score: newScore };
    });
  }

  render() {
    const ratingOptions = [5,4,3,2,1].map(score => {
      return (
        <Fragment key={score}>
          <input
            type="radio"
            value={score}
            name="rating"
            id={`rating-${score}`}
            onChange={this.handleScoreChange}
          />

          <label htmlFor={`rating-${score}`} />
        </Fragment>
      )
    });

    return (
      <form>
        <input
          type="text"
          name="author"
          placeholder="Review Author"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />

        <div className="stars">
          {ratingOptions}
        </div>

        <input
          type="text"
          name="content"
          placeholder="Review Content"
          value={this.state.content}
          onChange={this.handleContentChange}
        />

        <button type="Submit">Create Review</button>
      </form>
    );
  }
}

ReviewForm.contextType = AppContext;
