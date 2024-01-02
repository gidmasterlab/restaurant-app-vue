<template>
  <div class="products">
    <div class="header">
      <span class="quantity large">{{ products.length }} products available</span>
      <Button model="link" @click="resetClicked">
        reset and display all products
      </Button>
    </div>

    <template class="grid-products">
      <GridCards>
        <RouterLink v-for="product of products" :key="product.id" :to="{ name: 'product', params: { id: product.slug } }">
          <Card :product="product" model="details" />
        </RouterLink>
      </GridCards>
    </template>

    <template class="list-products">
      <GridCards :single="true">
        <template v-for="(product, index) of products" :key="product.id">
          <RouterLink :to="{ name: 'product', params: { id: product.slug } }">
            <Card :product="product" model="single" />
          </RouterLink>
          <CardDivider v-if="index < products.length - 1" />
        </template>
      </GridCards>
    </template>

  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ProductType } from "@/types/ProductType";
import Button from "@/components/shared/buttons/Button.vue";
import GridCards from "@/components/shared/cards/GridCards.vue";
import Card from "@/components/shared/cards/Card.vue";
import CardDivider from "@/components/shared/cards/CardDivider.vue";



export default defineComponent({
  name: "MenuProducts",
  props: {
    products: Array as PropType<ProductType[]>
  },
  components: {
    Button,
    GridCards,
    Card,
    CardDivider
  },
  setup(props, { emit }) {
    const resetClicked = () => {
      emit('reset-click')
    }

    return {
      resetClicked
    }
  },
});
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .quantity {
      color: $text-primary;
    }
  }

  .grid-products {
    display: block;
  }

  .list-products {
    display: none;
  }

  @include mediaQuery($breakpoint-mobile) {
    .header {
      display: none;
    }

    .grid-products {
      display: none;
    }

    .list-products {
      display: block;
    }
  }
}
</style>
