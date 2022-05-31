<template>
  <div class="card w-[22rem] sm:w-[25rem] bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Do you want to delete your account?</h2>
      <p>If you delete your account, all photos you have posted will be deleted.</p>
      <div class="card-actions justify-end">
        <button @click="deleteAccount" class="btn btn-outline">
          <TrashIcon v-if="!loading" class="h-5 w-5"></TrashIcon> <svg v-else
            class="animate-spin -ml-1 mr-3 w-3 h-3 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg> Delete
        </button>
        <router-link :to="{ name: 'Profile' }" class="btn btn-primary">Cancel</router-link>
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
    setTimeout(() => {
      router.push({
        name: "Register"
      })
    }, 7000);
  }).catch((err) => {
    store.commit("setNotification", {
      error: true,
      message: "Failed to delete account."
    })
  });
  loading.value = false;
}
</script>
