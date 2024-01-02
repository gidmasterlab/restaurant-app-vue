<template>
  <button class="button">
    <Icon class="icon" :name="icon" v-if="icon" />
    <span class="text">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/shared/Icon.vue";

export default defineComponent({
  name: "ButtonSmall",
  props: {
    icon: String
  },
  components: {
    Icon
  }
});
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  min-width: 100px;
  height: 35px;

  padding: 0 calc($controller-padding / 2);
  border-radius: $controller-radius;

  border: 1px solid $primary-color;
  background-color: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc($controller-gap / 2);
  text-transform: uppercase;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  .icon {
    width: 20px;
    height: 20px;
    fill: $text-accent;
  }

  .text {
    font-size: 14px;
    line-height: 0;
    font-weight: 500;
    color: $text-accent;
  }

  @include mediaQuery($breakpoint-mobile) {
    min-width: 70px;
    height: 30px;

    .text {
      font-size: 12px;
    }
  }
}
</style>
