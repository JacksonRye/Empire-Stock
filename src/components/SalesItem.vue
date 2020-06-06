<template>
  <div class="container">
    <!-- <p> -->
    <button @click="editItem" class="edit">Edit</button>
    Name: {{ item.name }}
    Total: {{ item.quantity }}
    <input
      v-model.number="remainingItems"
      @change="calculateCash"
      class="remaining"
      type="number"
    />
    <button @click="deleteItem" class="delete">X</button>
    <p :cashAtHand="cashAtHand" class="cash">{{ cashAtHand }}</p>
    <!-- </p> -->
  </div>
</template>
˝

<script>
export default {
  name: "SalesItem",
  props: ["item", "venue"],
  data() {
    return {
      remainingItems: 0,
      cashAtHand: 0
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
    editItem() {}
  }
};
</script>

<style scoped>
  .container {
    padding: 10px 0;
    margin: 10px 5px;
    background: rgb(163, 162, 162);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .remaining {
    background: white;
    margin: 0 0 0 5px;
    padding: 5px 0;
  }
</style>