import React, { Component } from 'react';
import styled from 'styled-components';
import displayPrice from '../utils/displayPrice';
import ReviewForm from './ReviewForm';

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 5px;
  box-shadow: 1px 1px 3px var(--minor-dark);
  margin: 20px 0;
`

const CardImg = styled.img`
  height: 450px;
  width: 50%;
  border-radius: 5px 0 0 5px;
  box-shadow: 1px 0 3px var(--minor-dark);
`

const CardContent = styled.div`
  background: var(--minor-dark);
  height: 450px;
  width: 50%;
`

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 25%;
  padding: 15px 10%;
  box-shadow: 0 1px 3px var(--minor-dark);
`

const ContentText = styled.h3`
  color: white;
  font-size: 26px;
`

const Star = styled.span`
  padding-left: 8px;

  &:after {
    color: var(--star-gold);
    font-family: FontAwesome;
    content: "\f005";
  }
`

export default class ProductDetails extends Component {
  render() {
    const { name, image_url, price, average_rating } = this.props.product;

    return (
      <CardContainer>
        <CardImg
          src={image_url}
          alt={name}
        />

        <CardContent>
          <CardDetails>
            <ContentText>
              Rating: {average_rating}
              <Star />
            </ContentText>

            <ContentText>
              Price: {displayPrice(price)}
            </ContentText>
          </CardDetails>

          <ReviewForm addReview={this.props.addReview} />
        </CardContent>
      </CardContainer>
    );
  }
}
