import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '@/firebase/firebaseInit';

Vue.use(Vuex)
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: '',
    blogTitle: '',
    blogPhotoName: '',
    blogPhotoFile: null,
    blogPhotoFileURL: null,
    blogPhotoReview: null,
    isEditingPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },

  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },

    fileNameChanged(state, payload) {
      state.blogPhotoName = payload;
    },

    fileChanged(state, payload) {
      state.blogPhotoFile = payload;
    },

    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },

    openPhotoPreview(state) {
      state.blogPhotoReview = !state.blogPhotoReview;
    },

    toggleEditPost(state, payload) {
      state.isEditingPost = payload;
    },

    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },

    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload);
    },

    updateUser(state, payload) {
      state.user = payload;
    },

    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
    },

    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },

    setProfileInitials(state) {
      const regex = /(\b\S)?/g
      state.profileInitials = state.profileFirstName.match(regex).join('') + state.profileLastName.match(regex).join('')
    },

    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },

    changeLastName(state, payload) {
      state.profileLastName = payload;
    },

    changeUsername(state, payload) {
      state.profileUsername = payload;
    }
  },

  actions: {
    async getCurrentUser({ commit }, user) {
      const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit('setProfileInfo', dbResults);
      commit('setProfileInitials');
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit('setProfileAdmin', admin)
    },

    async updateUserSettings({ commit, state }) {
      const database = await db.collection('users').doc(state.profileId);
      await database.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername
      })

      commit('setProfileInitials')
    },

    async getPost({ state }) {
      // const database = await db.collection('blogPosts').orderBy('date', 'desc');
      // const database = await db.collection('blogPosts').orderBy('date'); // ascending by default
      const database = await db.collection('blogPosts');
      const dbResults = await database.get();
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some(post => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date
          }
          state.blogPosts.push(data);
        }
      });
      // Sort blog by newest to oldest
      state.blogPosts.sort((a, b) => b.blogDate - a.blogDate);
      state.postLoaded = true;
    },

    async deletePost({ commit }, payload) {
      const getDeletedPost = await db.collection('blogPosts').doc(payload);
      await getDeletedPost.delete();
      commit('filterBlogPost', payload);
    },

    async updatePost({ commit, dispatch }, payload) {
      commit('filterBlogPost', payload); // remove the previous post with old content in state
      await dispatch('getPost'); // then fetch the blog post with new content from database
    }
  },

  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },

    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    }
  },

  modules: {}
})
