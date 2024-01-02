<template>
    <div class="divider" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CardDivider"
});
</script>

<style lang="scss" scoped>
.divider {
    width: 100%;
    height: 1px;
    background-color: $divider;

    @include mediaQuery($breakpoint-mobile) {
        //
    }
}
</style>
