<template>
  <div class="header__navbar d-flex justify-content-between align-items-center flex-grow-1 ms-3">
    <search-menu></search-menu>
    <component :is="components[menuComponent]"></component>
  </div>
</template>

<script setup>
import SearchMenu from "../header/SearchMenu.vue";
import SignupMenu from "./SignupMenu.vue";
import ProfileMenu from "./ProfileMenu.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const menuComponent = ref("signup-menu");
const store = useStore();

const components = {
  "signup-menu": SignupMenu,
  "profile-menu": ProfileMenu
};

const getToken = computed(() => store.state.auth.token);

if (!getToken.value) {
  menuComponent.value = "signup-menu";
} else {
  menuComponent.value = "profile-menu";
}

watch(getToken, (newValue) => {
  menuComponent.value = newValue ? "profile-menu" : "signup-menu";
});
</script>