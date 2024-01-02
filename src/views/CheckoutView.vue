<template>
  <div class="main">
    <Section class="ignore-on-mobile" :accent="true">
      <CheckoutHero />
    </Section>

    <Section>
      <CheckoutLayout>
        <template #products>
          <CheckoutProductsList :products="checkoutProducts">
            <CheckoutProduct
              v-for="product of checkoutProducts"
              :key="product.id"
              :product="product"
              @remove-product-click="removeProductFromCart" />
          </CheckoutProductsList>
        </template>

        <template #summary>
          <CheckoutSummary :products="checkoutProducts" />

          <CheckoutDelivery
            v-if="checkoutState === 'delivery'"
            :checkoutDelivery="checkoutDelivery"
            @delivery-submit="deliverySubmitted" />

          <CheckoutPayment
            v-if="checkoutState === 'payment'"
            :checkoutPayment="checkoutPayment"
            @payment-submit="paymentSubmitted"
            @update-delivery-click="updateDeliveryClicked" />
        </template>
      </CheckoutLayout>
    </Section>

    <Modal :show="confirm" :lock="processing || processed" @close-click="paymentAborted">
      <CheckoutProcessing
        v-if="processing || processed"
        :processed="processed"
        @finalize-checkout-click="finalizeCheckoutClicked" />

      <CheckoutComplete
        v-if="!processing && !processed"
        :products="checkoutProducts"
        :checkoutDelivery="checkoutDelivery"
        :checkoutPayment="checkoutPayment"
        @complete-purchase-click="completePurchaseClicked"
        @cancel-purchase-click="cancelPurchaseClicked" />
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, type Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCheckoutStore } from "@/stores/checkout";
import type { CheckoutDeliveryType, CheckoutPaymentType } from "@/types/CheckoutType";
import Modal from "@/components/shared/Modal.vue";
import Section from "@/components/template/Section.vue";
import CheckoutHero from "@/components/checkout/CheckoutHero.vue";
import CheckoutLayout from "@/components/checkout/CheckoutLayout.vue";
import CheckoutProductsList from "@/components/checkout/CheckoutProductsList.vue";
import CheckoutProduct from "@/components/checkout/CheckoutProduct.vue";
import CheckoutSummary from "@/components/checkout/CheckoutSummary.vue";
import CheckoutDelivery from "@/components/checkout/CheckoutDelivery.vue";
import CheckoutPayment from "@/components/checkout/CheckoutPayment.vue";
import CheckoutComplete from "@/components/checkout/CheckoutComplete.vue";
import CheckoutProcessing from "@/components/checkout/CheckoutProcessing.vue";


export default defineComponent({
  name: "CheckoutView",
  components: {
    Modal,
    Section,
    CheckoutHero,
    CheckoutLayout,
    CheckoutProductsList,
    CheckoutProduct,
    CheckoutSummary,
    CheckoutDelivery,
    CheckoutPayment,
    CheckoutComplete,
    CheckoutProcessing
  },
  setup() {

    const router = useRouter()
    const confirm: Ref<boolean> = ref<boolean>(false);
    const checkoutStore = useCheckoutStore();

    const {
      checkoutState,
      checkoutDelivery,
      checkoutPayment,
      checkoutProducts,
      checkoutQuantity,
      processing,
      processed } = storeToRefs(checkoutStore);

    const {
      removeProductFromCart,
      setCheckoutDelivery,
      setCheckoutPayment,
      changeCheckoutState,
      completePurchase,
      finalizeCheckout } = checkoutStore;

    const deliverySubmitted = (delivery: CheckoutDeliveryType) => {
      setCheckoutDelivery(delivery);
      changeCheckoutState('payment');
    }

    const paymentSubmitted = (payment: CheckoutPaymentType) => {
      setCheckoutPayment(payment)
      confirm.value = true;
    }

    const paymentAborted = () => {
      confirm.value = false;
    }

    const updateDeliveryClicked = () => {
      changeCheckoutState('delivery');
    }

    const cancelPurchaseClicked = () => {
      confirm.value = false;
    }

    const completePurchaseClicked = () => {
      completePurchase();
    }

    const finalizeCheckoutClicked = () => {
      confirm.value = false

      setTimeout(() => {
        finalizeCheckout();
      }, 200);
    }

    watch(
      () => checkoutQuantity.value,
      () => {
        if (checkoutQuantity.value === 0) {
          router.push('/menu')
        }
      }
    )

    return {
      confirm,
      processing,
      processed,
      checkoutState,
      checkoutDelivery,
      checkoutPayment,
      checkoutProducts,
      removeProductFromCart,
      deliverySubmitted,
      paymentSubmitted,
      paymentAborted,
      updateDeliveryClicked,
      cancelPurchaseClicked,
      completePurchaseClicked,
      finalizeCheckoutClicked
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
