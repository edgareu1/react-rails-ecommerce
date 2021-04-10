import React, { Component } from "react";

const axios = require('axios');
const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    products: [],
    cart: [],
    cartNum: 0,
    cartSubtotal: 0,
    deliveryCost: 0,
    cartTotal: 0,
    currentProduct: {}
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  componentDidMount() {
    this.setProducts();
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  setProducts = async () => {
    const url = '/api/v1/products';
    const products = await axios.get(url)
      .then(response => {
        return response.data.map(product => {
          product.inCart = false;
          product.count = 0;
          product.total = 0;

          return product;
        });
      })
      .catch(error => {
        console.error(error.message);
        return [];
      });

    this.setState({ products });
  }

  // ------------------------------/------------------------------
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
  // ------------------------------/------------------------------
  setCurrentProduct = async (id, createdReview) => {
    const currentProduct = await this.getProduct(id);

    if (createdReview) {
      const reviewsList = currentProduct.reviews;
      const newReview = Object.assign({}, reviewsList[0], { isEditable: true });

      currentProduct.reviews = [newReview, ...reviewsList.slice(1)];
    }

    this.setState({ currentProduct });
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  mapProductsState = (callback, id) => {
    this.setState((prevState) => {
      const products = prevState.products.map(product => callback(product, id));
      return { products };

    }, this.setTotals);
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  addToCart = (id) => {
    const callback = (product, productId) => {
      if (product.id === productId) {
        const newProduct = Object.assign({}, product, {
          inCart: true,
          count: 1,
          total: product.price
        });
        return newProduct;

      } else {
        return product;
      }
    }

    this.mapProductsState(callback, id);
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  decrement = (id) => {
    const callback = (product, productId) => {
      if (product.id === productId) {
        const newProductCount = --product.count;
        const newProduct = Object.assign({}, product, {
          count: newProductCount,
          total: newProductCount * product.price,
          inCart: newProductCount !== 0
        });
        return newProduct;

      } else {
        return product;
      }
    }

    this.mapProductsState(callback, id);
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  increment = (id) => {
    const callback = (product, productId) => {
      if (product.id === productId) {
        const newProductCount = ++product.count;
        const newProduct = Object.assign({}, product, {
          count: newProductCount,
          total: newProductCount * product.price
        });
        return newProduct;

      } else {
        return product;
      }
    }

    this.mapProductsState(callback, id);
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  checkout = () => {
    const callback = (product) => {
      const newProduct = Object.assign({}, product, {
        count: 0,
        total: 0,
        inCart: false
      });
      return newProduct;
    }

    this.mapProductsState(callback);
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  setTotals = () => {
    this.setState((prevState) => {
      const cart = prevState.products.filter(product => product.inCart);
      let cartNum = 0;
      let cartSubtotal = 0;
      let deliveryCost = 0;

      cart.forEach(product => {
        cartNum += product.count;
        cartSubtotal += product.total;
      });

      if (cart.length > 0) {
        deliveryCost = Math.min(500, cartSubtotal * 0.1);
      }

      const cartTotal = cartSubtotal + deliveryCost;

      return {
        cart,
        cartNum,
        cartSubtotal,
        deliveryCost,
        cartTotal
      };
    });
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  createReview = async (data) => {
    const productId = this.state.currentProduct.id;
    const url = '/api/v1/products/' + productId + '/reviews';
    let errorMessage = '';

    const response = await axios.post(url, data)
      .then(response => JSON.parse(response.request.response))
      .catch(error => {
        console.error(error.message);
        return { errors: ['There was a network error'] };
      });

    if (response.was_created) {
      this.setCurrentProduct(productId, true);
    } else {
      errorMessage = response.errors[0];
    }

    const wasCreated = response.was_created ? true : false;

    return { wasCreated, errorMessage };
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  deleteReview = async (id) => {
    let productId = this.state.currentProduct.id;
    const url = '/api/v1/products/' + productId + '/reviews/' + id;

    await axios.delete(url)
      .catch(error => {
        console.error(error.message);
      });

    this.setCurrentProduct(productId);
  }

  // ------------------------------/------------------------------
  // ------------------------------/------------------------------
  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setCurrentProduct: this.setCurrentProduct,
          addToCart: this.addToCart,
          decrement: this.decrement,
          increment: this.increment,
          checkout: this.checkout,
          createReview: this.createReview,
          deleteReview: this.deleteReview
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppContext, AppProvider, AppConsumer };
