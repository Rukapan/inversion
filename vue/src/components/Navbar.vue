<template>
  <!-- IconMenu -->
  <div
    class="h-full w-[18rem] flex justify-center items-center space-x-4 backdrop-blur-3xl backdrop-brightness-200 rounded-2xl border shadow-2xl px-3 py-2">
    <!-- AddAlbumIcon -->
    <router-link :to="{ name: 'PostPhoto' }" class="btn btn-ghost btn-circle">
      <PlusIcon class="w-10 h-10"></PlusIcon>
    </router-link>
    <!-- UserAlbumIcon -->
    <router-link :to="{ name: 'Album' }" class="btn btn-ghost btn-circle">
      <PhotographIcon class="w-10 h-10"></PhotographIcon>
    </router-link>
    <!-- Favorites -->
    <div class="dropdown dropdown-top dropdown-hover">
      <label tabindex="0" class="btn btn-ghost btn-circle text-primary">
        <HeartIcon class="w-10 h-10"></HeartIcon>
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 sm:w-52">
        <li>
          <router-link :to="{ name: 'FavPhotos' }">
            <PhotographIcon class="w-8 h-8"></PhotographIcon> Photos
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'FavUsers' }">
            <UserIcon class="w-8 h-8"></UserIcon> Users
          </router-link>
        </li>
      </ul>
    </div>
    <!-- UserProfile -->
    <router-link :to="{ name: 'Profile' }" class="btn btn-ghost btn-circle">
      <img v-if="store.state.user.profile.image" :src="store.state.user.profile.image" class="w-10 h-10 rounded-full">
      <UserCircleIcon v-else class="w-10 h-10"></UserCircleIcon>
    </router-link>
  </div>
</template>

<script setup>
import { PlusIcon, PhotographIcon, UserCircleIcon, UserIcon } from '@heroicons/vue/outline';
import { HeartIcon } from '@heroicons/vue/solid';
import { useStore } from 'vuex';

const store = useStore();

</script>
