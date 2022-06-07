import { createStore } from "vuex";
import axiosClient from "../axios";
import imageCompression from "browser-image-compression";

const store = createStore({
  state: {
    user: {
      data: JSON.parse(sessionStorage.getItem("User")),
      profile: JSON.parse(sessionStorage.getItem("Profile")),
      lastPost: JSON.parse(sessionStorage.getItem("LastPost")),
      favPhotos: new Map(JSON.parse(sessionStorage.getItem("favPhotos"))),
      favUsers: new Map(JSON.parse(sessionStorage.getItem("favUsers"))),
      token: sessionStorage.getItem("TOKEN"),
    },
    photos: [],
    album: {},
    photo: {},
    favPhotos: {},
    favUsers: {},
    notification: [],
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
        commit("setFavPhotos", data.favPhotos);
        commit("setFavUsers", data.favUsers);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },

    //Fav
    //Photo
    postFavPhoto({ commit }, photo) {
      return axiosClient
        .post("/favPhotos", photo)
        .then((res) => {
          commit("setFavPhotos", res.data.data);
        })
        .catch((err) => console.log(err));
    },
    deleteFavPhoto({ commit }, id) {
      return axiosClient
        .delete(`/favPhotos/${id}`)
        .then((res) => {
          commit("setFavPhotos", res.data.data);
        })
        .catch((err) => console.log(err));
    },
    async getFavPhotos({ commit }, url) {
      let response;
      url = url || "/getFavPhotos";
      await axiosClient
        .get(url)
        .then((res) => {
          commit("setFavPhotoImages", res.data.data);
          response = {
            links: res.data.links,
            meta: res.data.meta,
          };
        })
        .catch((err) => console.log(err));
      return response;
    },

    //Fav
    //User
    getFavUserProfiles({ commit }) {
      return axiosClient
        .get("/getFavUsers")
        .then((res) => {
          commit("setFavUserProfiles", res.data.data);
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    getFavUsers({ commit }) {
      return axiosClient
        .get("/favUsers")
        .then((res) => {
          commit("setFavUsers", res.data.data);
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    postFavUser({ commit }, d) {
      return axiosClient
        .post("/favUsers", d)
        .then((res) => {
          commit("setFavUsers", res.data.data);
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    deleteFavUser({ commit }, id) {
      return axiosClient
        .delete(`/favUsers/${id}`)
        .then((res) => {
          commit("setFavUsers", res.data.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
      return axiosClient
        .get(url)
        .then((res) => {
          commit("setUserAlbum", res.data.data);
        })
        .catch((err) => console.log(err));
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
    setFavPhotos: (state, favPhotos) => {
      const map = new Map();
      const len = favPhotos.length;
      for (let i = 0; i < len; i++) {
        map.set(favPhotos[i].photo_id, favPhotos[i].id);
      }
      const obMap = Array.from(map.entries());
      state.user.favPhotos = map;
      sessionStorage.setItem("FavPhotos", JSON.stringify(obMap));
    },
    setFavPhotoImages: (state, favPhotos) => {
      state.favPhotos = favPhotos;
    },
    setFavUsers: (state, favUsers) => {
      const map = new Map();
      const len = favUsers.length;
      for (let i = 0; i < len; i++) {
        map.set(favUsers[i].user_id, favUsers[i].id);
      }
      const obMap = Array.from(map.entries());
      state.user.favUsers = map;
      sessionStorage.setItem("favUsers", JSON.stringify(obMap));
    },
    setFavUserProfiles: (state, favUsers) => {
      state.favUsers = favUsers;
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
      state.notification.push(notification);
      setTimeout(() => {
        state.notification.shift();
      }, 7000);
    },
    logout: (state) => {
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
  },
});

export default store;
