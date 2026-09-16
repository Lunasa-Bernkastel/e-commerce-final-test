import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      brands: [], 
      popularItems: [],
      newProducts: [],
      searchQuery: ""
    }
  },
  getters: {
    filteredPopularItems: (state) => {
      if (!state.searchQuery.trim()) return state.popularItems;
      const query = state.searchQuery.toLowerCase().trim();
      return state.popularItems.filter(item =>
        item.name?.toLowerCase().includes(query) || 
        item.title?.toLowerCase().includes(query)
      );
    },
    filteredNewProducts: (state) => {
      if (!state.searchQuery.trim()) return state.newProducts;
      const query = state.searchQuery.toLowerCase().trim();
      return state.newProducts.filter(item =>
        item.name?.toLowerCase().includes(query) || 
        item.title?.toLowerCase().includes(query)
      );
    }
  },
  mutations: {
    setStoreData(state, payload) { 
      state.brands = payload.brands; 
      state.popularItems = payload.popularItems; 
      state.newProducts = payload.newProducts; 
      console.log(payload.brands);
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    }
  },
  actions: {
    async fetchStoreData({ commit }) {
      try {
        const { data } = await axios.get(
          `https://finale-55d48-default-rtdb.firebaseio.com/products.json`
        );
        
        const parsedData = { brands: [], popularItems: [], newProducts: [] };
        
        if (data) {
          parsedData.brands = data.brands || [];
          parsedData.popularItems = data.popularItems || [];
          parsedData.newProducts = data.newProducts || [];
        }
        
        commit("setStoreData", parsedData);
      } catch (err) {
        console.log(err);
      }
    },
    setSearchQuery({ commit }, query) {
      commit("SET_SEARCH_QUERY", query);
    }
  }
};