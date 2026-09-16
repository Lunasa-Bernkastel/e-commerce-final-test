<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  seeAllLabel: {
    type: String,
    default: "See All Product"
  }
});

defineEmits(["seeAllClick"]);

const store = useStore();
const router = useRouter();


const loginStatus = computed(() => {
  return Boolean(
    store.state.auth.isLogin ||
    store.state.auth.token ||
    localStorage.getItem("token")
  );
});


const isFavorite = (productId) => {
  return store.getters["wishlist/isInWishlist"](productId);
};


const handleToggleWishlist = (item) => {
  if (!loginStatus.value) {
    router.push("/login");
    return;
  }
  store.dispatch("wishlist/toggleWishlist", item);
};
</script>

<template>
  <section class="product-section">
    <div class="section-header">
      <h2>{{ title }}</h2>
      <a href="#" class="see-all-link" @click.prevent="$emit('seeAllClick')">See all</a>
    </div>

    <div class="product-grid">
      <div v-for="item in products" :key="item.id" class="product-card">
        <router-link :to="`/product/${item.id}`" class="text-decoration-none text-dark d-block">
          <div class="image-wrapper">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="product-info">
            <p class="price">Rp{{ item.price ? item.price.toLocaleString('id-ID') : 0 }}</p>
            <p class="name">{{ item.name }}</p>
            <div class="metadata">
              <span class="size-brand">{{ item.size }} / {{ item.brand }}</span>
              
              <!-- HEART BUTTON WITH CLICK STOP & PREVENT -->
              <button 
                class="like-btn" 
                :class="{ 'active-heart': isFavorite(item.id) }" 
                @click.stop.prevent="handleToggleWishlist(item)"
              >
                {{ isFavorite(item.id) ? '❤️' : '🤍' }} {{ item.likes }}
              </button>
            </div>
          </div>
        </router-link>
      </div>

      <div class="see-all-card" @click="$emit('seeAllClick')">
        <p>{{ seeAllLabel }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.like-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
