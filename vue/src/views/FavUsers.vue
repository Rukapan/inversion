<template>
  <div
    class="relative w-[21rem] h-[25rem] rounded-2xl shadow-2xl border border-white backdrop-brightness-150 backdrop-blur-3xl animate-fade-in-fwd">
    <router-link :to="{ name: 'MainView' }"
      class="absolute right-1 top-1 btn btn-xs btn-ghost btn-circle flex justify-center items-center">
      <XIcon class="h-5 w-5 text-black/70"></XIcon>
    </router-link>
    <div v-if="loading" class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <svg class="animate-spin w-10 h-10 text-white" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </svg>
    </div>
    <div class="flex justify-center mt-1">
      <p class="text-2xl font-bold">FavUsers</p>
    </div>
    <hr>
    <div v-if="!loading" class="flex justify-center w-full">
      <div v-if="!noExist" class="w-full">
        <div v-for="item in favUserProfiles" :key="item.uuid" class="flex items-center group">
          <div @click="showProfile(item)"
            class="flex items-center bg-none group-hover:bg-black/10 cursor-pointer rounded-lg tooltip tooltip-info"
            data-tip="Open Profile">
            <img :src="item.image" class="rounded-full w-8 h-8">
            <p class="ml-1 text-xl w-32">{{ item.name }}</p>
            <div class="ml-1 flex items-center w-[6rem]">
              <div class="flex items-center w-10">
                <ClockIcon class="w-5 h-5"></ClockIcon>
                <p class="text-lg">{{ item.age }}</p>
              </div>
              <div class="flex items-center">
                <LocationMarkerIcon class="w-5 h-5"></LocationMarkerIcon>
                <p class="text-lg">{{ item.location }}</p>
              </div>
            </div>
          </div>
          <router-link
            class="ml-1 btn btn-ghost btn-sm btn-circle tooltip tooltip-right tooltip-info normal-case z-10 flex justify-center items-center"
            :to="{ name: 'UserAlbum', params: item }" data-tip="Album">
            <PhotographIcon class="w-6 h-6"></PhotographIcon>
          </router-link>
          <button @click="deleteFavUser(item.uuid)"
            class="btn btn-ghost btn-sm btn-circle tooltip tooltip-right tooltip-info normal-case flex justify-center items-center"
            data-tip="Unfollow">
            <UserRemoveIcon v-if="!removeLoading" class="w-6 h-6"></UserRemoveIcon>
            <svg v-else class="w-6 h-6 animate-spin" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
            </svg>
          </button>
        </div>
      </div>
      <div v-else class="w-full h-[20rem] flex justify-center items-center">
        <p class="text-lg font-bold">No one is following.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon, ClockIcon, LocationMarkerIcon, PhotographIcon, UserRemoveIcon } from '@heroicons/vue/outline';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
let noExist = ref(false);
let loading = ref(true);

const favUserProfiles = computed(() => store.state.favUsers);

const favUsers = computed(() => store.state.user.favUsers);

store.dispatch("getFavUserProfiles").then(() => {
  loading.value = false;
  if (!favUserProfiles.value.length) noExist.value = true;
})

function showProfile(user) {
  router.push({
    name: "UserProfile",
    params: user
  })
}

let removeLoading = ref(false);

function deleteFavUser(uuid) {
  removeLoading.value = true;
  store.dispatch("deleteFavUser", favUsers.value.get(uuid)).then(() => {
    store.dispatch("getFavUserProfiles");
    store.commit("setNotification", {
      error: false,
      message: "Unfollowed."
    })
    removeLoading.value = false;
  }).catch(() => {
    store.commit("setNotification", {
      error: true,
      message: "Failed unfollowed."
    })
    removeLoading.value = false;
  })
}
</script>
