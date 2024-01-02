<template>
  <div class="footer">
    <Container class="content">
      <div class="logo">
        <Logo />
        <p class="description">
          ©{{ year }} Copyright. All rights reserved.
          <br />
          Restaurant hands-on project
          <br />
          Designed by GID Master Lab
        </p>
      </div>

      <nav class="menu">
        <span class="title">Navigation</span>
        <RouterLink to="/">Deals</RouterLink>
        <RouterLink to="/menu">Menu</RouterLink>
        <RouterLink to="/checkout">Checkout</RouterLink>
        <RouterLink to="/about">About us</RouterLink>
      </nav>

      <nav class="menu">
        <span class="title">Additional Links</span>
        <a href="https://github.com/gidmasterlab/restaurant-app-vue" target="_blank">Source code project</a>
        <RouterLink to="/about">Non-commercial use</RouterLink>
        <a href="https://github.com/gidmasterlab" target="_blank">GID Master Lab</a>
      </nav>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Container from "@/components/template/Container.vue";
import Logo from "@/components/shared/Logo.vue";

export default defineComponent({
  name: "Footer",
  components: {
    Container,
    Logo
  },
  setup() {
    const year = new Date().getFullYear();

    return {
      year
    }
  },
});
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: $background-accent;
  display: flex;
  justify-content: center;

  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .logo {
      display: flex;
      flex-direction: column;

      .description {
        color: $text-secondary;
        margin-top: 20px;
        line-height: 25px;
      }
    }

    .menu {
      display: flex;
      flex-direction: column;

      .title {
        color: $text-primary;
        font-weight: 500;
        margin-bottom: 20px;
      }

      a {
        cursor: pointer;
        color: $text-secondary;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        &:hover {
          opacity: 0.8;
        }

        &.router-link-exact-active {
          cursor: default;
          opacity: 1;
          color: $text-accent;
        }
      }
    }
  }

  @include mediaQuery($breakpoint-mobile) {
    //
  }
}
</style>
