<template>
  <div class="container">
    <button @click="editItem" class="edit">Edit</button>
    Name: {{ item.name }}
    Total: {{ item.quantity }}
    Price: {{ item.price }}
    <input
      v-model.number="remainingItems"
      @input="calculateCash"
      class="remaining"
      type="number"
    />
    <button @click="deleteItem" class="delete">X</button>
    <p :cashAtHand="cashAtHand" class="cash">cash: {{ cashAtHand }}</p>
    <Modal v-if="isModalVisible" @close="closeModal">
      <h1 slot="header">{{ item.name }}</h1>
      <div slot="body">
        <EditSalesItem :item="item" :venue="venue"/>
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
    padding: 10px 0;
    margin: 10px 5px;
    background: rgb(163, 162, 162);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .remaining {
    background: white;
    margin: 0 0 0 5px;
    padding: 5px 0;
  }

  .edit {
    padding: 10px;
  }
</style>