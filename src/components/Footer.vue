<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <!-- Branding -->
          <router-link class="header white-text" :to="{ name: 'Home' }">
            PineappleBlogs
          </router-link>

          <!-- Social icons -->
          <ul>
            <li
              v-for="(icon, socialIconsIdx) in socialIcons"
              :key="socialIconsIdx"
            >
              <a href="" class="svg-icon">
                <Icon :icon="icon.spec" :inline="true" />
              </a>
            </li>
          </ul>
        </div>

        <div class="col-2">
          <ul>
            <router-link class="link white-text" :to="{ name: 'Home' }">
              Home
            </router-link>

            <router-link class="link white-text" :to="{ name: 'Blogs' }">
              Blogs
            </router-link>

            <router-link class="link white-text" to="#" v-if="user">
              Create Post
            </router-link>

            <router-link
              class="link white-text"
              :to="{ name: 'Login' }"
              v-if="!user"
            >
              Login/Register
            </router-link>
          </ul>
        </div>
      </div>

      <!-- Copyright statement -->
      <div class="right"><p>Copyright 2021 All Rights Reserved</p></div>
    </div>
  </footer>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'footer-vue',

  components: {
    Icon,
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  data() {
    return {
      socialIcons: [
        {
          href: '#',
          spec: 'akar-icons:instagram-fill',
        },
        {
          href: '#',
          spec: 'akar-icons:linkedin-fill',
        },
        {
          href: 'https://www.facebook.com/maytrongdem/',
          spec: 'akar-icons:youtube-fill',
        },
        {
          href: '#',
          spec: 'akar-icons:twitter-fill',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 6.25rem 1.5625rem;
  background: $main-dark;
  color: #fff;
  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 1.25rem;
      }

      .header {
        text-align: center;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }

      .col-1,
      .col-2 {
        display: flex;
        gap: 2rem;
        flex: 1;
      }

      .col-1 {
        flex-direction: column;

        ul {
          margin-top: auto;
          li {
            display: flex;
            align-items: center;

            .svg-icon {
              font-size: 1.5rem;
              color: #fff;
            }
          }
        }
      }

      .col-2 {
        ul {
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
        }
      }
    }

    .right {
      align-items: center;
      flex-direction: column;
      @media (min-width: 900px) {
        align-items: flex-end;
        gap: 0;
      }

      p {
        margin-top: auto;
      }
    }
  }
}
</style>
