<template>
  <div class="main">

    <template v-if="!preferredProduct">
      loading...
    </template>

    <template v-if="preferredProduct">

      <Divider class="ignore-on-mobile" />

      <Section>
        <ProductDetails
          :product="preferredProduct"
          @add-to-cart-click="addToCartClicked" />
      </Section>

      <Divider class="ignore-on-mobile" />

      <Section :ignoreMobileGutter="true">
        <ProductExtraItems
          :additionals="preferredProduct.additionals"
          :maxAdditionals="preferredProduct.maxAdditionals"
          @extra-item-click="extraItemClicked" />
      </Section>

      <Divider class="ignore-on-mobile" />

      <Section>
        <ProductIngredients :ingredients="preferredProduct.ingredients" />
      </Section>

      <Section :gutter="false">
        <ProductComments
          :comments="preferredProduct.comments"
          @comments-change="commentsChanged" />
      </Section>

      <Section>
        <ProductReview :reviews="preferredProduct.reviews" />
      </Section>

      <Divider />

      <Section shape="branch">
        <ProductSuggested :products="suggestedProducts" />
      </Section>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/product";
import { useCheckoutStore } from "@/stores/checkout";
import type { ProductAdditionalType, ProductType } from "@/types/ProductType";
import Section from "@/components/template/Section.vue";
import Divider from "@/components/template/Divider.vue";
import ProductDetails from "@/components/product/ProductDetails.vue";
import ProductExtraItems from "@/components/product/ProductExtraItems.vue";
import ProductIngredients from "@/components/product/ProductIngredients.vue";
import ProductComments from "@/components/product/ProductComments.vue";
import ProductReview from "@/components/product/ProductReview.vue";
import ProductSuggested from "@/components/product/ProductSuggested.vue";


export default defineComponent({
  name: "ProductView",
  components: {
    Section,
    Divider,
    ProductDetails,
    ProductExtraItems,
    ProductIngredients,
    ProductComments,
    ProductReview,
    ProductSuggested
  },
  setup() {

    const route = useRoute()
    const router = useRouter()

    const productStore = useProductStore()
    const { preferredProduct, suggestedProducts } = storeToRefs(productStore)
    const { loadPreferredProduct, loadSuggestedProducts } = productStore

    const checkoutStore = useCheckoutStore()
    const { addProductToCart } = checkoutStore

    const extraItemClicked = (additionals: ProductAdditionalType[]) => {
      preferredProduct.value.additionals = additionals;
    }

    const commentsChanged = (text: string) => {
      preferredProduct.value.comments = text;
    }

    const addToCartClicked = (product: ProductType) => {
      addProductToCart(product);
      router.push('/checkout');
    }

    watch(
      () => route.params.id,
      async slug => {
        loadPreferredProduct(slug.toString());
        loadSuggestedProducts();
      }, { immediate: true }
    )

    return {
      preferredProduct,
      suggestedProducts,
      extraItemClicked,
      commentsChanged,
      addToCartClicked
    }
  },
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;

  @include mediaQuery($breakpoint-mobile) {
    .ignore-on-mobile {
      display: none;
    }
  }

}
</style>
