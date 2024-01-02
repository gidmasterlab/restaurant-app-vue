<template>
  <div class="ingredients">
    <div class="group">
      <div class="item">
        <div class="image">
          <img src="@/assets/ingredients/hat.svg?url" alt="Chef Hat" />
        </div>
        <div class="line">
          <span>renowned chef</span>
          <img src="@/assets/ingredients/line.svg?url" alt="Line" />
        </div>
      </div>
      <div class="item">
        <div class="line">
          <span>fresh ingredients</span>
          <img src="@/assets/ingredients/line.svg?url" alt="Line" />
        </div>
        <div class="image">
          <img src="@/assets/ingredients/carrot.svg?url" alt="Carrot" />
        </div>
      </div>
    </div>

    <div class="list-wrapper">
      <span class="title large">Ingredients</span>
      <ul class="list">
        <li v-for="ingredient of ingredients" :key="ingredient">
          <Icon name="arrow_forward" class="icon" />
          <span class="text">{{ ingredient }}</span>
        </li>
      </ul>
    </div>

    <div class="group">
      <div class="item">
        <div class="image">
          <img src="@/assets/ingredients/flour.svg?url" alt="Flour" />
        </div>
        <div class="line">
          <span>gluten free</span>
          <img src="@/assets/ingredients/line.svg?url" alt="Line" />
        </div>
      </div>
      <div class="item">
        <div class="line">
          <span>homemade blend</span>
          <img src="@/assets/ingredients/line.svg?url" alt="Line" />
        </div>
        <div class="image">
          <img src="@/assets/ingredients/salt.svg?url" alt="Salt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import Icon from "@/components/shared/Icon.vue";

export default defineComponent({
  name: "ProductIngredients",
  props: {
    ingredients: Array as PropType<string[]>
  },
  components: {
    Icon
  }
});
</script>

<style lang="scss" scoped>
.ingredients {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .group {
    display: flex;
    flex-direction: column;
    gap: $gutter-desktop;

    .item {
      display: flex;
      align-items: center;

      .line {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        span {
          margin: 5px 10px;
          color: $text-secondary;
          white-space: nowrap;
        }

        img {
          width: 142px;
        }
      }

      .image {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        width: 137px;
        height: 137px;
        background-color: $background-accent;

        img {
          width: 98px;
          height: 98px;
        }
      }
    }
  }


  .list-wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-desktop;

    .title {
      display: none;
      color: $text-primary;
    }

    .list {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $gap-desktop;

      li {
        display: flex;
        align-items: center;

        .icon {
          display: none;
        }

        .text {
          color: $text-secondary;
        }
      }
    }
  }



  @include mediaQuery($breakpoint-mobile) {

    background-color: $background-primary;
    border: 1px solid $divider;
    border-radius: $controller-radius;
    padding: $controller-padding;


    .group {
      display: none;
    }

    .list-wrapper {
      gap: $gap-mobile;

      .title {
        display: block;
      }

      .list {
        align-items: flex-start;
        gap: $gap-text-mobile;

        li {

          .icon {
            display: block;
            fill: $text-accent;
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }

          .text {
            color: $text-secondary;
          }
        }
      }
    }
  }
}
</style>
