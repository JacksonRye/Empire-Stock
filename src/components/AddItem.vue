<template>
  <div class="add-item">
    <input type="text" placeholder="Drink Name" v-model="name" class="name" />
    <input type="number" v-model.number="quantity" class="quantity" />
    <button @click="addItem" class="add">Add</button>
    <button @click="clearBox" class="cancel">X</button>
  </div>
</template>

<script>
export default {
  name: "AddItem",
  data() {
    return {
      name: "",
      quantity: 0
    };
  },
  methods: {
    addItem() {
      console.log("Add Item");
      const item = { name: this.name, quantity: this.quantity };
      this.$emit("add-item", item);

      this.clearBox();
    },
    clearBox() {
      this.name = "";
      this.quantity = 0;
    }
  }
};
</script>

<style>
  .add-item {
    padding: 10px 5px;
    margin: 10px 5px;
    background: grey;
    display: flex;
    flex-direction: column;
  }

  .name,
  .quantity {
    background: white;
    margin: 2px 5px;
    padding: 12px 5px;
    flex: 0.7;
  }

  .cancel,
  .add {
    margin: 2px;
    padding: 10px 10px;
    font-weight: 700;
  }

  .cancel {
    background: red;
    color: white;
  }

  .add {
    background: green;
    color: white;
  }

  .cancel:hover {
    background: white;
    color: red;
  }

  .add:hover {
    background: white;
    color: green;
  }
</style>