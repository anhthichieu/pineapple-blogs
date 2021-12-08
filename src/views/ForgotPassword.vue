<template>
  <div class="reset-password" @keyup.enter="resetPassword">
    <Modal
      v-if="modalActive"
      @close-modal="closeModal"
      :modalMessage="modalMessage"
    />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }">
            Login
          </router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <label class="icon">
              <Icon icon="akar-icons:envelope" :inline="true" />
            </label>
            <input type="text" placeholder="Email" v-model="email" />
          </div>
        </div>

        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import Modal from '@/components/Modal';
import Loading from '@/components/Loading';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'ForgotPassword',
  components: {
    Icon,
    Modal,
    Loading,
  },

  data: () => ({
    email: null,
    modalActive: null,
    modalMessage: '',
    loading: null,
  }),

  methods: {
    async resetPassword() {
      try {
        this.loading = true;
        await firebase.auth().sendPasswordResetEmail(this.email);
        this.modalMessage = 'If your account exits, you will receive an email';
        this.loading = false;
        this.modalActive = true;
      } catch (e) {
        this.modalMessage = e.message;
        this.loading = false;
        this.modalActive = true;
      }
    },

    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 0.5rem;
      }
      p {
        text-align: center;
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
