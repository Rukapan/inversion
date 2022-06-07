<template>
  <div
    class="relative w-[44rem] h-[39.5rem] rounded-2xl shadow-2xl border border-white backdrop-brightness-150 backdrop-blur-3xl">
    <router-link :to="{ name: 'MainView' }"
      class="absolute top-1 right-1 btn btn-sm btn-ghost btn-circle flex justify-center items-center">
      <XCircleIcon class="h-7 w-7"></XCircleIcon>
    </router-link>
    <div class="mt-1 flex justify-center">
      <p class="text-3xl font-bold">FavPhotos</p>
    </div>
    <hr>
    <div class="relative h-[33rem] w-full flex justify-center">
      <div v-if="loading" class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
        <svg class="animate-spin -ml-1 mr-3 w-16 h-16 text-white" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </div>
      <div class="grid grid-cols-4">
        <div v-for="item in photos" :key="item.id" class="animate-fadeIn">
          <div class="group w-max h-max relative">
            <img @click="showPhoto(item)" :src="item.image"
              class="w-[11rem] h-[11rem] border group-hover:brightness-50 group-hover:border-black transition duration-300 delay-200 cursor-pointer">
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
                <div @click="deleteFavPhoto(item.id)">
                  <svg class="w-9 h-9 text-primary hover:text-primary/50 transition duration-300" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 flex justify-center">
      <div class="btn-group">
        <button :class="{ 'btn-disabled': !links.prev || loading }" @click="getFavPhotos(links.prev)"
          class="btn btn-primary flex justify-center items-center">
          <ChevronDoubleLeftIcon class="w-7 h-7"></ChevronDoubleLeftIcon>
        </button>
        <button class="btn text-lg">{{ meta.current_page }}</button>
        <button :class="{ 'btn-disabled': !links.next || loading }" @click="getFavPhotos(links.next)"
          class="btn btn-primary text-lg flex justify-center items-center">
          <ChevronDoubleRightIcon class="w-7 h-7"></ChevronDoubleRightIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, UserCircleIcon } from '@heroicons/vue/outline';
import { XCircleIcon } from '@heroicons/vue/outline';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const photos = computed(() => store.state.favPhotos);
const favPhotos = computed(() => store.state.user.favPhotos);

let loading = ref(false);

let meta = ref({});
let links = ref({});

function getFavPhotos(url = null) {
  loading.value = true;
  store.dispatch("getFavPhotos", url)
    .then((res) => {
      meta.value = res.meta;
      links.value = res.links;
      loading.value = false;
    })
}

getFavPhotos();

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

function deleteFavPhoto(id) {
  store.dispatch("deleteFavPhoto", favPhotos.value.get(id)).then(() => {
    store.commit("setNotification", {
      error: false,
      message: "Removed from favorites."
    })
    const url = meta.value.links[meta.value.current_page].url;
    getFavPhotos(url);
  }).catch(() => {
    store.commit("setNotification", {
      error: true,
      message: "Failed to remove from favorites"
    })
  })
}
</script>
