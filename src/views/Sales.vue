<template>
  <div class="container">
    <section class="resturant">
      <ItemList
        @del-item="deleteItem"
        :venue="resturant"
        :isSales="isSales"
        :items="resturantItems"
      />
    </section>

    <section class="snooker-bar">
      <ItemList
        @del-item="deleteItem"
        :venue="snookerBar"
        :isSales="isSales"
        :items="snookerBarItems"
      />
    </section>
  </div>
</template>

<script>
import ItemList from "../components/ItemList";
export default {
  name: "Sales",
  components: {
    ItemList
  },
  data() {
    return {
      resturantItems: [
        {
          name: "Budweiser",
          quantity: 44,
          id: 1,
          price: 400
        }
      ],
      snookerBarItems: [
        {
          name: "Star",
          quantity: 54,
          id: 2,
          price: 350
        },
        {
          name: "Hero",
          quantity: 30,
          id: 3,
          price: 300
        }
      ],
      isSales: true,
      resturant: "Resturant",
      snookerBar: "SnookerBar"
    };
  },
  methods: {
    deleteItem(item) {
      console.log("deleteItem: ", item.id, item.venue);
      const venue = item.venue.toLowerCase();
      const id = item.id;
      if (venue === this.resturant.toLowerCase()) {
        this.resturantItems = this.resturantItems.filter(
          product => product.id !== id
        );
        return;
      }
      if (venue === this.snookerBar.toLowerCase()) {
        this.snookerBarItems = this.snookerBarItems.filter(
          product => product.id !== id
        );
      }
    }
  }
};
</script>

<style scoped>
</style>