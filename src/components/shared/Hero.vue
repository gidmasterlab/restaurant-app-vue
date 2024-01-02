<template>
    <div class="hero">
        <div class="details">
            <span class="title-top">
                <slot name="subtitle"></slot>
            </span>
            <h1 class="title">
                <slot name="title"></slot>
            </h1>
            <div class="actions">
                <Button @click="browserMenuClicked" v-if="browserMenu">browser menu</Button>
                <Button model="flat" @click="aboutUsClicked">about us</Button>
            </div>
        </div>
        <div class="image">
            <img :src="loadDynamicSvg('illustrations', illustration)" :alt="illustration" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useRouter } from "vue-router";
import { loadDynamicSvg } from "@/utils/ImageUtil";
import Button from "@/components/shared/buttons/Button.vue";

type IllustrationType = 'order' | 'delivery' | 'ingredients' | 'cooking' | 'checkout';

export default defineComponent({
    name: "Hero",
    props: {
        illustration: String as PropType<IllustrationType>,
        browserMenu: Boolean
    },
    components: {
        Button
    },
    setup() {

        const router = useRouter()

        const browserMenuClicked = () => {
            router.push('/menu');
        }

        const aboutUsClicked = () => {
            router.push('/about');
        }

        return {
            loadDynamicSvg,
            browserMenuClicked,
            aboutUsClicked
        }
    },
});
</script>

<style lang="scss" scoped>
.hero {
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .details {
        width: 50%;
        display: flex;
        flex-direction: column;

        .title-top {
            color: $text-secondary;
        }

        .title {
            color: $text-primary;
            margin-top: $gap-text-desktop;
        }

        .actions {
            display: flex;
            align-items: center;
            margin-top: $gap-desktop;

            :not(:last-child) {
                margin-right: $gap-desktop;
            }
        }
    }

    .image {
        padding: 0 100px 0 0;
        display: flex;
        justify-content: center;
        width: auto;
        height: 350px;

        img {
            width: auto;
            height: 100%;
        }
    }

    @include mediaQuery($breakpoint-mobile) {
        flex-direction: column;
        width: 100%;
        gap: $gap-mobile;

        .details {
            order: 1;
            width: 100%;

            .title-top {
                text-align: center;
            }

            .title {
                margin-top: $gap-text-mobile;
                text-align: center;
            }

            .actions {
                display: flex;
                justify-content: center;
                margin-top: $gap-mobile;

                :not(:last-child) {
                    margin-right: 0;
                }

                button:last-child {
                    display: none;
                }
            }
        }

        .image {
            order: 0;
            padding: 0;
            width: 80%;
            height: auto;

            display: flex;
            justify-content: center;

            img {
                width: 80%;
                height: auto;
            }
        }

    }
}
</style>
