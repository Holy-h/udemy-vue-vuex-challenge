export default {
  setAuth(state, { auth }) {
    state.authentication = auth;
  },
  setCart(state, { newCart }) {
    state.cart = { ...newCart };
  }
};
