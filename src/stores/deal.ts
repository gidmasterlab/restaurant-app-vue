import { ref, type Ref } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import type { ProductType } from "@/types/ProductType";
import type { ResponseType } from "@/types/ResponseType";
import {
	getSpecialProducts,
	getProductsDeals,
	getProductsExperience
} from "@/services/DealService";

export const useDealStore = defineStore("deal", () => {
	const specialProducts: Ref<ProductType[]> = ref<ProductType[]>([]);
	const productsDeals: Ref<ProductType[]> = ref<ProductType[]>([]);
	const productsExperience: Ref<ProductType[]> = ref<ProductType[]>([]);
	const error: Ref<string> = ref<string>(null);

	async function loadSpecialProducts() {
		const response: ResponseType<ProductType[]> = await getSpecialProducts();

		if (!response.success) {
			error.value = response.message;
			return;
		}

		specialProducts.value = response.data;
	}

	async function loadProductsDeals() {
		const response: ResponseType<ProductType[]> = await getProductsDeals();

		if (!response.success) {
			error.value = response.message;
			return;
		}

		productsDeals.value = response.data;
	}

	async function loadProductsExperience() {
		const response: ResponseType<ProductType[]> = await getProductsExperience();

		if (!response.success) {
			error.value = response.message;
			return;
		}

		productsExperience.value = response.data;
	}

	return {
		specialProducts,
		productsDeals,
		productsExperience,
		loadSpecialProducts,
		loadProductsDeals,
		loadProductsExperience
	};
});

// Enable hot module
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useDealStore, import.meta.hot));
}
