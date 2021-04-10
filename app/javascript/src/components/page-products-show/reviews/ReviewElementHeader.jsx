import React, { Component } from 'react';
import styled from 'styled-components';
import iconStyle from '../../../utils/iconStyle';
import ReviewDelete from './ReviewDelete';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
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
    ${iconStyle('005')}
    color: var(${color});
    font-size: 18px;
  `;
}

const GoldStar = styled.span`${star('--star-gold')}`
const DarkStar = styled.span`${star('--medium-dark')}`

export default class ReviewElementHeader extends Component {
  render() {
    const { id, author, rating, created_time_ago, isEditable } = this.props.review;

    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray[i] = i < rating ? <GoldStar key={i} /> : <DarkStar key={i} />;
    }

    return (
      <Container>
        <div>
          <Author>
            {author}

            <CreatedTimeAgo>
              - {created_time_ago} ago
            </CreatedTimeAgo>
          </Author>

          {starArray}
        </div>

        {isEditable && <ReviewDelete reviewId={id} />}
      </Container>
    );
  }
}
