<template>
  <div>
    <h1 class="venue">{{ venue }}</h1>
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
      <h1>Total</h1>
      <p :totalSales="totalSales"> &#8358;{{ totalSales }}</p>
    </section>
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
      mutableItems: this.items
    };
  },
  methods: {
    deleteItem(item) {
      this.$emit("del-item", item);
    },
    calculateCash(sale) {
      const saleIndex = this.sales.findIndex(item => item.id === sale.id);
      //   console.log(`${saleIndex}`);
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
    search(query) {
      if (!query) {
        this.resetSearch();
      }
      this.mutableItems = this.items.filter(item => item.name.includes(query));
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
  }
</style>