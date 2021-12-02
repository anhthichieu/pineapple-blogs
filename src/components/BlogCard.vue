<template>
  <div class="blog-card">
    <div class="icons">
      <div class="icon">
        <Icon icon="feather:edit" :inline="true" class="edit" />
      </div>
      <div class="icon">
        <Icon icon="ant-design:delete-outlined" :inline="true" class="delete" />
      </div>
    </div>
    <img :src="`/blogCards/${post.blogCoverPhoto}.jpg`" alt="" />
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>Posted on: {{ post.blogDate }}</h6>
      <router-link class="link" to="#">
        View The Post
        <Icon icon="akar-icons:arrow-right" :inline="true" class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'blogCard',
  props: ['post'],

  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: #fff;
  min-height: 420px;
  transition: 0.3s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: $box-shadow;
  }

  .icons {
    display: flex;
    position: absolute;
    top: 0.625rem;
    right: 0.625rem;
    z-index: 99;

    .icon {
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      border-radius: 50%;
      background: #fff;
      transition: 0.3s ease all;

      &:hover {
        background: $bg-dark;

        .edit,
        .delete {
          color: #fff;
        }
      }

      &:nth-child(1) {
        margin-right: 0.5rem;
      }

      .edit,
      .delete {
        pointer-events: none;
        font-size: 0.9375rem;
      }
    }
  }

  img {
    display: block;
    border-radius: 0.5rem 0.5rem 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 2rem 1rem;
    color: #000;

    h4 {
      padding-bottom: 0.5rem;
      font-size: 1.25rem;
      font-weight: 300;
    }

    h6 {
      padding-bottom: 1rem;
      font-size: 0.75rem;
      font-weight: 400;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 1.25rem;
      font-size: 0.75rem;
      padding-bottom: 0.25rem;
      transition: 0.3s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        font-size: 0.625rem;
      }
    }
  }
}
</style>
