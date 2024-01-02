<template>
  <ButtonStandard :icon="icon" v-if="model === 'standard'">
    <slot></slot>
  </ButtonStandard>

  <ButtonFlat :icon="icon" v-else-if="model === 'flat'">
    <slot></slot>
  </ButtonFlat>

  <ButtonSmall :icon="icon" v-else-if="model === 'small'">
    <slot></slot>
  </ButtonSmall>

  <ButtonLink :icon="icon" v-else-if="model === 'link'">
    <slot></slot>
  </ButtonLink>

  <span v-else>button not registered</span>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import ButtonStandard from "./ButtonStandard.vue";
import ButtonFlat from "./ButtonFlat.vue";
import ButtonSmall from "./ButtonSmall.vue";
import ButtonLink from "./ButtonLink.vue";


type ButtonModel = "standard" | "flat" | "small" | 'link';

export default defineComponent({
  name: "Button",
  props: {
    icon: String,
    model: {
      type: String as PropType<ButtonModel>,
      default: "standard"
    }
  },
  components: {
    ButtonStandard,
    ButtonFlat,
    ButtonSmall,
    ButtonLink
  }
});
</script>
