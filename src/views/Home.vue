<template>
  <main>
    <AddItem @add-item="addItem" />
    <ItemList :items="items" v-on:del-item="deleteItem" />
  </main>
</template>

<script>
// @ is an alias to /src
import AddItem from "../components/AddItem.vue";
import ItemList from "../components/ItemList.vue";
import firebase from "firebase";

export default {
  name: "Home",
  components: {
    AddItem,
    ItemList
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    addItem(newItem) {
      const db = firebase.firestore();
      const ref = db.collection("stock").doc();

      const id = ref.id + "";

      newItem.id = id;

      db.collection("stock")
        .doc(id)
        .set(newItem)
        .then(docRef => console.log("Document written: ", docRef.id))
        .catch(err => console.error(err));
    },
    deleteItem(id) {
      const db = firebase.firestore();
      db.collection("stock")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Doc Deleted Successfully");
          this.items = this.items.filter(item => item.id !== id)
        })
        .catch(err => console.error("Doc deletion failed", err));
    }
  },
  created() {
    const db = firebase.firestore();

    db.collection("stock")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(
            `${doc.id} => ${doc.data().name}, ${doc.data().quantity}, ${
              doc.data().id
            }`
          );
          this.items.push(doc.data());
        });
      });
  }
};
</script>
