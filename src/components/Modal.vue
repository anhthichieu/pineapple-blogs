<template>
  <div class="modal">
    <p>{{ this.modalMessage }}</p>
    <button @click="closeModal">Close</button>
  </div>
</template>

<script>
export default {
  props: ['modalMessage'],
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.5rem;
    width: 300px;
    padding: 2.5rem 1.875rem;
    background: white;

    p {
      text-align: center;
    }

    button {
      align-self: center;
    }
  }
}
</style>
