<template>
  <div class="container">
    <div class="quantity-control">
      <p class="quantity">Quantity: {{ item.quantity }}</p>
      <select class="quantity operation" v-model="operation" name="transaction">
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
      </select>

      <input class="quantity amount" v-model.number="amount" type="number" id="amount" />
    </div>

    <div class="buttons">
      <button @click="accept" class="add">Accept</button>
      <button @click="cancel" class="cancel">Cancel</button>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
export default {
  name: "EditSalesItem",
  props: ["item", "venue"],
  data() {
    return {
      operation: null,
      amount: 0,
      db: firebase.firestore()
    };
  },
  methods: {
    accept() {
      if (!this.operation) {
        this.cancel();
        return;
      }
      if (this.operation === "add") {
        this.item.quantity += this.amount;
      }
      if (this.operation === "subtract") {
        this.item.quantity -= this.amount;
      }
      this.db
        .collection(this.venue)
        .doc(this.item.id)
        .set(this.item)
        .then(() => {
          this.cancel();
          console.log("Document updated successfully");
        })
        .catch(err => console.error(err));
      return;
    },
    cancel() {
      this.operation = null;
      this.amount = 0;
    }
  }
};
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }
  .quantity-control {
    display: flex;
    margin: 2px;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    /* align-content: stretch; */
    align-items: center;
    justify-content: center;
  }

  button {
    padding: 15px 25vw;
    margin: 2px 0;
  }

  p,
  select {
    margin: 0 5px;
  }

  #amount,
  select {
    background: white;
    padding: 5px 0;
  }

  .quantity {
    margin: 5px 0;
  }
</style>