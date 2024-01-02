<template>
  <div class="tab">
    <template v-if="category">
      <CategoryImage class="image" :category="category" />
      <span class="text">{{ category.name }}</span>
    </template>
    <template v-else>
      <img class="image" src="@/assets/categories/all.svg?url" alt="all products" />
      <span class="text">list all</span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { CategoryType } from "@/types/CategoryType";
import CategoryImage from "./CategoryImage.vue"

export default defineComponent({
  name: "CategoryVertical",
  props: {
    category: Object as PropType<CategoryType>,
    selected: Boolean
  },
  components: {
    CategoryImage
  }
});
</script>

<style lang="scss" scoped>
.tab {
  cursor: pointer;
  width: 100%;
  // height: $controller-height;
  padding: $controller-padding;
  border-radius: $controller-radius;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $background-primary;
  border: 1px solid $divider;

  .image {
    width: 40px;
    height: 40px;
    // filter: grayscale(1);
  }

  .text {
    margin-top: $controller-gap;
    color: $text-primary;
  }

  &.selected {
    cursor: default;
    background-color: $primary-color;
    border: 1px solid $primary-color;

    .text {
      color: $text-light;
    }
  }

  &:not(.selected):hover {
    opacity: 0.8;
  }

  @include mediaQuery($breakpoint-mobile) {
    min-width: 140px;
  }
}
</style>
