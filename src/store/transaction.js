export default {
  namespaced: true,
  state: () => ({
    transactions: JSON.parse(localStorage.getItem("transactions") || "[]")
  }),
  getters: {
    allTransactions: (state) => state.transactions
  },
  mutations: {
    ADD_TRANSACTION(state, payload) {
      state.transactions.unshift(payload);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
      localStorage.setItem("transactions", JSON.stringify(payload));
    },
    DELETE_TRANSACTION(state, transactionId) {
      state.transactions = state.transactions.filter(
        (order) => order.id !== transactionId
      );
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    }
  },
  actions: {
    addTransaction({ commit }, transaction) {
      commit("ADD_TRANSACTION", transaction);
    },
    getTransactionHistory({ commit, state }) {
      const stored = localStorage.getItem("transactions");
      if (stored) {
        commit("SET_TRANSACTIONS", JSON.parse(stored));
      }
      return state.transactions;
    },
    deleteTransaction({ commit }, transactionId) {
      commit("DELETE_TRANSACTION", transactionId);
    }
  }
};