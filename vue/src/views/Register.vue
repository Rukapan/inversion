<template>
  <!-- Title -->
  <div>
    <h2 class="mt-2 text-center text-2xl sm:text-4xl font-bold">Welcome to Inversion </h2>
    <h3 class="text-center sm:text-lg">Create your life album.</h3>
  </div>
  <!-- Form -->
  <form class="mt-6" @submit="register">
    <!--Alert-->
    <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm mb-1 animate-rumble">
      <div v-for="(field, i) of Object.keys(errors)" :key="i">
        <div v-for="(error, ind) of errors[field] || []" :key="ind"> * {{ error }} </div>
      </div>
    </Alert>
    <input type="hidden" name="remember" value="true" />
    <div class="px-5 space-y-1">
      <!--Email-->
      <div class="form-control shadow">
        <label class="sr-only" for="email"> Email </label>
        <label class="input-group">
          <span class="bg-base-100">
            <AtSymbolIcon class="h-4 w-4 sm:h-5 sm:w-5"></AtSymbolIcon>
          </span>
          <input id="email-address" name="email" type="email" autocomplete="email" placeholder="example@site.com"
            v-model="user.email"
            class="input input-bordered relative w-[15rem] sm:w-[20rem] h-8 sm:h-12 focus:outline-none focus:ring-black/70 focus:border-black/70 focus:z-10 sm:text-sm bg-white/40 placeholder:text-black/80 border border-base-100"
            :class="{ 'border-error': errors.email, 'z-10': errors.email }" />
        </label>
      </div>
      <!--Password-->
      <div class="form-control shadow">
        <label class="sr-only" for="password"> Password </label>
        <label class="input-group">
          <span class="bg-base-100">
            <KeyIcon class="h-4 w-4 sm:h-5 sm:w-5"></KeyIcon>
          </span>
          <input id="password" name="password" type="password" autocomplete="current-password" placeholder="Password"
            v-model="user.password"
            class="input input-bordered relative w-full h-8 sm:h-12 focus:outline-none focus:ring-black/70 focus:border-black/70 focus:z-10 sm:text-sm bg-white/40 placeholder:text-black/80 border border-base-100"
            :class="{ 'border-error': errors.password, 'z-10': errors.password }" />
        </label>
      </div>
      <!--Login-->
      <div class="pt-1">
        <p class="text-right text-xs sm:text-sm text-black/70"> Or {{ ' ' }} <router-link :to="{ name: 'Login' }"
            class="font-medium text-secondary/70 hover:text-secondary"> Already have an account? </router-link>
        </p>
      </div>
    </div>
    <!--Submit-->
    <div class="mt-2 flex justify-center">
      <button type="submit" :disabled="loading"
        class="group flex justify-center py-2 px-4 btn btn-sm sm:btn-md btn-primary sm:text-lg font-medium rounded-md text-white hover:text-white/60 shadow"
        :class="{
          'cursor-not-allowed': loading, 'btn-disabled btn-outline': !submitButton
        }"> <span v-if="!loading" class="flex items-center mr-1">
          <LockClosedIcon class="w-3 h-3 sm:h-5 sm:w-5 text-white group-hover:hidden" aria-hidden="true" />
          <LockOpenIcon class="w-3 h-3 sm:h-5 sm:w-5 text-white/60 hidden group-hover:flex"></LockOpenIcon>
        </span> <svg v-if="loading" class="w-6 h-6 animate-spin text-white" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </svg> Sign Up </button>
    </div>
  </form>
</template>

<script setup>
import { KeyIcon, AtSymbolIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/vue/solid';
import { ref, watch } from 'vue';
import store from '../store';
import { useRouter } from 'vue-router';
import Alert from "../components/Alert.vue";


const router = useRouter();

const user = ref({
  email: "",
  password: "",
})

const loading = ref(false);
const errors = ref({});
let submitButton = ref(false);
watch(user.value, (newValue, oldValue) => {
  if (user.value.email !== "" && user.value.password !== "") {
    submitButton.value = true;
  } else {
    submitButton.value = false;
  }
})

function register(ev) {
  ev.preventDefault();
  loading.value = true;
  store
    .dispatch("register", user.value)
    .then(() => {
      loading.value = false;
      router.push({
        name: "MainView"
      });
    })
    .catch((error) => {
      loading.value = false;
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
}
</script>
