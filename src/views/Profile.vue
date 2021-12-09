<template>
  <div class="profile">
    <Modal
      v-if="modalActive"
      @close-modal="closeModal"
      :modalMessage="modalMessage"
    />

    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div class="admin-badge">
          <Icon icon="fa-solid:user-cog" :inline="true" class="icon" />
          <span>Admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import Modal from '@/components/Modal';

export default {
  name: 'Profile',

  components: {
    Icon,
    Modal,
  },

  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },

      set(payload) {
        this.$store.commit('changeFirstName', payload);
      },
    },

    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },

      set(payload) {
        this.$store.commit('changeLastName', payload);
      },
    },

    username: {
      get() {
        return this.$store.state.profileUsername;
      },

      set(payload) {
        this.$store.commit('changeUsername', payload);
      },
    },

    email() {
      return this.$store.state.profileEmail;
    },
  },

  data: () => ({
    modalActive: null,
    modalMessage: 'Changes were saved!',
  }),

  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
    },

    updateProfile() {
      this.$store.dispatch('updateUserSettings');
      this.modalActive = !this.modalActive;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 3.75rem 1.5625rem;

    h2 {
      text-align: center;
      margin-bottom: 1rem;
      font-weight: 300;
      font-size: 2rem;
    }

    .profile-info {
      border-radius: 0.5rem;
      box-shadow: $box-shadow;
      padding: 2rem;
      background: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 2rem auto;

      .initials {
        position: initial;
        width: 5rem;
        height: 5rem;
        font-size: 2rem;
        background: $main-dark;
        color: white;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: white;
        font-size: 0.875rem;
        padding: 0.5rem 1.5rem;
        border-radius: 0.5rem;
        background: $main-dark;
        margin: 1rem 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          font-size: 0.875rem;
          margin-right: 0.5rem;
        }
      }

      .input {
        margin: 1rem 0;
        @include input-label;
        @include input-field;
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
