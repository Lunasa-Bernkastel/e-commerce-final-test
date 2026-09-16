export default {
  namespaced: true,
  state: () => ({
    items: JSON.parse(localStorage.getItem("cartItems")) || []
  }),
  getters: {
    cartItems: (state) => state.items,
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    UPDATE_QUANTITY(state, { id, quantity }) {
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    REMOVE_ITEM(state, id) {
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit("ADD_TO_CART", product);
    },
    updateQuantity({ commit }, payload) {
      commit("UPDATE_QUANTITY", payload);
    },
    removeItem({ commit }, id) {
      commit("REMOVE_ITEM", id);
    }
  }
};