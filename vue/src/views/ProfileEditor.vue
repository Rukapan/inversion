<template>
  <div
    class="relative w-[22rem] h-[28.8rem] py-2 px-2 rounded-2xl shadow-2xl border border-white backdrop-brightness-150 backdrop-blur-3xl">
    <button @click="back"
      class="absolute top-1 right-1 btn btn-sm btn-ghost btn-circle flex justify-center items-center z-10">
      <XIcon class="h-6 w-6 text-black/60"></XIcon>
    </button>
    <div class="relative flex justify-center w-full">
      <div @click="changeImage" class="group rounded-full tooltip tooltip-right tooltip-info" data-tip="Change Icon">
        <input type="file" ref="inputFile" class="hidden" @change="compressImage">
        <img v-if="profile.image" :src="profile.image"
          class="h-[15rem] w-[15rem] rounded-full group-hover:brightness-75 border border-white group-hover:border-black cursor-pointer transition duration-300">
        <div v-else
          class="flex justify-center items-center h-[15rem] w-[15rem] rounded-full group-hover:brightness-75 border border-white group-hover:border-black cursor-pointer transition duration-300">
          <UserCircleIcon class="h-[15rem] w-[15rem] group-hover:brightness-75"></UserCircleIcon>
        </div>
        <svg
          class="absolute invisible group-hover:animate-show text-white cursor-pointer top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          style="width:70px;height:70px" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M13 19C13 19.7 13.13 20.37 13.35 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H19C20.11 3 21 3.9 21 5V13.35C20.37 13.13 19.7 13 19 13V5H5V19H13M13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H13.35C13.75 15.88 14.47 14.91 15.4 14.21L13.96 12.29M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
        </svg>
      </div>
    </div>
    <form @submit="saveProfile" class="space-y-3 mt-3">
      <div class="flex justify-center w-full">
        <div class="relative w-[75%] h-10 tooltip tooltip-right tooltip-info" data-tip="UserName">
          <UserIcon class="absolute left-0 w-7 h-7"></UserIcon>
          <input name="name" type="text" v-model="profile.name"
            class="w-full bg-white/0 border-b border-white outline-none text-2xl text-center placeholder:text-black/70"
            placeholder="Name" />
          <PencilIcon class="absolute right-0 top-1.5 h-5 w-5"></PencilIcon>
        </div>
      </div>
      <div class="flex justify-center w-full">
        <div class="relative flex justify-center items-center w-[75%] h-10 tooltip tooltip-right tooltip-info"
          data-tip="Age">
          <ClockIcon class="absolute left-0 w-7 h-7"></ClockIcon>
          <div v-if="scrollPicker.hoverAge" class="animate-fadeIn cursor-pointer">
            <vue-scroll-picker :options="ageOptions" v-model="profile.age" @mouseleave="leaveEl('hoverAge')" />
          </div>
          <p v-else @mouseover="hoverEl('hoverAge')" @mouseleave="leaveEl('hoverAge')"
            class="w-full text-center text-2xl border-b border-white bg-white/0 animate-fadeIn cursor-pointer">{{
            profile.age }}</p>
          <svg class="absolute right-0" style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
          </svg>
        </div>
      </div>
      <div class="flex justify-center w-full">
        <div class="relative flex justify-center items-center w-[75%] h-10 tooltip tooltip-right tooltip-info"
          data-tip="Location">
          <LocationMarkerIcon class="absolute left-0 w-7 h-7"></LocationMarkerIcon>
          <div v-if="scrollPicker.hoverLocation" class="animate-fadeIn cursor-pointer">
            <vue-scroll-picker :options="locationOptions" v-model="profile.location"
              @mouseleave="leaveEl('hoverLocation')" />
          </div>
          <p v-else @mouseover="hoverEl('hoverLocation')" @mouseleave="leaveEl('hoverLocation')"
            class="w-full text-center text-2xl border-b border-white bg-white/0 animate-fadeIn cursor-pointer">{{
            profile.location }}</p>
          <svg class="absolute right-0" style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
          </svg>
        </div>
      </div>
      <div class="flex justify-center w-full pt-0.5">
        <button type="submit" class="btn btn-sm btn-primary text-white normal-case text-lg space-x-1 tooltip tooltip-right tooltip-info" data-tip="Save">
          <SaveIcon v-if="!loading" class="w-7 h-7"></SaveIcon> <svg v-if="loading"
            class="animate-spin w-3 h-3 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { XIcon, UserIcon, ClockIcon, LocationMarkerIcon, PencilIcon, SaveIcon, UserCircleIcon } from '@heroicons/vue/outline';
import { computed, ref } from "vue";
import { useRouter } from 'vue-router';
import { VueScrollPicker } from "vue-scroll-picker"
import store from "../store";

const router = useRouter();

const profile = computed(() => store.state.user.profile);

const scrollPicker = ref({
  hovering: false,
  hoverAge: false,
  hoverLocation: false
})
const ageOptions = [...Array(130)].map((_, i) => i + 1);
const locationOptions = ["JP", "AU", "CF", "CA", "CN", "FR", "GB", "HK", "IN", "IT", "KR", "RU", "TH", "US", "EARTH"]

function hoverEl(name) {
  scrollPicker.value.hovering = true;
  setTimeout(() => {
    scrollPicker.value[name] = scrollPicker.value.hovering;
  }, 400);
}
function leaveEl(name) {
  scrollPicker.value.hovering = false;
  scrollPicker.value[name] = false;
}

const inputFile = ref();

function changeImage() {
  inputFile.value.click();
}

async function compressImage(ev) {
  const file = ev.target.files[0];
  const compFile = await store.dispatch("compressImage", {
    image: file,
    size: 0.3,
    width: 800,
  });
  const reader = new FileReader();
  reader.onload = () => {
    profile.value.image = reader.result;
    profile.value.changeImage = true;
    ev.target.value = "";
  };
  reader.readAsDataURL(compFile);
}

let loading = ref(false);

function saveProfile(ev) {
  loading.value = true;
  ev.preventDefault();
  store.dispatch("saveProfile", profile.value)
    .then(() => {
      store.commit("reloadPhotos")
      store.commit("setNotification", {
        error: false,
        message: "Your profile has been updated."
      })
      loading.value = false;
      router.push({
        name: "Profile"
      })
    })
    .catch(() => {
      store.commit("setNotification", {
        error: true,
        message: "Please try it again."
      })
    })
}

function back() {
  router.back();
}
</script>

<style src="vue-scroll-picker/lib/style.css">
</style>
