<template>
  <div class="text-black select-none">
    <div v-if="store.state.notification.message" class="fixed z-40 top-2 right-2 animate-fadeIn">
      <Notification></Notification>
    </div>
    <div class="min-h-full w-screen flex justify-center px-1 pb-32 sm:px-5">
      <AllPhotos></AllPhotos>
    </div>
    <div class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
      <OnClickOutside @trigger="closeWindow">
        <router-view></router-view>
      </OnClickOutside>
    </div>
    <div class="fixed bottom-2 sm:bottom-5 left-1/2 -translate-x-1/2">
      <Navbar></Navbar>
    </div>
  </div>
</template>

<script setup>
import Notification from '../components/Notification.vue';
import AllPhotos from '../components/AllPhotos.vue';
import Navbar from '../components/Navbar.vue';

import { OnClickOutside } from '@vueuse/components';
import { useRouter } from 'vue-router';
import store from '../store';

const router = useRouter();

function closeWindow() {
  router.push({
    name: "MainView"
  })
}
</script>
