<template>
  <div>
    <div class="accordion">
      <button
        type="button"
        @click="toggleExpand"
        :class="{ 'accordion__button--active' : isExpanded }"
        class="accordion__button"
      >{{ venue || "Stock" }}</button>
      <div v-show="isExpanded" class="accordion__content">
        <Search @search="search" />
        <div v-for="item in mutableItems" :key="item.id">
          <Item v-if="isStock" :item="item" @:del-item="deleteItem" />
          <SalesItem
            @del-item="deleteItem"
            :venue="venue"
            @sale="calculateCash"
            v-if="isSales"
            :item="item"
          />
        </div>
        <section class="total">
          <div class="update">
            <button @click="updateFridge">update</button>
          </div>
          <div class="total-text">
            <h1>Total</h1>
            <p :totalSales="totalSales">&#8358;{{ totalSales }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";
import SalesItem from "./SalesItem.vue";
import Search from "./layout/Search.vue";
export default {
  name: "ItemList",
  props: ["items", "isStock", "isSales", "venue"],
  components: {
    Item,
    SalesItem,
    Search
  },
  data() {
    return {
      totalSales: 0,
      sales: [],
      mutableItems: this.items,
      isExpanded: false
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    deleteItem(item) {
      this.$emit("del-item", item);
    },
    calculateCash(sale) {
      const saleIndex = this.sales.findIndex(item => item.id === sale.id);
      if (saleIndex === -1) {
        this.sales.push(sale);
      } else {
        const currentSale = this.sales[saleIndex];
        console.log(currentSale);
        currentSale.cashAtHand = sale.cashAtHand;
      }
      this.totalSales = this.sales
        .map(sale => sale.cashAtHand)
        .reduce((a, b) => a + b);
    },
    updateFridge() {},
    search(query) {
      if (!query) {
        this.resetSearch();
      }
      this.mutableItems = this.items.filter(item => {
        const name = item.name.toLowerCase();
        query = query.toLowerCase();
        return name.includes(query);
      });
      console.log(this.mutableItems);
      // this.resetSearch()
    },
    resetSearch() {
      this.mutableItems = this.items;
    }
  }
};
</script>

<style scoped>
  .venue {
    text-transform: capitalize;
  }

  .total {
    background: rgba(201, 200, 200, 0.288);
    margin: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .total-text {
    padding: 0 15px;
  }

  .update button {
    background: green;
    padding: 15px;
    margin: 2px 4px;
    color: white;
  }

  .accordion__button {
    display: block;
    width: 100%;
    padding: 15px;
    border: none;
    cursor: pointer;
    background: #333333;
    color: #ffffff;
    text-align: left;
    transition: background 0.4s;
    text-transform: capitalize;
    margin: 10px auto;
  }

  .accordion__button::after {
    content: "\25be";
    float: right;
    transform: scale(1.5);
  }

  .accordion__button--active {
    background: #555555;
  }
  .accordion__button--active::after {
    content: "\25b4";
  }

  .accordion__content {
    transition: max-height 0.2s;
  }
</style>