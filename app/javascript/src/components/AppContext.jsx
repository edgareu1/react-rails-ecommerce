import React, { Component } from "react";

const axios = require('axios');
const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
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

    return product;
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          getProduct: this.getProduct
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppContext, AppProvider, AppConsumer };
