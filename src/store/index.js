import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '@/firebase/firebaseInit';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: 'Blog Card #1',
        blogCoverPhoto: 'stock-1',
        blogDate: 'Dec 2, 2021',
      },
      {
        blogTitle: 'Blog Card #2',
        blogCoverPhoto: 'stock-2',
        blogDate: 'Dec 2, 2021',
      },
      {
        blogTitle: 'Blog Card #3',
        blogCoverPhoto: 'stock-3',
        blogDate: 'Dec 2, 2021',
      },
      {
        blogTitle: 'Blog Card #4',
        blogCoverPhoto: 'stock-4',
        blogDate: 'Dec 2, 2021',
      },
    ],
    editPost: null,
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
    toggleEditPost(state, payload) {
      state.editPost = payload;
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
    }
  },

  modules: {
  }
})
