<template>
  <div class="d-flex align-items-center gap-3">
    
    <router-link to="/cart" class="position-relative text-dark text-decoration-none">
      <i class="fa-solid fa-cart-shopping fs-5"></i>
      <span class="badge-count">1</span>
    </router-link>

    
    <router-link to="/wishlist" class="position-relative text-dark text-decoration-none me-2">
      <i class="fa-regular fa-heart fs-5"></i>
      <span class="badge-count">1</span>
    </router-link>

    
    <div class="dropdown">
      <a
        class="d-flex align-items-center text-decoration-none hide-dropdown-arrow"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          :src="userData.imageLink || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'"
          alt="Profile"
          class="rounded-circle profile-img me-1"
        />
        <i class="fa-solid fa-chevron-down text-muted small ms-1"></i>
      </a>

      <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 rounded-3 py-2" style="width: 180px;">
        <li>
          <router-link to="/user/profile-details" class="dropdown-item d-flex align-items-center gap-2 py-2">
            <i class="fa-regular fa-user text-secondary"></i>
            <span>Profiless</span>
          </router-link>
        </li>
        <li>
          <router-link to="/order-confirmation" class="dropdown-item d-flex align-items-center gap-2 py-2">
            <i class="fa-regular fa-file-lines text-secondary"></i>
            <span>Order</span>
          </router-link>
        </li>
        <li>
          <button @click="showModal = true" class="dropdown-item d-flex align-items-center gap-2 py-2 text-danger border-0 bg-transparent w-100 text-start">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>

    
    <div class="vr mx-1" style="height: 22px; opacity: 0.15;"></div>

   
    <div class="dropdown">
      <a class="text-decoration-none text-dark fw-medium dropdown-toggle small" href="#" role="button" data-bs-toggle="dropdown">
        EN
      </a>
      <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 min-vw-0">
        <li><a class="dropdown-item small" href="#">EN</a></li>
        <li><a class="dropdown-item small" href="#">ID</a></li>
      </ul>
    </div>

    
    <div v-if="showModal" class="modal-backdrop-custom d-flex align-items-center justify-content-center">
      <div class="modal-card bg-white rounded-3 shadow p-4 position-relative" style="width: 400px;">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="m-0 fw-semibold text-dark">Logout</h5>
          <button type="button" class="btn-close small" @click="showModal = false"></button>
        </div>
        <p class="text-secondary mb-4">Are you sure want to logout from vintage?</p>
        <div class="d-flex justify-content-end gap-2">
          <button 
            type="button" 
            class="btn btn-light px-4 text-dark fw-medium border-0" 
            style="background-color: #e9ecef;" 
            @click="showModal = false"
          >
            Close
          </button>
          <button 
            type="button" 
            class="btn btn-danger px-4 fw-medium border-0" 
            style="background-color: #d9383a;" 
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const showModal = ref(false);
const userData = computed(() => store.state.auth?.userLogin);

const handleLogout = () => {
  store.commit("auth/setUserLogout");
  showModal.value = false;
  router.push("/");
};
</script>

<style scoped>
.profile-img {
  width: 36px;
  height: 36px;
  object-fit: cover;
}

.badge-count {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: #d9383a;
  color: white;
  font-size: 10px;
  font-weight: bold;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hide-dropdown-arrow::after {
  display: none !important;
}

/* Modal Custom Overlay */
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
}
</style>