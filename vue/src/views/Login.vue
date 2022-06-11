<template>
  <!--Title-->
  <div>
    <h2 class="mt-2 text-center text-2xl sm:text-4xl font-bold">Sign in to your account</h2>
    <h3 class="text-center sm:text-lg">Create your life album.</h3>
  </div>
  <!--Form-->
  <form class="mt-6" @submit="login">
    <!--Alert-->
    <Alert v-if="errorMsg" class="mb-1 animate-rumble"> {{ errorMsg }} <span @click="errorMsg = ''"
        class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
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
            class="input input-bordered relative w-[15rem] sm:w-[20rem] h-8 sm:h-12 focus:outline-none focus:ring-black/70 focus:border-black/70 focus:z-10 sm:text-sm bg-white/40 placeholder:text-black/80 border border-base-100" />
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
            class="input input-bordered relative w-full h-8 sm:h-12 focus:outline-none focus:ring-black/70 focus:border-black/70 focus:z-10 sm:text-sm bg-white/40 placeholder:text-black/80 border border-base-100" />
        </label>
      </div>
      <!--SignUp-->
      <div class="pt-1">
        <p class="text-right text-xs sm:text-sm text-black/70"> Or {{ ' ' }} <router-link :to="{ name: 'Register' }"
            class="font-medium text-secondary/70 hover:text-secondary"> Create an account? </router-link>
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
        </svg> Sign In </button>
    </div>
  </form>
</template>

<script setup>
import { KeyIcon, AtSymbolIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/vue/solid';
import store from "../store";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import Alert from "../components/Alert.vue";

const router = useRouter();

const user = ref({
  email: "",
  password: "",
  remember: false
})
let loading = ref(false);
let errorMsg = ref("");
let submitButton = ref(false);

watch(user.value, (newValue, oldValue) => {
  if (user.value.email !== "" && user.value.password !== "") {
    submitButton.value = true;
  } else {
    submitButton.value = false;
  }
})

function login(ev) {
  ev.preventDefault();
  loading.value = true;
  store
    .dispatch("login", user.value)
    .then(() => {
      loading.value = false;
      router.push({
        name: "MainView",
      });
    })
    .catch((err) => {
      console.log(err)
      loading.value = false;
      errorMsg.value = err.response.data.message;
    });
}
</script>
