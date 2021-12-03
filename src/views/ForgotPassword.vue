<template>
  <div class="reset-password">
    <Modal />
    <div class="form-wrap">
      <form class="reset">
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

        <button>Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import Modal from '@/components/Modal';

export default {
  name: 'ForgotPassword',
  components: {
    Icon,
    Modal,
  },
  data: () => ({
    email: null,
  }),
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
