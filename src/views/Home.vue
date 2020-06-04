<template>
  <main>
    <AddItem @add-item="addItem" />
    <ItemList :items="items" />
    <EditItem />
  </main>
</template>

<script>
// @ is an alias to /src
import AddItem from "../components/AddItem.vue";
import ItemList from "../components/ItemList.vue";
import { v1 as uuid } from "uuid";
import EditItem from '../components/EditItem.vue';
export default {
  name: "Home",
  components: {
    AddItem,
    ItemList,
    EditItem
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Budweiser",
          quantity: 20
        },
        {
          id: 2,
          name: "Heineken",
          quantity: 200
        }
      ]
    };
  },
  methods: {
    addItem(newItem) {
      const { name, quantity } = newItem;
      const id = uuid();
      const item = {
        id,
        name,
        quantity
      };
      this.items = [...this.items,  item];
    }
  }
};
</script>
