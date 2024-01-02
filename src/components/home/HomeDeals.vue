<template>
  <div class="deals">
    <div class="header">
      <h2 class="title">Delicious dishes with great deals</h2>
      <Button model="flat" @click="browserClicked">browser menu</Button>
    </div>
    <GridCards>
      <RouterLink v-for="product of products" :key="product.id" :to="{ name: 'product', params: { id: product.slug } }">
        <Card :product="product" model="block" />
      </RouterLink>
    </GridCards>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useRouter } from "vue-router";
import type { ProductType } from "@/types/ProductType";
import Button from "@/components/shared/buttons/Button.vue";
import GridCards from "@/components/shared/cards/GridCards.vue";
import Card from "@/components/shared/cards/Card.vue";


export default defineComponent({
  name: "HomeDeals",
  props: {
    products: Array as PropType<ProductType[]>
  },
  components: {
    Button,
    GridCards,
    Card
  },
  setup() {
    const router = useRouter()

    const browserClicked = () => {
      router.push('/menu')
    }

    return {
      browserClicked
    }
  },
});
</script>

<style lang="scss" scoped>
.deals {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $gutter-desktop;

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      color: $text-primary;
    }
  }

  @include mediaQuery($breakpoint-mobile) {
    gap: $gutter-mobile;

    .header {
      flex-direction: column;
      justify-content: center;

      button {
        display: none;
      }
    }
  }
}
</style>
