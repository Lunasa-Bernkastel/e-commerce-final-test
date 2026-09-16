<template>
  <div class="container py-4 mt-5">
    
    <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <h3 class="fw-bold m-3">Favorite items</h3>
      <span class="badge bg-light text-secondary border px-3 py-2 fw-normal">
        {{ wishlistItems.length > 0 ? `${totalWishlistItems} Items` : "You don't have any favorite item yet" }}
      </span>
    </div>

    
    <div v-if="wishlistItems.length > 0" class="row g-3">
      <div 
        v-for="item in wishlistItems" 
        :key="item.id" 
        class="col-6 col-md-4 col-lg-2"
      >
        <div class="card border-0 h-100 product-card" @click="goToProduct(item.id)">
          <img :src="item.image" :alt="item.name" class="card-img-top rounded-2 product-img" />
          <div class="card-body p-2">
            <h6 class="fw-bold text-teal mb-1">
              Rp{{ item.price ? item.price.toLocaleString('id-ID') : '0' }}
            </h6>
            <p class="text-dark small text-truncate mb-1">{{ item.name }}</p>
            <div class="d-flex justify-content-between align-items-center small text-muted">
              <span>{{ item.size || 'M' }}</span>
              <button 
                class="btn btn-link text-danger p-0 text-decoration-none border-0" 
                @click.stop="removeWishlist(item)"
              >
                ❤️ {{ item.likes || 12 }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div v-else class="text-center py-5">
      <div class="empty-folder-icon mx-auto mb-3">
        <i class="fa-solid fa-folder-minus text-white fs-2"></i>
      </div>

      <h4 class="fw-bold mb-2">No favorite items yet</h4>
      <p class="text-muted small mb-4">
        When add item to favorite, the item will appear<br />on the favorite list.
      </p>

      <router-link to="/" class="btn btn-teal-solid px-4 py-2 text-decoration-none">
        Find Products
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const wishlistItems = computed(() => store.getters["wishlist/wishlistItems"] || []);
const totalWishlistItems = computed(() => store.getters["wishlist/totalWishlistItems"] || 0);

const removeWishlist = (item) => {
  store.dispatch("wishlist/toggleWishlist", item);
};

const goToProduct = (id) => {
  router.push(`/product/${id}`);
};
</script>

<style scoped>
.text-teal {
  color: #0d8a8a !important;
}

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

.empty-folder-icon {
  width: 80px;
  height: 70px;
  background-color: #0d8a8a;
  border-radius: 12px 12px 12px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-img {
  height: 180px;
  object-fit: cover;
}
</style>