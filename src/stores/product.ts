import { ref, type Ref } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import { getAllProducts, getProductBySlug, getSuggestedProducts } from "@/services/ProductService";
import type { ProductType } from "@/types/ProductType";
import type { ResponseType } from "@/types/ResponseType";

export const useProductStore = defineStore("product", () => {
	const preferredProduct: Ref<ProductType> = ref<ProductType>(null);
	const suggestedProducts: Ref<ProductType[]> = ref<ProductType[]>([]);
	const products: Ref<ProductType[]> = ref<ProductType[]>([]);
	const error: Ref<string> = ref<string>(null);

	async function loadProducts() {
		const response: ResponseType<ProductType[]> = await getAllProducts();

		if (!response.success) {
			error.value = response.message;
			return;
		}

		products.value = response.data;
	}

	async function loadPreferredProduct(slug: string) {
		const response: ResponseType<ProductType> = await getProductBySlug(slug);

		if (!response.success) {
			error.value = response.message;
			return;
		}

		preferredProduct.value = response.data;
	}

	async function loadSuggestedProducts() {
		const response: ResponseType<ProductType[]> = await getSuggestedProducts();

		if (!response.success) {
			error.value = response.message;
			return;
		}

		suggestedProducts.value = response.data;
	}

	return {
		preferredProduct,
		products,
		suggestedProducts,
		loadPreferredProduct,
		loadProducts,
		loadSuggestedProducts
	};
});

// Enable hot module
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
