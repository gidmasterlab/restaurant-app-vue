<template>
  <div class="highlight">
    <div class="image">
      <img src="@/assets/illustrations/delivery.svg?url" alt="Delivery" />
    </div>
    <div class="details">
      <div class="header">
        <h2 class="title">You order, we deliver !</h2>
        <p class="description">
          You don't have to leave your home because we will come to you.
          <br />
          Free delivery fee on purchases over $20.00.
        </p>
      </div>
      <Button class="button" @click="browserClicked">browser menu</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/shared/buttons/Button.vue";

export default defineComponent({
  name: "HomeDelivery",
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
  }
});
</script>

<style lang="scss" scoped>
.highlight {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  .image {
    width: auto;
    height: 300px;

    img {
      width: auto;
      height: 100%;
    }
  }

  .details {
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
        line-height: 160%;
      }
    }
  }



  @include mediaQuery($breakpoint-mobile) {
    flex-direction: column;
    gap: $gap-mobile;

    .image {
      width: 50%;
      height: auto;

      img {
        width: 100%;
        height: auto;
      }
    }

    .details {
      width: 100%;
      gap: $gap-mobile;
      align-items: center;

      .header {
        gap: $gap-text-mobile;
        align-items: center;
      }

      .description {
        text-align: center;

        br {
          display: none;
        }
      }
    }

  }
}
</style>
