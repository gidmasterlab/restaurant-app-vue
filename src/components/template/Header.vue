<template>
  <Container class="header" :gutter="false">
    <Logo class="logo" />

    <nav class="menu">
      <RouterLink to="/">
        <Icon class="icon" name="deal" />
        <span class="text">deals</span>
      </RouterLink>

      <RouterLink to="/menu">
        <Icon class="icon" name="menu" />
        <span class="text">menu</span>
      </RouterLink>

      <RouterLink to="/checkout" :class="{ disable: checkout === 0 }">
        <label class="badge" v-if="checkout > 0">{{ checkout }}</label>
        <Icon class="icon" name="checkout" />
        <span class="text">checkout</span>
      </RouterLink>

      <RouterLink to="/about">
        <Icon class="icon" name="about" />
        <span class="text">about us</span>
      </RouterLink>
    </nav>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Container from "@/components/template/Container.vue";
import Logo from "@/components/shared/Logo.vue";
import Icon from "@/components/shared/Icon.vue";

export default defineComponent({
  name: "Header",
  props: {
    checkout: Number
  },
  components: {
    Container,
    Logo,
    Icon
  }
});
</script>

<style lang="scss" scoped>
.header {
  background-color: $background-primary;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $toolbar-desktop;

  .logo {
    display: block;
  }

  .menu {
    display: flex;
    align-items: center;

    a {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:not(:last-child) {
        margin-right: $gap-desktop;
      }

      &:hover {
        opacity: 0.8;
      }

      &.disable {
        opacity: 0.5;
        pointer-events: none;
      }

      .badge {
        position: absolute;
        left: 20px;
        top: -8px;

        width: 20px;
        height: 20px;
        border-radius: 50%;
        padding: 3px;
        color: $text-light;
        background-color: $primary-color;
        font-size: 11px;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .icon {
        width: 28px;
        height: 28px;
        fill: $text-primary;
        margin-right: 5px;
      }

      .text {
        color: $text-primary;
      }

      &.router-link-exact-active {
        cursor: default;
        opacity: 1;

        // .badge {
        //   display: none;
        // }

        .icon {
          fill: $text-accent;
        }

        .text {
          color: $text-accent;
        }
      }
    }
  }

  @include mediaQuery($breakpoint-mobile) {
    z-index: $position-index-toolbar;
    height: $toolbar-mobile;
    position: fixed;
    bottom: 0;
    box-shadow: $toolbar_elevation;


    .logo {
      display: none;
    }

    .menu {
      width: 100%;
      justify-content: space-between;

      a {
        flex-direction: column;

        &:not(:last-child) {
          margin: 0px;
        }

        .badge {
          left: 35px;
        }

        .icon {
          width: 24px;
          height: 24px;
          margin: 0;
        }

        .text {
          color: $text-primary;
        }
      }
    }
  }
}
</style>
