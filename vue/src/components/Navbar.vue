<template>
  <!-- IconMenu -->
  <div
    class="h-full w-[18rem] flex justify-center items-center space-x-5 backdrop-blur-3xl backdrop-brightness-200 rounded-2xl border shadow-2xl px-3 py-2">
    <!-- AddAlbumIcon -->
    <router-link :to="{ name: 'PostPhoto' }" class="btn btn-ghost btn-circle">
      <PlusIcon class="w-10 h-10"></PlusIcon>
    </router-link>
    <!-- UserAlbumIcon -->
    <router-link :to="{ name: 'Album' }" class="btn btn-ghost btn-circle">
      <PhotographIcon class="w-10 h-10"></PhotographIcon>
    </router-link>
    <!-- UserProfile -->
    <router-link :to="{ name: 'Profile' }" class="btn btn-ghost btn-circle">
      <img
        :src="[this.$store.state.user.profile.image ? this.$store.state.user.profile.image : '/public/images/user-icon.png']"
        class="w-10 h-10 rounded-full">
    </router-link>
  </div>
</template>

<script setup>
import { PlusIcon, PhotographIcon } from '@heroicons/vue/outline';

</script>
