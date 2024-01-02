<template>
    <div class="grid">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "GridCategory"
});
</script>

<style lang="scss" scoped>
.grid {
    width: 100%;
    display: flex;
    gap: $gap-desktop;

    :deep(a),
    :deep(button) {
        flex: 1;
        border: 0;
        background-color: transparent;
    }

    @include mediaQuery($breakpoint-mobile) {
        display: flex;
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
