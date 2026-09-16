<template>
  <div class="card border-0 shadow-sm rounded-3 p-4 bg-white">
    <h6 class="text-muted small fw-normal mb-4">My Order</h6>

    
    <div v-if="transactions && transactions.length > 0" class="d-flex flex-column gap-3">
      <div 
        v-for="order in transactions" 
        :key="order.id" 
        class="card border border-light-subtle rounded-3 p-3 shadow-none position-relative"
      >

        <div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
          <span class="text-teal fw-semibold small d-flex align-items-center gap-1">
            <i class="fa-solid fa-bag-shopping"></i> Shopping
          </span>
          <span class="text-muted small">• {{ order.date }}</span>
          <span class="badge bg-success-subtle text-success border border-success-subtle fw-semibold px-2 py-1">
            {{ order.status || 'Done' }}
          </span>
          
          <div class="ms-auto d-flex align-items-center gap-2">
            <span class="text-muted small font-monospace text-truncate max-w-200">
              {{ order.code || order.id }}
            </span>
            
            <button 
              @click="removeTransaction(order.id)" 
              class="btn btn-sm btn-outline-danger border-0 p-1 ms-1"
              title="Delete transaction"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>

        
        <div class="d-flex justify-content-between align-items-start">
          <div class="d-flex gap-3">
            <img 
              :src="getOrderItemImage(order)" 
              class="rounded item-img" 
              alt="Product Image"
            />
            <div>
              <h6 class="fw-bold text-dark mb-1 small">
                {{ getOrderItemName(order) }}
              </h6>
              <p class="text-muted mb-0 extra-small">
                1 product x Rp{{ getOrderItemPrice(order).toLocaleString() }}
              </p>
              <p class="text-muted mb-0 extra-small">
                {{ order.items?.[0]?.size || '8 / M' }}
              </p>
              <p v-if="order.otherCount && order.otherCount > 0" class="text-muted extra-small mt-2 mb-0">
                + {{ order.otherCount }} more products
              </p>
            </div>
          </div>

          <div class="text-end">
            <span class="text-muted extra-small d-block">Total price</span>
            <span class="fw-bold text-dark small">
              Rp{{ (order.totalPrice || 400000).toLocaleString() }}
            </span>
          </div>
        </div>

        
        <div class="text-end mt-3">
          <button @click="handleBuyAgain(order)" class="btn btn-teal-solid btn-sm px-4 fw-semibold">
            Buy Again
          </button>
        </div>
      </div>
    </div>

    
    <div v-else class="text-center py-5 my-3">
      <div class="empty-icon-wrapper mx-auto mb-3">
        <i class="fa-solid fa-bag-shopping text-teal fs-2"></i>
      </div>
      <h5 class="fw-bold text-dark mb-2">No orders yet</h5>
      <p class="text-muted small mb-4">
        When you buy an item, your order about it will appear here.
      </p>
      <button @click="$router.push('/')" class="btn btn-teal-solid px-4 py-2 fw-semibold border-0">
        Shop now
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const transactions = computed(() => {
  return (
    store.state.transaction?.transactions ||
    store.getters["transaction/allTransactions"] ||
    JSON.parse(localStorage.getItem("transactions") || "[]")
  );
});

const removeTransaction = (transactionId) => {
  store.dispatch("transaction/deleteTransaction", transactionId);
};

const getOrderItemImage = (order) => {
  return order.items?.[0]?.image || order.items?.[0]?.imageLink || "https://via.placeholder.com/80";
};

const getOrderItemName = (order) => {
  return order.items?.[0]?.name || "Product Name";
};

const getOrderItemPrice = (order) => {
  return order.items?.[0]?.price || 200000;
};

const handleBuyAgain = (order) => {
  router.push("/");
};

onMounted(() => {
  if (store.dispatch) {
    store.dispatch("transaction/getTransactionHistory").catch(() => {});
  }
});
</script>

<style scoped>
.text-teal { color: #00897b; }
.item-img { width: 64px; height: 64px; object-fit: cover; }
.extra-small { font-size: 0.75rem; }
.max-w-200 { max-width: 200px; }
.empty-icon-wrapper {
  width: 72px; height: 72px;
  background-color: #e0f2f1;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.btn-teal-solid { background-color: #00897b; color: white; border-radius: 6px; }
.btn-teal-solid:hover { background-color: #00796b; color: white; }
</style>