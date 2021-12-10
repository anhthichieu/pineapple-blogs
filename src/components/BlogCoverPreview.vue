<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <div class="icon" @click="closePreview">
        <Icon icon="ep:circle-close" :inline="true" />
      </div>
      <img :src="blogCoverPhoto" alt="" />
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'BlogCoverPreview',

  components: {
    Icon,
  },

  computed: {
    blogCoverPhoto() {
      return this.$store.state.blogPhotoFileURL;
    },
  },

  methods: {
    closePreview() {
      this.$store.commit('openPhotoPreview');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  // position: fixed;
  // top: 0;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // z-index: 99;
  // width: 100%;
  // height: 100%;
  // background: rgba(0, 0, 0, 0.7);
  @include modal;

  .modal-content {
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 0.75rem;
    width: 600px;
    height: 400px;
    padding: 50px;
    background: white;
    box-shadow: $box-shadow;

    .icon {
      font-size: 1.5rem;
      cursor: pointer;
      position: absolute;
      top: 0.9375rem;
      right: 0.9375rem;
      color: $main-dark;
      transition: all 0.3s ease;

      &:hover {
        color: #1eb8b8;
      }
    }

    img {
      margin-top: 1rem;
      display: block;
      width: auto;
      height: 100%;
      box-shadow: $box-shadow;
    }
  }
}
</style>
