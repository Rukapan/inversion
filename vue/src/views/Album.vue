<template>
  <div @mouseleave="stopScroll" class="relative w-screen h-screen backdrop-brightness-125 backdrop-blur-xl">
    <router-link :to="{ name: 'MainView' }"
      class="absolute top-0 right-0 sm:top-2 sm:right-2 btn btn-ghost btn-circle flex justify-center items-center z-10">
      <XCircleIcon class="h-7 w-7 sm:h-10 sm:w-10"></XCircleIcon>
    </router-link>
    <div v-if="loading" class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20">
      <svg class="animate-spin -ml-1 mr-3 w-20 h-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
    </div>
    <div class="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0 z-10">
      <button @mousedown="photoScroll('left')" @mouseup="stopScroll" @mouseleave="stopScroll"
        class="btn btn-ghost btn-circle btn-lg group">
        <ArrowCircleLeftIcon class="w-14 h-14 text-white group-hover:text-black/30"></ArrowCircleLeftIcon>
      </button>
    </div>
    <div class="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-0 z-10">
      <button @mousedown="photoScroll('right')" @mouseup="stopScroll" @mouseleave="stopScroll"
        class="btn btn-ghost btn-circle btn-lg group">
        <ArrowCircleRightIcon class="w-14 h-14 text-white group-hover:text-black/30"></ArrowCircleRightIcon>
      </button>
    </div>
    <div v-if="!loading" ref="scroll"
      class="relative w-full h-full flex flex-row-reverse pt-[2.5rem] sm:pt-[4rem] overflow-x-scroll animate-fadeIn scroll-bar">
      <div v-for="item in album" :key="item.id" class="relative w-[26.5rem] h-[42rem]">
        <div class="w-[26.5rem] h-max border-y flex justify-center items-center bg-white/30 shadow-2xl">
          <p class="text-2xl font-bold">{{ item.date }}</p>
          <div v-if="!route.params.uuid" class="dropdown">
            <label tabindex="0" class="m-0.5 btn btn-sm btn-circle btn-outline group">
              <MenuIcon class="w-5 h-5 text-black group-hover:text-white"></MenuIcon>
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-max">
              <li @click="showDeleteWindow(item)">
                <p class="text-lg">
                  <TrashIcon class="h-5 w-5"></TrashIcon>Delete
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full h-8 flex justify-center">
          <div class="w-[0.5px] bg-primary"></div>
        </div>
        <div class="w-full flex justify-center">
          <img :src="item.image" class="max-w-[23rem] sm:max-w-[25rem] max-h-[30rem] rounded-2xl border shadow-2xl">
        </div>
        <div class="w-full h-5 flex justify-center">
          <div class="w-[0.5px] bg-primary"></div>
        </div>
        <div class="w-full flex justify-center">
          <div class="flex bg-white/50 rounded-2xl px-2 py-0.5 border border-white shadow-2xl">
            <p class="text-3xl font-bold">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="deleteWindow"
      class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 card w-[22rem] sm:w-[25rem] bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Do you want to delete this photo?</h2>
        <p class="text-lg">{{ deletePhoto.date }}</p>
        <p class="text-lg">{{ deletePhoto.title }}</p>
        <div class="card-actions justify-end">
          <button @click="submitDeletePhoto" class="btn btn-outline">
            <TrashIcon v-if="!deleteLoading" class="h-5 w-5"></TrashIcon> <svg v-else
              class="animate-spin -ml-1 mr-3 w-3 h-3 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg> Delete
          </button>
          <button @click="hideDeleteWindow" class="btn btn-primary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XCircleIcon, ArrowCircleLeftIcon, ArrowCircleRightIcon, MenuIcon, TrashIcon } from '@heroicons/vue/outline';
import { computed, onRenderTriggered, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import store from '../store';

const route = useRoute();

const album = computed(() => store.state.album);

let loading = ref(true);

store.dispatch("getUserAlbum", route.params.uuid).then(() => {
  loading.value = false;
})

const scroll = ref(null);
let scrollInterval = null;
function photoScroll(d) {
  scrollInterval = setInterval(() => {
    scroll.value.scrollLeft += (d === "right" ? 4 : -4);
  }, 1);
};
function stopScroll() {
  clearInterval(scrollInterval);
}


let deletePhoto = ref({})
let deleteWindow = ref(false);
function showDeleteWindow(photo) {
  deletePhoto.value = photo
  deleteWindow.value = true;
}
function hideDeleteWindow() {
  deleteWindow.value = false;
}

let deleteLoading = ref(false);

function submitDeletePhoto() {
  loading.value = true;
  deleteLoading.value = true;
  store.dispatch("deletePhoto", deletePhoto.value).then(() => {
    store.dispatch("getUserAlbum", route.params.uuid);
    store.commit("setNotification", {
      error: false,
      message: "Your photo has been deleted."
    })
  })
    .catch(() => {
      store.commit("setNotification", {
        error: true,
        message: "Please try it again."
      })
    })
  deleteWindow.value = false;
  deleteLoading.value = false;
}
</script>

<style>
.scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
