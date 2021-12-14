<template>
  <div class="create-post">
    <BlogCoverPreview v-show="$store.state.blogPhotoReview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error: </span>{{ errorMsg }}</p>
      </div>

      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            accept=".png, .jpg, .jpeg"
            @change="fileChanged"
          />
          <button
            @click="openPreview"
            :class="[
              'preview',
              { 'button-inactive': !$store.state.blogPhotoFileURL },
            ]"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ $store.state.blogPhotoName }}</span>

          <div @click="removeCoverPhoto">
            <Icon
              icon="fluent:delete-24-regular"
              :inline="true"
              v-if="$store.state.blogPhotoFileURL"
              class="icon"
            />
          </div>
        </div>
      </div>

      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
          placeholder="Write your blog content here..."
          @image-added="imageHandler"
        />
      </div>

      <div class="blog-actions">
        <button @click="updateBlog">Save changes</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">
          Preview Changes
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCoverPreview from '@/components/BlogCoverPreview';
import Loading from '@/components/Loading';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Icon } from '@iconify/vue2';
import db from '@/firebase/firebaseInit';

import Quill from 'quill';
window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;
Quill.register('module/imageResize', ImageResize);

export default {
  name: 'CreatePost',

  components: {
    BlogCoverPreview,
    Loading,
    Icon,
  },

  computed: {
    profileId() {
      return this.$store.state.profileId;
    },

    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },

    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit('updateBlogTitle', payload);
      },
    },

    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit('newBlogPost', payload);
      },
    },
  },

  data: () => ({
    file: null,
    error: null,
    errorMsg: null,
    editorSettings: {
      modules: {
        imageResize() {},
      },
    },
    loading: null,
    routeID: null,
    currentBlog: null,
    prevRoute: null,
  }),

  beforeRouteEnter(_to, from, next) {
    // ref: https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
    next((vm) => {
      vm.prevRoute = from.name;
    });
  },

  methods: {
    fileChanged() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit('fileChanged', this.file);
      this.$store.commit('fileNameChanged', fileName);
      this.$store.commit('createFileURL', URL.createObjectURL(this.file));
    },

    openPreview() {
      this.$store.commit('openPhotoPreview');
    },

    removeCoverPhoto() {
      this.$store.commit('fileNameChanged', '');
      this.$store.commit('createFileURL', null);
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
      // ref: https://www.vue2editor.com/examples/#custom-image-handler

      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`document/BlogPostPhotos/${file.name}`);

      docRef.put(file).on(
        'state_changed',
        (snapshot) => console.log('snapshot', snapshot),
        (err) => console.log('imageHandler error', err),
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, 'image', downloadURL);
          resetUploader();
        }
      );
    },

    async updateBlog() {
      const database = await db.collection('blogPosts').doc(this.routeID);
      console.log(database);
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
          // the user changes new cover photo
          this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `document/BlogCoverPhotos/${this.$store.state.blogPhotoName}`
          );

          docRef.put(this.file).on(
            'state_changed',
            (snapshot) => console.log('Upload blog snapshot', snapshot),
            (err) => {
              console.log('Upload blog error:', err);
              this.loading = false;
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();

              await database.update({
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogTitle: this.blogTitle,
              });
              await this.$store.dispatch('updatePost', this.routeID);
              await this.$store.dispatch('getPost');
              this.loading = false;
              this.$router.push({
                name: 'ViewBlog',
                params: { blogid: database.id },
              });
            }
          );
          return;
        }

        // no longer need this error checking because the cover photo is already updated onto firebase storage
        // this.error = true;
        // this.errorMsg = 'Please ensure you uploaded a cover photo!';
        // setTimeout(() => {
        //   this.error = false;
        // }, 5000);
        // return;

        this.loading = true;
        await database.update({
          blogHTML: this.blogHTML,
          blogTitle: this.blogTitle,
        });

        await this.$store.dispatch('updatePost', this.routeID);
        this.loading = false;
        this.$router.push({
          name: 'ViewBlog',
          params: { blogid: database.id },
        });
        return;
      }
      this.error = true;
      this.errorMsg =
        'Please ensure both Blog Title and Blog Post have been filled!';
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },
  },

  async mounted() {
    this.routeID = this.$route.params.blogid;
    this.currentBlog = await this.$store.state.blogPosts.find((post) => {
      return post.blogID === this.$route.params.blogid;
    });
    this.$store.commit('setBlogState', this.currentBlog);

    if (this.prevRoute === 'BlogPreview') {
      this.file = this.$store.state.blogPhotoFile;
    }
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: white;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out;
    align-self: center;
    font-size: 0.875rem;
    cursor: pointer;
    border-radius: 1.25rem;
    padding: 0.75rem 1.5rem;
    color: white;
    background: $main-dark;
    text-decoration: none;

    &:hover {
      background: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 0.625rem 1.5625rem 3.75rem;
  }

  // Error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin-bottom: 10px;
    border: 1px solid lightcoral;
    color: red;
    opacity: 1;
    transition: 0.5 ease all;

    p {
      font-size: 0.875rem;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 2rem;

    input:first-child {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid $main-dark;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 $main-dark;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 1rem;
      position: relative;
      display: flex;
      align-items: center;

      input {
        display: none;
      }

      .preview {
        margin-left: 1rem;
        text-transform: initial;
      }

      span {
        font-size: 0.75rem;
        margin-left: 1rem;
        align-self: center;
      }

      .icon {
        cursor: pointer;
        margin-left: 1rem;

        &:hover {
          color: rgba(48, 48, 48, 0.8);
        }
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-toolbar {
      display: flex;
      align-items: center;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 1.25rem 1rem 1.875rem;
    }

    .ql-tooltip.ql-editing {
      left: 1rem !important;
    }
  }

  .blog-actions {
    margin-top: 2rem;

    button {
      margin-right: 2rem;
    }
  }
}
</style>
