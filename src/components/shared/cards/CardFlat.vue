<template>
  <div class="card">
    <div class="header">
      <span class="badge">{{ formatCurrency(product.price, 0) }}</span>
      <CardImage class="image" :product="product" />
    </div>
    <div class="details">
      <h3 class="title">{{ product.name }}</h3>
      <p class="description">{{ product.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ProductType } from "@/types/ProductType";
import { formatCurrency } from "@/utils/FormatUtil";
import CardImage from "./CardImage.vue"

export default defineComponent({
  name: "CardFlat",
  props: {
    product: Object as PropType<ProductType>
  },
  components: {
    CardImage
  },
  setup() {
    return {
      formatCurrency
    }
  },
});
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  // width: 260px;
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: $background-primary;
  border: 1px solid $divider;
  border-radius: $controller-radius;


  .header {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    .badge {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $primary-color;
      border-radius: 50%;
      color: $text-light;
    }

    .image {
      width: 100%;
      height: 170px;
      object-fit: cover;
      border-top-left-radius: $controller-radius;
      border-top-right-radius: $controller-radius;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $controller-gap;
    padding: $controller-padding;

    .title {
      color: $text-primary;
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .description {
      color: $text-secondary;
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

  }

  &:hover {
    opacity: 0.8;
    // border-color: transparent;
    // box-shadow: $box_elevation;
  }

  @include mediaQuery($breakpoint-mobile) {
    width: 230px;
    height: 300px;
  }
}
</style>
