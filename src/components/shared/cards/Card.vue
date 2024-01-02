<template>
  <CardStandard :product="product" v-if="model === 'standard'" v-once />
  <CardFlat :product="product" v-else-if="model === 'flat'" v-once />
  <CardBlock :product="product" v-else-if="model === 'block'" v-once />
  <CardDetail :product="product" v-else-if="model === 'details'" v-once />
  <CardSingle :product="product" v-else-if="model === 'single'" v-once />
  <span v-else>card not registered</span>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ProductType } from "@/types/ProductType";
import CardStandard from "./CardStandard.vue";
import CardFlat from "./CardFlat.vue";
import CardBlock from "./CardBlock.vue";
import CardDetail from "./CardDetail.vue";
import CardSingle from "./CardSingle.vue";

type CardModel = "standard" | "flat" | "block" | "details" | "single";

export default defineComponent({
  name: "Card",
  props: {
    model: {
      type: String as PropType<CardModel>,
      default: "standard"
    },
    product: Object as PropType<ProductType>
  },
  components: {
    CardStandard,
    CardFlat,
    CardBlock,
    CardDetail,
    CardSingle
  }
});
</script>
