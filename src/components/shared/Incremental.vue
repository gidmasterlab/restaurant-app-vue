<template>
    <div class="incremental">
        <button class="button left"
            :disabled="quantity === 0"
            @click="increment(-1)">
            <Icon name="minus" class="icon" />
        </button>
        <input class="input" type="text" :value="quantity" />
        <button
            class="button right"
            :disabled="quantity === limit || lock"
            @click="increment(1)">
            <Icon name="plus" class="icon" />
        </button>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/shared/Icon.vue";

export default defineComponent({
    name: "Incremental",
    emits: {
        'increment-click'(value: number) { return value }
    },
    props: {
        quantity: {
            type: Number,
            default: 0
        },
        limit: Number,
        lock: Boolean
    },
    components: {
        Icon,
    },
    setup(props, { emit }) {
        const increment = (value: number) => {
            emit('increment-click', value)
        }

        return {
            increment
        };
    }
});
</script>

<style lang="scss" scoped>
.incremental {
    display: flex;

    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border: 1px solid rgba($divider, 0.3);
        cursor: pointer;


        .icon {
            width: 24px;
            height: 24px;
            fill: $text-light;
        }

        &.left {
            background-color: $primary-color;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }

        &.right {
            background-color: $primary-color;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }

        &:disabled {
            cursor: default;
            background-color: $input;
        }
    }

    input {
        text-align: center;
        background-color: $background-primary;
        width: 34px;
        height: 34px;
        border: 1px solid rgba($divider, 0.3);
        color: $text-primary;

        &:disabled {
            color: $disabled;
        }
    }

    @include mediaQuery($breakpoint-mobile) {
        .button {
            width: 30px;
            height: 30px;
        }

        input {
            width: 30px;
            height: 30px;
        }
    }


}
</style>
  