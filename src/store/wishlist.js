export default {
  namespaced: true,
  state: () => ({
    items: JSON.parse(localStorage.getItem("wishlistItems")) || []
  }),
  getters: {
    wishlistItems: (state) => state.items,
    totalWishlistItems: (state) => state.items.length,
    isInWishlist: (state) => (productId) => {
      return state.items.some((item) => String(item.id) === String(productId));
    }
  },
  mutations: {
    TOGGLE_WISHLIST(state, product) {
      const index = state.items.findIndex((item) => String(item.id) === String(product.id));
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    }
  },
  actions: {
    toggleWishlist({ commit }, product) {
      commit("TOGGLE_WISHLIST", product);
    }
  }
};