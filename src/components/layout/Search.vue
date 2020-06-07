<template>
  <div class="search-box">
    <input
      type="text"
      class="search-bar"
      placeholder="Search..."
      v-model="query"
      @keypress="fetchDrink"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    fetchDrink() {
      this.$emit("search", this.query);
    }
  }
};
</script>

<style scoped>
  .search-box {
    width: 100%;
    /* margin-bottom: 30px; */
    margin: 10px 5px;
  }

  .search-box .search-bar {
    display: block;
    padding: 15px;
    width: 100%;

    color-adjust: #313131;
    font-size: 20px;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;
  }

  .search-box .search-bar:focus {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 16px 0px 16px 0px;
  }
</style>