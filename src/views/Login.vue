<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">
          Register
        </router-link>
      </p>
      <h2>Login to PineappleBlog</h2>
      <div class="inputs">
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
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">
        Forgot your password?
      </router-link>
      <button>Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'Login',
  components: {
    Icon,
  },
  data: () => ({
    email: null,
    password: null,
  }),
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0, center;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 2rem;
    .router-link {
      color: black;
    }
  }

  form {
    padding: 0 0.625rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 3.125rem;
    }

    h2 {
      text-align: center;
      font-size: 2rem;
      color: $main-dark;
      margin-bottom: 2.5rem;
      @media (min-width: 900px) {
        font-size: 2.5rem;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.5rem;
        input {
          width: 100%;
          border: none;
          background: #f2f7f6;
          padding: 0.25rem 0.25rem 0.25rem 1.875rem;
          height: 3.125rem;

          &:focus {
            outline: none;
          }
        }

        .icon {
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: black;
      cursor: pointer;
      font-size: 0.875rem;
      margin: 1rem 0 2rem;
      border-bottom: 1px solid transparent;

      &:hover {
        border-color: $main-dark;
      }
    }

    .angle {
      display: none;
      position: absolute;
      right: -1.875rem;
      background: white;
      transform: rotateZ(3deg);
      width: 3.75rem;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-image: url('../assets/background.png');
    background-size: cover;
    width: 100%;
    height: 100%;
    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
