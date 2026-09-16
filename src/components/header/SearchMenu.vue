<template>
  <div class="search-menu-container py-0 flex-grow-1 mx-3">
    
    <div class="d-none d-sm-block">
      <div class="search-input-wrapper input-group align-items-center border rounded-2 px-3 py-1 bg-light">
        <span class="text-secondary me-2 d-flex align-items-center">
          <i class="fa-solid fa-magnifying-glass fs-6"></i>
        </span>
        <input
          type="text"
          v-model="searchQuery"
          @input="handleSearch"
          @keyup.enter="handleSearch"
          class="form-control border-0 bg-transparent p-0 shadow-none text-dark"
          placeholder="Search for items"
        />
        
        <button 
          v-if="searchQuery" 
          @click="clearSearch" 
          class="btn btn-sm btn-link text-secondary p-0 border-0 ms-2 text-decoration-none"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>

    
    <div class="d-block d-sm-none text-end px-2">
      <button @click="isMobileOpen = !isMobileOpen" class="btn btn-link text-dark p-0 border-0">
        <i class="fa-solid fa-magnifying-glass fs-5"></i>
      </button>

    
      <div v-if="isMobileOpen" class="mt-2">
        <div class="search-input-wrapper input-group align-items-center border rounded-2 px-3 py-1 bg-light">
          <span class="text-secondary me-2 d-flex align-items-center">
            <i class="fa-solid fa-magnifying-glass fs-6"></i>
          </span>
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            @keyup.enter="handleSearch"
            class="form-control border-0 bg-transparent p-0 shadow-none text-dark"
            placeholder="Search for items"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

const searchQuery = ref("");
const isMobileOpen = ref(false);

const handleSearch = () => {
 
  if (store.state.product) {
    store.dispatch("product/setSearchQuery", searchQuery.value);
  }

  
  router.push({
    path: route.path.includes("/user") || route.path.includes("/order") ? "/" : route.path,
    query: { ...route.query, q: searchQuery.value || undefined }
  });
};

const clearSearch = () => {
  searchQuery.value = "";
  handleSearch();
};


watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery || "";
    if (store.state.product) {
      store.dispatch("product/setSearchQuery", searchQuery.value);
    }
  }
);

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q;
    if (store.state.product) {
      store.dispatch("product/setSearchQuery", route.query.q);
    }
  }
});
</script>

<style scoped>
.search-input-wrapper {
  border-color: #e2e8f0 !important;
  background-color: #f8fafc !important;
  transition: all 0.2s ease-in-out;
}

.search-input-wrapper:focus-within {
  border-color: #008080 !important; 
  background-color: #ffffff !important;
  box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.1);
}

.form-control::placeholder {
  color: #94a3b8;
  font-size: 0.95rem;
}

.form-control:focus {
  outline: none;
}
</style>