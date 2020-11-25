export default {
  isLoggedIn(state) {
    return state.authentication;
  },
  getCart(state) {
    return state.cart;
  },
  getProducts(state) {
    return state.products;
  }
};
