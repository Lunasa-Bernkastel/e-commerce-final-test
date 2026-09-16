<template>
  <div class="card border-0 shadow-sm p-4 rounded-3 bg-white">
    <h6 class="text-muted small mb-4">Change Password</h6>

    <form @submit.prevent="handleChangePassword">
      <div class="mb-3">
        <label class="form-label small fw-bold text-dark">Old Password</label>
        <div class="input-group">
          <input 
            :type="showOld ? 'text' : 'password'" 
            v-model="form.oldPassword" 
            class="form-control border-end-0 py-2" 
            placeholder="Old password" 
          />
          <span class="input-group-text bg-white border-start-0 text-muted cursor-pointer" @click="showOld = !showOld">
            <i :class="showOld ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label small fw-bold text-dark">New Password</label>
        <div class="input-group">
          <input 
            :type="showNew ? 'text' : 'password'" 
            v-model="form.newPassword" 
            class="form-control border-end-0 py-2" 
            placeholder="New password" 
          />
          <span class="input-group-text bg-white border-start-0 text-muted cursor-pointer" @click="showNew = !showNew">
            <i :class="showNew ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label small fw-bold text-dark">Confirmation New Password</label>
        <div class="input-group">
          <input 
            :type="showConfirm ? 'text' : 'password'" 
            v-model="form.confirmPassword" 
            class="form-control border-end-0 py-2" 
            placeholder="Confirmation password" 
          />
          <span class="input-group-text bg-white border-start-0 text-muted cursor-pointer" @click="showConfirm = !showConfirm">
            <i :class="showConfirm ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div>

      <div class="text-end">
        <button type="submit" class="btn btn-teal-solid px-4 py-2">
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

const showOld = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

const form = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
});

const handleChangePassword = () => {
  if (form.newPassword !== form.confirmPassword) {
    alert("New passwords do not match!");
    return;
  }
  store.dispatch("auth/changePassword", form);
};
</script>

<style scoped>
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