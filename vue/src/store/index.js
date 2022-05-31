import { createStore } from "vuex";
import axiosClient from "../axios";
import imageCompression from "browser-image-compression";

const store = createStore({
  state: {
    user: {
      data: JSON.parse(sessionStorage.getItem("User")),
      profile: JSON.parse(sessionStorage.getItem("Profile")),
      lastPost: JSON.parse(sessionStorage.getItem("LastPost")),
      token: sessionStorage.getItem("TOKEN"),
    },
    photos: [],
    album: {},
    photo: {},
    notification: {},
  },

  actions: {
    //Authorization
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setProfile", data.profile);
        commit("setLastPost", data.lastPost);
        commit("setToken", data.token);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setProfile", data.profile);
        commit("setLastPost", data.lastPost);
        commit("setToken", data.token);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
    //Photo
    async getAllPhotos({ commit }, url) {
      let response;
      url = url || "/photo";
      await axiosClient
        .get(url)
        .then((res) => {
          commit("setAllPhotos", res.data.data);
          response = res.data.links;
        })
        .catch((err) => console.log(err));
      return response;
    },
    getUserAlbum({ commit, state }, uuid) {
      let url = uuid
        ? `/userAlbum/${uuid}`
        : `/userAlbum/${state.user.data.uuid}`;
      axiosClient.get(url).then((res) => {
        commit("setUserAlbum", res.data.data);
      });
    },
    postPhoto({ commit, state }, photo) {
      let response;

      response = axiosClient.post("/photo", photo).then((res) => {
        commit("setLastPost", res.data.data);
      });

      return response;
    },
    deletePhoto({ commit }, photo) {
      return axiosClient.delete(`/photo/${photo.id}`).then((res) => {
        return res;
      });
    },
    //Profile
    saveProfile({ commit, state }, profile) {
      if (!profile.changeImage) {
        delete profile.image;
      }
      delete profile.changeImage;
      return axiosClient.put("/profile/edit", profile).then((res) => {
        commit("setProfile", res.data.data);
        return res;
      });
    },
    deleteAccount({ commit }) {
      return axiosClient.delete("/user/deleteAccount").then((res) => {
        commit("logout");
        return res;
      });
    },
    //CompressImage
    async compressImage({}, payload) {
      let compFile;
      const options = {
        maxSizeMB: payload.size,
        maxWidthOrHeight: payload.width,
      };
      try {
        compFile = await imageCompression(payload.image, options);
      } catch (error) {
        console.log(error);
        throw error;
      }
      return compFile;
    },
  },

  mutations: {
    setUser: (state, user) => {
      state.user.data = user;
      sessionStorage.setItem("User", JSON.stringify(user));
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem("TOKEN", token);
    },
    setProfile: (state, profile) => {
      state.user.profile = profile;
      sessionStorage.setItem("Profile", JSON.stringify(profile));
    },
    setLastPost: (state, lastPost) => {
      state.user.lastPost = lastPost;
      sessionStorage.setItem("LastPost", JSON.stringify(lastPost));
    },
    setAllPhotos: (state, photos) => {
      state.photos.push(photos);
    },
    setUserAlbum: (state, album) => {
      state.album = album;
    },
    setPhoto: (state, photo) => {
      state.photo = photo;
    },
    setNotification: (state, notification) => {
      state.notification = notification;
      setTimeout(() => {
        state.notification = {};
      }, 7000);
    },
    logout: (state) => {
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
  },
});

export default store;
