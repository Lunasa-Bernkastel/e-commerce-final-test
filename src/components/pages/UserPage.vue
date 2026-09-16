<template>
  <div class="container-md my-5 py-4">
    <div class="row">
      <user-menu @changeComponent="$router.push($event)"></user-menu>
      <div class="col-lg-9">
        <component :is="componentsMap[getRoute]"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import UserMenu from "../user/UserMenu.vue";
import ProfileDetails from "../user/ProfileDetails.vue";
import ChangePassword from "../user/ChangePassword.vue";
import TransactionHistory from "../user/TransactionHistory.vue";

const route = useRoute();

const componentsMap = {
  "profile-details": ProfileDetails,
  "change-password": ChangePassword,
  "transaction-history": TransactionHistory,
};

const getRoute = computed(() => {
  return route.params.component || "profile-details";
});
</script>