import React, { Component } from 'react';

export default class ProductCard extends Component {
  render() {
    const { name, image_url, price } = this.props.product;

    return (
      <div>
        <h2>{name}</h2>
        <img src={image_url} alt={name} />
        <p>{price}</p>
      </div>
    );
  }
}
