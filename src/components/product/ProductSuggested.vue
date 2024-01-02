<template>
  <div class="products">
    <h2 class="title">Other dishes that you'll fall in love</h2>
    <GridCards>
      <RouterLink v-for="product of products" :key="product.id" :to="{ name: 'product', params: { id: product.slug } }">
        <Card model="standard" :product="product" />
      </RouterLink>
    </GridCards>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ProductType } from "@/types/ProductType";
import GridCards from "@/components/shared/cards/GridCards.vue";
import Card from "@/components/shared/cards/Card.vue";

export default defineComponent({
  name: "ProductSuggested",
  props: {
    products: Array as PropType<ProductType[]>
  },
  components: {
    GridCards,
    Card
  }
});
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $gutter-desktop;

  .title {
    color: $text-primary;
  }

  @include mediaQuery($breakpoint-mobile) {
    gap: $gutter-mobile;

    .title {
      text-align: center;
    }
  }
}
</style>
