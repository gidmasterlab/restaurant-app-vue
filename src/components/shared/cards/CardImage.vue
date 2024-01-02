<template>
    <img :src="loadDynamicAsset(product.image)" :alt="product.name" />
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ProductType } from "@/types/ProductType";
import { loadDynamicAsset } from "@/utils/ImageUtil";

export default defineComponent({
    name: "CardImage",
    props: {
        product: Object as PropType<ProductType>
    },
    setup() {
        return {
            loadDynamicAsset
        }
    },
});
</script>

