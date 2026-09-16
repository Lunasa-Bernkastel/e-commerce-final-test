<template>
  <header class="shadow-sm container-fluid bg-white py-2 border-bottom fixed-top">
    <div class="container-md d-flex justify-content-between align-items-center">
      
      
      <router-link to="/" class="d-flex align-items-center gap-2 text-decoration-none">
        <span class="logo-icon text-teal fs-4">❖</span>
        <span class="fw-bold fs-4 text-teal">Vintage</span>
      </router-link>

      
      <navigation-bar class="flex-grow-1 ms-3"></navigation-bar>

    </div>
  </header>
</template>

<script setup>
import NavigationBar from "../header/NavigationBar.vue";
</script>

<style scoped>
.text-teal {
  color: #0d8a8a !important;
}
</style>
