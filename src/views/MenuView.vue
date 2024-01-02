<template>
  <div class="main">
    <Section class="ignore-on-mobile" :accent="true">
      <MenuHero />
    </Section>

    <Section>
      <MenuFilter
        :categories="categories"
        :sortList="sortList"
        :selectedSort="preferredSort"
        :selectedCategory="preferredCategory"
        :searchKeyword="searchKeyword"
        @sort-select="setPreferredSort"
        @search-change="setKeyword"
        @category-select="setPreferredCategory" />
    </Section>

    <Divider />

    <Section>
      <MenuProducts
        :products="filteredProducts"
        @reset-click="resetClicked" />
    </Section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";
import { useProductStore } from "@/stores/product";
import { useMenuStore } from "@/stores/menu";
import Section from "@/components/template/Section.vue";
import Divider from "@/components/template/Divider.vue";
import MenuHero from "@/components/menu/MenuHero.vue";
import MenuFilter from "@/components/menu/MenuFilter.vue";
import MenuProducts from "@/components/menu/MenuProducts.vue";


export default defineComponent({
  name: "MenuView",
  components: {
    Section,
    Divider,
    MenuHero,
    MenuFilter,
    MenuProducts
  },
  setup() {

    const categoryStore = useCategoryStore()
    const { categories, preferredCategory } = storeToRefs(categoryStore)
    const { loadCategories, setPreferredCategory } = categoryStore

    const productStore = useProductStore()
    const { products } = storeToRefs(productStore)
    const { loadProducts } = productStore

    const menuStore = useMenuStore()
    const { sortList, preferredSort, searchKeyword } = storeToRefs(menuStore)
    const { setPreferredSort, setKeyword } = menuStore

    const filteredProducts = computed(() => {
      return products.value
        .filter(
          (product) =>
            !searchKeyword.value ||
            product.name.toLowerCase().includes(searchKeyword.value) ||
            product.description.toLowerCase().includes(searchKeyword.value)
        )
        .filter(
          (product) =>
            !preferredCategory.value ||
            product.category === preferredCategory.value.id
        )
        .sort((a, b): number => {
          switch (preferredSort.value.id) {
            case "alpha":
              return a.name > b.name ? 1 : -1;
            case "price":
              return a.price - b.price;
            case "calories":
              return a.calories - b.calories;
            case "category":
              return a.category > b.category ? 1 : -1;
            case "review":
              return (
                b.reviews.totalRating / b.reviews.totalReviews -
                a.reviews.totalRating / a.reviews.totalReviews
              );
            default:
              return a.order - b.order;
          }
        });
    })

    const resetClicked = () => {
      setPreferredSort(null);
      setKeyword(null);
      setPreferredCategory(null);
    }

    onMounted(async () => {
      loadCategories();
      loadProducts();
    })

    return {
      categories,
      products,
      filteredProducts,
      sortList,
      preferredSort,
      preferredCategory,
      searchKeyword,
      setPreferredSort,
      setPreferredCategory,
      setKeyword,
      resetClicked
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
