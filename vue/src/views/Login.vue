<template>
  <div>
    <h2 class="mt-3 text-center text-2xl sm:text-4xl font-bold">Sign in to your account</h2>
    <p class="mt-2 text-center text-sm text-black/70"> Or {{ ' ' }} <router-link :to="{ name: 'Register' }"
        class="font-medium text-secondary/70 hover:text-secondary text-lg"> create an account </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit="login">
    <Alert v-if="errorMsg"> {{ errorMsg }} <span @click="errorMsg = ''"
        class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </Alert>
    <input type="hidden" name="remember" value="true" />
    <div class="px-5 space-y-1">
      <div class="form-control">
        <label class="sr-only" for="email"> Email </label>
        <label class="input-group">
          <span>
            <AtSymbolIcon class="h-4 w-4 sm:h-5 sm:w-5"></AtSymbolIcon>
          </span>
          <input id="email-address" name="email" type="email" autocomplete="email" placeholder="info@site.com"
            v-model="user.email"
            class="input input-bordered relative w-[15rem] sm:w-[20rem] h-8 sm:h-12 focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" />
        </label>
      </div>
      <div class="form-control">
        <label class="sr-only" for="password"> Password </label>
        <label class="input-group">
          <span>
            <KeyIcon class="h-4 w-4 sm:h-5 sm:w-5"></KeyIcon>
          </span>
          <input id="password" name="password" type="password" autocomplete="current-password" placeholder="Password"
            v-model="user.password"
            class="input input-bordered relative w-full h-8 sm:h-12 focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" />
        </label>
      </div>
    </div>
    <div class="flex justify-center">
      <button type="submit" :disabled="loading"
        class="group flex justify-center py-2 px-4 btn btn-sm sm:btn-md btn-primary sm:text-lg font-medium rounded-md text-white hover:text-white/60"
        :class="{
          'cursor-not-allowed': loading, 'btn-disabled btn-outline': !submitButton
        }"> <span v-if="!loading" class="flex items-center mr-1">
          <LockClosedIcon class="w-3 h-3 sm:h-5 sm:w-5 text-white group-hover:text-white/60" aria-hidden="true" />
        </span> <svg v-if="loading" class="animate-spin -ml-1 mr-3 w-3 h-3 sm:h-5 sm:w-5 text-white"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg> Sign In </button>
    </div>
  </form>
</template>

<script setup>
import { LockClosedIcon, AtSymbolIcon, KeyIcon } from '@heroicons/vue/solid';
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
      loading.value = false;
      errorMsg.value = err.response.data.error;
    });
}
</script>
