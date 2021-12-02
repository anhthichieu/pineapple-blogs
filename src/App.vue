<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation></Navigation>
      <router-view />
      <Footer></Footer>
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
  data: () => ({}),
  created() {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss">
</style>
