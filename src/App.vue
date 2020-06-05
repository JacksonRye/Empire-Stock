<template>
  <div id="app">
    <Header />

    <router-view />
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  button,
  input {
    appearance: none;
    border: none;
    outline: none;
    background: none;
  }

  .delete,
  .accept {
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
