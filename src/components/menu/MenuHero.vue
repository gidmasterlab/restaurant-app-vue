<template>
  <Hero illustration="ingredients">
    <template #subtitle>
      Our delicious dishes with our signature homemade dressings
    </template>
    <template #title>
      Flavors of our secret recipes
    </template>
  </Hero>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hero from "@/components/shared/Hero.vue";

export default defineComponent({
  name: "MenuHero",
  components: {
    Hero
  }
});
</script>
