<template>
  <form class="payment" @submit.prevent="paymentSubmitted">
    <span class="title large">Payment Details</span>

    <div class="form-content">
      <Controller>
        <Input
          id="holderName"
          placeholder="Name on Card"
          label="Name on Card"
          v-model="paymentModel.holderName.$model"
          :error="paymentModel.holderName.$invalid && paymentModel.holderName.$dirty"
          :message="errorMessage(paymentModel.holderName.$errors)" />
      </Controller>

      <Controller>
        <Input
          id="cardNumber"
          placeholder="Card Number"
          label="Card Number"
          mask="####-####-####-####"
          v-model="paymentModel.cardNumber.$model"
          :error="paymentModel.cardNumber.$invalid && paymentModel.cardNumber.$dirty"
          :message="errorMessage(paymentModel.cardNumber.$errors)" />
      </Controller>

      <Controller :half="true">
        <Input
          id="expiryDate"
          placeholder="Expiry Date"
          label="Expiry Date"
          mask="##/##"
          maxlength="5"
          v-model="paymentModel.expiryDate.$model"
          :error="paymentModel.expiryDate.$invalid && paymentModel.expiryDate.$dirty"
          :message="errorMessage(paymentModel.expiryDate.$errors)" />
      </Controller>

      <Controller :half="true">
        <Input
          id="cvv"
          placeholder="CVV"
          label="CVV"
          maxlength="4"
          mask="####"
          v-model="paymentModel.cvv.$model"
          :error="paymentModel.cvv.$invalid && paymentModel.cvv.$dirty"
          :message="errorMessage(paymentModel.cvv.$errors)" />
      </Controller>
    </div>

    <Button type="submit" class="payment-button" icon="checkout" model="standard">
      complete payment
    </Button>

    <Button model="link" @click="updateDeliveryClicked">
      update delivery address
    </Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, type PropType, type Ref } from "vue";
import type { CheckoutPaymentType } from "@/types/CheckoutType";
import Button from "@/components/shared/buttons/Button.vue";
import Controller from "@/components/shared/Controller.vue";
import Input from "@/components/shared/Input.vue";
import { required, maxLength, numeric } from "@vuelidate/validators";
import useVuelidate, { type Validation } from "@vuelidate/core";


export default defineComponent({
  name: "CheckoutPayment",
  props: {
    checkoutPayment: Object as PropType<CheckoutPaymentType>
  },
  components: {
    Button,
    Controller,
    Input
  },
  setup(props, { emit }) {

    const paymentState = reactive<CheckoutPaymentType>({
      holderName: props.checkoutPayment.holderName,
      cardNumber: props.checkoutPayment.cardNumber,
      expiryDate: props.checkoutPayment.expiryDate,
      cvv: props.checkoutPayment.cvv,
    });

    const paymentRules = {
      holderName: { required },
      cardNumber: { required, maxLength: maxLength(19) },
      expiryDate: { required, maxLength: maxLength(5) },
      cvv: { required, maxLength: maxLength(4), numeric }
    }

    const paymentModel: Ref<Validation> = useVuelidate(paymentRules, paymentState);

    const paymentSubmitted = async () => {
      const valid: boolean = await paymentModel.value.$validate();

      if (valid) {
        emit('payment-submit', { ...paymentState })
      }
    }

    const errorMessage = (errors: any[]): string => {
      return errors.length > 0 ? errors[0].$message : null
    }

    const updateDeliveryClicked = (event: Event) => {
      event.preventDefault();
      emit('update-delivery-click')
    }


    return {
      paymentModel,
      paymentSubmitted,
      updateDeliveryClicked,
      errorMessage
    }
  },
});
</script>

<style lang="scss" scoped>
.payment {
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

  .payment-button {
    width: 100%;
  }

  @include mediaQuery($breakpoint-mobile) {
    //
  }
}
</style>
