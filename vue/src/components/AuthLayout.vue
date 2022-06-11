<template>
  <div v-show="imageLoad" class="w-screen h-screen flex justify-center text-black select-none animate-fade-in-fwd">
    <img class="-z-10 object-cover object-center" src="/public/img/inversion-auth.png" @load="load">
    <div
      class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-max h-max flex justify-center items-center rounded-2xl shadow-2xl border border-white backdrop-brightness-150 backdrop-blur-3xl">
      <div class="h-max w-max flex items-center justify-center p-4 sm:p-6 lg:px-8">
        <div class="max-w-md w-full">
          <div class="flex justify-center items-center">
            <img class="h-7 w-7 sm:h-10 sm:w-10" src="/public/img/inversion-logo.png" />
          </div>
          <router-view></router-view>
          <div class="flex justify-center mt-8">
            <p class="text-sm text-black/80">Inversion is created by <a href="https://portfolio-by-aurk.netlify.app"
                class="underline hover:text-black tooltip tooltip-right tooltip-info cursor-pointer"
                data-tip="https://portfolio-by-aurk.netlify.app">Au/rK</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


let imageLoad = ref(false);
function load() {
  imageLoad.value = true;
}

</script>
