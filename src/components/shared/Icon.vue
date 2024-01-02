<template>
  <component :is="icon" />
</template>

<script lang="ts">
import { defineComponent, watch, shallowRef } from "vue";
import { defineAsyncComponent } from "vue";

export default defineComponent({
  name: "Icon",
  props: {
    name: String
  },
  setup(props) {
    const icon = shallowRef(null);

    watch(
      () => props.name,
      () => {
        icon.value = defineAsyncComponent(() => import(`./../../assets/icons/${props.name}.svg`));
      },
      { immediate: true }
    );

    return {
      icon
    };
  }
});
</script>
