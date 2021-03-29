import React, { Component } from "react";

const AppContext = React.createContext();
const baseUrl = 'http://localhost:3000';

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.setProducts();
  }

  setProducts = async () => {
    const url = baseUrl + '/api/v1/products';
    const productsList = await fetch(url)
      .then(response => response.json());

    this.setState(() => {
      return { products: productsList };
    });
  }

  getProduct = async (id) => {
    if (isNaN(id)) return {};

    const url = baseUrl + '/api/v1/products/' + id;
    const product = await fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.log(error.message);
        return {};
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

export { AppProvider, AppConsumer };
