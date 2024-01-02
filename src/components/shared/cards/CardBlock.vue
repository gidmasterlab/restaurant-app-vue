<template>
  <div class="card">
    <CardImage class="image" :product="product" />
    <div class="block">
      <h3 class="title">{{ product.name }}</h3>
      <p class="description">{{ product.description }}</p>
      <div class="actions">
        <div class="cost">
          <span class="price">{{ formatCurrency(product.price) }}</span>
          <span class="discount" v-if="product.previousPrice > 0">
            <small>{{ formatCurrency(product.previousPrice) }}</small>
          </span>
        </div>
        <span class="badge">
          <small>order</small>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ProductType } from "@/types/ProductType";
import { formatCurrency } from "@/utils/FormatUtil";
import CardImage from "./CardImage.vue"

export default defineComponent({
  name: "CardBlock",
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
  position: relative;
  // width: 260px;
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  background: $background-primary;
  border: 1px solid $divider;
  border-radius: $controller-radius;
  padding: $controller-padding;

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: $controller-radius;
  }

  .block {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $controller-gap;

    background-color: $background-primary;
    border-radius: $controller-radius;
    padding: $controller-padding;

    .title {
      color: $text-primary;
      color: $text-primary;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .description {
      color: $text-secondary;
      color: $text-primary;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .cost {
        display: flex;
        align-items: center;
        gap: $controller-gap;

        .price {
          color: $text-accent;
          font-weight: 500;
        }

        .discount {
          text-decoration: line-through;
          color: $text-secondary;
        }
      }

      .badge {
        padding: 5px 10px;
        background-color: $accent-color;
        color: $text-light;
        border-radius: $controller-radius;
      }
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
