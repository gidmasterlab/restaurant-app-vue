<template>
    <button class="backdrop" :class="{ show: show }" @click="closeClicked" />
    <div class="modal" :class="{ show: show }">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

export default defineComponent({
    name: "Modal",
    emits: ['close-click'],
    props: {
        show: Boolean,
        lock: Boolean
    },
    setup(props, { emit }) {
        const closeClicked = () => {
            if (props.lock) {
                return;
            }

            emit('close-click')
        }

        watch(
            () => props.show,
            (show) => {
                document.body.style.overflow = show ? 'hidden' : '';
            }
        )

        return {
            closeClicked
        }
    },
});
</script>

<style lang="scss" scoped>
.backdrop {
    z-index: $position-index-backdrop;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: $background-secondary;
    width: 100%;
    height: 100%;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease;
    border: 0;

    &.show {
        visibility: visible;
        opacity: 0.5;
    }
}

.modal {
    z-index: $position-index-modal;
    position: fixed;
    background-color: $background-primary;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: auto;
    border-radius: 20px;
    box-shadow: $box_elevation;

    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease;

    &.show {
        visibility: visible;
        opacity: 1;
    }

    .content {
        padding: $gap-desktop;
    }


    @include mediaQuery($breakpoint-mobile) {
        bottom: 0;
        left: 0;
        transform: unset;
        top: unset;
        box-shadow: $toolbar_elevation;
        border: 0;
        border-radius: 0;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;

        width: 100%;
        height: 0;
        visibility: visible;
        opacity: 1;

        overflow-y: auto;


        &.show {
            opacity: 1;
            height: 400px;
        }

        .content {
            padding: $gap-mobile;
        }
    }
}
</style>
