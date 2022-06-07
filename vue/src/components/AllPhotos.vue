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
              <img v-if="item.user.image" :src="item.user.image"
                class="w-[2.5rem] h-[2.5rem] 2xl:w-[2.8rem] 2xl:h-[2.8rem] rounded-full" />
              <UserCircleIcon v-else
                class="text-white w-[2.5rem] h-[2.5rem] 2xl:w-[2.8rem] 2xl:h-[2.8rem] rounded-full"></UserCircleIcon>
            </button>
          </div>
          <div class="absolute top-2 right-2 text-white text-right">
            <p class="cursor-default text-3xl">{{ item.title }}</p>
            <p class="cursor-default text-lg">{{ item.date }}</p>
            <div class="flex justify-end cursor-pointer" v-if="item.uuid !== store.state.user.data.uuid">
              <div @click="deleteFavPhoto(item.id)" v-if="favPhotos.get(item.id)">
                <svg class="w-8 h-8 sm:w-10 sm:h-10 text-primary hover:text-primary/50 transition duration-300"
                  viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
              </div>
              <div @click="postFavPhoto(item.id)" v-else>
                <svg class="w-8 h-8 sm:w-10 sm:h-10 text-primary/50 hover:text-primary transition duration-300"
                  viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <InfiniteLoading @infinite="load">
        <template #spinner>
          <span>
            <svg class="animate-spin -ml-1 mr-3 w-10 h-10 sm:h-14 sm:w-14 text-black/80"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
import { UserCircleIcon } from '@heroicons/vue/outline';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const photos = computed(() => store.state.photos);
const favPhotos = computed(() => store.state.user.favPhotos);

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

function postFavPhoto(id) {
  favPhotos.value.set(id);
  store.dispatch("postFavPhoto", {
    photo_id: id,
    uuid: store.state.user.data.uuid
  }).then(() => {
    store.commit("setNotification", {
      error: false,
      message: "Added to favorites."
    })
  })
  .catch(() => {
    store.commit("setNotification", {
      error: true,
      message: "Failed to add favorites"
    })
  })
}

function deleteFavPhoto(id) {
  store.dispatch("deleteFavPhoto", favPhotos.value.get(id)).then(() => {
    store.commit("setNotification", {
      error: false,
      message: "Removed from favorites."
    })
  })
    .catch(() => {
      store.commit("setNotification", {
        error: true,
        message: "Failed to remove from favorites"
      })
    })
}
</script>
