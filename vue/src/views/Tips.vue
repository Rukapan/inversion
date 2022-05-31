<template>
  <div class="hero px-3 py-5 rounded-2xl shadow-2xl border backdrop-brightness-150 backdrop-blur-3xl">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Welcome Inversion</h1>
        <p class="py-6 text-xl">This app allows you to create an album of your life. you can only post a photo once a
          day, so post a photo that reminds you of that day.</p>
        <router-link :to="{ name: 'Profile' }" class="btn btn-primary text-white">Create Profile</router-link>
      </div>
    </div>
  </div>
</template>
