<template>
  <div class="list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "CheckoutProductsList",
});
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: $gap-desktop;

  @include mediaQuery($breakpoint-mobile) {
    gap: $gap-mobile;
  }
}
</style>
