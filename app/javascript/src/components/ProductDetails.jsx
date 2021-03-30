import React, { Component } from 'react';
import PageHeader from './PageHeader';

export default class ProductDetails extends Component {
  render() {
    const { name, image_url, price } = this.props.product;

    return (
      <div>
        <PageHeader>{name}</PageHeader>
        <img
          src={image_url}
          alt={name}
        />
        <p>{price}</p>
      </div>
    );
  }
}
