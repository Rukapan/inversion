<template>
  <div
    class="relative w-[22rem] h-[28.8rem] py-2 px-2 rounded-2xl shadow-2xl border border-white backdrop-brightness-150 backdrop-blur-3xl animate-fade-in-fwd">
    <router-link :to="{name: 'MainView'}"
      class="absolute top-1 right-1 btn btn-sm btn-ghost btn-circle flex justify-center items-center">
      <XIcon class="h-6 w-6 text-black/60"></XIcon>
    </router-link>
    <div class="flex justify-center items-center w-full">
      <img v-if="profile.image" :src="profile.image" class="h-[15rem] w-[15rem] border border-white rounded-full">
      <UserCircleIcon v-else class="h-[15rem] w-[15rem] border border-white rounded-full"></UserCircleIcon>
    </div>
    <div class=" flex justify-center w-full">
      <div class="space-y-1">
        <div class="flex justify-center items-center">
          <p class="text-6xl font-extrabold text-center tooltip tooltip-right tooltip-info normal-case" data-tip="Name">
            {{ profile.name ? profile.name : "NewUser" }}</p>
        </div>
        <div class="flex justify-center space-x-3">
          <div class="flex justify-center items-end tooltip tooltip-bottom tooltip-info" data-tip="Age">
            <ClockIcon class="h-10 w-10"></ClockIcon>
            <p class="text-4xl">{{ profile.age ? profile.age : "Age" }}</p>
          </div>
          <div class="flex justify-center items-end tooltip tooltip-bottom tooltip-info" data-tip="Location">
            <LocationMarkerIcon class="h-10 w-10"></LocationMarkerIcon>
            <p class="text-4xl">{{ profile.location ? profile.location : "Location" }}</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-6 bg-white">
    <div v-if="!otherUser" class="mt-5 flex justify-center w-full space-x-5">
      <router-link :to="{ name: 'ProfileEditor' }"
        class="btn btn-primary text-white hover:text-white/70 normal-case flex justify-center items-center tooltip tooltip-info"
        data-tip="Edit Profile">
        <PencilAltIcon class="w-8 h-8"></PencilAltIcon>
      </router-link>
      <button @click="logout"
        class="btn btn-info text-black hover:text-black/70 normal-case flex justify-center items-center tooltip tooltip-info"
        data-tip="Logout">
        <LogoutIcon class="w-8 h-8"></LogoutIcon>
      </button>
      <router-link :to="{ name: 'DeleteAccount' }"
        class="btn text-black/70 hover:text-white/70 normal-case flex justify-center items-center tooltip tooltip-info"
        data-tip="Delete Account">
        <TrashIcon class="w-8 h-8"></TrashIcon>
      </router-link>
    </div>
    <div v-else class="mt-5 flex justify-center w-full space-x-4">
      <router-link :to="{ name: 'UserAlbum', params: profile }"
        class="btn btn-primary text-white hover:text-white/70 normal-case flex justify-center items-center tooltip tooltip-info"
        data-tip="Album">
        <PhotographIcon class="w-8 h-8"></PhotographIcon>
      </router-link>
      <button v-if="!favUsers.get(profile.uuid)" @click="postFavUser"
        class="group btn btn-info normal-case text-lg flex justify-center items-center tooltip tooltip-info"
        data-tip="Follow">
        <div v-if="!loading">
          <svg class="w-8 h-8 text-primary group-hover:hidden" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
          </svg>
          <svg class="w-8 h-8 text-primary/70 hidden group-hover:flex" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </div>
        <div v-else>
          <svg class="w-8 h-8 animate-spin text-black/70" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </div>
      </button>
      <button v-else @click="deleteFavUser"
        class="group btn btn-info normal-case text-lg flex justify-center items-center tooltip tooltip-info"
        data-tip="Unfollow">
        <div v-if="!loading">
          <svg class="w-8 h-8 text-primary group-hover:text-primary/70" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </div>
        <div v-else>
          <svg class="w-8 h-8 animate-spin text-black/70" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </div>
      </button>
    </div>
  </div>
  <router-view class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10"></router-view>
</template>

<script setup>
import { ClockIcon, LocationMarkerIcon, XIcon, PencilAltIcon, PhotographIcon, LogoutIcon, TrashIcon, UserCircleIcon, } from '@heroicons/vue/outline';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

let otherUser = false;
let profile;
if (route.params.name) {
  profile = route.params;
  if (profile.uuid !== store.state.user.data.uuid) {
    otherUser = true;
  }
} else {
  profile = computed(() => store.state.user.profile);
}

const favUsers = computed(() => store.state.user.favUsers);

function logout() {
  store.dispatch("logout").then(() => {
    router.push({
      name: "Login"
    })
  })
}

let loading = ref(false);

function postFavUser() {
  loading.value = true;
  store.dispatch("postFavUser", {
    user_id: profile.uuid
  }).then(() => {
    store.commit("setNotification", {
      error: false,
      message: `Followed ${profile.name}`
    });
    loading.value = false;
  }).catch(() => {
    store.commit("setNotification", {
      error: true,
      message: "Failed to fallow up."
    })
    loading.value = false;
  })
}

function deleteFavUser() {
  loading.value = true;
  store.dispatch("deleteFavUser", favUsers.value.get(profile.uuid)).then(() => {
    store.commit("setNotification", {
      error: false,
      message: `Unfollowed ${profile.name}`
    })
    loading.value = false;
  }).catch(() => {
    store.commit("setNotification", {
      error: true,
      message: "Failed to unfollowed"
    })
    loading.value = false;
  })
}
</script>
