<template>
  <div
    class="relative w-[23rem] h-[32.5rem] sm:w-[44rem] sm:h-[39.5rem] rounded-2xl shadow-2xl border border-white backdrop-brightness-150 backdrop-blur-3xl animate-fade-in-fwd">
    <router-link :to="{ name: 'MainView' }"
      class="absolute top-1 right-1 btn btn-sm btn-ghost btn-circle flex justify-center items-center">
      <XIcon class="w-5 h-5 sm:h-7 sm:w-7 text-black/70"></XIcon>
    </router-link>
    <div class="mt-1 flex justify-center">
      <p class="text-xl sm:text-3xl font-bold">FavPhotos</p>
    </div>
    <hr>
    <div class="relative h-[27rem] sm:h-[33rem] w-full flex justify-center">
      <div v-if="loading" class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
        <svg class="w-16 h-16 animate-spin text-white" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </svg>
      </div>
      <div v-if="!noExist" v-show="showFavPhoto" class="grid grid-cols-4 animate-fadeIn">
        <div v-for="item in photos" :key="item.id">
          <div class="group w-max h-max relative">
            <img @click="showPhoto(item)" :src="item.image" @load="load(item.id)"
              class="w-[5.7rem] h-[9rem] sm:w-[11rem] sm:h-[11rem] border group-hover:brightness-50 group-hover:border-black transition duration-150 cursor-pointer">
            <div class="invisible absolute top-1 left-1 group-hover:animate-show">
              <button @click="showProfile(item)"
                class="hover:ring-1 ring-white transition duration-300 rounded-full flex justify-center items-center tooltip tooltip-right tooltip-info normal-case"
                :data-tip="item.user.name">
                <img v-if="item.user.image" :src="item.user.image" class="w-7 h-7 rounded-full" />
                <UserCircleIcon v-else class="text-white w-7 h-7 rounded-full"></UserCircleIcon>
              </button>
            </div>
            <div class="invisible absolute top-1 right-1 group-hover:animate-show text-white ">
              <p class="text-right text-lg">{{ item.title }}</p>
              <p class="text-sm text-right">{{ item.date }}</p>
            </div>
            <div class="invisible absolute bottom-1 right-1 group-hover:animate-show">
              <div class="flex justify-end cursor-pointer">
                <div v-if="!deleteLoading" @click="deleteFavPhoto(item.id)" class="tooltip tooltip-info tooltip-left"
                  data-tip="Unfav">
                  <svg class="w-7 h-7 text-primary hover:text-primary/70 transition duration-300" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                </div>
                <svg v-else class="w-7 h-7 animate-spin text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <p class="text-xl font-bold">You don't have a favorite photo.</p>
      </div>
    </div>
    <div class="mt-3 flex justify-center">
      <div class="btn-group">
        <button :class="{ 'btn-disabled': !links.prev || loading }" @click="getFavPhotos(links.prev)"
          class="btn btn-sm sm:btn-md btn-primary flex justify-center items-center">
          <ChevronDoubleLeftIcon class="w-4 h-4 sm:w-6 sm:h-6"></ChevronDoubleLeftIcon>
        </button>
        <button class="btn btn-sm sm:btn-md text-sm sm:text-lg btn-outline">{{ meta.current_page }}</button>
        <button :class="{ 'btn-disabled': !links.next || loading }" @click="getFavPhotos(links.next)"
          class="btn  btn-sm sm:btn-md btn-primary flex justify-center items-center">
          <ChevronDoubleRightIcon class="w-4 h-4 sm:w-6 sm:h-6"></ChevronDoubleRightIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, UserCircleIcon, XIcon } from '@heroicons/vue/outline';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

let showFavPhoto = ref(false);
let noExist = ref(false);

const store = useStore();
const router = useRouter();

const photos = computed(() => store.state.favPhotos);
const favPhotos = computed(() => store.state.user.favPhotos);

let loading = ref(true);

let meta = ref({});
let links = ref({});

function getFavPhotos(url = null) {
  showFavPhoto.value = false;
  store.dispatch("getFavPhotos", url)
    .then((res) => {
      meta.value = res.meta;
      links.value = res.links;
      if (!store.state.lastFavPhotoId) {
        noExist.value = true;
        loading.value = false;
      }
    })
}

getFavPhotos();

function load(id) {
  if (id === store.state.lastFavPhotoId) {
    loading.value = false;
    showFavPhoto.value = true;
  }
}

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

let deleteLoading = ref(false);

function deleteFavPhoto(id) {
  deleteLoading.value = true;
  store.dispatch("deleteFavPhoto", favPhotos.value.get(id)).then(() => {
    loading.value = true;
    store.commit("setNotification", {
      error: false,
      message: "Removed from favorites."
    })
    const url = meta.value.links[meta.value.current_page].url;
    getFavPhotos(url);
    deleteLoading.value = false;
  }).catch(() => {
    store.commit("setNotification", {
      error: true,
      message: "Failed to remove from favorites"
    })
    deleteLoading.value = false;
  })
}
</script>
