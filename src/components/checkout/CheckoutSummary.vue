<template>
  <div class="summary">
    <span class="title large">Order Summary</span>


    <div class="content">

      <ul class="breakdown">
        <li>
          <span class="text">Subtotal</span>
          <span class="price">
            <small class="previous" v-if="hasDiscount">
              {{ formatCurrency(previousCost) }}
            </small>
            {{ formatCurrency(productsCost) }}
          </span>
        </li>
        <li class="hightlight">
          <span class="text">Discount</span>
          <span class="price">
            {{ formatCurrency(discount) }}
          </span>
        </li>
      </ul>

      <hr class="divider" />

      <ul class="breakdown">
        <li class="secondary">
          <span class="text">You're Saving</span>
          <span class="price">
            {{ formatPercentage(discountPercentage) }}
          </span>
        </li>
        <li class="total">
          <span class="text">Order Total</span>
          <span class="price">{{ formatCurrency(productsCost) }}</span>
        </li>

      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type ComputedRef, type PropType, computed } from "vue";
import type { ProductType } from "@/types/ProductType";
import { formatCurrency, formatPercentage } from "@/utils/FormatUtil";
import { hasProductsDiscount, getAllProductsCost, getAllProductsDiscount, getAllPreviousProductsCost } from "@/utils/PriceUtil";


export default defineComponent({
  name: "CheckoutSummary",
  props: {
    products: Array as PropType<ProductType[]>
  },
  setup(props) {

    const productsCost: ComputedRef<number> = computed<number>(() => getAllProductsCost(props.products));
    const previousCost: ComputedRef<number> = computed<number>(() => getAllPreviousProductsCost(props.products));
    const discount: ComputedRef<number> = computed<number>(() => getAllProductsDiscount(props.products));
    const discountPercentage: ComputedRef<number> = computed<number>(() => getAllProductsDiscount(props.products, 'percentage'));
    const hasDiscount: ComputedRef<boolean> = computed<boolean>(() => hasProductsDiscount(props.products));

    return {
      productsCost,
      previousCost,
      discount,
      discountPercentage,
      hasDiscount,
      formatCurrency,
      formatPercentage
    }
  },
});
</script>

<style lang="scss" scoped>
.summary {
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: $background-primary;
  border: 1px solid $divider;
  border-radius: $controller-radius;
  padding: $controller-padding;
  gap: $gap-desktop;

  .title {
    color: $text-primary;
  }

  .content {
    display: flex;
    flex-direction: column;

    .breakdown {
      display: flex;
      flex-direction: column;
      gap: $controller-gap;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
          color: $text-primary;
        }

        .price {
          color: $text-primary;

          small {
            &.previous {
              text-decoration: line-through;
              color: $text-secondary;
            }
          }
        }

        &.secondary {
          .text {
            color: $text-secondary;
          }

          .price {
            color: $text-secondary;
          }
        }

        &.hightlight {
          .text {
            color: $text-accent;
          }

          .price {
            color: $text-accent;
          }
        }

        &.total {
          .text {
            font-weight: 500;
          }

          .price {
            font-weight: 500;
          }
        }

      }
    }

    .divider {
      border: 0;
      border-top: 1px solid $divider;
      margin: $controller-gap 0;
    }

  }

  @include mediaQuery($breakpoint-mobile) {
    gap: $gap-mobile;

    .title {
      margin-bottom: $gap-text-mobile;
    }
  }
}
</style>
