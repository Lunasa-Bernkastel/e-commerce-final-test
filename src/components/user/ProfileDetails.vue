<template>
  <div class="card border-0 shadow-sm p-4 rounded-3 bg-white">
    <h6 class="text-muted small mb-4">Edit Profile</h6>

    <form class="mt-3" @submit.prevent="handleUpdateProfile">
      <div class="d-flex align-items-center gap-3 mb-4">
        <label class="fw-medium text-dark m-0 width-100">Photo</label>
        
        <div class="profile-avatar-wrapper">
          <img 
            v-if="userData.imageLink" 
            :src="userData.imageLink" 
            class="avatar-img" 
            alt="Profile Avatar"
          />
          <i v-else class="fa-solid fa-user text-teal fs-4"></i>
        </div>

        <label class="btn btn-light border btn-sm fw-medium px-3 m-0 cursor-pointer">
          Choose
          <input 
            type="file" 
            @change="handleFileChange" 
            accept="image/png, image/jpeg, image/jpg" 
            hidden 
          />
        </label>

        <span class="text-muted small">JPG, JPEG or PNG, 1 MB max.</span>

        <button 
          type="button" 
          class="btn btn-link text-muted ms-auto p-0 border-0" 
          @click="removePhoto"
          title="Remove photo"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>

      <div class="my-4">
        <base-input
          type="text"
          identity="fullname"
          placeholder="Ex: Jack Daniel"
          label="Full Name"
          v-model="userData.fullname"
        >
        </base-input>
      </div>

      <div class="my-4">
        <base-input
          type="text"
          identity="username"
          placeholder="Your username"
          label="Username"
          v-model="userData.username"
        >
        </base-input>
      </div>

      <div class="my-4">
        <base-input
          type="email"
          identity="email"
          placeholder="Your email address"
          label="Email"
          v-model="userData.email"
        >
        </base-input>
      </div>

      <div class="text-end mt-4">
        <button type="submit" class="btn btn-teal-solid px-4 py-2" :disabled="isLoading">
          {{ isLoading ? 'Updating...' : 'Update Profile' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import Cookies from "js-cookie";
import BaseInput from "../ui/BaseInput.vue";

const store = useStore();
const isLoading = ref(false);

const userData = reactive({
  userId: "",
  firebaseKey: "",
  fullname: "",
  username: "",
  email: "",
  imageLink: ""
});

const currentUser = computed(() => store.state.auth?.userLogin || {});

const loadUserData = (user) => {
  if (!user || typeof user !== "object") return;

  userData.userId = user.userId || "";
  userData.firebaseKey = user.firebaseKey || "";
  userData.fullname = user.fullname || user.fullName || "";
  userData.username = user.username || "";
  userData.email = user.email || "";
  userData.imageLink = user.imageLink || "";
};

watch(
  currentUser,
  (newUser) => { 
    if (newUser && Object.keys(newUser).length > 0) {
      loadUserData(newUser);
    }
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  const uid = Cookies.get("UID");
  if ((!store.state.auth?.userLogin || !store.state.auth?.userLogin?.userId) && uid) {
    try {
      await store.dispatch("auth/getUser", uid);
    } catch (err) {
      console.error("Failed to load Firebase profile:", err);
    }
  } else if (currentUser.value) {
    loadUserData(currentUser.value);
  }
});

const handleFileChange = (e) => {
  const file = e.target.files ? e.target.files[0] : null;

  if (!file) return;

  if (file.size > 1024 * 1024) {
    alert("File size exceeds 1 MB limit!");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    userData.imageLink = event.target.result;
  };
  reader.readAsDataURL(file);
};

const removePhoto = () => {
  userData.imageLink = "";
};

const handleUpdateProfile = async () => {
  try {
    isLoading.value = true;
    await store.dispatch("auth/updateUser", { ...userData });
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.width-100 {
  width: 100px;
}
.profile-avatar-wrapper {
  width: 50px;
  height: 50px;
  background-color: #e6f4f4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text-teal {
  color: #0d8a8a;
}
.cursor-pointer {
  cursor: pointer;
}
.btn-teal-solid {
  background-color: #0d8a8a;
  color: white;
  border: 1px solid #0d8a8a;
  border-radius: 6px;
  font-weight: 600;
}
.btn-teal-solid:hover {
  background-color: #0a6c6c;
}
</style>