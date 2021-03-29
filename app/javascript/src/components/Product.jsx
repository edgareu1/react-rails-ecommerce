import React, { Component } from 'react';
import { AppContext } from './AppContext';

export default class Product extends Component {
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
      <h1>Product</h1>
    );
  }
}

Product.contextType = AppContext;
