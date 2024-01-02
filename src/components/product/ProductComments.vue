<template>
  <div class="comments">
    <span class="subtitle large">let our chefs to know</span>
    <h2 class="title">Would you like to change ?</h2>
    <textarea class="input" placeholder="Example: Take onions off" :value="comments" @input="commentsChanged" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type InputHTMLAttributes } from "vue";

export default defineComponent({
  name: "ProductComments",
  props: {
    comments: String
  },
  setup(props, { emit }) {
    const commentsChanged = (event: Event) => {
      const target: InputHTMLAttributes = event.target as InputHTMLAttributes;
      emit('comments-change', target.value)
    }

    return {
      commentsChanged
    }
  },
});
</script>

<style lang="scss" scoped>
.comments {
  width: 100%;
  border-radius: $controller-radius;
  padding: $gutter-desktop;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $background-accent;

  .subtitle {
    color: $accent-color;
  }

  .title {
    color: $text-primary;
  }

  .input {
    margin-top: $gap-desktop;
    width: 800px;
    height: 110px;
    background-color: $background-primary;
    border-radius: $controller-radius;
    padding: $controller-padding;
    border: 0;
    color: $text-primary;
    resize: none;
  }

  @include mediaQuery($breakpoint-mobile) {
    padding: $gutter-mobile;

    .input {
      margin-top: $gap-mobile;
      width: 100%;
    }
  }
}
</style>
