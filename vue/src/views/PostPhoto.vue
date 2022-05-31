<template>
  <div
    class="relative w-[22.5rem] h-[35rem] sm:w-[30rem] sm:h-[40rem] px-5 py-2 rounded-2xl shadow-2xl border border-white backdrop-brightness-150 backdrop-blur-3xl">
    <router-link :to="{ name: 'MainView' }"
      class="absolute top-1 right-1 btn btn-sm btn-ghost btn-circle flex justify-center items-center">
      <XCircleIcon class="h-7 w-7"></XCircleIcon>
    </router-link>
    <div class="w-full flex justify-center">
      <p class="text-2xl sm:text-3xl">{{ today }}</p>
    </div>
    <div class="w-full flex justify-center">
      <p class="text-xl sm:text-2xl font-bold">{{ lastPost.is_post && !rePost ? "You can post" : "You already posted today" }}</p>
    </div>
    <input type="file" class="hidden" ref="inputFile" accept="image/jpeg, image/jpg, image/png"
      @change="compressImage" />
    <form v-if="lastPost.is_post || rePost" @submit="postPhoto">
      <div class="mt-4 w-full h-[25rem] sm:h-[29rem] flex justify-center items-center">
        <button @click="changeImage"
          class="relative w-max h-max px-0.5 py-0.5 border border-white rounded-2xl group group-hover:border-black transition duration-300">
          <div v-if="photo.image">
            <img :src="photo.image" :class="{ 'brightness-50': loading }"
              class="w-full max-h-[25rem] sm:max-h-[29rem] rounded-2xl group-hover:brightness-50 transition duration-300">
            <p
              class="invisible group-hover:animate-show absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-xl">
              Click to Change Image</p>
            <div class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 w-10 h-10 sm:h-30 sm:w-30 text-white"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </div>
          </div>
          <div v-else
            class="w-[25rem] h-[25rem] sm:h-[29rem] bg-white/30 rounded-2xl flex justify-center items-center group-hover:bg-black/10 transition duration-300">
            <svg style="width:120px;height:120px" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M13 19C13 19.7 13.13 20.37 13.35 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H19C20.11 3 21 3.9 21 5V13.35C20.37 13.13 19.7 13 19 13V5H5V19H13M13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H13.35C13.75 15.88 14.47 14.91 15.4 14.21L13.96 12.29M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
            </svg>
          </div>
        </button>
      </div>
      <div class="mt-4 flex justify-center items-center w-full">
        <div class="form-control">
          <div class="input-group">
            <input type="text" v-model="photo.title" placeholder="Photo Title..."
              class="input input-bordered bg-white/0 border-white placeholder:text-black/80 font-bold text-lg text-center" />
            <button type="submit" :class="{ 'btn-disabled btn-outline': !postButton || loading }"
              class="btn w-14 btn-square btn-primary text-white hover:text-white/60">
              <UploadIcon class="h-7 w-7"></UploadIcon>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div v-else>
      <div class="mt-4">
        <div class="w-full h-[25rem] sm:h-[29rem] flex justify-center items-center">
          <button @click="changeImage"
            class="relative group border border-white hover:border-black transition duration-300 rounded-2xl flex justify-center items-center shadow">
            <img :src="lastPost.image"
              class="w-full max-h-[25rem] sm:max-h-[29rem] rounded-2xl group-hover:brightness-50">
            <div class="absolute invisible group-hover:animate-show">
              <p class="text-white text-xl">If you want to change today photo? Click Here.</p>
            </div>
          </button>
        </div>
      </div>
      <div class="mt-4 w-full">
        <p class="text-center text-3xl sm:text-4xl font-bold border-b border-primary">{{ lastPost.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XCircleIcon, UploadIcon } from '@heroicons/vue/outline';
import { ref, computed, watch } from 'vue';
import store from '../store';

const date = new Date();
const today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

const lastPost = computed(() => store.state.user.lastPost);

const photo = ref({
  title: "",
  image: null
})

let postButton = ref(false);

watch(photo.value,
  (newValue, oldValue) => {
    if (photo.value.title !== "" && photo.value.image !== null) {
      postButton.value = true;
    } else {
      postButton.value = false;
    }
  }
)

const rePost = ref(false);
const inputFile = ref();
function changeImage(ev) {
  ev.preventDefault();
  inputFile.value.click();
}

async function compressImage(ev) {
  const file = ev.target.files[0];
  const compFile = await store.dispatch("compressImage", {
    image: file,
    size: 1,
    width: 2000,
  });
  const reader = new FileReader();
  reader.onload = () => {
    photo.value.image = reader.result;
    rePost.value = true;
    ev.target.value = "";
  };
  reader.readAsDataURL(compFile);
}

let loading = ref(false);

function postPhoto(ev) {
  loading.value = true;
  ev.preventDefault();
  store.dispatch("postPhoto", photo.value)
    .then(() => {
      store.commit("setNotification", {
        error: false,
        message: "Your photo has been uploaded."
      })
      loading.value = false;
      rePost.value = false;
      photo.value.title = "";
    })
    .catch(() => {
      loading.value = false;
      store.commit("setNotification", {
        error: true,
        message: "Please try it again."
      })
    })
}
</script>
