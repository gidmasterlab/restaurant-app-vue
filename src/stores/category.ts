import { ref, type Ref } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import { getAllCategories } from "@/services/CategoryService";
import type { CategoryType } from "@/types/CategoryType";
import type { ResponseType } from "@/types/ResponseType";

export const useCategoryStore = defineStore("category", () => {
	const categories: Ref<CategoryType[]> = ref<CategoryType[]>([]);
	const preferredCategory: Ref<CategoryType> = ref<CategoryType>(null);
	const error: Ref<string> = ref<string>(null);

	async function loadCategories() {
		const response: ResponseType<CategoryType[]> = await getAllCategories();

		if (!response.success) {
			error.value = response.message;
			return;
		}

		categories.value = response.data;
	}

	async function setPreferredCategory(id: string) {
		preferredCategory.value = categories.value.find((category) => category.id === id);
	}

	return { categories, preferredCategory, loadCategories, setPreferredCategory };
});

// Enable hot module
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
