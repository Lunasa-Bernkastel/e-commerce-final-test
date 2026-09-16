<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import ProductList from '../product/ProductList.vue';

const store = useStore();
const route = useRoute();


const productListStatus = ref(false);
const isViewingAll = ref(false);       
const selectedBrand = ref(null);       

const isLoading = ref(true);


const brands = computed(() => store.state.product?.brands || []);
const popularItems = computed(() => store.getters["product/filteredPopularItems"] || []);
const newProducts = computed(() => store.getters["product/filteredNewProducts"] || []);


const searchQuery = computed(() => store.state.product?.searchQuery || route.query.q || "");


const allProductsCombined = computed(() => {
  let combined = [...popularItems.value, ...newProducts.value];
  
  
  combined = combined.filter((item, index, self) =>
    index === self.findIndex((t) => t.id === item.id || t.name === item.name)
  );

  if (selectedBrand.value) {
    return combined.filter(product => 
      product.brand?.toLowerCase() === selectedBrand.value.toLowerCase() ||
      product.name?.toLowerCase().includes(selectedBrand.value.toLowerCase())
    );
  }
  return combined;
});


watch(searchQuery, (newQuery) => {
  if (newQuery && newQuery.trim() !== '') {
    isViewingAll.value = true;
  }
}, { immediate: true });


const viewAllProducts = () => {
  selectedBrand.value = null;
  isViewingAll.value = true;
};

const filterByBrand = (brandName) => {
  selectedBrand.value = brandName;
  isViewingAll.value = true;
};

const goBackToHome = () => {
  isViewingAll.value = false;
  selectedBrand.value = null;
  if (store.state.product) {
    store.dispatch("product/setSearchQuery", "");
  }
};

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch("product/fetchStoreData");
    productListStatus.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="homepage">
    
    <div v-if="isViewingAll" class="container catalog-view">
      <div class="catalog-header">
        <button class="btn-back" @click="goBackToHome">← Back to Home</button>
        <h1>{{ selectedBrand ? `Items for: ${selectedBrand}` : 'All Products' }}</h1>
      </div>

      <div v-if="allProductsCombined.length > 0">
        <ProductList 
          :title="selectedBrand ? `${selectedBrand} Collection` : 'All Products'" 
          :products="allProductsCombined" 
          v-if="productListStatus"
        />
      </div>
      <div v-else class="no-products">
        <p>No products found matching this brand filter.</p>
      </div>
    </div>

    
    <div v-else>
      <section class="hero-banner">
        <div class="container hero-container">
          <div class="hero-card">
            <h1>Ready to declutter your closet?</h1>
            <button class="btn-shop" @click="viewAllProducts">Shop Now</button>
          </div>
        </div>
      </section> 

      <div class="container">
        <div v-if="isLoading">Loading items...</div>
        
        <ProductList 
          title="Popular items" 
          :products="popularItems" 
          v-if="productListStatus"
          seeAllLabel="See All Product" 
          @seeAllClick="viewAllProducts" 
        />

        <section class="brands-section">
          <h2>Shop by brand</h2>
          <div class="brands-row">
            <span 
              v-for="brand in brands" 
              :key="brand" 
              class="brand-tag"
              @click="filterByBrand(brand)"
            >
              {{ brand }}
            </span>
          </div>
        </section>

        <ProductList 
          title="New Product" 
          :products="newProducts"
          v-if="productListStatus" 
          seeAllLabel="See All New Product" 
          @seeAllClick="viewAllProducts"
        />
      </div>
    </div>
  </div>
</template>