<template>
    <div>
        <div v-for="item in items" :key="item.id">
            <Item :item="item" v-on:del-item="deleteItem"/>
        </div>
    </div>
</template>

<script>
import Item from './Item.vue';
export default {
    name: "ItemList",
    props: ["items"],
    components: {
        Item
    },
    methods: {
        deleteItem(id) {
            this.$emit("del-item", id)
        }
    }
}
</script>