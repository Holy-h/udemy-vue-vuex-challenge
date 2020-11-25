import { createStore } from 'vuex';

import defaultProducts from './products.json';

const store = createStore({
  state() {
    return {
      authentication: false,
      cart: { items: [], total: 0, qty: 0 },
      products: defaultProducts
    };
  },
  getters: {
    isLoggedIn(state) {
      return state.authentication;
    },
    getCart(state) {
      return state.cart;
    },
    getProducts(state) {
      console.group('getProducts');
      console.log(state.products);
      console.groupEnd();
      return state.products;
    }
  },
  mutations: {
    setAuth(state, payload) {
      state.authentication = payload.auth;
    },
    setCart(state, { newCart }) {
      console.group('setCart');
      console.log(newCart);
      console.groupEnd();
      state.cart = { ...newCart };
    }
  },
  actions: {
    login(context) {
      console.log('login');
      context.commit('setAuth', { auth: true });
    },
    logout(context) {
      console.log('logout');
      context.commit('setAuth', { auth: false });
    },
    addProductToCart(context, { productData }) {
      console.log('addProductToCart');
      console.log(productData);

      const cart = context.getters.getCart;
      const productInCartIndex = cart.items.findIndex(
        item => item.productId === productData.id
      );

      if (productInCartIndex >= 0) {
        cart.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1
        };
        cart.items.push(newItem);
      }
      cart.qty++;
      cart.total += productData.price;
      context.commit('setCart', { newCart: cart });
    },
    removeProductFromCart(context, { prodId }) {
      console.group('removeProductFromCart');
      const cart = context.getters.getCart;
      console.log({ ...cart });
      const productInCartIndex = cart.items.findIndex(
        item => item.productId === prodId
      );
      const productData = cart.items[productInCartIndex];
      console.log(productData);

      cart.items.splice(productInCartIndex, 1);
      cart.qty -= productData.qty;
      cart.total -= productData.price * productData.qty;

      console.log({ ...cart });
      console.groupEnd();
      context.commit('setCart', { newCart: cart });
    }
  }
});

export default store;
