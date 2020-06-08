<template>
  <div class="container">
    <h1>Add to Bar</h1>
    <AddItem @add-item="addItem" />

    <section id="restuarant" class="resturant">
      <ItemList
        @del-item="deleteItem"
        :venue="restuarant"
        :isSales="isSales"
        :items="restuarantItems"
      />
    </section>

    <section id="snooker" class="snooker-bar">
      <ItemList
        @del-item="deleteItem"
        :venue="snookerBar"
        :isSales="isSales"
        :items="snookerBarItems"
      />
    </section>

    <section class="kitchen">
      <ItemList
        :isKitchen="isKitchen"
        :venue="kitchen"
        :items="kitchenItems"
        @del-item="deleteItem"
        :isSales="isSales"
        @add-item="addKitchenItem"
      />
    </section>
  </div>
</template>

<script>
import ItemList from "../components/ItemList";
import firebase from "firebase";
import AddItem from "../components/AddItem";
export default {
  name: "Sales",
  components: {
    ItemList,
    AddItem
  },
  data() {
    return {
      restuarantItems: [],
      snookerBarItems: [],
      kitchenItems: [],
      isSales: true,
      restuarant: "restuarant",
      snookerBar: "snooker",
      kitchen: "kitchen",
      file: null,
      db: firebase.firestore(),
      bars: ["snooker", "restuarant"],
      isKitchen: true
    };
  },
  methods: {
    deleteItem(item) {
      console.log("deleteItem: ", item.id, item.venue);
      const venue = item.venue.toLowerCase();
      const id = item.id;
      if (venue === this.resturant.toLowerCase()) {
        this.restuarantItems = this.restuarantItems.filter(
          product => product.id !== id
        );
        return;
      }
      if (venue === this.snookerBar.toLowerCase()) {
        this.snookerBarItems = this.snookerBarItems.filter(
          product => product.id !== id
        );
      }
    },
    addItem(item) {
      for (const bar of this.bars) {
        this.db
          .collection(bar)
          .doc(item.name)
          .set(item)
          .then(() => {
            console.log("Document written: ", item.name);
            if (bar === this.snookerBar) {
              this.snookerBarItems = [...this.snookerBarItems, item];
            }
            if (bar === this.restuarant) {
              this.restuarantBarItems = [...this.restuarantItems, item];
            }
          });
      }
    },
    addKitchenItem(item) {
      const id = item.name;
      item.id = id;
      this.db
        .collection(this.kitchen)
        .doc(id)
        .set(item)
        .then(() => {
          console.log("Document written successfully: ", item.name);
          this.kitchenItems = [...this.kitchenItems, item];
        })
        .catch(err => console.error(err));
    }
  },
  created() {
    for (const bar of [...this.bars, this.kitchen]) {
      this.db
        .collection(bar)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`${doc.id} => ${data.name}, ${data.price}`);
            if (bar === this.restuarant) {
              this.restuarantItems.push(data);
            }
            if (bar === this.snookerBar) {
              this.snookerBarItems.push(data);
            }
            if (bar === this.kitchen) {
              this.kitchenItems.push(data);
            }
          });
        });
    }
  }
};
</script>

<style scoped>
  .upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: 0 5px;
  }

  .links {
    background: rgba(255, 255, 255, 0.342);
    padding: 10px;
    margin: 10px 5px;
    position: fixed;
    top: 0;
  }
</style>