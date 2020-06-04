<template>
    <div>
        <div v-for="item in items" :key="item.id">
            <Item :item="item" />
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
    }
}
</script>