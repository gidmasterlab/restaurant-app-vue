<template>
  <div class="grid" :class="{ single: single }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GridCards",
  props: {
    single: Boolean
  }
});
</script>

<style lang="scss" scoped>
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $gap-desktop;


  &.single {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }


  @include mediaQuery($breakpoint-mobile) {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    gap: $gap-mobile;
    width: 100vw;
    padding: 0 $screen-margin-mobile;
    margin-left: -$screen-margin-mobile;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
