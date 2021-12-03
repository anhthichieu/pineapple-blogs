<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>

      <BlogCard
        v-for="(post, index) in sampleBlogCards"
        :key="index"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import BlogCard from '@/components/BlogCard';

export default {
  name: 'blogs',
  components: {
    BlogCard,
  },

  data: () => ({
    // editPost: null,
  }),

  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },

    editPost: {
      get() {
        return this.$store.state.editPost;
      },

      set(payload) {
        this.$store.commit('toggleEditPost', payload);
      },
    },
  },

  methods: {
    // getEditPost() {
    //   return this.editPost;
    // },
    // setEditPost(newValue) {
    //   this.editPost = newValue;
    // },
  },

  // provide() {
  //   return {
  //     getEditPost: this.getEditPost,
  //     setEditPost: this.setEditPost,
  //   };
  // },

  beforeDestroy() {
    this.$store.commit('toggleEditPost', false);
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -4.375rem;
    right: 0;

    span {
      margin-right: 1rem;
    }

    input[type='checkbox'] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: white;
      outline: none;
      width: 5rem;
      height: 1.875rem;
      border-radius: 1.25rem;
      box-shadow: $box-shadow;
    }

    input[type='checkbox']:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 1.875rem;
      height: 1.875rem;
      border-radius: 50%;
      background: $main-dark;
      transform: scale(1.1);
      transition: 0.3s ease all;
      box-shadow: $box-shadow;
    }

    input:checked[type='checkbox']:before {
      background: white;
      left: 3.25rem;
    }
  }
}
</style>
