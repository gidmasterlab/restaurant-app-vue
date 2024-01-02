<template>
  <div class="filter-wrapper">
    <div class="filter">
      <h3 class="title">What do you feel like today ?</h3>
      <div class="search">
        <Input icon="search" placeholder="search for a product..." :value="searchKeyword" @input="searchChanged" />
      </div>
      <div class="separator"></div>
      <div class="sort">
        <DropDown :list="sortList" :selected="selectedSort" @select="sortSelected" />
      </div>
    </div>
    <div class="categories">
      <GridCategory>
        <button @click="categorySelected()">
          <Category direction="horizontal" :selected="!selectedCategory" />
        </button>
        <button v-for="category of categories" :key="category.id" @click="categorySelected(category.id)">
          <Category :category="category" direction="horizontal" :selected="selectedCategory?.id === category.id" />
        </button>
      </GridCategory>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref, type PropType } from "vue";
import type { CategoryType } from "@/types/CategoryType";
import type { ListType } from "@/types/ListType";
import Input from "@/components/shared/Input.vue";
import DropDown from "@/components/shared/DropDown.vue";
import GridCategory from "@/components/shared/categories/GridCategory.vue";
import Category from "@/components/shared/categories/Category.vue";


export default defineComponent({
  name: "MenuFilter",
  props: {
    categories: Array as PropType<CategoryType[]>,
    sortList: Array as PropType<ListType[]>,
    selectedSort: Object as PropType<ListType>,
    selectedCategory: Object as PropType<CategoryType>,
    searchKeyword: String
  },
  components: {
    Input,
    DropDown,
    GridCategory,
    Category
  },
  setup(props, { emit }) {
    const show: Ref<boolean> = ref<boolean>(false);

    const sortSelected = (id: string) => {
      emit('sort-select', id)
    }

    const searchChanged = (value: string) => {
      emit('search-change', value);
    }

    const categorySelected = (id: string = null) => {
      emit('category-select', id);
    }

    return {
      show,
      sortSelected,
      searchChanged,
      categorySelected
    }
  },
});
</script>

<style lang="scss" scoped>
.filter-wrapper {
  display: flex;
  flex-direction: column;
  gap: $gap-desktop;

  .filter {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap-desktop;

    .title {
      display: flex;
      align-items: center;
      color: $text-primary;
      height: 48px;
      border-left: 5px solid $primary-color;
      padding-left: 20px;
    }

    .search {
      width: 410px;
    }

    .separator {
      flex: 1;
    }

    .sort {
      width: 280px;
    }

    .categories {
      margin-top: $gap-desktop;
    }
  }


  @include mediaQuery($breakpoint-mobile) {
    gap: $gap-mobile;

    .filter {
      gap: unset;

      .title {
        display: none;
      }

      .search {
        width: 80%;
      }

      .separator {
        display: none;
      }

      .sort {
        width: unset;
      }

      .categories {
        margin-top: $gap-mobile;
      }
    }
  }

}
</style>
