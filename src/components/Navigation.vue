<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">
          Pineapple
        </router-link>
      </div>

      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link v-if="user" class="link" :to="{ name: 'CreatePost' }">
            Create Post
          </router-link>
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }">
            Login/Register
          </router-link>
        </ul>

        <div
          v-show="user"
          class="profile"
          ref="profile"
          @click="toggleProfileMenu"
        >
          <span>{{ $store.state.profileInitials }}</span>
          <transition name="fade" mode="out-in">
            <div v-show="profileMenu" class="profile-menu">
              <span></span>
              <div class="info">
                <p class="initials">{{ $store.state.profileInitials }}</p>
                <div class="right">
                  <p>
                    {{ $store.state.profileFirstName }}
                    {{ $store.state.profileLastName }}
                  </p>
                  <p>@{{ $store.state.profileUsername }}</p>
                  <p>{{ $store.state.profileEmail }}</p>
                </div>
              </div>

              <div class="options">
                <div class="option">
                  <router-link class="option" :to="{ name: 'Profile' }">
                    <Icon icon="fa-solid:user" :inline="true" />
                    <p>Profile</p>
                  </router-link>
                </div>

                <div v-if="admin" class="option">
                  <router-link class="option" :to="{ name: 'Admin' }">
                    <Icon icon="fa-solid:user-cog" :inline="true" />
                    <p>Admin</p>
                  </router-link>
                </div>
                <div class="option" @click="signOut">
                  <Icon icon="fa-solid:sign-out-alt" />
                  <p>Sign Out</p>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </nav>

    <div class="menu-icon" @click="toggleMobileNav" v-show="mobile">
      <Icon icon="octicon:three-bars-16" />
    </div>

    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link v-if="user" class="link" :to="{ name: 'CreatePost' }">
          Create Post
        </router-link>
        <router-link class="link" :to="{ name: 'Login' }">
          Login/Register
        </router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import { Icon } from '@iconify/vue2';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'navigation',

  components: {
    Icon,
  },

  computed: {
    admin() {
      return this.$store.state.profileAdmin;
    },

    user() {
      return this.$store.state.user;
    },
  },

  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },

  data() {
    return {
      mobile: null, // the app is in mobile viewport or not
      mobileNav: null, // the mobile navigation bar is open or not
      windowWidth: null,
      profileMenu: null,
    };
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

    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },

    signOut() {
      firebase.auth().signOut();
      window.location.reload();
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

    .profile {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      color: white;
      background: $main-dark;

      span {
        pointer-events: none; // to ignore clicking event on the span tag (the one that show profileInitials info)
      }

      .profile-menu {
        position: absolute;
        top: 3.75rem;
        right: 0;
        width: 250px;
        background: $main-dark;
        box-shadow: $box-shadow;

        span {
          position: absolute;
          right: 10px;
          top: -10px;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid $main-dark;
        }

        .info {
          display: flex;
          align-items: center;
          padding: 0.9375rem;
          border-bottom: 1px solid white;

          .initials {
            position: initial;
            width: 2.5rem;
            height: 2.5rem;
            background: white;
            color: $main-dark;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }

          .right {
            flex: 1;
            margin-left: 1.5rem;

            p {
              font-size: 0.75rem;
            }

            p:first-child {
              font-size: 0.875rem;
            }
          }
        }

        .options {
          padding: 0.9375rem;
          .option {
            text-decoration: none;
            color: white;
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;

            .icon {
              font-size: 1rem;
            }

            p {
              font-size: 0.875rem;
              margin-left: 0.75rem;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
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
