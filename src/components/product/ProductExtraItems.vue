<template>
  <div class="extra-items">
    <div class="summary">
      <span class="subtitle">A maximum of {{ maxAdditionals }} items</span>
      <h2 class="title">Do you want to <br />add extra items ?</h2>
      <p class="description">
        Our chefs strongly recommend these extra items to bring more flavor and complement to this
        dish.
      </p>
    </div>

    <div class="extras">

      <div class="header">
        <span class="title large">Additional</span>
        <span class="subtitle">max {{ maxAdditionals }} items</span>
      </div>

      <ul class="list">
        <template v-for="(additional, index) of additionals" :key="additional.id">
          <li class="item">
            <div class="details">
              <span class="price">{{ formatCurrency(additional.price) }}</span>
              <span class="product">{{ additional.name }}</span>
              <span class="description">{{ additional.description }}</span>
            </div>
            <Incremental :quantity="additional.quantity" :limit="additional.limit" :lock="total === maxAdditionals"
              @increment-click="(value: number) => incrementClicked(additional.id, value)" />
          </li>
          <li class="item" v-if="index < additionals.length - 1">
            <div class="separator" />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type ComputedRef, type PropType, computed } from "vue";
import type { ProductAdditionalType } from "@/types/ProductType";
import { formatCurrency } from "@/utils/FormatUtil";
import Incremental from "@/components/shared/Incremental.vue";

export default defineComponent({
  name: "ProductExtraItems",
  props: {
    additionals: Array as PropType<ProductAdditionalType[]>,
    maxAdditionals: Number
  },
  components: {
    Incremental
  },
  setup(props, { emit }) {

    const total: ComputedRef<number> = computed<number>(() => {
      return props.additionals.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
    })

    const incrementClicked = (id: string, value: number) => {
      const additional = props.additionals.find(item => item.id === id)
      additional.quantity = additional.quantity + value;

      emit('extra-item-click', [...props.additionals])
    }

    return {
      total,
      incrementClicked,
      formatCurrency
    };
  }
});
</script>

<style lang="scss" scoped>
.extra-items {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .summary {
    width: 535px;

    .subtitle {
      color: $text-accent;
    }

    .title {
      color: $text-primary;
    }

    .description {
      color: $text-secondary;
      margin-top: $gap-text-desktop;
    }
  }

  .extras {
    width: 470px;
    display: flex;
    flex-direction: column;

    .header {
      display: none;
    }

    .list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: $gap-desktop;

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .separator {
          height: 1px;
          width: 100%;
          background-color: $divider;
        }

        .details {
          display: flex;
          flex-direction: column;
          gap: calc($gap-text-desktop / 2);

          .price {
            color: $text-accent;
          }

          .product {
            color: $text-primary;
          }

          .description {
            color: $text-secondary;
          }
        }


      }
    }
  }

  @include mediaQuery($breakpoint-mobile) {
    flex-direction: column;

    background-color: $background-primary;
    border: 1px solid $divider;
    border-radius: $controller-radius;
    padding: $controller-padding;

    .summary {
      display: none;
    }

    .extras {
      width: 100%;
      gap: $gap-mobile;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          color: $text-primary;
        }

        .subtitle {
          color: $text-accent;
        }
      }


      .list {
        gap: $gap-mobile;

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .details {
            gap: calc($gap-text-mobile / 2);

          }
        }
      }

    }
  }
}
</style>
