<template>
    <div class="main">

        <Divider class="ignore-on-mobile" />

        <Section>
            <ErrorNotFound v-if="status === 404" />
            <ErrorServer v-else />
        </Section>
    </div>
</template>

<script lang="ts">
import { defineComponent, type ComputedRef, computed } from "vue";
import { useRoute } from 'vue-router';
import Section from "@/components/template/Section.vue";
import Divider from "@/components/template/Divider.vue";
import ErrorNotFound from "@/components/error/ErrorNotFound.vue";
import ErrorServer from "@/components/error/ErrorServer.vue";

export default defineComponent({
    name: "ErrorView",
    components: {
        Section,
        Divider,
        ErrorNotFound,
        ErrorServer
    },
    setup() {

        const route = useRoute();
        const status: ComputedRef<number> = computed<number>(() => route.params.id ? Number(route.params.id) : null);

        return {
            status
        }
    },
});
</script>

<style lang="scss" scoped>
.main {
    width: 100%;

    @include mediaQuery($breakpoint-mobile) {
        .ignore-on-mobile {
            display: none;
        }
    }
}
</style>
