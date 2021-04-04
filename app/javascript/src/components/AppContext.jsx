import React, { Component } from "react";

const axios = require('axios');
const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentProduct: {}
    };
  }

  // ------------------------------/------------------------------
  componentDidMount() {
    this.setProducts();
  }

  // ------------------------------/------------------------------
  setProducts = async () => {
    const url = '/api/v1/products';
    const products = await axios.get(url)
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        return [];
      });

    this.setState(() => {
      return { products };
    });
  }

  // ------------------------------/------------------------------
  getProduct = async (id) => {
    const defaultValue = {};

    if (isNaN(id)) return defaultValue;

    const url = '/api/v1/products/' + id;
    const product = await axios.get(url)
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        return defaultValue;
      });

    return product;
  }

  // ------------------------------/------------------------------
  setCurrentProduct = async (id, createdReview) => {
    const currentProduct = await this.getProduct(id);

    if (createdReview) {
      const reviewsList = currentProduct.reviews;
      const newReview = {
        ...reviewsList[0],
        isEditable: true
      };

      currentProduct.reviews = [newReview, ...reviewsList.slice(1)];
    }

    this.setState(() => {
      return { currentProduct }
    });
  }

  // ------------------------------/------------------------------
  createReview = async (data) => {
    const productId = this.state.currentProduct.id;
    const url = '/api/v1/products/' + productId + '/reviews';
    let errorMessage = '';

    const response = await axios.post(url, data)
      .then(response => JSON.parse(response.request.response))
      .catch(error => {
        console.error(error.message);
        return { errors: ['There was a network error'] }
      });

    if (response.was_created) {
      this.setCurrentProduct(productId, true);
    } else {
      errorMessage = response.errors[0];
    }

    const wasCreated = response.was_created ? true : false;

    return {wasCreated, errorMessage};
  }

  // ------------------------------/------------------------------
  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setCurrentProduct: this.setCurrentProduct,
          createReview: this.createReview
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppContext, AppProvider, AppConsumer };
