<template>
  <div class="container" :class="{
    gutter: gutter,
    'ignore-mobile': ignoreMobileGutter,
    'ignore-top': ignoreTopGutter,
    'ignore-bottom': ignoreBottomGutter
  }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Container",
  props: {
    gutter: {
      type: Boolean,
      default: true
    },
    ignoreMobileGutter: {
      type: Boolean,
      default: false
    },
    ignoreTopGutter: {
      type: Boolean,
      default: false
    },
    ignoreBottomGutter: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: $screen-max-width;
  padding: 0 $screen-margin-desktop;


  &.gutter {
    padding: $gutter-desktop $screen-margin-desktop;
  }

  &.ignore-top {
    padding-top: 0;
  }

  &.ignore-bottom {
    padding-bottom: 0;
  }

  @include mediaQuery($breakpoint-mobile) {
    padding: 0 $screen-margin-mobile;

    &.gutter {
      padding: $gutter-mobile $screen-margin-mobile;
    }

    &.ignore-mobile {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
}
</style>
