<template>
  <div
    class="relative w-screen h-screen backdrop-brightness-150 backdrop-blur-xl flex justify-center items-center px-1 py-0.5">
    <router-link :to="{ name: 'MainView' }"
      class="absolute top-1 right-1 sm:top-5 sm:right-5 btn btn-ghost btn-circle flex justify-center items-center z-10">
      <XCircleIcon class="h-7 w-7 sm:h-10 sm:w-10"></XCircleIcon>
    </router-link>
    <div class="sm:flex justify-center items-center mt-1 sm:mt-0">
      <div class="flex sm:hidden ml-5 justify-center">
        <div>
          <p class="text-xl text-center">{{ photo.date }}</p>
          <p class="text-4xl font-bold text-center">{{ photo.title }}</p>
        </div>
      </div>
      <img :src="photo.image"
        class="mt-3 max-h-[32.5rem] sm:max-w-[35rem] sm:max-h-[40rem] rounded-3xl border shadow-2xl">
      <div class="flex mt-5 sm:hidden justify-center">
        <div @click="showProfile"
          class="w-max h-max text-black backdrop-brightness-200 bg-white/50 rounded-xl border shadow-2xl px-1 normal-case flex justify-center items-center cursor-pointer hover:bg-black/10 hover:border-black/10 transition duration-300">
          <div class="flex justify-center items-end">
            <img v-if="photo.user.image" :src="photo.user.image"
              class="w-7 h-7 rounded-full mb-1">
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
              class="w-max h-max text-black backdrop-brightness-200 bg-white/50 rounded-xl border shadow-2xl px-1 normal-case flex justify-center items-center cursor-pointer hover:bg-black/10 hover:border-black/10 transition duration-300">
              <div class="flex justify-center items-center">
                <img v-if="photo.user.image" :src="photo.user.image"
                  class="w-10 h-10 py-[1px] px-[1px] rounded-full">
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
</template>

<script setup>
import { XCircleIcon, ClockIcon, LocationMarkerIcon, UserCircleIcon } from '@heroicons/vue/outline';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store';

const router = useRouter();

const photo = computed(() => store.state.photo);

function showProfile() {
  router.push({
    name: "UserProfile",
    params: photo.value.user
  })
}
</script>
