<template>
  <div class="d-flex align-items-center gap-2">
   
    <router-link
      to="/login"
      class="btn btn-login-vintage fw-medium px-3 py-1 text-decoration-none"
    >
      Login
    </router-link>

   
    <router-link
      to="/signup"
      class="btn btn-signup-vintage text-white fw-medium px-3 py-1 text-decoration-none"
    >
      Sign up
    </router-link>

   
    <div class="vr mx-2" style="height: 22px; opacity: 0.15;"></div>
    <div class="dropdown">
      <a
        class="text-decoration-none text-dark fw-medium dropdown-toggle small"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
      >
        EN
      </a>
      <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 min-vw-0">
        <li><a class="dropdown-item small" href="#">EN</a></li>
        <li><a class="dropdown-item small" href="#">ID</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.btn-login-vintage {
  border: 1px solid #0d8a8a;
  color: #0d8a8a;
  background-color: #ffffff;
  border-radius: 6px;
  font-size: 0.9rem;
}

.btn-login-vintage:hover {
  background-color: #f0fdfd;
}

.btn-signup-vintage {
  background-color: #0d8a8a;
  border: 1px solid #0d8a8a;
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.9rem;
}

.btn-signup-vintage:hover {
  background-color: #0a6c6c;
}
</style>