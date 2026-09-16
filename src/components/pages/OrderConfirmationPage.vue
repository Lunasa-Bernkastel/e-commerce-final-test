<template>
  <div class="bg-light py-5 min-vh-100">
    <div class="container">
      <div class="row g-4">
        
        
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm rounded-3 p-4 mb-4">
            <h6 class="text-muted small fw-normal mb-3">Order</h6>
            
            <div v-if="cartItems.length > 0" class="d-flex flex-column gap-3">
              <div 
                v-for="(item, index) in cartItems" 
                :key="item.id || index"
                class="d-flex align-items-center justify-content-between pb-3"
                :class="{ 'border-bottom': index !== cartItems.length - 1 }"
              >
                <div class="d-flex align-items-center gap-3">
                  <img 
                    :src="item.image || item.imageLink" 
                    :alt="item.name" 
                    class="rounded item-img"
                  />
                  <div>
                    <h6 class="fw-bold mb-1 text-dark fs-6">{{ item.name }}</h6>
                    <p class="text-muted small mb-1">{{ item.size || '8 / M' }}</p>
                    <p class="fw-bold text-dark small mb-0">Rp{{ (item.price || 200000).toLocaleString() }}</p>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3">
                  <span class="text-muted small fw-medium">x{{ item.quantity || 1 }}</span>
                  <button 
                    @click="removeItem(index, item.id)" 
                    class="btn btn-sm btn-outline-danger border-0 p-1"
                    title="Remove item"
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-4 text-muted small">
              No items in order confirmation. <router-link to="/">Continue shopping</router-link>
            </div>
          </div>

          
          <div class="card border-0 shadow-sm rounded-3 p-4 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="text-muted small fw-normal mb-0">Address</h6>
              <button @click="openAddressModal" class="btn btn-sm text-teal fw-semibold p-0 border-0 shadow-none">
                <i class="fa-solid fa-pen-to-square me-1"></i> Edit Address
              </button>
            </div>
            
            <div class="bg-light p-3 rounded-3 d-flex align-items-start gap-3 border border-light-subtle">
              <div class="icon-circle bg-teal-light text-teal flex-shrink-0">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div class="flex-grow-1">
                <h6 class="fw-bold mb-1 text-dark small">{{ shippingAddress.name }}</h6>
                <p class="text-muted small mb-0">{{ shippingAddress.detail }}</p>
              </div>
            </div>
          </div>

          
          <div class="card border-0 shadow-sm rounded-3 p-4 mb-4">
            <h6 class="text-muted small fw-normal mb-3">Delivery details</h6>
            <div class="bg-light p-3 rounded-3 d-flex align-items-start gap-3 border border-light-subtle">
              <div class="icon-circle bg-teal-light text-teal flex-shrink-0">
                <i class="fa-solid fa-check"></i>
              </div>
              <div>
                <h6 class="fw-bold mb-1 text-dark small">Fedex Express Shipping</h6>
                <p class="text-teal small fw-semibold mb-1">Rp20.000</p>
                <p class="text-muted small mb-0">
                  <i class="fa-regular fa-clock me-1"></i> Home delivery in 1-3 working days
                </p>
              </div>
            </div>
          </div>

          
          <div class="card border-0 shadow-sm rounded-3 p-4">
            <h6 class="text-muted small fw-normal mb-3">Payment Method</h6>
            <div class="bg-light p-3 rounded-3 d-flex align-items-center gap-3 border border-light-subtle">
              <span class="fw-black italic text-primary fs-5 tracking-wide ms-2">VISA</span>
              <div class="small">
                <p class="fw-bold text-dark mb-0">0819283210323</p>
                <p class="text-muted small mb-0">23/12 · 123</p>
                <p class="text-muted small mb-0">
                  <i class="fa-regular fa-id-card me-1"></i> Jack Daniel Arya
                </p>
              </div>
            </div>
          </div>

        </div>

        
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm rounded-3 p-4 sticky-top" style="top: 20px;">
            <h6 class="text-muted small fw-normal mb-3">Order summary</h6>
            
            <div class="d-flex justify-content-between text-muted small mb-2">
              <span>Order</span>
              <span class="fw-semibold text-dark">Rp{{ orderSubtotal.toLocaleString() }}</span>
            </div>
            <div class="d-flex justify-content-between text-muted small mb-2">
              <span>Protection fee</span>
              <span class="fw-semibold text-dark">Rp{{ (cartItems.length > 0 ? 20000 : 0).toLocaleString() }}</span>
            </div>
            <div class="d-flex justify-content-between text-muted small mb-3">
              <span>Shipping</span>
              <span class="fw-semibold text-dark">Rp{{ (cartItems.length > 0 ? 15000 : 0).toLocaleString() }}</span>
            </div>

            <hr class="my-3 text-muted" />

            <div class="d-flex justify-content-between align-items-center mb-4">
              <span class="fw-bold text-dark">Total to pay</span>
              <span class="fw-bold text-dark fs-5">Rp{{ totalToPay.toLocaleString() }}</span>
            </div>

            <button 
              @click="handleOrderNow" 
              :disabled="cartItems.length === 0"
              class="btn btn-teal-solid w-100 py-2.5 fw-semibold"
            >
              Order Now
            </button>
          </div>
        </div>

      </div>
    </div>

    
    <div v-if="showAddressModal" class="modal fade show d-block modal-backdrop-custom" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4 p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold text-dark mb-0">Change Shipping Address</h5>
            <button @click="showAddressModal = false" class="btn-close shadow-none"></button>
          </div>

          <div class="mb-3">
            <label class="form-label text-muted small fw-medium">Place / Recipient Name</label>
            <input 
              v-model="editForm.name" 
              type="text" 
              class="form-control rounded-2" 
              placeholder="e.g. Home, Office, or Recipient Name" 
            />
          </div>

          <div class="mb-4">
            <label class="form-label text-muted small fw-medium">Full Address Details</label>
            <textarea 
              v-model="editForm.detail" 
              rows="3" 
              class="form-control rounded-2" 
              placeholder="Street name, house number, district, city, zip code"
            ></textarea>
          </div>

          <div class="d-flex justify-content-end gap-2">
            <button @click="showAddressModal = false" class="btn btn-light px-4">Cancel</button>
            <button @click="saveAddress" class="btn btn-teal-solid px-4">Save Address</button>
          </div>
        </div>
      </div>
    </div>

    
    <div v-if="showModal" class="modal fade show d-block modal-backdrop-custom" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow rounded-4 p-4 text-center">
          <div class="my-2">
            <i class="fa-solid fa-cash-register fs-1 text-dark"></i>
          </div>

          <h5 class="fw-bold text-dark mt-2 mb-2">
            Order #{{ createdOrderId }} placed successfully
          </h5>

          <p class="text-muted small mb-4 px-2">
            Thank you for online shopping at Vintage. You can track and see your order on transaction history menu.
          </p>

          <div class="d-flex flex-column gap-2">
            <button @click="continueShopping" class="btn btn-outline-teal w-100 py-2 fw-semibold small">
              Continue shopping
            </button>
            <button @click="goToHistory" class="btn btn-teal-solid w-100 py-2 fw-semibold small">
              Go to History Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const showModal = ref(false);
const showAddressModal = ref(false);
const createdOrderId = ref("");


const defaultAddress = {
  name: "PT. Timedoor Indonesia",
  detail: "Jl. Tukad Yeh Aya IX No.46, Renon, Denpasar Selatan, Kota Denpasar, Bali 80226"
};


const savedAddress = localStorage.getItem("userShippingAddress");
const shippingAddress = ref(
  savedAddress ? JSON.parse(savedAddress) : defaultAddress
);

const editForm = ref({ name: "", detail: "" });

const openAddressModal = () => {
  editForm.value = { ...shippingAddress.value };
  showAddressModal.value = true;
};


const saveAddress = () => {
  if (editForm.value.name.trim() && editForm.value.detail.trim()) {
    shippingAddress.value = { ...editForm.value };
    localStorage.setItem("userShippingAddress", JSON.stringify(shippingAddress.value));
    showAddressModal.value = false;
  }
};

const localItems = ref([]);

const cartItems = computed(() => {
  const storeItems = store.state.cart?.items || store.state.cart || [];
  if (Array.isArray(storeItems) && storeItems.length > 0) {
    return storeItems;
  }
  return localItems.value;
});

const removeItem = (index, itemId) => {
  if (store.state.cart && typeof store.dispatch === "function") {
    try {
      store.dispatch("cart/removeItem", itemId || index);
    } catch (e) {
      console.log("Store remove fallback");
    }
  }
  localItems.value.splice(index, 1);
};

const orderSubtotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + ((item.price || 200000) * (item.quantity || 1)), 0);
});

const totalToPay = computed(() => {
  if (cartItems.value.length === 0) return 0;
  return orderSubtotal.value + 20000 + 15000;
});

const handleOrderNow = async () => {
  if (cartItems.value.length === 0) return;
  
  const commonCode = `ORD-${Date.now()}/XXI/VI/1920930123`;
  const currentDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  
  const itemsInCart = JSON.parse(JSON.stringify(cartItems.value));
  createdOrderId.value = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  const newTransactions = itemsInCart.map((item, index) => ({
    id: `ORD-${Math.floor(100000 + Math.random() * 900000)}-${index}`,
    date: currentDate,
    status: "Done",
    code: commonCode,
    items: [item],
    shippingAddress: { ...shippingAddress.value },
    otherCount: itemsInCart.length > 1 ? itemsInCart.length - 1 : 0,
    totalPrice: totalToPay.value
  }));

  const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
  const updatedHistory = [...newTransactions, ...existing];
  
  localStorage.setItem("transactions", JSON.stringify(updatedHistory));
  if (store.state.transaction) {
    store.commit("transaction/SET_TRANSACTIONS", updatedHistory);
  }

  try {
    await store.dispatch("cart/clearCart");
  } catch (err) {
    console.log("Cart clear simulated");
  }

  showModal.value = true;
};

const continueShopping = () => {
  showModal.value = false;
  router.push("/");
};

const goToHistory = () => {
  showModal.value = false;
  router.push("/user/transaction-history");
};
</script>

<style scoped>
.item-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
}
.bg-teal-light { background-color: #e6f4f4; }
.text-teal { color: #0d8a8a; }

.icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-teal-solid {
  background-color: #0d8a8a;
  color: white;
  border: 1px solid #0d8a8a;
  border-radius: 6px;
}
.btn-teal-solid:hover:not(:disabled) {
  background-color: #0a6c6c;
  color: white;
}
.btn-outline-teal {
  border: 1px solid #0d8a8a;
  color: #0d8a8a;
  background-color: transparent;
  border-radius: 6px;
}
.btn-outline-teal:hover {
  background-color: #e6f4f4;
  color: #0d8a8a;
}
.modal-backdrop-custom {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>