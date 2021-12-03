<template>
  <div class="home">
    <!-- Welcome section -->
    <BlogPost :post="welcomeScreen" />

    <!-- Most related posts -->
    <BlogPost
      v-for="(post, index) in sampleBlogPost"
      :key="index"
      :post="post"
    />

    <!-- Blog cards -->
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard
            v-for="(post, index) in sampleBlogCards"
            :key="index"
            :post="post"
          />
        </div>
      </div>
    </div>

    <!-- Updates -->
    <div class="updates">
      <div class="container">
        <h2>Never mist a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for PineappleBlogs
          <Icon
            icon="akar-icons:arrow-right"
            :inline="true"
            class="arrow arrow-light"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost';
import BlogCard from '@/components/BlogCard';
import { Icon } from '@iconify/vue2';

export default {
  name: 'Home',
  components: {
    BlogPost,
    BlogCard,
    Icon,
  },

  data: () => ({
    welcomeScreen: {
      title: 'Welcome!',
      blogPost:
        'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
      welcomeScreen: true,
      photo: 'coding',
    },

    sampleBlogPost: [
      {
        title: 'This is a Filter Title!',
        blogHTML: 'This is a filter blog post title!',
        photo: 'beautiful-stories',
      },
      {
        title: 'This is a Filter Title 2!',
        blogHTML: 'This is a filter blog post title 2!',
        photo: 'designed-for-everyone',
      },
    ],
  }),

  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
}

.updates {
  .container {
    padding: 6.25rem 1.5625rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 7.8125rem 1.5625rem;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 0.875rem;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 2rem;
      width: 100%;
      max-width: 425px;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 2.5rem;
      }
    }
  }
}
</style>
