<template>
  <div class="main">
    <Section :accent="true">
      <HomeHero />
    </Section>

    <Section shape="leaf">
      <HomeSpecials :products="specialProducts" />
    </Section>

    <Divider />

    <Section>
      <HomeCategories :categories="categories" @category-click="categoryClicked" />
    </Section>

    <Divider />

    <Section shape="garlic">
      <HomeDeals :products="productsDeals" />
    </Section>

    <Section :accent="true" :ignoreBottomGutter="true">
      <HomeDelivery />
    </Section>

    <Section shape="branch">
      <HomeExperiences :products="productsExperience" />
    </Section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import Section from "@/components/template/Section.vue";
import Divider from "@/components/template/Divider.vue";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeSpecials from "@/components/home/HomeSpecials.vue";
import HomeCategories from "@/components/home/HomeCategories.vue";
import HomeDeals from "@/components/home/HomeDeals.vue";
import HomeDelivery from "@/components/home/HomeDelivery.vue";
import HomeExperiences from "@/components/home/HomeExperiences.vue";
import { useCategoryStore } from "@/stores/category";
import { useDealStore } from "@/stores/deal";


export default defineComponent({
  name: "HomeView",
  components: {
    Section,
    Divider,
    HomeHero,
    HomeSpecials,
    HomeCategories,
    HomeDeals,
    HomeDelivery,
    HomeExperiences
  },
  setup() {

    const router = useRouter()

    const dealStore = useDealStore()
    const { specialProducts, productsDeals, productsExperience } = storeToRefs(dealStore)
    const { loadSpecialProducts, loadProductsDeals, loadProductsExperience } = dealStore

    const categoryStore = useCategoryStore()
    const { categories } = storeToRefs(categoryStore)
    const { loadCategories, setPreferredCategory } = categoryStore

    const categoryClicked = (id: string) => {
      setPreferredCategory(id)
      router.push('/menu');
    }

    onMounted(async () => {
      loadCategories();
      loadSpecialProducts();
      loadProductsDeals();
      loadProductsExperience();
    })

    return {
      categories,
      specialProducts,
      productsDeals,
      productsExperience,
      categoryClicked
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
