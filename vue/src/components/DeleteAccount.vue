<template>
  <div class="card w-[22rem] sm:w-[25rem] bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Do you want to delete your account?</h2>
      <p>If you delete your account, all photos you have posted will be deleted.</p>
      <div class="card-actions justify-end">
        <button @click="deleteAccount" class="btn btn-outline">
          <TrashIcon v-if="!loading" class="h-5 w-5"></TrashIcon> <svg v-else class="w-5 h-5 animate-spin "
            viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg> Delete
        </button>
        <button @click="back" class="btn btn-primary">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store';

const router = useRouter();

let loading = ref(false);

function deleteAccount() {
  loading.value = true;
  store.dispatch("deleteAccount").then(() => {
    store.commit("setNotification", {
      error: false,
      message: "Successfully deleted your account."
    })
    loading.value = false;
    setTimeout(() => {
      router.push({
        name: "Register"
      })
    }, 3000);
  }).catch((err) => {
    store.commit("setNotification", {
      error: true,
      message: "Failed to delete account."
    })
    loading.value = false;
  });
}

function back() {
  router.back();
}
</script>
