import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: var(--main-light);
  padding: 12px 18px;
  border-radius: 3px;
  box-shadow: 1px 1px 2px var(--medium-dark);
  margin: 20px 0 10px;
`

const Header = styled.div`
  padding-left: 3px;
  margin-bottom: 8px;
`

const Author = styled.h6`
  font-size: 18px;
  margin-bottom: 5px;
`

const CreatedTimeAgo = styled.span`
  font-size: 14px;
  font-weight: normal;
  padding-left: 8px;
`

const star = color => {
  return `
    &:after {
      color: var(${color});
      font-family: FontAwesome;
      font-size: 18px;
      content: "\f005";
    }
  `;
}

const GoldStar = styled.span`${star('--star-gold')}`
const DarkStar = styled.span`${star('--medium-dark')}`

export default class ReviewElement extends Component {
  render() {
    const { author, content, rating, created_time_ago } = this.props.review;

    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray[i] = i < rating ? <GoldStar key={i} /> : <DarkStar key={i} />;
    }

    return (
      <Container>
        <Header>
          <Author>
            {author}

            <CreatedTimeAgo>
              - {created_time_ago} ago
            </CreatedTimeAgo>
          </Author>

          {starArray}
        </Header>

        <p>{content}</p>
      </Container>
    );
  }
}
