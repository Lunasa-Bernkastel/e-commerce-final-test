<template>
  <div class="container detail-page">
    <button class="btn-back" @click="goBack">← Back</button>

    <div v-if="isLoading" class="loading-state">
      Loading product details...
    </div>

    <div v-else-if="product">
      <ProductDetail :product="product" />

      <section class="other-products-section" v-if="popularItems.length">
        <h2>Other Product</h2>
        <ProductList 
          title="" 
          :products="popularItems" 
          @selectProduct="navigateToProduct"
        />
      </section>
    </div>

    <div v-else class="no-products">
      <p>Product not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ProductDetail from '../detail/ProductDetail.vue';
import ProductList from '../product/ProductList.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const product = ref(null);
const isLoading = ref(true);

const popularItems = computed(() => store.state.product.popularItems || []);

const loadProductData = async () => {
  isLoading.value = true;
  const productId = route.params.id;

  if (!popularItems.value.length) {
    await store.dispatch('product/fetchStoreData');
  }

  const allProducts = [
    ...(store.state.product.popularItems || []),
    ...(store.state.product.newProducts || [])
  ];

  product.value = allProducts.find(item => String(item.id) === String(productId)) || null;
  isLoading.value = false;
};

const goBack = () => {
  router.back();
};

const navigateToProduct = (selectedItem) => {
  router.push({ name: 'ProductDetail', params: { id: selectedItem.id } });
};

watch(() => route.params.id, () => {
  loadProductData();
});

onMounted(() => {
  loadProductData();
});
</script>
