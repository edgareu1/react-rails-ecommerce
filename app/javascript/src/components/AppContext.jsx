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
  setCurrentProduct = async (id) => {
    const currentProduct = await this.getProduct(id);

    this.setState(() => {
      return { currentProduct }
    });
  }

  // ------------------------------/------------------------------
  createReview = async (data) => {
    const url = '/api/v1/products/' + this.state.currentProduct.id + '/reviews';
    const errorsContainer = document.querySelector('.form-errors-container');
    let errorMessage = '';

    const response = await axios.post(url, data)
      .then(response => JSON.parse(response.request.response))
      .catch(error => {
        console.error(error.message);
        return { errors: ['There was a network error'] }
      });

    if (response.was_created) {
      this.setCurrentProduct(this.state.currentProduct.id);
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
