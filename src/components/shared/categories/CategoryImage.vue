<template>
    <img :src="loadDynamicAsset(category.image)" :alt="category.name" />
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { CategoryType } from "@/types/CategoryType";
import { loadDynamicAsset } from "@/utils/ImageUtil";

export default defineComponent({
    name: "CategoryImage",
    props: {
        category: Object as PropType<CategoryType>,
    },
    setup() {
        return {
            loadDynamicAsset
        }
    },
});
</script>

