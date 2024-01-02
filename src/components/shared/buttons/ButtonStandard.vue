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
  name: "ButtonStandard",
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
  width: 210px;
  height: $controller-height;
  padding: 0 $controller-padding;
  border-radius: $controller-radius;

  border: 1px solid $primary-color;
  background-color: $primary-color;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: $controller-gap;
  text-transform: uppercase;


  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  .icon {
    width: 24px;
    height: 24px;
    fill: $text-light;
  }

  .text {
    line-height: 100%;
    font-weight: 500;
    color: $text-light;
  }


  @include mediaQuery($breakpoint-mobile) {
    width: 80%;
  }
}
</style>
