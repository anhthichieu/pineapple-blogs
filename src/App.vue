<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="navigation"></Navigation>
      <router-view />
      <Footer v-if="navigation"></Footer>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default {
  name: 'app',
  components: {
    Navigation,
    Footer,
  },
  data: () => ({
    navigation: true,
  }),
  created() {
    this.checkRoute();
  },
  mounted() {},
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
};
</script>

<style lang="scss">
</style>
