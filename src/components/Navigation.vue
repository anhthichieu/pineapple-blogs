<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">
          PineappleBlogs
        </router-link>
      </div>

      <div class="nav-links">
        <ul>
          <router-link class="link" to="#">Home</router-link>
          <router-link class="link" to="#">Blogs</router-link>
          <router-link class="link" to="#">Create Post</router-link>
          <router-link class="link" to="#">Login/Register</router-link>
        </ul>
      </div>
    </nav>
    <Icon icon="octicon:three-bars-16" class="menu-icon" />
    <!-- <menuIcon /> -->
    <transition name="mobile-nav">
      <ul class="mobile-nav">
        <router-link class="link" to="#">Home</router-link>
        <router-link class="link" to="#">Blogs</router-link>
        <router-link class="link" to="#">Create Post</router-link>
        <router-link class="link" to="#">Login/Register</router-link>
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
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  background: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}

.link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;

  &:hover {
    color: #1eb8b8;
  }
}

nav {
  display: flex;
  padding: 25px 0;

  .branding {
    display: flex;
    align-items: center;

    .header {
      font-weight: 600;
      font-size: 24px;
      color: #000;
      text-decoration: none;
    }
  }

  .nav-links {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1; // the inner items will take up all available space, and will be the same length

    ul {
      margin-right: 32px;

      .link:not(:last-child) {
        margin-right: 32px;
      }
    }
  }
}

.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 25px;
  font-size: 25px;
}

.mobile-nav {
  padding: 20px;
  background: #303030;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
  max-width: 250px;
  position: fixed;
  top: 0;
  left: 0;

  .link {
    padding: 15px 0;
    color: #fff;
  }
}
</style>
