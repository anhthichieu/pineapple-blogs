<template>
  <div class="admin">
    <div class="container">
      <h2>Administration</h2>
      <div class="admin-info">
        <h2>Add admin</h2>
        <div class="input">
          <input
            type="text"
            placeholder="Enter user email to make them an admin"
            id="addAdmins"
            v-model="adminEmail"
          />
        </div>
        <span> {{ functionMsg }} </span>
        <button @click="addAdmin" class="button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';

export default {
  name: 'Admin',

  data: () => ({
    adminEmail: '',
    functionMsg: null,
  }),

  methods: {
    async addAdmin() {
      const addAdmin = await firebase.functions().httpsCallable('addAdminRole');
      const result = await addAdmin({ email: this.adminEmail });
      this.functionMsg = result.data.message;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 3.75rem 1.5625rem;

    h2 {
      text-align: center;
      margin-bottom: 1rem;
      font-weight: 300;
      font-size: 2rem;
    }

    .admin-info {
      border-radius: 0.5rem;
      box-shadow: $box-shadow;
      padding: 2rem;
      background: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 2rem auto;

      span {
        font-size: 0.875rem;
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
