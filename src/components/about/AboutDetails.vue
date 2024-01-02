<template>
    <div class="details">

        <div class="image">
            <img src="@/assets/images/menu_products.png" alt="GID Master Lab" />
        </div>

        <div class="content">
            <h2 class="title">Architecture and features used during development</h2>

            <p class="description">
                sagasghs kjshg kashkjg haskjh
            </p>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "AboutDetails",
});
</script>

<style lang="scss" scoped>
.details {
    width: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;

    .image {
        display: flex;
        justify-content: center;
        width: 100%;


        img {
            width: 100%;
            height: auto;
        }
    }

    .content {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: $gap-text-desktop;

        .title {
            color: $text-primary;
        }

        .description {
            color: $text-secondary;
        }

    }


    @include mediaQuery($breakpoint-mobile) {
        flex-direction: column;
        gap: $gap-mobile;

        .image {
            // order: 1;
            width: 100%;

            img {
                width: 100%;
                height: auto;
            }
        }

        .content {
            // order: 2;
            width: 100%;
            gap: $gap-text-mobile;

            .title {
                color: $text-primary;
            }

            .list {
                gap: $gap-mobile;
            }
        }

    }
}
</style>
