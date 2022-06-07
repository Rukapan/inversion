<template>
  <div
    class="relative w-[22.5rem] h-[30rem] py-2 px-2 rounded-2xl shadow-2xl border border-white backdrop-brightness-150 backdrop-blur-3xl">
    <router-link :to="{ name: 'MainView' }"
      class="absolute top-1 right-1 btn btn-sm btn-ghost btn-circle flex justify-center items-center">
      <XCircleIcon class="h-7 w-7"></XCircleIcon>
    </router-link>
    <div class="flex justify-center w-full">
      <img v-if="profile.image" :src="profile.image" class="h-[15rem] w-[15rem] border border-white rounded-full">
      <UserCircleIcon v-else class="h-[15rem] w-[15rem] border border-white rounded-full"></UserCircleIcon>
    </div>
    <div class="mt-3 flex justify-center w-full">
      <div class="space-y-1">
        <p class="text-6xl font-extrabold text-center">{{ profile.name ? profile.name : "NewUser" }}</p>
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
    <div v-if="!otherUser" class="mt-5 flex justify-center w-full space-x-4">
      <router-link :to="{ name: 'ProfileEditor' }"
        class="btn btn-primary w-28 text-white hover:text-white/70 normal-case text-lg">
        <PencilAltIcon class="w-6 h-6"></PencilAltIcon> Edit
      </router-link>
      <div class="dropdown dropdown-top sm:dropdown-right">
        <label tabindex="0" class="btn btn-info normal-case w-28 text-black text-lg">
          <MenuIcon class="w-5 h-5"></MenuIcon> Menu
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-max">
          <li @click="logout">
            <p class="text-sm sm:text-lg">
              <LogoutIcon class="w-5 h-5 sm:w-6 sm:h-6"></LogoutIcon> Logout
            </p>
          </li>
          <li>
            <router-link :to="{ name: 'DeleteAccount' }" class="text-sm sm:text-lg">
              <TrashIcon class="w-5 h-5 sm:w-6 sm:h-6"></TrashIcon> Delete Account
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="mt-5 flex justify-center w-full space-x-4">
      <router-link :to="{ name: 'UserAlbum', params: profile }"
        class="btn btn-primary text-white hover:text-white/70 normal-case text-lg">
        <PhotographIcon class="w-8 h-8 mr-1"></PhotographIcon> Album
      </router-link>
      <button v-if="!favUsers.get(profile.uuid)" @click="postFavUser"
        class="btn btn-info normal-case text-lg flex justify-center items-center">
        <UserAddIcon class="w-7 h-7"></UserAddIcon> Follow
      </button>
      <button v-else @click="deleteFavUser" class="btn btn-info normal-case text-lg flex justify-center items-center">
        <UserRemoveIcon class="w-7 h-7"></UserRemoveIcon> UnFollow
      </button>
    </div>
  </div>
  <router-view class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10"></router-view>
</template>

<script setup>
import { ClockIcon, LocationMarkerIcon, XCircleIcon, PencilAltIcon, PhotographIcon, MenuIcon, LogoutIcon, TrashIcon, UserCircleIcon, UserAddIcon, UserRemoveIcon } from '@heroicons/vue/outline';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '../store';

const route = useRoute();
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

const router = useRouter();

function logout() {
  store.dispatch("logout").then(() => {
    router.push({
      name: "Login"
    })
  })
}

function postFavUser() {
  store.dispatch("postFavUser", {
    user_id: profile.uuid
  }).then(() => {
    store.commit("setNotification", {
      error: false,
      message: `Followed ${profile.name}`
    })
  }).catch(() => {
    store.commit("setNotification", {
      error: true,
      message: "Failed to fallow up."
    })
  })
}

function deleteFavUser() {
  store.dispatch("deleteFavUser", favUsers.value.get(profile.uuid)).then(() => {
    store.commit("setNotification", {
      error: false,
      message: `Unfollowed ${profile.name}`
    })
  }).catch(() => {
    store.commit("setNotification", {
      error: true,
      message: "Failed to unfollowed"
    })
  })
}
</script>
