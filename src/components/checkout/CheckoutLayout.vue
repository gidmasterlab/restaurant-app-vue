<template>
  <div class="layout">
    <div class="products">
      <slot name="products"></slot>
    </div>
    <div class="summary">
      <slot name="summary"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckoutLayout"
});
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: $gap-desktop;

  .products {
    width: 60%;
  }

  .summary {
    position: sticky;
    top: $gap-desktop;
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: $gap-desktop;
  }

  @include mediaQuery($breakpoint-mobile) {
    flex-direction: column;
    gap: $gap-mobile;

    .products {
      width: 100%;
    }

    .summary {
      position: unset;
      top: unset;
      width: 100%;
      gap: $gap-mobile;
    }
  }
}
</style>
