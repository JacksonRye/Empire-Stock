<template>
  <div class="container">
    <h1 class="name">Name: {{item.name}}</h1>
    <p>Quantity left: {{ item.quantity }}</p>

    <div class="quantity-control">
      <select class="operation" v-model="selected" name="Action">
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
      </select>
      <input v-model.number="amount" class="amount" type="number" />
    </div>

    <button @click="saveTransaction" class="add">
      <i class="fa fa-check" aria-hidden="true"></i>
    </button>
    <button @click="cancel" class="cancel">X</button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "EditItem",
  props: ["item"],
  data() {
    return {
      amount: 0,
      selected: null
    };
  },
  methods: {
    saveTransaction() {
      const db = firebase.firestore();
      if (this.selected === "add") {
        this.item.quantity += this.amount;
      } else if (this.selected === "subtract") {
        this.item.quantity -= this.amount;
      } else {
        return;
      }
      db.collection("stock")
        .doc(this.item.id)
        .set(this.item)
        .then(() => {
          this.cancel();
          console.log("Document Successfully written!");
        })
        .catch(err => console.error("Error writing document: ", err));
      return;
    },
    cancel() {
      this.amount = 0;
      this.selected = null;
    }
  }
};
</script>

<style scoped>
  .container {
    background: rgba(112, 109, 109, 0.267);
    display: flex;
    flex-direction: column;
    padding: 5px 0;
  }
  .quantity-control {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
  }

  .amount {
    background: white;
    margin: 10px 10px;
    flex: 0.1;
  }

  .add,
  .cancel,
  .amount,
  .operation {
    padding: 15px;
  }

  select {
    padding: 5px 0;
  }
</style>