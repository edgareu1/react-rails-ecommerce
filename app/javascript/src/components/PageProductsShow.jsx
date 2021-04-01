import React, { Component, Fragment } from 'react';
import { AppContext } from './AppContext';
import styled from 'styled-components';
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
      };
    })
  }

  render() {
    return (
      <Fragment>
        {Object.keys(this.state.product).length ? (
            <ContentContainer>
              <ProductDetails product={this.state.product} />
              <ReviewsList reviews={this.state.reviews} />
            </ContentContainer>
          ) : (
            <ProductNonExistent />
          )
        }
      </Fragment>
    );
  }
}

PageProductsShow.contextType = AppContext;
