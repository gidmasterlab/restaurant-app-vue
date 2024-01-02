<template>
  <div class="hero">
    <div class="details">
      <span class="title-top">
        This project is intended to exemplify real-world application concepts
      </span>
      <h1 class="title">
        Non-commercial use application
      </h1>
      <div class="actions">
        <Button @click="githubClicked" icon="plus">More Repos</Button>
      </div>
    </div>
    <div class="image">
      <img src="@/assets/images/app.png" alt="Non-commercial Application" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/shared/buttons/Button.vue";


export default defineComponent({
  name: "Hero",
  components: {
    Button
  },
  setup() {
    const githubClicked = () => {
      window.open('https://github.com/gidmasterlab');
    }

    return {
      githubClicked
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
    }
  }

  .image {
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
      width: 100%;
      height: auto;

      display: flex;
      justify-content: center;

      img {
        width: 100%;
        height: auto;
      }
    }

  }
}
</style>
