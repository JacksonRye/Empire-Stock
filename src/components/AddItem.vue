<template>
  <div class="add-item">
    <label for="name">Name</label>
    <input id="name" type="text" placeholder="Item Name" v-model="name" class="name" />
    <label for="quantity">Quantity</label>
    <input id="quantity" type="number" v-model.number="quantity" class="quantity" />
    <label for="price">Price</label>
    <input id="price" type="number" v-model.number="price" class="quantity" />
    <button @click="addItem" class="add">Add</button>
    <button @click="clearBox" class="cancel">X</button>
    <input @change="openFile" :file="file" type="file" class="file-input" />
    <button @click="addFromFile" class="read-button">Read File</button>
  </div>
</template>

<script>
export default {
  name: "AddItem",
  data() {
    return {
      name: "",
      quantity: 0,
      price: 0,
      file: null,
      stockItems: []
    };
  },
  methods: {
    addItem() {
      console.log("Add Item");
      const item = { name: this.name, quantity: this.quantity };

      this.notifyAddItemEvent(item);

      this.clearBox();
    },
    clearBox() {
      this.name = "";
      this.quantity = 0;
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
    },
    addFromFile() {
      if (this.file !== null) {
        console.log(this.file);
        this.stockItems.forEach(item => this.notifyAddItemEvent(item));
        return;
      }
      return;
    },
    notifyAddItemEvent(item) {
      this.$emit("add-item", item);
    }
  }
};
</script>

<style scoped>
  .add-item {
    padding: 10px 5px;
    margin: 10px 5px;
    background: rgba(214, 214, 214, 0.808);
    display: flex;
    flex-direction: column;
  }

  .name,
  .quantity {
    background: rgb(250, 250, 250);
    width: 90%;
    margin: 2px auto;
    padding: 12px 5px;
    flex: 0.7;
  }

  .cancel,
  .add {
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