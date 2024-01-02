<template>
    <div class="error">
        <h1 class="title">Oops !</h1>
        <span class="subtitle large">404 not found</span>
        <p class="description">What you're looking for cannot be found. Please return to the menu and browse new products.
        </p>
        <div class="image">
            <img src="@/assets/illustrations/error.svg?url" alt="GID Master Lab" />
        </div>
        <Button @click="browserClicked">Browser menu</Button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/shared/buttons/Button.vue";

export default defineComponent({
    name: "ErrorIntro",
    components: {
        Button
    },
    setup() {

        const router = useRouter()

        const browserClicked = () => {
            router.push('/menu')
        }

        return {
            browserClicked
        }
    },
});
</script>

<style lang="scss" scoped>
.error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $gap-desktop;

    .title {
        color: $text-primary;
    }

    .subtitle {
        color: $text-primary;
        font-weight: 600;
    }

    .description {
        color: $text-primary;
    }

    .image {
        width: 400px;
        height: auto;

        img {
            width: 400px;
            height: auto;
        }
    }

    @include mediaQuery($breakpoint-mobile) {
        gap: $gap-mobile;

        .image {
            width: 100%;

            img {
                width: 100%;
                height: auto;
            }
        }
    }
}
</style>
