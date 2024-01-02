import { computed, ref, type ComputedRef, type Ref } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import { checkoutCompletePurchase } from "@/services/CheckoutService";
import type { ProductType } from "@/types/ProductType";
import type { ResponseType } from "@/types/ResponseType";
import type {
	CheckoutStateType,
	CheckoutDeliveryType,
	CheckoutPaymentType
} from "@/types/CheckoutType";

const DEFAULT_DELIVERY: CheckoutDeliveryType = {
	address: null,
	city: null,
	state: null,
	zipcode: null
};

const DEFAULT_PAYMENT: CheckoutPaymentType = {
	holderName: null,
	cardNumber: null,
	expiryDate: null,
	cvv: null
};

export const useCheckoutStore = defineStore("checkout", () => {
	const checkoutState: Ref<CheckoutStateType> = ref<CheckoutStateType>("delivery");
	const checkoutProducts: Ref<ProductType[]> = ref<ProductType[]>([]);
	const checkoutDelivery: Ref<CheckoutDeliveryType> = ref<CheckoutDeliveryType>(DEFAULT_DELIVERY);
	const checkoutPayment: Ref<CheckoutPaymentType> = ref<CheckoutPaymentType>(DEFAULT_PAYMENT);
	const processing: Ref<boolean> = ref<boolean>(false);
	const processed: Ref<boolean> = ref<boolean>(false);
	const error: Ref<string> = ref<string>(null);

	const checkoutQuantity: ComputedRef<number> = computed<number>(
		() => checkoutProducts.value.length
	);

	async function addProductToCart(product: ProductType) {
		checkoutProducts.value = [...checkoutProducts.value, product];
	}

	async function removeProductFromCart(id: string) {
		checkoutProducts.value = checkoutProducts.value.filter((product) => product.id !== id);
	}

	async function completePurchase() {
		processing.value = true;
		const response: ResponseType<void> = await checkoutCompletePurchase(checkoutProducts.value);

		if (!response.success) {
			error.value = response.message;
			processing.value = false;
			return;
		}

		processing.value = false;
		processed.value = true;
	}

	async function finalizeCheckout() {
		checkoutProducts.value = [];
		checkoutState.value = "delivery";
		processed.value = false;
	}

	async function setCheckoutDelivery(delivery: CheckoutDeliveryType) {
		checkoutDelivery.value = delivery;
	}

	async function setCheckoutPayment(payment: CheckoutPaymentType) {
		checkoutPayment.value = payment;
	}

	async function changeCheckoutState(state: CheckoutStateType) {
		checkoutState.value = state;
	}

	return {
		processing,
		processed,
		error,
		checkoutState,
		checkoutDelivery,
		checkoutPayment,
		checkoutProducts,
		checkoutQuantity,
		changeCheckoutState,
		setCheckoutDelivery,
		setCheckoutPayment,
		addProductToCart,
		removeProductFromCart,
		completePurchase,
		finalizeCheckout
	};
});

// Enable hot module
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCheckoutStore, import.meta.hot));
}
