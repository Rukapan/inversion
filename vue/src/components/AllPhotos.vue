<template>
  <div v-if="!showPhotos" class="w-full flex justify-center">
    <span>
      <svg class="animate-spin -ml-1 mr-3 w-10 h-10 sm:h-16 sm:w-16 text-black/50" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </svg>
    </span>
  </div>
  <div v-show="showPhotos" v-for="date in keyDate" :key="date"
    class="w-full flex justify-center mb-10 animate-fade-in-bottom">
    <div>
      <div class="sticky z-10 top-0.5 flex justify-center">
        <DateWindow :date="date"
          class="w-max px-3 backdrop-blur-3xl backdrop-brightness-150 rounded-full border border-white shadow-2xl">
        </DateWindow>
      </div>
      <div :class="photoClass(date)"
        class="mt-3 sm:gap-5 lg:gap-8 xl:gap-10 space-y-3 sm:space-y-5 lg:space-y-8 xl:space-y-10">
        <Photos v-for="photo in photos.get(date)" :photo="photo" :favPhoto="favPhotos.get(photo.id)"
          @completeRender="showAllPhotos(photo.id)"></Photos>
      </div>
    </div>
  </div>
  <div class="hidden justify-center">
    <InfiniteLoading @infinite="load">
      <template #complete>
        <span class="text-2xl text-primary">No more photo found!</span>
      </template>
    </InfiniteLoading>
  </div>
</template>

<script setup>
import Photos from "../components/Photos.vue";
import DateWindow from '../components/DateWindow.vue';
import { computed, nextTick, ref } from 'vue';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { useStore } from 'vuex';

const store = useStore();
let showPhotos = ref(false);

let nextUrl = null;
function load($state) {
  store.dispatch("getAllPhotos", nextUrl)
    .then(async (res) => {
      nextUrl = res.next;
      await nextTick();
      if (nextUrl) {
        $state.loaded();
      } else {
        $state.complete();
      }
    });
}

const photos = computed(() => store.state.photos);
const keyDate = computed(() => store.state.keyDate);
const favPhotos = computed(() => store.state.user.favPhotos);
const lastPhotoId = computed(() => store.state.lastPhotoId);

function showAllPhotos(id) {
  if (id === lastPhotoId.value) {
    showPhotos.value = true;
  }
}

function photoClass(date) {
  let vClass;
  if (photos.value.get(date).length > 3) {
    vClass = "columns-1 lg:columns-2 xl:columns-3 2xl:columns-4";
  } else if (photos.value.get(date).length === 3) {
    vClass = "columns-1 lg:columns-2 xl:columns-3";
  } else if (photos.value.get(date).length === 2) {
    vClass = "columns-1 lg:columns-2";
  } else {
    vClass = "columns-1";
  }
  return vClass;
}
</script>
