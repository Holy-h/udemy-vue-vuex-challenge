import { createStore } from 'vuex';

import defaultProducts from '../products.json';
import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

const store = createStore({
  state() {
    return {
      authentication: false,
      cart: { items: [], total: 0, qty: 0 },
      products: defaultProducts
    };
  },
  getters,
  mutations,
  actions
});

export default store;
