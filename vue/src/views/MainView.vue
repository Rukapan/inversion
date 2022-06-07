<template>
  <div class="text-black select-none">
    <div v-if="store.state.notification.length !== 0" class="fixed z-40 top-1 right-2">
      <Notification></Notification>
    </div>
    <div class="min-h-full w-screen flex justify-center px-1 pb-32 sm:px-5">
      <div v-if="photosFilter" class="fixed h-full w-full z-10"></div>
      <AllPhotos></AllPhotos>
    </div>
    <div class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20">
      <OnClickOutside @trigger="closeWindow">
        <router-view></router-view>
      </OnClickOutside>
    </div>
    <div class="fixed bottom-1 sm:bottom-5 left-1/2 -translate-x-1/2 z-20">
      <Navbar></Navbar>
    </div>
  </div>
</template>

<script setup>
import Notification from '../components/Notification.vue';
import AllPhotos from '../components/AllPhotos.vue';
import Navbar from '../components/Navbar.vue';

import { OnClickOutside } from '@vueuse/components';
import { useRouter, useRoute } from 'vue-router';
import store from '../store';
import { ref, watch } from 'vue';

const router = useRouter();
const route = ref(useRoute());

let photosFilter = ref(false);

watch(route.value, (newValue, oldValue) => {
  photosFilter.value = (route.value.path !== "/") ? true : false;
})

function closeWindow() {
  router.push({
    name: "MainView"
  })
}
</script>
