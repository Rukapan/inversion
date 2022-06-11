<template>
  <!-- IconMenu -->
  <div
    class="h-max w-max flex justify-center items-center space-x-3 backdrop-blur-3xl backdrop-brightness-150 rounded-2xl border border-white shadow-2xl py-1 px-1">
    <!-- UserAlbumIcon -->
    <router-link :to="{ name: 'Album' }"
      class="btn btn-ghost btn-circle sm:btn-lg tooltip tooltip-info normal-case flex justify-center items-center"
      data-tip="Your Album">
      <PhotographIcon class="w-10 h-10 sm:w-14 sm:h-14"></PhotographIcon>
    </router-link>
    <!-- AddAlbumIcon -->
    <router-link :to="{ name: 'PostPhoto' }"
      class="btn btn-ghost btn-circle sm:btn-lg tooltip tooltip-info flex justify-center items-center normal-case"
      data-tip="Today's Photo">
      <PlusIcon class="w-10 h-10 sm:w-14 sm:h-14"></PlusIcon>
    </router-link>
    <!-- Favorites -->
    <div class="dropdown dropdown-top dropdown-hover">
      <label tabindex="0"
        class="btn btn-ghost btn-circle text-primary flex justify-center items-center sm:btn-lg tooltip tooltip-right tooltip-info z-10 normal-case"
        data-tip="Favorite">
        <HeartIcon class="w-10 h-10 sm:w-14 sm:h-14"></HeartIcon>
      </label>
      <ul tabindex="0" class="dropdown-content menu shadow bg-white/70 rounded-box w-max">
        <li class="tooltip tooltip-right tooltip-info" data-tip="Photos">
          <router-link :to="{ name: 'FavPhotos' }">
            <svg class="w-8 sm:w-10 h-8 sm:h-10" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z" />
            </svg>
          </router-link>
        </li>
        <li class="tooltip tooltip-right tooltip-info" data-tip="Users">
          <router-link :to="{ name: 'FavUsers' }">
            <svg class="w-8 sm:w-10 h-8 sm:h-10" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M5,15L4.4,14.5C2.4,12.6 1,11.4 1,9.9C1,8.7 2,7.7 3.2,7.7C3.9,7.7 4.6,8 5,8.5C5.4,8 6.1,7.7 6.8,7.7C8,7.7 9,8.6 9,9.9C9,11.4 7.6,12.6 5.6,14.5L5,15M15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4M15,10.1A2.1,2.1 0 0,1 12.9,8A2.1,2.1 0 0,1 15,5.9C16.16,5.9 17.1,6.84 17.1,8C17.1,9.16 16.16,10.1 15,10.1M15,13C12.33,13 7,14.33 7,17V20H23V17C23,14.33 17.67,13 15,13M21.1,18.1H8.9V17C8.9,16.36 12,14.9 15,14.9C17.97,14.9 21.1,16.36 21.1,17V18.1Z" />
            </svg>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- UserProfile -->
    <router-link :to="{ name: 'Profile' }"
      class="btn btn-ghost btn-circle sm:btn-lg tooltip tooltip-info normal-case flex justify-center items-center"
      data-tip="Profile">
      <img v-if="store.state.user.profile.image" :src="store.state.user.profile.image"
        class="w-8 h-8 sm:w-12 sm:h-12 rounded-full">
      <UserCircleIcon v-else class="w-9 h-9 sm:w-14 sm:h-14"></UserCircleIcon>
    </router-link>
  </div>
</template>

<script setup>
import { PlusIcon, PhotographIcon, UserCircleIcon } from '@heroicons/vue/outline';
import { HeartIcon } from '@heroicons/vue/solid';
import { useStore } from 'vuex';

const store = useStore();
</script>
