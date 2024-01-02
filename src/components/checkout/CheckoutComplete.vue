<template>
    <div class="complete">

        <div class="block">
            <span class="title large">Order Summary</span>

            <div class="content">
                <Controller :half="true" label="Order Total">
                    <span>
                        <small class="cut" v-if="hasDiscount">
                            {{ formatCurrency(previousCost) }}
                        </small>
                        {{ formatCurrency(productsCost) }}
                    </span>
                </Controller>
                <Controller :half="true" label="Discount">
                    <span>{{ formatCurrency(discount) }}</span>
                </Controller>
            </div>
        </div>

        <div class="divider" />


        <div class="block">
            <span class="title large">Delivery Details</span>

            <div class="content">
                <Controller :half="true" label="Street Address">
                    <span>{{ checkoutDelivery?.address }}</span>
                </Controller>

                <Controller :half="true" label="City">
                    <span>{{ checkoutDelivery?.city }}</span>
                </Controller>

                <Controller :half="true" label="State">
                    <span>{{ checkoutDelivery?.state }}</span>
                </Controller>

                <Controller :half="true" label="Zip code">
                    <span>{{ checkoutDelivery?.zipcode }}</span>
                </Controller>
            </div>
        </div>

        <div class="divider" />

        <div class="block">
            <span class="title large">Payment Details</span>

            <div class="content">
                <Controller :half="true" label="Name on Card">
                    <span>{{ checkoutPayment?.holderName }}</span>
                </Controller>

                <Controller :half="true" label="Card Number">
                    <span>{{ checkoutPayment?.cardNumber }}</span>
                </Controller>

                <Controller :half="true" label="Expiry Date">
                    <span>{{ checkoutPayment?.expiryDate }}</span>
                </Controller>

                <Controller :half="true" label="CVV">
                    <span>{{ checkoutPayment?.cvv }}</span>
                </Controller>
            </div>
        </div>

        <div class="divider" />

        <div class="actions">
            <Button :disabled="processing" model="standard" @click="completePurchaseClicked">
                confirm and pay
            </Button>

            <Button :disabled="processing" model="flat" @click="cancelPurchaseClicked">
                cancel
            </Button>
        </div>

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, type ComputedRef, type PropType } from "vue";
import type { CheckoutDeliveryType, CheckoutPaymentType } from "@/types/CheckoutType";
import type { ProductType } from "@/types/ProductType";
import { formatCurrency } from "@/utils/FormatUtil";
import { getAllPreviousProductsCost, getAllProductsCost, getAllProductsDiscount, hasProductsDiscount } from "@/utils/PriceUtil";
import Button from "@/components/shared/buttons/Button.vue";
import Controller from "@/components/shared/Controller.vue";


export default defineComponent({
    name: "CheckoutComplete",
    props: {
        processing: Boolean,
        products: Array as PropType<ProductType[]>,
        checkoutDelivery: Object as PropType<CheckoutDeliveryType>,
        checkoutPayment: Object as PropType<CheckoutPaymentType>
    },
    components: {
        Button,
        Controller
    },
    setup(props, { emit }) {

        const productsCost: ComputedRef<number> = computed<number>(() => getAllProductsCost(props.products));
        const previousCost: ComputedRef<number> = computed<number>(() => getAllPreviousProductsCost(props.products));
        const discount: ComputedRef<number> = computed<number>(() => getAllProductsDiscount(props.products));
        const hasDiscount: ComputedRef<boolean> = computed<boolean>(() => hasProductsDiscount(props.products));

        const completePurchaseClicked = () => {
            emit('complete-purchase-click')
        }

        const cancelPurchaseClicked = () => {
            emit('cancel-purchase-click')
        }

        return {
            productsCost,
            previousCost,
            discount,
            hasDiscount,
            formatCurrency,
            completePurchaseClicked,
            cancelPurchaseClicked
        }
    },
});
</script>

<style lang="scss" scoped>
.complete {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $gap-desktop;

    .title {
        color: $text-primary;
        font-weight: 500;
    }

    .divider {
        width: 100%;
        height: 1px;
        background-color: $divider;
    }

    .block {
        display: flex;
        flex-direction: column;
        gap: $controller-gap;

        .content {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: $controller-gap;

            span {
                color: $text-primary;

                .cut {
                    color: $text-secondary;
                    text-decoration: line-through;
                }
            }
        }
    }

    .actions {
        display: flex;
        justify-content: space-between;
    }

    @include mediaQuery($breakpoint-mobile) {
        gap: $gap-mobile;

        .actions {
            button {
                width: 100%;
            }

            :not(:first-child) {
                display: none;
            }
        }
    }
}
</style>