<template>
  <div class="item" :class="{ warn : item.quantity < 20 }">
    <span class="name">{{ item.name }}</span>
    <span class="quantity">{{ item.quantity }}</span>
    <button @click="editItem" class="accept edit">Edit</button>
    <button @click="deleteItem" class="delete">X</button>
    <Modal v-if="isModalVisible" @close="closeModal">
      <div slot="header">
        <h1>Edit Item</h1>
      </div>
      <div slot="body">
        <EditItem :item="item" />
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "../components/layout/Modal.vue";
import EditItem from "../components/EditItem.vue";
export default {
  name: "Item",
  props: ["item"],
  components: {
    Modal,
    EditItem
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    editItem() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    deleteItem() {
      this.$emit("del-item", this.item.id);
    }
  }
};
</script>

<style>
  .item {
    background: #f4f4f4;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 5px;
    padding: 5px 0px;
  }

  .item .amount {
    background: white;
  }

  .name,
  .quantity {
    flex: 0.5;
  }

  .name {
    text-transform: capitalize;
  }
  .edit {
    background: blue;
  }

  .warn {
    background: orange;
  }
</style>