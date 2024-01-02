<template>
    <div class="intro">

        <div class="image">
            <img src="@/assets/images/gidmasterlab.png" alt="GID Master Lab" />
        </div>

        <div class="content">
            <div class="header">
                <h2 class="title">Hands on application</h2>
                <span class="subtitle">Coding standards, best practices and guidelines</span>
            </div>

            <p class="description space">
                The concept behind GID master lab is to develop demo applications exploring patterns, architectures and
                upcoming
                features used across the most modern frameworks currently available in the market.
            </p>

            <p class="description space">
                It exposes a clean code structure and deep understanding of how the end-to-end Javascript applications
                are
                designed.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    name: "AboutIntro",
});
</script>

<style lang="scss" scoped>
.intro {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .image {
        display: flex;
        justify-content: center;
        width: auto;
        height: 350px;
        box-shadow: $bubble_elevation;

        img {
            width: auto;
            height: 100%;
        }
    }

    .content {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: $gap-desktop;

        .header {
            display: flex;
            flex-direction: column;
            gap: $gap-text-desktop;

            .title {
                color: $text-primary;
            }

            .subtitle {
                color: $text-secondary;
            }
        }

        .description {
            color: $text-primary;
        }
    }


    @include mediaQuery($breakpoint-mobile) {
        flex-direction: column;
        gap: $gap-mobile;

        .image {
            width: 100%;
            height: auto;

            img {
                width: 100%;
                height: auto;
            }
        }

        .content {
            width: 100%;
            gap: $gap-mobile;
        }
    }
}
</style>
