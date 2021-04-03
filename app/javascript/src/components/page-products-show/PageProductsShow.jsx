import React, { Component, Fragment } from 'react';
import { AppContext } from '../AppContext';
import styled from 'styled-components';
import PageHeader from '../PageHeader';
import ProductDetails from './ProductDetails';
import ProductNonExistent from './ProductNonExistent';
import ReviewsList from './ReviewsList';

const ContentContainer = styled.div`
  min-width: 900px;
  max-width: 900px;
  margin: 0 auto;
`

export default class PageProductsShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      reviews: []
    }

    this.addReview = this.addReview.bind(this);
  }

  async componentDidMount() {
    const productId = Number(this.props.match.params.id);
    const product = await this.context.getProduct(productId);
    const reviews = product.reviews;
    delete product.reviews;

    this.setState(() => {
      return {
        product,
        reviews
      }
    });
  }

  async addReview(newReview) {
    const productId = Number(this.props.match.params.id);
    const product = await this.context.getProduct(productId);
    delete product.reviews;

    this.setState(prevState => {
      return {
        product,
        reviews: [newReview, ...prevState.reviews.slice(0, 4)]
      }
    });
  }

  render() {
    return (
      <Fragment>
        {Object.keys(this.state.product).length ? (
            <Fragment>
              <PageHeader>{this.state.product.name}</PageHeader>

              <ContentContainer>
                <ProductDetails
                  product={this.state.product}
                  addReview={this.addReview}
                />
                <ReviewsList reviews={this.state.reviews} />
              </ContentContainer>
            </Fragment>
          ) : (
            <ProductNonExistent />
          )
        }
      </Fragment>
    );
  }
}

PageProductsShow.contextType = AppContext;
