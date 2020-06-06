<template>
  <div class="container">
    <div class="links">
      <a href="#restuarant">Restuarant</a> |
      <!-- <a href="#">Restuarant Total</a> -->
      <a href="#snooker">Snooker</a>
      <!-- <a href="#">Snooker Total</a> -->
    </div>
    <div class="upload">
      <input :file="file" @change="openFile" type="file" name="Select File" id="file" />
      <button @click="upload" class="upload-button">Upload</button>
    </div>
    <section id="restuarant" class="resturant">
      <ItemList
        @del-item="deleteItem"
        :venue="restuarant"
        :isSales="isSales"
        :items="resturantItems"
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
  </div>
</template>

<script>
import ItemList from "../components/ItemList";
import firebase from "firebase";
export default {
  name: "Sales",
  components: {
    ItemList
  },
  data() {
    return {
      resturantItems: [],
      snookerBarItems: [],
      isSales: true,
      restuarant: "restuarant",
      snookerBar: "snooker",
      file: null,
      db: firebase.firestore(),
      bars: ["snooker", "restuarant"]
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
    },
    uploadToDb(item) {
      for (const bar of this.bars) {
        const ref = this.db.collection(bar).doc();

        const id = ref.id + "";

        item.id = id;

        this.db
          .collection(bar)
          .doc(id)
          .set(item)
          .then(() => {
            console.log(`Document written: ${id}`);
          })
          .catch(err => console.error(err));
      }
    },
    upload() {
      if (this.file !== null) {
        this.allItems.forEach(item => {
          // item.id = uuid();
          this.uploadToDb(item);
        });
        return;
      }
      return;
    },
    openFile(e) {
      this.file = e.target.files[0];

      const reader = new FileReader();

      reader.addEventListener("loadstart", () => {
        console.log("File reading started");
      });

      reader.addEventListener("load", e => {
        const text = e.target.result;

        const items = text.split("\n");

        this.allItems = items.map(item => {
          let [name, quantity, price] = item.split("-");
          name = name.trim();
          quantity = +quantity.trim();
          price = +price.trim();
          return {
            name,
            quantity,
            price
          };
        });

        console.log(this.allItems);
      });

      reader.addEventListener("error", () =>
        alert("Error : Failed to read file")
      );

      // file read progress
      reader.addEventListener("progress", function(e) {
        if (e.lengthComputable == true) {
          var percent_read = Math.floor((e.loaded / e.total) * 100);
          console.log(percent_read + "% read");
        }
      });

      // read as text file
      reader.readAsText(this.file);
    }
  },
  created() {
    for (const bar of this.bars) {
      this.db
        .collection(bar)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`${doc.id} => ${data.name}, ${data.price}`);
            if (bar === "restuarant") {
              this.resturantItems.push(data);
            }
            if (bar === "snooker") {
              this.snookerBarItems.push(data);
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

  .upload-button {
    background: rgb(117, 210, 30);
    padding: 10px;
    width: 100%;
    margin: 10px 30px;
    flex: 1;
  }

  .upload-button:hover {
    background: white;
    color: rgb(117, 210, 30);
  }

  .links {
    background: rgba(255, 255, 255, 0.342);
    padding: 10px;
    margin: 10px 5px;
    position: fixed;
    top: 0;
  }
</style>