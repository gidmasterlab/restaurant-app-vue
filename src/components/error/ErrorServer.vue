<template>
    <div class="error">
        <h1 class="title">Oops !</h1>
        <span class="subtitle large">Something went wrong here</span>
        <p class="description">We're actively working to resolve the issue, and it will be fixed as soon as possible. In the
            meantime, feel free to go back and browse other products.
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
    name: "ErrorServer",
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
        }
    }
}
</style>
