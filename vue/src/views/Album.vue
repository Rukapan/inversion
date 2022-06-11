<template>
  <div @mouseleave="stopScroll"
    class="relative w-screen h-screen backdrop-brightness-125 backdrop-blur-xl animate-fade-in-fwd">
    <router-link :to="{ name: 'MainView' }"
      class="absolute top-0 right-0 sm:top-2 sm:right-2 btn btn-ghost btn-circle flex justify-center items-center z-10">
      <XIcon class="h-7 w-7 sm:h-8 sm:w-8 text-black/70"></XIcon>
    </router-link>
    <div v-if="loading" class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20">
      <svg class="w-16 h-16 animate-spin" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </svg>
    </div>
    <div class="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0 z-10">
      <button @mousedown="photoScroll('left')" @mouseup="stopScroll" @mouseleave="stopScroll"
        class="btn btn-ghost btn-circle btn-lg group">
        <ArrowCircleLeftIcon class="w-14 h-14 text-black/70 hover:text-black"></ArrowCircleLeftIcon>
      </button>
    </div>
    <div class="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-0 z-10">
      <button @mousedown="photoScroll('right')" @mouseup="stopScroll" @mouseleave="stopScroll"
        class="btn btn-ghost btn-circle btn-lg group">
        <ArrowCircleRightIcon class="w-14 h-14 text-black/70 hover:text-black"></ArrowCircleRightIcon>
      </button>
    </div>
    <div v-if="!noExist" v-show="!loading" ref="scroll"
      class="relative w-full h-full flex flex-row-reverse sm:pt-[4rem] overflow-x-scroll animate-fade-in-left scroll-bar">
      <div v-for="item in album" :key="item.id" class="relative w-[26.5rem] h-[42rem]">
        <div class="w-[26.5rem] h-max border-y flex justify-center items-end bg-white/30 shadow-2xl">
          <p class="text-2xl font-bold">{{ item.date }}</p>
          <div v-if="!route.params.uuid" class="dropdown">
            <label tabindex="0" class="m-0.5 btn btn-xs btn-circle btn-outline group">
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
          <img :src="item.image" @load="load(item.id)"
            class="max-w-[23rem] sm:max-w-[25rem] max-h-[29rem] rounded-2xl border shadow-2xl">
        </div>
        <div class="w-full h-5 flex justify-center">
          <div class="w-[0.5px] bg-primary"></div>
        </div>
        <div class="w-full flex justify-center">
          <div class="flex justify-center items-end bg-white/50 rounded-2xl px-2 py-0.5 border border-white shadow-2xl">
            <p class="text-3xl font-bold mr-1">{{ item.title }}</p>
            <div v-if="route.params.uuid">
              <div v-if="!favLoading">
                <div @click="deleteFavPhoto(item.id)" v-if="favPhotos.get(item.id)" class="cursor-pointer">
                  <svg class="w-7 h-7 text-primary hover:text-primary/70" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                </div>
                <div v-else>
                  <div @click="postFavPhoto(item.id)" class="group cursor-pointer">
                    <svg class="w-7 h-7 text-primary/70 group-hover:hidden" viewBox="0 0 24 24">
                      <path fill="currentColor"
                        d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                    </svg>
                    <svg class="w-7 h-7 text-primary/70 hidden group-hover:flex" viewBox="0 0 24 24">
                      <path fill="currentColor"
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div v-else>
                <svg class="w-7 h-7 animate-spin text-black/70" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <p class="text-2xl font-bold">There are no photos posted yet.</p>
      <div class="mt-5 w-full flex justify-center">
        <router-link :to="{ name: 'PostPhoto' }"
          class="btn btn-circle btn-primary btn-outline tooltip tooltip-bottom tooltip-info flex justify-center items-center normal-case"
          data-tip="Post a photo of the day">
          <PlusIcon class="w-8 h-8 text-white"></PlusIcon>
        </router-link>
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
import { XIcon, ArrowCircleLeftIcon, ArrowCircleRightIcon, MenuIcon, TrashIcon, PlusIcon } from '@heroicons/vue/outline';
import { computed, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

let noExist = ref(false);
let loading = ref(true);

const album = computed(() => store.state.album);
const lastId = computed(() => store.state.lastAlbumId)
const favPhotos = computed(() => store.state.user.favPhotos);

store.dispatch("getUserAlbum", route.params.uuid).then(() => {
  if (!lastId.value) {
    noExist.value = true;
    loading.value = false;
  }
})

function load(id) {
  console.log(id, lastId.value);
  if (id === lastId.value) {
    loading.value = false;
  }
}

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

let favLoading = ref(false);

function postFavPhoto(id) {
  favLoading.value = true;
  store.dispatch("postFavPhoto", {
    photo_id: id,
    uuid: store.state.user.data.uuid
  }).then(() => {
    store.commit("setNotification", {
      error: false,
      message: "Added to favorites."
    });
    favLoading.value = false;
  })
    .catch(() => {
      store.commit("setNotification", {
        error: true,
        message: "Failed to add favorites"
      });
      favLoading.value = false;
    });
}

function deleteFavPhoto(id) {
  favLoading.value = true;
  store.dispatch("deleteFavPhoto", favPhotos.value.get(id)).then(() => {
    store.commit("setNotification", {
      error: false,
      message: "Removed from favorites."
    });
    favLoading.value = false;
  })
    .catch(() => {
      store.commit("setNotification", {
        error: true,
        message: "Failed to remove from favorites"
      });
      favLoading.value = false;
    })
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
    store.dispatch("getUserAlbum", route.params.uuid).then(() => {
      loading.value = false;
    })
    store.commit("reloadPhotos");
    store.commit("setNotification", {
      error: false,
      message: "Your photo has been deleted."
    })
    deleteWindow.value = false;
    deleteLoading.value = false;
  })
    .catch(() => {
      store.commit("setNotification", {
        error: true,
        message: "Please try it again."
      }).then(() => {
        loading.value = false;
      })
      deleteWindow.value = false;
      deleteLoading.value = false;
    })
}

onUnmounted(() => {
  store.state.album = {};
  store.state.lastAlbumId = Number;
})
</script>

<style>
.scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
