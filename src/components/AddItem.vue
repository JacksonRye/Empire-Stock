<template>
  <div class="add-item">
    <input type="text" placeholder="Drink Name" v-model="name" class="name" />
    <input type="number" v-model.number="quantity" class="quantity" />
    <button @click="addItem" class="add">Add</button>
    <button @click="clearBox" class="cancel">X</button>
    <input @change="openFile" :file="file" type="file" id="file-input" />
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
      console.log(this.file);

      const reader = new FileReader();

      reader.addEventListener("loadstart", () => {
        console.log("File reading started");
      });

      // file reading finished successfully
      reader.addEventListener("load", e => {
        // contents of file in variable
        var text = e.target.result;

        const items = text.split("\n");

        // console.log(items);

        this.stockItems = items.map(item => {
          let [name, quantity] = item.split("-");
          name = name.trim();
          quantity = +quantity.trim();
          return {
            name,
            quantity
          };
        });

        console.log(this.stockItems);
      });

      // file reading failed
      reader.addEventListener("error", function() {
        alert("Error : Failed to read file");
      });

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

<style>
  .add-item {
    padding: 10px 5px;
    margin: 10px 5px;
    background: transparent;
    display: flex;
    flex-direction: column;
  }

  .name,
  .quantity {
    background: rgb(228, 225, 221);
    margin: 2px 5px;
    padding: 12px 5px;
    flex: 0.7;
  }

  .cancel,
  .add {
    margin: 2px;
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

  .read-button {
    background: blue;
    padding: 10px 0;
    margin: 5px 2px;
    color: white;
  }

  .read-button:hover {
    background: white;
    color: blue;
  }

  #file-input {
    padding: 5px 0;
    margin: 2px 0 0 2px;
  }
</style>