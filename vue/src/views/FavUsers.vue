<template>
  <div
    class="relative w-[18rem] h-[20rem] rounded-2xl shadow-2xl border border-white backdrop-brightness-150 backdrop-blur-3xl">
    <router-link :to="{ name: 'MainView' }"
      class="absolute right-1 top-1 btn btn-xs btn-ghost btn-circle flex justify-center items-center">
      <XCircleIcon class="h-6 w-6"></XCircleIcon>
    </router-link>
    <div v-if="loading" class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <svg class="animate-spin -ml-1 mr-3 w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
    </div>
    <div class="flex justify-center mt-1">
      <p class="text-xl font-bold">FavUsers</p>
    </div>
    <hr>
    <div v-if="!loading" class="flex justify-center w-full">
      <div class="w-full">
        <div v-for="item in favUserProfiles" :key="item.uuid" class="flex items-center group">
          <div @click="showProfile(item)"
            class="flex items-center bg-none group-hover:bg-black/10 cursor-pointer rounded-lg">
            <img :src="item.image" class="rounded-full w-7 h-7">
            <p class="ml-1 text-lg w-32">{{ item.name }}</p>
            <div class="ml-1 flex items-center w-[5rem]">
              <div class="flex items-center w-9">
                <ClockIcon class="w-4 h-4"></ClockIcon>
                <p>{{ item.age }}</p>
              </div>
              <div class="flex items-center">
                <LocationMarkerIcon class="w-4 h-4"></LocationMarkerIcon>
                <p>{{ item.location }}</p>
              </div>
            </div>
          </div>
          <router-link class="ml-1 btn btn-ghost btn-xs btn-circle" :to="{ name: 'UserAlbum', params: item }">
            <PhotographIcon class="w-5 h-5"></PhotographIcon>
          </router-link>
          <button @click="deleteFavUser(item.uuid)" class="btn btn-ghost btn-xs btn-circle">
            <UserRemoveIcon class="w-5 h-5"></UserRemoveIcon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XCircleIcon, ClockIcon, LocationMarkerIcon, PhotographIcon, UserRemoveIcon } from '@heroicons/vue/outline';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const favUserProfiles = computed(() => store.state.favUsers);
const favUsers = computed(() => store.state.user.favUsers);


let loading = ref(true);

store.dispatch("getFavUserProfiles").then(() => {
  loading.value = false;
})

function showProfile(user) {
  router.push({
    name: "UserProfile",
    params: user
  })
}

function deleteFavUser(uuid) {
  store.dispatch("deleteFavUser", favUsers.value.get(uuid)).then(() => {
    store.dispatch("getFavUserProfiles");
    store.commit("setNotification", {
      error: false,
      message: "Unfollowed."
    })
  }).catch(() => {
    store.commit("setNotification", {
      error: true,
      message: "Failed unfollowed."
    })
  })
}


</script>
