<template>
  <div class="container">
    <span class="name">Name: {{ item.name }}</span>

    <div class="info">
      <button @click="editItem" class="edit">
        <i class="fas fa-pen"></i>
      </button>

      <div class="quantity">
        <span class="quantity">Total: {{ item.quantity }}</span>
        <span class="price">Price: &#8358;{{ item.price }}</span>
      </div>

      <input v-model.number="remainingItems" @input="calculateCash" class="remaining" type="number" />

      <span class="cash">
        <p :cashAtHand="cashAtHand" class="cash">cash: &#8358;{{ cashAtHand }}</p>
      </span>

      <button @click="deleteItem" class="delete"><i class="fas fa-trash"></i></button>
    </div>

    <Modal v-if="isModalVisible" @close="closeModal">
      <h1 slot="header">{{ item.name }}</h1>
      <div slot="body">
        <EditSalesItem :item="item" :venue="venue" />
      </div>
    </Modal>
  </div>
</template>


<script>
import Modal from "./layout/Modal.vue";
import EditSalesItem from "./EditSalesItem.vue";
export default {
  name: "SalesItem",
  props: ["item", "venue"],
  components: {
    Modal,
    EditSalesItem
  },
  data() {
    return {
      remainingItems: 0,
      cashAtHand: 0,
      isModalVisible: false
    };
  },
  methods: {
    calculateCash() {
      const sold = this.item.quantity - this.remainingItems;
      this.cashAtHand = this.item.price * sold;
      //   console.log(cashAtHand);

      this.$emit("sale", {
        name: this.item.name,
        cashAtHand: this.cashAtHand,
        id: this.item.id
      });
      //   return cashAtHand.toString();
    },
    deleteItem() {
      this.$emit("del-item", { id: this.item.id, venue: this.venue });
    },
    editItem() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style scoped>
  /* TODO: Style sales item */
  .container {
    display: flex;
    flex-direction: column;
    background: rgba(231, 229, 225, 0.308);
    margin: 5px 10px;
    justify-content: center;
  }

  .info {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .quantity {
    display: flex;
    flex-direction: column;
    margin: 0 2px 0 0;
    flex: 0.4;
    padding: 2px;
  }

  .name,
  .cash {
    text-transform: capitalize;
  }

  .cash {
    flex: 0.5;
    text-align: start;
    margin-left: 5px;
  }

  .edit {
    background: blue;
    padding: 10px;
    color: white;
  }

  .edit,
  .delete {
    flex: 0.1;
  }

  .remaining {
    background: white;
    padding: 10px;
    flex: 0.1;
    width: 40px;
  }
</style>