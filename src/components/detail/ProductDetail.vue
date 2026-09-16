<template>
  <div class="product-detail-component">
    <div class="detail-layout">
      
      <div class="detail-image-container">
        <img :src="product.image" :alt="product.name" />
      </div>

      
      <div class="detail-info-panel">
        <div class="detail-header-row">
          <h1 class="detail-price">
            Rp{{ product.price ? product.price.toLocaleString('id-ID') : 0 }}
          </h1>
          <button class="like-btn">❤️ {{ product.likes || 12 }}</button>
        </div>

        <h2 class="detail-title">{{ product.name }}</h2>
        <p class="detail-sub">
          {{ product.size }} / {{ product.brand }} • Very Good • Denpasar
        </p>

        <div class="detail-specs">
          <h3>Item Description</h3>
          <p class="description-text">
            Size XL but fits more like M looser fit has a few minor marks (pictured)
          </p>

          <div class="spec-row"><span>Category</span><span>Hoodies & Sweater</span></div>
          <div class="spec-row"><span>Size</span><span>{{ product.size }} / {{ product.brand }}</span></div>
          <div class="spec-row"><span>Condition</span><span>Very Good</span></div>
          <div class="spec-row"><span>Color</span><span>White</span></div>
          <div class="spec-row"><span>Uploaded</span><span>5 hours ago</span></div>
          <div class="spec-row"><span>Shipping</span><span>Rp20.000</span></div>
        </div>

        
        <div class="action-buttons">
          <button class="btn btn-teal-solid w-100 py-2 mb-2" @click="handleBuyNow">
            Buy Now
          </button>
          <button class="btn btn-teal-outline w-100 py-2" @click="handleAddToCart">
            Add to Cart
          </button>
        </div>

        
        <div v-if="showModal" class="modal-backdrop-custom">
          <div class="modal-card text-center p-4">
            
            <div class="icon-circle mx-auto mb-3">
              <i class="fa-solid fa-cart-shopping text-white fs-3"></i>
            </div>

            <h5 class="fw-bold mb-2">Product successfully added to cart</h5>
            <p class="text-muted small mb-4">
              "{{ product.name }}" successfully added to cart. Check now on the cart or continue shopping.
            </p>

            <button class="btn btn-teal-outline w-100 mb-2 py-2" @click="showModal = false">
              Continue shopping
            </button>
            <router-link to="/cart" class="btn btn-teal-solid w-100 py-2 text-decoration-none d-block">
              Go to cart
            </router-link>
          </div>
        </div>

        
        <div class="seller-card">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" 
            alt="Seller Avatar" 
            class="seller-avatar" 
          />
          <div>
            <p class="seller-name">Jack on the corner</p>
            <p class="seller-rating">⭐⭐⭐⭐⭐ (110)</p>
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


const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const store = useStore();
const router = useRouter();
const showModal = ref(false);


const loginStatus = computed(() => store.state.auth.isLogin);


const handleAddToCart = () => {
  if (!loginStatus.value) {
    router.push("/login");
    return;
  }
  store.dispatch("cart/addToCart", props.product);
  showModal.value = true;
};

const handleBuyNow = () => {
  if (!loginStatus.value) {
    router.push("/login");
    return;
  }
  store.dispatch("cart/addToCart", props.product);
  router.push("/cart");
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

.btn-teal-outline {
  background-color: transparent;
  color: #0d8a8a;
  border: 1px solid #0d8a8a;
  border-radius: 6px;
  font-weight: 600;
}
.btn-teal-outline:hover {
  background-color: #f0fdfd;
}

.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-card {
  background: white;
  border-radius: 12px;
  width: 340px;
}
.icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f59e0b;
}
</style>
