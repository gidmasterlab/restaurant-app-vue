<template>
  <div class="template">
    <header :class="{ hide: hideHeader }">
      <Header :checkout="checkoutQuantity" />
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { RouterView, useRoute } from "vue-router";
import { useCheckoutStore } from "@/stores/checkout";
import Header from "@/components/template/Header.vue";
import Footer from "@/components/template/Footer.vue";


export default defineComponent({
  name: "Home",
  components: {
    Header,
    Footer
  },
  setup() {

    const route = useRoute()
    const hideHeader: Ref<boolean> = ref<boolean>(false);
    const checkoutStore = useCheckoutStore()
    const { checkoutQuantity } = storeToRefs(checkoutStore)

    watch(
      () => route.name,
      async name => {
        hideHeader.value = name === 'product';
      }, { immediate: true }
    )

    return {
      hideHeader,
      checkoutQuantity,
      RouterView
    }
  }
});
</script>

<style lang="scss">
.template {
  width: 100%;
  height: 100%;
  min-height: 100vh;


  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  main {
    width: 100%;
    display: flex;
    justify-content: center;
    flex: 1;
  }

  footer {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @include mediaQuery($breakpoint-mobile) {
    margin-bottom: $toolbar-mobile;

    footer {
      display: none;
    }

    header {
      &.hide {
        display: none;
      }
    }

  }
}
</style>