<template>
  <div class="group w-max relative rounded-2xl">
    <img @click="showPhoto(photo)" :src="photo.image" @load="load"
      class="w-[22.5rem] max-h-[30rem] rounded-2xl border border-white shadow-2xl group-hover:brightness-50 group-hover:border-black/50 transition duration-300 cursor-pointer">
    <div class="sm:invisible group-hover:animate-show">
      <div class="absolute top-2 left-2">
        <button @click="showProfile(photo)"
          class="hover:ring-1 ring-white transition duration-300 rounded-full flex justify-center photos-center tooltip tooltip-right tooltip-info normal-case"
          :data-tip="photo.user.name">
          <img v-if="photo.user.image" :src="photo.user.image"
            class="w-[2.5rem] h-[2.5rem] 2xl:w-[2.8rem] 2xl:h-[2.8rem] rounded-full" />
          <UserCircleIcon v-else class="text-white w-[2.5rem] h-[2.5rem] 2xl:w-[2.8rem] 2xl:h-[2.8rem] rounded-full">
          </UserCircleIcon>
        </button>
      </div>
      <div class="absolute top-2 right-2 text-white text-right">
        <p class="cursor-default text-3xl">{{ photo.title }}</p>
        <p class="cursor-default text-sm">{{ photo.date }}</p>
        <div class="mt-1 flex justify-end cursor-pointer" v-if="photo.uuid !== store.state.user.data.uuid">
          <button @click="deleteFavPhoto(photo.id)" v-if="favPhoto" class="tooltip tooltip-bottom tooltip-info"
            data-tip="Unfav">
            <div v-if="!loading">
              <svg class="w-8 h-8 text-primary hover:text-primary/70" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </svg>
            </div>
            <div v-else>
              <svg class="w-8 h-8 animate-spin text-white" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
              </svg>
            </div>
          </button>
          <button @click="postFavPhoto(photo.id)" v-else>
            <div v-if="!loading" class="tooltip tooltip-bottom tooltip-info" data-tip="Fav">
              <svg class="w-8 h-8 text-primary hover:text-primary/70" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
              </svg>
            </div>
            <div v-else>
              <svg class="w-8 h-8 animate-spin text-white" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserCircleIcon } from '@heroicons/vue/outline';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';

const props = defineProps({
  photo: Object,
  favPhoto: null,
})

const emit = defineEmits(['completeRender'])

const store = useStore();

function load() {
  emit('completeRender')
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

let loading = ref(false);

function postFavPhoto(id) {
  loading.value = true;
  store.dispatch("postFavPhoto", {
    photo_id: id,
    uuid: store.state.user.data.uuid
  }).then(() => {
    store.commit("setNotification", {
      error: false,
      message: "Added to favorites."
    });
    loading.value = false;
  })
    .catch(() => {
      store.commit("setNotification", {
        error: true,
        message: "Failed to add favorites"
      });
      loading.value = false;
    });
}

function deleteFavPhoto() {
  loading.value = true;
  store.dispatch("deleteFavPhoto", props.favPhoto).then(() => {
    store.commit("setNotification", {
      error: false,
      message: "Removed from favorites."
    });
    loading.value = false;
  })
    .catch(() => {
      store.commit("setNotification", {
        error: true,
        message: "Failed to remove from favorites"
      });
      loading.value = false;
    })
}
</script>
