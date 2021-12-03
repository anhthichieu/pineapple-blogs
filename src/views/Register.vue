<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">
          Login
        </router-link>
      </p>
      <h2>Create Your PineappleBlog Account</h2>

      <div class="inputs">
        <div class="input">
          <label class="icon">
            <Icon icon="fa-regular:user" :inline="true" />
          </label>
          <input type="text" placeholder="First Name" v-model="firstName" />
        </div>

        <div class="input">
          <label class="icon">
            <Icon icon="fa-regular:user" :inline="true" />
          </label>
          <input type="text" placeholder="Last Name" v-model="lastName" />
        </div>

        <div class="input">
          <label class="icon">
            <Icon icon="fa-regular:user" :inline="true" />
          </label>
          <input type="email" placeholder="Username" v-model="username" />
        </div>

        <div class="input">
          <label class="icon">
            <Icon icon="akar-icons:envelope" :inline="true" />
          </label>
          <input type="text" placeholder="Email" v-model="email" />
        </div>

        <div class="input">
          <label class="icon">
            <Icon icon="fa-solid:lock" :inline="true" />
          </label>
          <input type="password" placeholder="Password" v-model="password" />
        </div>
      </div>

      <button>Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'Register',
  components: {
    Icon,
  },
  data: () => ({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
  }),
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
