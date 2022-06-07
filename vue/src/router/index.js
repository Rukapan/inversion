import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import AuthLayout from "../components/AuthLayout.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import MainView from "../views/MainView.vue";
import Tips from "../views/Tips.vue";
import Profile from "../views/Profile.vue";
import PostPhoto from "../views/PostPhoto.vue";
import Album from "../views/Album.vue";
import Photo from "../views/Photo.vue";
import ProfileEditor from "../views/ProfileEditor.vue";
import DeleteAccount from "../components/DeleteAccount.vue";
import FavUsers from "../views/FavUsers.vue";
import FavPhotos from "../views/FavPhotos.vue";

const routes = [
  {
    path: "/",
    component: MainView,
    name: "MainView",
    meta: { requiresAuth: true },
    children: [
      {
        path: "/tips",
        component: Tips,
        name: "Tips",
      },
      {
        path: `/profile`,
        component: Profile,
        name: "Profile",
        children: [
          {
            path: "/profile/deleteAccount",
            component: DeleteAccount,
            name: "DeleteAccount",
          },
        ],
      },
      {
        path: `/profile/:name`,
        component: Profile,
        name: "UserProfile",
      },
      {
        path: "/profile/edit",
        component: ProfileEditor,
        name: "ProfileEditor",
      },
      {
        path: `/postPhoto`,
        component: PostPhoto,
        name: "PostPhoto",
      },
      {
        path: `/album`,
        component: Album,
        name: "Album",
      },
      {
        path: `/album/:name`,
        component: Album,
        name: "UserAlbum",
      },
      {
        path: `/photo/:title`,
        component: Photo,
        name: "Photo",
      },
      {
        path: "/favUsers",
        component: FavUsers,
        name: "FavUsers",
      },
      {
        path: "/favPhotos",
        component: FavPhotos,
        name: "FavPhotos",
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/register",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Register" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "MainView" });
  } else {
    next();
  }
});

export default router;
