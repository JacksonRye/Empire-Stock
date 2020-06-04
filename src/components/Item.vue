<template>
  <div class="item">
    <span class="name">{{ item.name }}</span>
    <span class="quantity">{{ item.quantity }}</span>
    <input class="amount" type="number" />
    <button class="accept">OK</button>
    <button class="delete">X</button>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: ["item"],
  methods: {
      acceptChanges() {
          
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

  .amount {
    flex: 0.1;
    padding: 5px 0;
    margin: 0 5px;

  }

  .delete, .accept {
      flex: 0.1;
      padding: 5px;
      margin: 0 5px;
      font-weight: 600;
  }

  .delete {
      background: red;
      color: white;
  }

  .accept {
      background: green;
      color: white;
  }

  .delete:hover {
      background: white;
      color: red;
  }

  .accept:hover {
      background: white;
      color: green;
  }

</style>