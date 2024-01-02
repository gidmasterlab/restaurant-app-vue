<template>
  <div class="card">
    <div class="image">
      <CardImage class="image" :product="product" />
      <div class="badge">
        <span class="discount" v-if="product.previousPrice > 0">
          <small>{{ formatCurrency(product.previousPrice) }}</small>
        </span>
        <span class="price">{{ formatCurrency(product.price) }}</span>
      </div>

    </div>
    <div class="block">
      <h3 class="title">{{ product.name }}</h3>
      <div class="details">
        <div class="category">
          <img class="icon" :src="loadDynamicSvg('categories', product.category)" :alt="product.category" />
          <span class="text">{{ product.category }}</span>
        </div>

        <div class="review">
          <Icon class="icon" name="star" />
          <span class="text">{{ formatReview(product.reviews.totalRating, product.reviews.totalReviews) }} ({{
            product.reviews.totalReviews }})</span>
        </div>
      </div>
      <p class="description">{{ product.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ProductType } from "@/types/ProductType";
import Icon from "@/components/shared/Icon.vue";
import { loadDynamicSvg } from "@/utils/ImageUtil";
import { formatCurrency, formatReview } from "@/utils/FormatUtil";
import CardImage from "./CardImage.vue"

export default defineComponent({
  name: "CardDetail",
  props: {
    product: Object as PropType<ProductType>
  },
  components: {
    Icon,
    CardImage
  },
  setup() {
    return {
      loadDynamicSvg,
      formatCurrency,
      formatReview
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

  .image {
    position: relative;
    width: 100%;
    height: 140px;
    border-top-left-radius: $controller-radius;
    border-top-right-radius: $controller-radius;

    .badge {
      position: absolute;
      bottom: 10px;
      left: 10px;
      padding: 5px 10px;
      background-color: $accent-color;
      border-radius: $controller-radius;

      display: flex;
      align-items: center;
      gap: $controller-gap;

      .price {
        color: $text-light;
        font-weight: 500;
      }

      .discount {
        text-decoration: line-through;
        color: $text-light;
      }
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-top-left-radius: $controller-radius;
      border-top-right-radius: $controller-radius;
    }
  }

  .block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $controller-gap;

    background-color: $background-primary;
    padding: $controller-padding;

    border-bottom-left-radius: $controller-radius;
    border-bottom-right-radius: $controller-radius;


    .title {
      color: $text-primary;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .description {
      color: $text-secondary;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 57px;
    }

    .details {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .category {
        display: flex;
        align-items: center;
        gap: calc($controller-gap / 2);

        .icon {
          width: 24px;
          height: 24px;
        }

        .text {
          color: $text-secondary;
        }
      }

      .review {
        display: flex;
        align-items: center;
        gap: calc($controller-gap / 2);

        .icon {
          width: 24px;
          height: 24px;
          fill: $accent-color;
        }

        .text {
          color: $text-secondary;
        }
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

    .block {
      .description {
        min-height: unset;
      }
    }
  }
}
</style>
