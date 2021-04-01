import React, { Component } from "react";

const axios = require('axios');
const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentProductId: null
    };
  }

  componentDidMount() {
    this.setProducts();
  }

  setProducts = async () => {
    const url = '/api/v1/products';
    const productsList = await axios.get(url)
      .then(response => response.data)
      .catch(error => {
        console.log(error.message);
        return [];
      });

    this.setState(() => {
      return { products: productsList };
    });
  }

  getProduct = async (id) => {
    const defaultValue = {};

    if (isNaN(id)) return defaultValue;

    const url = '/api/v1/products/' + id;
    const product = await axios.get(url)
      .then(response => response.data)
      .catch(error => {
        console.log(error.message);
        return defaultValue;
      });

    this.setState(() => {
      return { currentProductId: id };
    });

    return product;
  }

  createProduct = async (data) => {
    const url = '/api/v1/products/' + this.state.currentProductId + '/reviews';

    const response = await axios.post(url, data)
      .then(response => JSON.parse(response.request.response))
      .catch(error => {
        console.error(error);
        return { network_error: true };
      });

    return response;
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          getProduct: this.getProduct,
          createProduct: this.createProduct
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppContext, AppProvider, AppConsumer };
