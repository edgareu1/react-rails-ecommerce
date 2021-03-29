import React, { Component, Fragment } from 'react';
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
    const { name, image_url, price } = this.state.product;
    const reviews = this.state.reviews;

    return (
      <Fragment>
        <h1>Product</h1>

        {name ? (
            <div>
              <h2>{name}</h2>
              <img
                src={image_url}
                alt={name}
              />
              <p>{price}</p>

              <div>
                {reviews.map(review => {
                  return (
                    <div>
                      <h6>{review.author} ({review.score})</h6>
                      <p>{review.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>Product does not exist!</p>
          )
        }
      </Fragment>
    );
  }
}

Product.contextType = AppContext;
