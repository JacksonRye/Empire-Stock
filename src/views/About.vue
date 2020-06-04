<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" @click="showModal" class="btn">Open Modal!</button>

    <Modal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import Modal from "../components/layout/Modal.vue";
export default {
  name: "About",
  components: {
    Modal
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>
