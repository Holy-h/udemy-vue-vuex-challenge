export default {
  login(context) {
    context.commit('setAuth', { auth: true });
  },
  logout(context) {
    context.commit('setAuth', { auth: false });
  },
  addProductToCart(context, { productData }) {
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
    const cart = context.getters.getCart;
    const productInCartIndex = cart.items.findIndex(
      item => item.productId === prodId
    );
    const productData = cart.items[productInCartIndex];

    cart.items.splice(productInCartIndex, 1);
    cart.qty -= productData.qty;
    cart.total -= productData.price * productData.qty;

    context.commit('setCart', { newCart: cart });
  },
  changeProductQtyToCart(context, { prodId, newQty }) {
    const cart = context.getters.getCart;
    const productInCartIndex = cart.items.findIndex(
      item => item.productId === prodId
    );
    const productData = cart.items[productInCartIndex];

    const changeQty = newQty - productData.qty;

    productData.qty = newQty;

    cart.qty += changeQty;
    cart.total += productData.price * changeQty;

    context.commit('setCart', { newCart: cart });
  }
};
