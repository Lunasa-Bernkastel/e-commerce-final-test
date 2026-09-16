<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5;">
    <div style="background-color: #ffffff; width: 400px; min-height: 100vh;" class="p-5 m-auto login-form">
      <div class="text-center">
       
        <h2 class="mt-4">Log in to vintage</h2>
        <p>Please enter your details below</p>
      </div>
      <form @submit.prevent="login">
        <div class="my-4">
          <base-input
          type="email"
          identity="email"
          placeholder="Your email address"
          label="Email"
          v-model="loginData.email">
        </base-input>
        </div>
        <div class="my-4">
          <base-input
          type="password"
          identity="password"
          placeholder="Your password"
          label="Password"
          v-model="loginData.password">
        </base-input>
        </div>
        <base-button 
        class="login w-100 my-3" ;
        style="background-color:#4c4ddc; 
        border: none; color: white; padding: 10px 20px;
        text-align: center; 
        text-decoration: none; 
        display: inline-block; 
        margin: 4px 2px; 
        cursor: pointer; 
        border-radius: 16px;">
        Login</base-button>
      </form>
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Don’t have an account?<router-link to="/signup" style="color: #4c4ddc">
            <a class="text-decoration-none">
              Signup</a>
            </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

const login = async () => {
  await store.dispatch("auth/getLoginData", loginData);
  router.push("/")
}

const loginData = reactive({
  email: "",
  password: "",
  isLogin: true
})
</script>