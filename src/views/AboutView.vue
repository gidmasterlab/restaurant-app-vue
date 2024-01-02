<template>
  <div class="main">
    <Section :accent="true">
      <AboutHero />
    </Section>

    <Section>
      <AboutIntro />
    </Section>

    <Divider />

    <Section>
      <AboutArchitecture />
    </Section>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/template/Section.vue";
import Divider from "@/components/template/Divider.vue";
import AboutHero from "@/components/about/AboutHero.vue";
import AboutIntro from "@/components/about/AboutIntro.vue";
import AboutArchitecture from "@/components/about/AboutArchitecture.vue";

export default defineComponent({
  name: "AboutView",
  components: {
    Section,
    Divider,
    AboutHero,
    AboutIntro,
    AboutArchitecture
  }
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
}
</style>
