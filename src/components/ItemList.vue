<template>
  <div>
    <h1>{{ venue }}</h1>
    <div v-for="item in items" :key="item.id">
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
      <p :totalSales="totalSales">{{ totalSales }}</p>
    </section>
  </div>
</template>

<script>
import Item from "./Item.vue";
import SalesItem from "./SalesItem.vue";
export default {
  name: "ItemList",
  props: ["items", "isStock", "isSales", "venue"],
  components: {
    Item,
    SalesItem
  },
  data() {
    return {
      totalSales: 0,
      sales: []
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
    }
  }
};
</script>