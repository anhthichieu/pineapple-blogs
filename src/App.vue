<template>
  <div class="app-wrapper" id="app">
    <div class="app" v-if="$store.state.postLoaded">
      <Navigation v-if="navigation"></Navigation>
      <router-view />
      <Footer v-if="navigation"></Footer>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'app',
  components: {
    Navigation,
    Footer,
  },

  data: () => ({
    navigation: true,
  }),

  methods: {
    checkRoute() {
      if (
        this.$route.name === 'Login' ||
        this.$route.name === 'Register' ||
        this.$route.name === 'ForgotPassword'
      ) {
        this.navigation = false;
        return;
      }
      this.navigation = true;
    },
  },

  watch: {
    $route() {
      this.checkRoute();
    },
  },

  created() {
    this.$store.dispatch('getPost');
    // console.log('USER:', firebase.auth().currentUser);

    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('updateUser', user);
      if (user) {
        this.$store.dispatch('getCurrentUser', user);
      }
    });

    this.checkRoute();
    this.$store.dispatch('getPost');
  },

  mounted() {},
};
</script>

<style lang="scss">
</style>
