<template>
  <Hero illustration="cooking">
    <template #subtitle>
      Kindly review your selected items before finalizing the order
    </template>
    <template #title>
      Go ahead, you're almost there!
    </template>
  </Hero>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hero from "@/components/shared/Hero.vue";

export default defineComponent({
  name: "CheckoutHero",
  components: {
    Hero
  }
});
</script>
