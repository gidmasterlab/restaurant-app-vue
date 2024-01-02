import { ref, type Ref } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import type { ListType } from "@/types/ListType";

const SORT_LIST: ListType[] = [
	{
		id: "relevant",
		name: "relevant",
		icon: "sort"
	},
	{
		id: "alpha",
		name: "a-z",
		icon: "alpha"
	},
	{
		id: "price",
		name: "price",
		icon: "money"
	},
	{
		id: "calories",
		name: "calories",
		icon: "calories"
	},
	{
		id: "category",
		name: "category",
		icon: "category"
	},
	{
		id: "review",
		name: "review",
		icon: "star"
	}
];

const DEFAULT_SORT: ListType = SORT_LIST[0];

export const useMenuStore = defineStore("menu", () => {
	const sortList: Ref<ListType[]> = ref<ListType[]>(SORT_LIST);
	const preferredSort: Ref<ListType> = ref<ListType>(DEFAULT_SORT);
	const searchKeyword: Ref<string> = ref<string>(null);

	async function setPreferredSort(id: string) {
		preferredSort.value = SORT_LIST.find((item) => item.id === id) || DEFAULT_SORT;
	}

	async function setKeyword(word: string) {
		searchKeyword.value = word;
	}

	return {
		sortList,
		preferredSort,
		searchKeyword,
		setPreferredSort,
		setKeyword
	};
});

// Enable hot module
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot));
}
