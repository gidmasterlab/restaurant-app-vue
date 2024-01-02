<template>
    <div class="stars">
        <Icon
            class="icon"
            v-for="star of [1, 2, 3, 4, 5]"
            :key="star"
            :name="calculateReview(star)" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/shared/Icon.vue";

export default defineComponent({
    name: "ReviewStar",
    props: {
        review: {
            type: Number,
            default: 1
        }
    },
    components: {
        Icon
    },
    setup(props) {
        const calculateReview = (star: number) => {
            const adjustedReview = props.review - star + 1;

            if (adjustedReview >= 1) {
                return 'star_full';
            }

            if (adjustedReview <= 0) {
                return 'star';
            }

            return 'star_half';
        }

        return {
            calculateReview
        }
    },
});
</script>

<style lang="scss" scoped>
.stars {
    display: flex;
    align-items: center;

    .icon {
        width: 32px;
        height: 32px;
        fill: $accent-color;
    }

    @include mediaQuery($breakpoint-mobile) {
        .icon {
            width: 24px;
            height: 24px;
        }
    }
}
</style>
