<template>
  <div class="col-lg-3 mb-4 mb-lg-0">
    <h3 class="fw-bold mb-4">Settings</h3>
    <ul class="nav flex-column gap-3">
      <li class="nav-item">
        <a 
          href="#" 
          class="nav-link p-0 fw-semibold" 
          :class="activeRoute === 'profile-details' ? 'text-dark fw-bold' : 'text-muted'"
          @click.prevent="$emit('changeComponent', '/user/profile-details')"
        >
          Profile details
        </a>
      </li>
      <li class="nav-item">
        <a 
          href="#" 
          class="nav-link p-0 fw-semibold" 
          :class="activeRoute === 'change-password' ? 'text-dark fw-bold' : 'text-muted'"
          @click.prevent="$emit('changeComponent', '/user/change-password')"
        >
          Change Password
        </a>
      </li>
      <li class="nav-item">
       <a 
          href="#" 
          class="nav-link p-0 fw-semibold" 
          :class="activeRoute === 'transaction-history' ? 'text-dark fw-bold' : 'text-muted'"
          @click.prevent="$emit('changeComponent', '/user/transaction-history')"
        >
          Transaction History
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

defineEmits(["changeComponent"]);

const route = useRoute();
const activeRoute = computed(() => route.params.component);
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>