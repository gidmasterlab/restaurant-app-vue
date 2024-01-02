<template>
  <div class="specials">
    <h2 class="title">
      Chef's specials with <br />
      premium quality ingredients
    </h2>
    <GridCards>
      <RouterLink v-for="product of products" :key="product.id" :to="{ name: 'product', params: { id: product.slug } }">
        <Card :product="product" model="flat" />
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
  name: "HomeSpecials",
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
.specials {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $gutter-desktop;

  .title {
    color: $text-primary;
    text-align: center;
  }

  @include mediaQuery($breakpoint-mobile) {
    gap: $gutter-mobile;
  }
}
</style>
