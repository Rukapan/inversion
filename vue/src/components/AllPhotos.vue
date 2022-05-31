<template>
  <div class="w-max h-max">
    <div v-for="n in photos" :key="n" class="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5 mt-5">
      <div v-for="item in n" :key="item.id" class="group relative animate-fadeIn">
        <img @click="showPhoto(item)" :src="item.image"
          class="w-[22.5rem] max-h-[30rem] rounded-2xl border border-white shadow-2xl group-hover:brightness-50 group-hover:border-black/50 transition duration-300 cursor-pointer">
        <div class="sm:invisible group-hover:animate-show">
          <div class="absolute top-2 left-2">
            <button @click="showProfile(item)"
              class="hover:ring-1 ring-white transition duration-300 rounded-full flex justify-center items-center tooltip tooltip-right tooltip-info normal-case"
              :data-tip="item.user.name">
              <img :src="[item.user.image ? item.user.image : '/public/images/user-icon.png']"
                class="w-[2.5rem] h-[2.5rem] 2xl:w-[2.8rem] 2xl:h-[2.8rem] rounded-full" />
            </button>
          </div>
          <div class="absolute top-2 right-2 text-white text-right">
            <p class="cursor-default text-3xl">{{ item.title }}</p>
            <p class="cursor-default text-lg">{{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <InfiniteLoading @infinite="load">
        <template #spinner>
          <span>
            <svg class="animate-spin -ml-1 mr-3 w-10 h-10 sm:h-14 sm:w-14 text-black/80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </span>
        </template>
        <template #complete>
          <span class="text-2xl text-primary">No more photo found!</span>
        </template>
      </InfiniteLoading>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const photos = computed(() => store.state.photos);

let nextUrl = null;

function load($state) {
  store.dispatch("getAllPhotos", nextUrl)
    .then((res) => {
      nextUrl = res.next;
      setTimeout(() => {
        if (nextUrl) {
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 1000);
    });
}

const router = useRouter();

function showPhoto(photo) {
  store.commit("setPhoto", photo);
  router.push({
    name: "Photo",
    params: photo
  })
}

function showProfile(photo) {
  router.push({
    name: "UserProfile",
    params: photo.user
  })
}

</script>
