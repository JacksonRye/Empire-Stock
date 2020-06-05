<template>
  <div class="container">
    <h1>Name: {{item.name}}</h1>
    <p>Quantity left: {{ item.quantity }}</p>

    <div class="quantity-control">
      <select v-model="selected" name="Action">
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
      </select>
      <input v-model.number="amount" class="amount" type="number" />
    </div>

    <button @click="saveTransaction" class="add">Accept</button>
    <button @click="cancel" class="cancel">Cancel</button>
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
        .then(() => console.log("Document Successfully written!"))
        .catch(err => console.error("Error writing document: ", err));
      return
    },
    cancel() {}
  }
};
</script>

<style scoped>
  .container {
    background: grey;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
  }
  .quantity-control {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .amount {
    background: white;
    margin: 10px 5px;
  }

  .amount {
    flex: 0.1;
    padding: 5px 0;
    margin: 0 5px;
  }

  select {
    padding: 5px 0;
  }
</style>