<template>
  <form class="delivery" @submit.prevent="deliverySubmitted">
    <span class="title large">Delivery Details</span>

    <div class="form-content">
      <Controller>
        <Input
          id="address"
          placeholder="Street Address"
          label="Street Address"
          v-model="deliveryModel.address.$model"
          :error="deliveryModel.address.$invalid && deliveryModel.address.$dirty"
          :message="errorMessage(deliveryModel.address.$errors)" />
      </Controller>

      <Controller>
        <Input
          id="city"
          placeholder="City"
          label="City"
          v-model="deliveryModel.city.$model"
          :error="deliveryModel.city.$invalid && deliveryModel.city.$dirty"
          :message="errorMessage(deliveryModel.city.$errors)" />
      </Controller>

      <Controller :half="true">
        <Input
          id="state"
          placeholder="State"
          label="State"
          v-model="deliveryModel.state.$model"
          :error="deliveryModel.state.$invalid && deliveryModel.state.$dirty"
          :message="errorMessage(deliveryModel.state.$errors)" />
      </Controller>

      <Controller :half="true">
        <Input
          id="zipcode"
          placeholder="Zip Code"
          label="Zip Code"
          maxlength="4"
          mask="####"
          v-model="deliveryModel.zipcode.$model"
          :error="deliveryModel.zipcode.$invalid && deliveryModel.zipcode.$dirty"
          :message="errorMessage(deliveryModel.zipcode.$errors)" />
      </Controller>
    </div>

    <Button type="submit" class="delivery-button" icon="home" model="standard">
      confirm your address
    </Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, type PropType, type Ref } from "vue";
import type { CheckoutDeliveryType } from "@/types/CheckoutType";
import Button from "@/components/shared/buttons/Button.vue";
import Controller from "@/components/shared/Controller.vue";
import Input from "@/components/shared/Input.vue";
import { required, maxLength, numeric } from "@vuelidate/validators";
import useVuelidate, { type Validation } from "@vuelidate/core";


export default defineComponent({
  name: "CheckoutDelivery",
  props: {
    checkoutDelivery: Object as PropType<CheckoutDeliveryType>
  },
  components: {
    Button,
    Controller,
    Input
  },
  setup(props, { emit }) {

    const deliveryState = reactive<CheckoutDeliveryType>({
      address: props.checkoutDelivery.address,
      city: props.checkoutDelivery.city,
      state: props.checkoutDelivery.state,
      zipcode: props.checkoutDelivery.zipcode
    });

    const deliveryRules = {
      address: { required },
      city: { required },
      state: { required },
      zipcode: { required, maxLength: maxLength(5), numeric }
    }

    const deliveryModel: Ref<Validation> = useVuelidate(deliveryRules, deliveryState);

    const deliverySubmitted = async () => {
      const valid: boolean = await deliveryModel.value.$validate();

      if (valid) {
        emit('delivery-submit', { ...deliveryState })
      }
    }

    const errorMessage = (errors: any[]): string => {
      return errors.length > 0 ? errors[0].$message : null
    }

    return {
      deliveryModel,
      deliverySubmitted,
      errorMessage
    }
  },
});
</script>

<style lang="scss" scoped>
.delivery {
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: $background-primary;
  border: 1px solid $divider;
  border-radius: $controller-radius;
  padding: $controller-padding;
  gap: $gap-desktop;

  .title {
    color: $text-primary;
  }

  .form-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: $controller-gap;
  }

  .delivery-button {
    width: 100%;
  }

  @include mediaQuery($breakpoint-mobile) {
    //
  }
}
</style>
