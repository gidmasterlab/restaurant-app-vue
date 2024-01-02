<template>
  <CategoryVertical
    :category="category"
    :selected="selected"
    v-if="direction === 'vertical'"
    v-memo="[selected]" />

  <CategoryHorizontal
    :category="category"
    :selected="selected"
    v-else-if="direction === 'horizontal'"
    v-memo="[selected]" />

  <span v-else>category not registered</span>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { CategoryType } from "@/types/CategoryType";
import CategoryVertical from "./CategoryVertical.vue";
import CategoryHorizontal from "./CategoryHorizontal.vue";


type CategoryDirection = "vertical" | "horizontal";

export default defineComponent({
  name: "Category",
  props: {
    category: Object as PropType<CategoryType>,
    selected: Boolean,
    direction: {
      type: String as PropType<CategoryDirection>,
      default: "vertical"
    }
  },
  components: {
    CategoryVertical,
    CategoryHorizontal
  }
});
</script>
