import React, { Component } from "react";

const axios = require('axios');
const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentProduct: {
        product: {},
        reviews: []
      }
    };
  }

  // ------------------------------/------------------------------
  componentDidMount() {
    this.setProducts();
  }

  // ------------------------------/------------------------------
  setProducts = async () => {
    const url = '/api/v1/products';
    const productsList = await axios.get(url)
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        return [];
      });

    this.setState(() => {
      return { products: productsList };
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

    this.setState(() => {
      return { currentProductId: id };
    });

    return product;
  }

  // ------------------------------/------------------------------
  setCurrentProduct = async (id) => {
    const product = await this.getProduct(id);
    const reviews = product.reviews;
    delete product.reviews;

    this.setState(() => {
      return {
        currentProduct: {
          product,
          reviews
        }
      }
    });
  }

  // ------------------------------/------------------------------
  createReview = async (data) => {
    const url = '/api/v1/products/' + this.state.currentProduct.product.id + '/reviews';
    const errorsContainer = document.querySelector('.form-errors-container');
    let errorMessage;

    const response = await axios.post(url, data)
      .then(response => JSON.parse(response.request.response))
      .catch(error => {
        console.error(error.message);
        return { network_error: true };
      });

    if (response.network_error) {
      errorMessage = 'There was a network error';

    } else if (response.was_created) {
      errorMessage = '';

      const product = await this.getProduct(this.state.currentProduct.product.id);
      delete product.reviews;

      this.setState((prevState) => {
        return {
          currentProduct: {
            product,
            reviews: [response.review, ...prevState.currentProduct.reviews.slice(0, 4)]
          }
        }
      });

    } else {
      errorMessage = response.errors[0];
    }

    errorsContainer.textContent = errorMessage;

    return response.was_created ? true : false;
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
