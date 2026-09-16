<template>
  <div class="container py-4 mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold m-3">Cart</h3>
      <span class="badge bg-light text-dark border px-3 py-2 fw-normal">{{ totalItems }} Items</span>
    </div>

    <div class="row" v-if="cartItems.length > 0">
      <div class="col-lg-8">
        
        <div class="bg-light p-2 rounded-2 mb-3 small text-secondary">
          📍 Shipping to: <strong class="text-dark">Kuta, Badung</strong>
        </div>

        <div v-for="item in cartItems" :key="item.id" class="border-bottom py-3">
          <div class="row align-items-center">
            <div class="col-3 col-sm-2">
              <img :src="item.image" :alt="item.name" class="img-fluid rounded-2" />
            </div>
            <div class="col-9 col-sm-6">
              <h6 class="mb-1 text-dark">{{ item.name }}</h6>
              <p class="text-muted small mb-1">{{ item.size }}</p>
              <p class="fw-bold mb-0">Rp{{ item.price?.toLocaleString('id-ID') }}</p>
            </div>
            <div class="col-12 col-sm-4 d-flex justify-content-between align-items-center mt-2 mt-sm-0">
              <button class="btn btn-link text-danger p-0 text-decoration-none small" @click="removeItem(item.id)">
                Remove
              </button>
              <div class="input-group input-group-sm w-auto border rounded-2">
                <button class="btn btn-light border-0" @click="updateQty(item.id, item.quantity - 1)">-</button>
                <span class="px-3 d-flex align-items-center">{{ item.quantity }}</span>
                <button class="btn btn-light border-0" @click="updateQty(item.id, item.quantity + 1)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="card border-0 shadow-sm p-3 rounded-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fw-bold text-dark">Order Summary</span>
            <span class="fw-bold text-dark">Rp{{ totalPrice?.toLocaleString('id-ID') }}</span>
          </div>
          <p class="text-muted small mb-3">{{ totalItems }} items <span class="float-end">Not include shipping fee</span></p>

          <router-link to="/order-confirmation" class="btn btn-teal-solid w-100 py-2"
            > Checkout({{ totalItems }})
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <i class="fa-solid fa-basket-shopping text-muted fs-1 mb-3"></i>
      <h5>Your cart is empty</h5>
      <router-link to="/" class="btn btn-teal-solid mt-2">Start Shopping</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const cartItems = computed(() => store.getters["cart/cartItems"]);
const totalItems = computed(() => store.getters["cart/totalItems"]);
const totalPrice = computed(() => store.getters["cart/totalPrice"]);

const updateQty = (id, quantity) => {
  if (quantity < 1) {
    store.dispatch("cart/removeItem", id);
  } else {
    store.dispatch("cart/updateQuantity", { id, quantity });
  }
};

const removeItem = (id) => {
  store.dispatch("cart/removeItem", id);
};
</script>

<style scoped>
.btn-teal-solid {
  background-color: #0d8a8a;
  color: white;
  border: 1px solid #0d8a8a;
  border-radius: 6px;
  font-weight: 600;
}
.btn-teal-solid:hover {
  background-color: #0a6c6c;
  color: white;
}
</style>