<template>
    <div class="architecture">

        <div class="content">

            <div class="header">
                <h2 class="title">Architecture and features used during development</h2>

                <p class="description space">
                    Single responsibility principle following patterns to separate concerns in modules and keep
                    component-based development, component complexity reduced and non-repeating code.
                </p>
            </div>

            <ul class="list">
                <li>
                    <Icon name="arrow_forward" class="icon" />
                    <span class="text">Variation of responsive and adaptable design</span>
                </li>
                <li>
                    <Icon name="arrow_forward" class="icon" />
                    <span class="text">Centralizing events with dumb and smart components</span>
                </li>
                <li>
                    <Icon name="arrow_forward" class="icon" />
                    <span class="text">State management as the primary source of truth</span>
                </li>
                <li>
                    <Icon name="arrow_forward" class="icon" />
                    <span class="text">Interceptor to standardize API calls and handle errors</span>
                </li>
                <li>
                    <Icon name="arrow_forward" class="icon" />
                    <span class="text">Featured modules with lazy loading of small chunks</span>
                </li>
                <li>
                    <Icon name="arrow_forward" class="icon" />
                    <span class="text">Utility functions and services to encapsulate logic</span>
                </li>
                <li>
                    <Icon name="arrow_forward" class="icon" />
                    <span class="text">Versatile shared components with diverse variations</span>
                </li>
            </ul>
        </div>


        <div class="image">
            <img src="@/assets/images/architecture.png" alt="GID Master Lab" />
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/shared/Icon.vue";

export default defineComponent({
    name: "AboutArchitecture",
    components: {
        Icon
    }
});
</script>

<style lang="scss" scoped>
.architecture {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .image {
        display: flex;
        justify-content: center;
        width: auto;


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

            .description {
                color: $text-secondary;
            }
        }

        .list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: $gap-desktop;

            li {

                display: flex;
                gap: 5px;

                .icon {
                    width: 20px;
                    height: 20px;
                    fill: $text-accent;
                }

                .text {
                    color: $text-primary;
                }
            }
        }
    }


    @include mediaQuery($breakpoint-mobile) {
        flex-direction: column;
        gap: $gap-mobile;

        .image {
            order: 1;
            width: 100%;

            img {
                width: 100%;
                height: auto;
            }
        }

        .content {
            order: 2;
            width: 100%;
            gap: $gap-mobile;

            .header {
                gap: $gap-text-mobile;
            }


            .list {
                gap: $gap-mobile;
            }
        }

    }
}
</style>
