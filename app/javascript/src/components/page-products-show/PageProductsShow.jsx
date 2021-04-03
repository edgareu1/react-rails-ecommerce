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
  componentDidMount() {
    const productId = Number(this.props.match.params.id);
    this.context.setCurrentProduct(productId);
  }

  render() {
    const currentProduct = this.context.currentProduct;

    return (
      <Fragment>
        {Object.keys(currentProduct).length ? (
            <Fragment>
              <PageHeader>{currentProduct.name}</PageHeader>

              <ContentContainer>
                <ProductDetails product={currentProduct} />
                <ReviewsList reviews={currentProduct.reviews} />
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
