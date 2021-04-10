import React, { Component, Fragment } from 'react';
import { AppContext } from '../AppContext';
import PageHeader from '../PageHeader';
import ProductCard from './ProductCard';
import ProductNonExistent from './ProductNonExistent';
import ReviewsList from './reviews/ReviewsList';

export default class PageProductsShow extends Component {
  static contextType = AppContext;

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

              <div className="page-container">
                <ProductCard product={currentProduct} />
                <ReviewsList reviews={currentProduct.reviews} />
              </div>
            </Fragment>
          ) : (
            <ProductNonExistent />
          )
        }
      </Fragment>
    );
  }
}
