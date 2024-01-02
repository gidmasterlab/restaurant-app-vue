<template>
  <div class="product">
    <div class="image">
      <img :src="loadDynamicAsset(product.image)" :alt="product.name" />
      <button class="back" @click="backToHistory">
        <Icon class="icon" name="arrow_forward" />
      </button>
    </div>

    <div class="content">

      <div class="brief">

        <div class="category-wrapper">
          <div class="category">
            <img class="icon" :src="loadDynamicSvg('categories', product.category)" :alt="product.category" />
            <span class="text">{{ product.category }}</span>
          </div>
          <span class="price">{{ formatCurrency(product.price) }}</span>
        </div>

        <h1 class="title">{{ product.name }}</h1>

        <p class="description">
          {{ product.description }}
        </p>

        <div class="review">
          <ReviewStar :review="Number(review)" />
          <span class="summary">
            {{ review }} ({{ product.reviews.totalReviews }} reviews)
          </span>
        </div>

      </div>

      <div class="details">
        <div class="list">
          <div class="item">
            <Icon class="icon" name="calories" />
            <span class="text">{{ product.calories }} cal</span>
          </div>

          <div class="item">
            <Icon class="icon" name="weight" />
            <span class="text">{{ product.portionSize }} {{ product.unitType }}</span>
          </div>

          <div class="item">
            <Icon class="icon" name="serve" />
            <span class="text">serve {{ product.servingPeople }}</span>
          </div>
        </div>
      </div>

      <div class="actions">
        <Button icon="checkout" @click="addToCartClicked">add to cart</Button>
        <div class="cost">
          <span class="discount" v-if="product.previousPrice > 0">
            {{ formatCurrency(previousCost) }}
          </span>
          <span class="price">
            {{ formatCurrency(productCost) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type ComputedRef, type PropType, computed } from "vue";
import { useRouter } from "vue-router";
import type { ProductType } from "@/types/ProductType";
import { loadDynamicSvg, loadDynamicAsset } from "@/utils/ImageUtil";
import { formatCurrency, formatReview } from "@/utils/FormatUtil";
import { getProductCost, getPreviousProductCost } from "@/utils/PriceUtil";
import Button from "@/components/shared/buttons/Button.vue";
import Icon from "@/components/shared/Icon.vue";
import ReviewStar from "@/components/shared/ReviewStar.vue";


export default defineComponent({
  name: "ProductDetails",
  props: {
    product: Object as PropType<ProductType>
  },
  components: {
    Button,
    Icon,
    ReviewStar
  },
  setup(props, { emit }) {

    const router = useRouter()
    const productCost: ComputedRef<number> = computed<number>(() => getProductCost(props.product));
    const previousCost: ComputedRef<number> = computed<number>(() => getPreviousProductCost(props.product));
    const review: ComputedRef<string> = computed<string>(() => formatReview(props.product.reviews.totalRating, props.product.reviews.totalReviews))


    const addToCartClicked = () => {
      emit('add-to-cart-click', props.product)
    }

    const backToHistory = () => {
      router.go(-1);
    }

    return {
      productCost,
      previousCost,
      review,
      loadDynamicAsset,
      loadDynamicSvg,
      formatCurrency,
      formatReview,
      addToCartClicked,
      backToHistory
    }
  },
});
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .image {
    position: relative;
    width: 577px;
    height: 361px;

    img {
      width: 577px;
      height: 361px;
      object-fit: cover;
    }

    .back {
      cursor: pointer;
      position: absolute;
      top: $controller-padding;
      left: $controller-padding;
      border: 0;
      background-color: $background-primary;
      border-radius: 50%;
      padding: 10px;

      display: flex;
      justify-content: center;
      align-items: center;

      box-shadow: $bubble_elevation;

      .icon {
        width: 24px;
        height: 24px;
        fill: $text-accent;
        transform: rotateY(-180deg);
      }
    }
  }

  .content {
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    .brief {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .category-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .price {
          color: $text-accent;
          display: none;
        }

        .category {
          display: flex;
          align-items: center;

          .icon {
            width: 28px;
            height: 28px;
            margin-right: $controller-gap;
          }

          .text {
            color: $text-secondary;
          }
        }
      }


      .title {
        font-size: 40px;
        line-height: 120%;
        color: $text-primary;
      }

      .description {
        color: $text-secondary;
      }

      .review {
        margin-top: $gap-text-desktop;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .summary {
          color: $text-secondary;
        }
      }
    }

    .details {
      width: 100%;
      background-color: $background-primary;

      .list {
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-radius: $controller-radius;
        border: 1px solid $divider;

        .item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: calc($controller-padding / 2) 0;

          &:not(:last-child) {
            border-right: 1px solid $divider;
          }

          .icon {
            width: 32px;
            height: 32px;
            fill: $accent-color;
            margin-right: $controller-gap;
          }

          .text {
            color: $text-primary;
          }
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .cost {
        display: flex;
        align-items: center;
        gap: $controller-gap;

        .price {
          font-size: 22px;
          line-height: 120%;
          font-weight: 500;
          color: $text-accent;
        }

        .discount {
          text-decoration: line-through;
          color: $text-secondary;
        }
      }
    }


  }

  @include mediaQuery($breakpoint-mobile) {
    flex-direction: column;
    margin-top: 120px;


    .image {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 250px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .content {
      z-index: 2;
      width: 100%;
      gap: $gutter-mobile;

      .brief {
        background-color: $background-primary;
        border: 1px solid $divider;
        box-shadow: $card_elevation;
        border-radius: $controller-radius;
        padding: $controller-padding;
        gap: $gap-text-mobile;


        .category-wrapper {
          order: 4;

          .price {
            order: 1;
            display: block;
          }

          .category {
            order: 2;

            .icon {
              width: 24px;
              height: 24px;
            }
          }
        }

        .title {
          order: 1;
          font-size: 20px;
        }

        .description {
          order: 2;
        }

        .review {
          order: 3;
          margin: 0;
        }
      }


      .details {
        .list {
          .item {
            .icon {
              width: 28px;
              height: 28px;
            }
          }
        }
      }

      .actions {
        z-index: $position-index-toolbar;
        position: fixed;
        bottom: 0;
        left: 0;

        width: 100%;
        height: $toolbar-mobile;
        padding: 0 $screen-margin-mobile;
        background-color: $background-primary;
        box-shadow: $toolbar_elevation;

        button {
          width: 190px;
        }

        .cost {
          .price {
            font-size: 18px;
          }
        }
      }

    }

  }
}
</style>
