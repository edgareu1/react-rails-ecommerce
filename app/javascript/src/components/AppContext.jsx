import React, { Component } from "react";

const axios = require('axios');
const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cart: [],
      cartNum: 0,
      cartSubtotal: 0,
      deliveryCost: 0,
      cartTotal: 0,
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
      .then(response => {
        return response.data.map(el => {
          el.inCart = false;
          el.count = 0;
          el.total = 0;

          return el;
        });
      })
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
  addToCart = (id) => {
    const product = this.state.products.find(el => el.id === id);

    product.inCart = true;
    product.count = 1;
    product.total = product.price;

    this.setState(() => {
      return {
        cart: [...this.state.cart, product]
      }
    }, this.setTotals);
  }

  // ------------------------------/------------------------------
  decrement = (id) => {
    const product = this.state.products.find(el => el.id === id);

    product.count--;
    product.total = product.count * product.price;
    product.inCart = product.count !== 0;

    this.setState(() => {
      return { product }
    }, this.setTotals);
  }

  // ------------------------------/------------------------------
  increment = (id) => {
    const product = this.state.products.find(el => el.id === id);

    product.count++;
    product.total = product.count * product.price;

    this.setState(() => {
      return { product }
    }, this.setTotals);
  }

  // ------------------------------/------------------------------
  setTotals = () => {
    const cart = this.state.cart.filter(el => el.count > 0);
    let cartSubtotal = 0;
    let cartNum = 0;

    cart.forEach(el => {
      cartNum += el.count;
      cartSubtotal += el.total;
    });

    const deliveryCost = Math.max(500, cartSubtotal * 0.1);
    const cartTotal = cartSubtotal + deliveryCost;

    this.setState(() => {
      return {
        cart,
        cartNum,
        cartSubtotal,
        deliveryCost,
        cartTotal
      }
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
  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setCurrentProduct: this.setCurrentProduct,
          addToCart: this.addToCart,
          decrement: this.decrement,
          increment: this.increment,
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
