<template>
  <RouterLink to="/">
    <img class="logo" src="@/assets/logos/logo.svg?url" alt="Cheffy Logo" />
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Logo"
});
</script>

<style lang="scss" scoped>
.logo {
  width: 100px;
  height: auto;
}
</style>
