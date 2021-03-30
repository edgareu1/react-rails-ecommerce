import React, { Component, Fragment } from 'react';
import { AppContext } from './AppContext';
import ProductDetails from './ProductDetails';
import ProductNonExistent from './ProductNonExistent';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

export default class PageProductsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      reviews: []
    }
  }

  async componentDidMount() {
    const value = this.context;
    const productId = Number(this.props.match.params.id);
    const product = await value.getProduct(productId);
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
            <Fragment>
              <ProductDetails product={this.state.product} />
              <ReviewForm />
              <ReviewsList reviews={this.state.reviews} />
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
