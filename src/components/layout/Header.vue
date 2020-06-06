<template>
  <header>
    <h1>Empire Stock</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/sales">Sales</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
  header {
    background-image: linear-gradient(
      to right,
      rgb(0, 255, 0),
      rgb(255, 255, 255)
    );
    /* padding: 25px; */
  }
</style>