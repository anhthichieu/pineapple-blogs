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

      <div class="error" v-show="error">{{ errorMessage }}</div>

      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import firebase from 'firebase/compat/app';
import db from '@/firebase/firebaseInit';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
  name: 'Register',

  components: {
    Icon,
  },

  data: () => ({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    error: null,
    errorMessage: '',
  }),

  computed: {},

  methods: {
    async register() {
      if (
        this.email !== '' &&
        this.password !== '' &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.username !== ''
      ) {
        this.error = false;
        this.errorMessage = '';
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const result = await createUser;
        const database = db.collection('users').doc(result.user.uid);
        await database.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });
        this.$router.push({ name: 'Home' });
        return;
      }
      this.error = true;
      this.errorMessage = 'Please fill out all the fields!';
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
