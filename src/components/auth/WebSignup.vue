<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
      <div class="text-center">
        
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details below</p>
      </div>
      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <div class="col-md-6">
            <base-input
          type="text"
          identity="fullname"
          placeholder="Ex: Jack"
          label="Fullname"
          v-model="signupData.fullname">
        </base-input>
          </div>
        </div>
        <div class="my-4">
          <base-input
          type="text"
          identity="username"
          placeholder="Your username"
          label="Username"
          v-model="signupData.username">
        </base-input>
        </div>
        <div class="my-4">
          <base-input
          type="email"
          identity="email"
          placeholder="Your email address"
          label="Email"
          v-model="signupData.email">
        </base-input>
        </div>
        <div class="my-4">
          <base-input
          type="password"
          identity="password"
          placeholder="Your password"
          label="Password"
          v-model="signupData.password" @keyInput="passwordCheck">
        </base-input>
        <p class="text-danger mt-1 fw-medium" style="font-size: 11px;"
        :style="{ display: passwordStatusDisplay }">
          The Password field must be at least 8 characters
        </p>
        </div>
        <div class="my-4">
          <base-input
          type="password"
          identity="confirmationPassword"
          placeholder="Same with password"
          label="Confirmation Password"
          v-model="signupData.confirmationPassword"
          @keyInput="confirmationPasswordCheck">
        </base-input>
        <p class="text-danger mt-1 fw-medium" style="font-size: 11px;"
        :style="{ display: confirmPasswordDoesNotMatch}">
          The password confirmation does not match
        </p>
        <p class="text-danger mt-1 fw-medium" style="font-size: 11px;"
        :style="{ display: confirmPasswordDoesMatch}">
          The password confirmation does match
        </p>
        </div>
        <div class="my-4">
            <base-input type="file" identity="productImage"
            label="Profile Photo" isImage="true" @input="checkImage">
            <div>
              <div class="border p-1 mt-2 rounded-circle" v-if="signupData.imageLink">
                <img :src="signupData.imageLink"
                class="rounded-circle" width="140" height="150" style="object-fit:cover"/>
              </div>
              <div class="text-center" style="transform: translateY(-24px)">
                <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
              </div>
            </div>
          </base-input>
          </div>
        <div class="form-check d-flex align-items-start gap-2 pt-2 m-0">
          <label for="terms" class="form-check-label text-secondary m-0" style="font-size: 0.75rem; line-height: 1.4;">
            By clicking sign up, I hereby agree and consent to 
            <a href="#" class="custom-link text-decoration-none">Term & Conditions</a>; 
            I confirm that I have read <a href="#" class="custom-link text-decoration-none">Privacy policy</a>.
          </label>
        </div>
        <base-button
          class="login w-100 my-3" style="background-color:#4c4ddc; border: none; color: white; padding: 10px 20px;
          text-align: center; text-decoration: none; display: inline-block; margin: 4px 2px; cursor: pointer; border-radius: 16px;">Register</base-button>
      </form>
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have account?
          <router-link to="/login" style="color: #4c4ddc">
            <a class="text-decoration-none">Login</a>
            </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

const register = async () => {
if (
  signupData.password !== signupData.confirmationPassword ||
  signupData.password.length < 8
) {
  signupData.confirmationPassword = "";
  signupData.password = "";
  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordDoesMatch.value = "none";
} else {
  await store.dispatch("auth/getRegisterData", signupData);
  router.push("/");
}
};

const passwordStatusDisplay = ref("none")
const confirmPasswordDoesNotMatch = ref("none")
const confirmPasswordDoesMatch = ref("none")

const passwordCheck = () => {
  if ( signupData.password.length < 8 ) {
    passwordStatusDisplay.value = "block"
  } else {
    passwordStatusDisplay.value = "none"
  }
}

const confirmationPasswordCheck = () => {
  if (signupData.confirmationPassword === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordDoesMatch.value = "none";
    return;
  }
  if (signupData.password !== signupData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordDoesMatch.value = "none";
    return;
  } else {
    confirmPasswordDoesNotMatch.value = 'none'
    confirmPasswordDoesMatch.value = 'block'
}
}
const checkImage = (e) => {
  const file = e.target.files[0];
  if (!file) return
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  })
}

const signupData = reactive({
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: false,
  imageLink: "",
})
</script>