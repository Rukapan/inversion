<template>
  <div
    class="relative w-screen h-screen backdrop-brightness-150 backdrop-blur-xl flex justify-center sm:items-center px-1 animate-fade-in-fwd">
    <div class="flex justify-center items-center pb-14 sm:pb-0">
      <div class="relative sm:flex justify-center items-center">
        <button @click="back"
          class="absolute top-1 right-1 btn btn-sm btn-ghost btn-circle flex justify-center items-center">
          <XIcon class="h-6 w-6 text-black/60"></XIcon>
        </button>
        <div class="flex sm:hidden justify-center">
          <div>
            <p class="sm:text-xl text-center">{{ photo.date }}</p>
            <p class="-mt-1 sm:-mt-0 text-3xl sm:text-4xl font-bold text-center">{{ photo.title }}</p>
          </div>
        </div>
        <div v-if="loading" class="w-full flex justify-center items-center">
          <svg class="animate-spin w-10 h-10 sm:w-20 sm:h-20 text-black/70" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </div>
        <img :src="photo.image" @load="load"
          class="mt-1 sm:mt-3 max-h-[30rem] sm:max-w-[35rem] sm:max-h-[40rem] rounded-3xl border shadow-2xl">
        <div class="flex mt-3 sm:hidden justify-center">
          <div @click="showProfile"
            class="w-max h-max text-black backdrop-brightness-200 bg-white/50 rounded-xl border shadow-2xl px-1 normal-case flex justify-center items-center cursor-pointer hover:bg-black/10 hover:border-black/10 transition duration-300">
            <div class="flex justify-center items-end">
              <img v-if="photo.user.image" :src="photo.user.image" class="w-7 h-7 rounded-full mb-1">
              <UserCircleIcon v-else class="w-7 h-7 rounded-full mb-1"></UserCircleIcon>
              <p class="ml-1 text-2xl font-bold mb-0.5">{{ photo.user.name }}</p>
            </div>
            <div class="ml-1 flex justify-center items-center">
              <div class="flex justify-center">
                <div class="flex justify-center items-center">
                  <ClockIcon class="w-5 h-5"></ClockIcon>
                  <p class="ml-0.5 text-lg">{{ photo.user.age }}</p>
                </div>
                <div class="flex justify-center items-center">
                  <LocationMarkerIcon class="w-5 h-5"></LocationMarkerIcon>
                  <p class="text-lg">{{ photo.user.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden sm:flex ml-5 justify-center">
          <div>
            <p class="text-2xl text-center">{{ photo.date }}</p>
            <p class="text-7xl font-bold text-center">{{ photo.title }}</p>
            <div class="mt-5 flex justify-center">
              <div @click="showProfile"
                class="w-max h-max text-black backdrop-brightness-200 bg-white/70 rounded-xl border shadow-2xl px-1 normal-case flex justify-center items-center cursor-pointer hover:bg-black/10 hover:border-black/10 transition duration-300 tooltip tooltip-bottom tooltip-info"
                data-tip="Profile">
                <div class="flex justify-center items-center">
                  <img v-if="photo.user.image" :src="photo.user.image" class="w-10 h-10 py-[1px] px-[1px] rounded-full">
                  <UserCircleIcon v-else class="w-10 h-10 py-[1px] px-[1px] rounded-full"></UserCircleIcon>
                  <p class="ml-1 text-3xl font-bold">{{ photo.user.name }}</p>
                </div>
                <div class="ml-1 flex justify-center items-center">
                  <div class="flex justify-center">
                    <div class="flex justify-center items-center">
                      <ClockIcon class="w-6 h-6"></ClockIcon>
                      <p class="ml-0.5 text-lg">{{ photo.user.age }}</p>
                    </div>
                    <div class="flex justify-center items-center">
                      <LocationMarkerIcon class="w-6 h-6"></LocationMarkerIcon>
                      <p class="text-lg">{{ photo.user.location }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon, ClockIcon, LocationMarkerIcon, UserCircleIcon } from '@heroicons/vue/outline';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store';

const photo = computed(() => store.state.photo);

let loading = ref(true);
function load() {
  loading.value = false;
}

const router = useRouter();

function showProfile() {
  router.push({
    name: "UserProfile",
    params: photo.value.user
  })
}

function back() {
  router.back();
}
</script>
