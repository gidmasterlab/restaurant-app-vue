<template>
  <Hero illustration="order" :browserMenu="true">
    <template #subtitle>
      Introducing our online menu with customized deals and suggestions
    </template>
    <template #title>
      Explore our exclusive menu
    </template>
  </Hero>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hero from "@/components/shared/Hero.vue";

export default defineComponent({
  name: "HomeHero",
  components: {
    Hero
  }
});
</script>
