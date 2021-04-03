import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  padding: 12px 18px;
  border-radius: 3px;
  box-shadow: 1px 1px 2px var(--minor-dark);
  margin: 20px 0 10px;
`

const Header = styled.div`
  padding-left: 3px;
  margin-bottom: 8px;
`

const Author = styled.h6`
  font-size: 18px;
  margin-bottom: 4px;
`

const star = color => {
  return `
    &:after {
      color: var(${color});
      font-size: 18px;
      font-family: FontAwesome;
      content: "\f005";
    }
  `;
}

const GoldStar = styled.span`${star('--star-gold')}`
const DarkStar = styled.span`${star('--minor-dark')}`

export default class ReviewElement extends Component {
  render() {
    const { author, content, rating } = this.props.review;

    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray[i] = i < rating ? <GoldStar key={i} /> : <DarkStar key={i} />;
    }

    return (
      <Container>
        <Header>
          <Author>{author}</Author>
          {starArray}
        </Header>

        <p>{content}</p>
      </Container>
    );
  }
}
