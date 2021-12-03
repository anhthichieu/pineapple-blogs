<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">
          PineappleBlogs
        </router-link>
      </div>

      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link class="link" to="#">Create Post</router-link>
          <router-link class="link" :to="{ name: 'Login' }">
            Login/Register
          </router-link>
        </ul>
      </div>
    </nav>

    <div class="menu-icon" @click="toggleMobileNav" v-show="mobile">
      <Icon icon="octicon:three-bars-16" />
    </div>

    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link class="link" to="#">Create Post</router-link>
        <router-link class="link" :to="{ name: 'Login' }">
          Login/Register
        </router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'navigation',

  components: {
    Icon,
  },

  data() {
    return {
      mobile: null, // the app is in mobile viewport or not
      mobileNav: null, // the mobile navigation bar is open or not
      windowWidth: null,
      navLinks: [
        { to: { name: 'Home' }, text: 'Home' },
        { to: { name: 'Blogs' }, text: 'Blogs' },
        { to: { name: 'NewPost' }, text: 'CreatePost' },
        { to: { name: 'Login' }, text: 'Login/Register' },
      ],
    };
  },

  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },

  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 800) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },

  watch: {
    $route() {
      this.mobileNav = false;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background: #fff;
  padding: 0 25px;
  box-shadow: $box-shadow;
  z-index: 99;
}

.link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;

  &:hover {
    color: #1eb8b8 !important;
  }
}

nav {
  display: flex;
  padding: 25px 0;
  // gap: 1rem;

  .branding {
    display: flex;
    align-items: center;
  }

  .nav-links {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1; // the inner items will take up all available space, and will be the same length

    ul {
      margin-right: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      .link:not(:last-child) {
        margin-right: 32px;
      }
    }
  }
}

.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 1.875rem;
  right: 1.5625rem;
  font-size: 1.5625rem;
}

.mobile-nav {
  padding: 1.25rem;
  background: $main-dark;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
  max-width: 250px;
  position: fixed;
  top: 0;
  left: 0;

  .link {
    padding: 1rem 0;
    color: #fff;
  }
}

// TRANSITIONS
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.5s ease;
}

.mobile-nav-enter,
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
