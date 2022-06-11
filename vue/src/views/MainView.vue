<template>
  <div class="w-screen text-black select-none">
    <div v-if="store.state.notification.length !== 0" class="fixed z-40 top-1 right-2">
      <Notification></Notification>
    </div>
    <div class="w-screen h-min-max">
      <div v-if="photosFilter" class="fixed h-full w-full z-10"></div>
      <AllPhotos :key="store.state.photosResetKey"></AllPhotos>
    </div>
    <div class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20">
      <OnClickOutside @trigger="closeWindow">
        <router-view></router-view>
      </OnClickOutside>
    </div>
    <div class="fixed w-1/2 h-0 sm:h-24 bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-end z-20 group">
      <div
        class="hidden sm:flex group-hover:hidden animate-slide-top backdrop-blur-3xl backdrop-brightness-150 rounded-full border border-white shadow-2xl mb-1">
        <ChevronUpIcon class="w-12 h-12">
        </ChevronUpIcon>
      </div>
      <Navbar class="sm:hidden group-hover:flex animate-slide-top mb-0.5 sm:mb-1"></Navbar>
    </div>
  </div>
</template>

<script setup>
import Notification from '../components/Notification.vue';
import AllPhotos from '../components/AllPhotos.vue';
import Navbar from '../components/Navbar.vue';

import { ChevronUpIcon } from '@heroicons/vue/outline';
import { OnClickOutside } from '@vueuse/components';
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
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
