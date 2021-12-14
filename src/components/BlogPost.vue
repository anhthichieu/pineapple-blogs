<template>
  <div :class="['blog-wrapper', { 'no-user': !user }]">
    <div class="blog-content">
      <div>
        <h2>{{ post.blogTitle }}</h2>
        <div v-if="post.welcomeScreen">
          <p>{{ post.blogPost }}</p>
          <router-link :to="{ name: 'Login' }" class="link link-light">
            Login/Register
            <Icon
              icon="akar-icons:arrow-right"
              :inline="true"
              class="arrow arrow-light"
            />
          </router-link>
        </div>

        <div v-else>
          <p class="content-preview" v-html="post.blogHTML"></p>
          <router-link
            :to="{ name: 'ViewBlog', params: { blogid: post.blogID } }"
            class="link"
          >
            View The Post
            <Icon icon="akar-icons:arrow-right" :inline="true" class="arrow" />
          </router-link>
        </div>
      </div>
    </div>

    <div class="blog-photo">
      <img :src="post.blogCoverPhoto" alt="" />
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'blogPost',

  props: ['post'],

  components: {
    Icon,
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow;

  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4; // on small screen, .blog-content width is 4/3 .blog-photo width
    order: 2; // on small screen, .blog-content will be placed below .blog-photo (due to column flex)

    @media (min-width: 700px) {
      order: 1; // on large screen, .blog-content will be placed before .blog-photo
    }

    @media (min-width: 800px) {
      flex: 3; // on large screen, .blog-content width is 3/4 .blog-photo width
    }

    > div {
      max-width: 375px;
      padding: 4.5rem 1.5rem;
      @media (min-width: 700px) {
        padding: 0 1.5rem;
      }

      h2 {
        font-size: 1.5rem;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 1.5rem;
        @media (min-width: 700px) {
          font-size: 2.5rem;
        }
      }

      p {
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 0.8125rem;
        max-height: 1.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 250px;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 2rem;
        padding-top: 0.25rem;
        border-bottom: 1px solid transparent;
        transition: 0.3s ease-in all;

        &:hover {
          border-bottom-color: $main-dark;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #fff;
        }
      }
    }
  }

  .blog-photo {
    flex: 3;
    order: 1;
    box-shadow: $box-shadow;

    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .blog-content {
      order: 2;
    }
    .blog-photo {
      order: 1;
    }
  }
}

.no-user:first-child {
  .blog-content {
    background: $main-dark;
    color: #fff;
  }
}
</style>
