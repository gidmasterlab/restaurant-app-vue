import type { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import type { ResponseType } from "@/types/ResponseType";
import type { CategoryType } from "@/types/CategoryType";
import type { ProductType } from "@/types/ProductType";

import { PRODUCTS_MOCK } from "./ProductMock";
import { CATEGORIES_MOCK } from "./CategoryMock";

const SuccessResponse = <T>(data: T): ResponseType<T> => {
	return {
		success: true,
		message: null,
		data: data
	};
};

const ErrorResponse = (message: string): ResponseType<string> => {
	return {
		success: false,
		message: message,
		data: null
	};
};

const ShuffedData = <T>(data: T[], quantity: number) => {
	const shuffledArray = data.sort(() => Math.random() - 0.5);
	return shuffledArray.slice(0, quantity);
};

const GetProductsBySlugs = (slugs: string[]): ProductType[] => {
	const products = PRODUCTS_MOCK.filter((product) => slugs.includes(product.slug));
	return products.sort((a, b) => a.order - b.order);
};

const useMock = (httpClient: AxiosInstance) => {
	const mock = new MockAdapter(httpClient);

	// Get all categories
	mock.onGet("/categories").reply(() => {
		const response: ResponseType<CategoryType[]> = SuccessResponse(CATEGORIES_MOCK);
		return [200, response];
	});

	// Get all products
	mock.onGet("/products").reply(() => {
		const response: ResponseType<ProductType[]> = SuccessResponse(PRODUCTS_MOCK);
		return [200, response];
	});

	mock.onGet("/suggested/products").reply(() => {
		const products: ProductType[] = ShuffedData(PRODUCTS_MOCK, 4);
		const response: ResponseType<ProductType[]> = SuccessResponse(products);
		return [200, response];
	});

	// Get product by sku and treat not found
	mock.onGet(/products\/?.*/).reply((config) => {
		const slug: string = config.url.split("/").pop();
		const product: ProductType = PRODUCTS_MOCK.find((product) => product.slug === slug);
		const response: ResponseType<ProductType> = SuccessResponse(product);
		const error: ResponseType<string> = ErrorResponse(`Product ${slug} not found`);

		if (product) {
			return [200, response];
		}

		return [404, error];
	});

	// Get all special products
	mock.onGet("/deals/special").reply(() => {
		const slugs = ["chocolate-cake", "fried-chicken", "tofu-mushroom", "hump-steak"];
		const products: ProductType[] = GetProductsBySlugs(slugs);
		const response: ResponseType<ProductType[]> = SuccessResponse(products);
		return [200, response];
	});

	// Get 4 random products as deals
	mock.onGet("/deals").reply(() => {
		const slugs = ["portobello-mushroom", "acai-smoothie", "eggplant-lasagna", "pasta-salad"];
		const products: ProductType[] = GetProductsBySlugs(slugs);
		const response: ResponseType<ProductType[]> = SuccessResponse(products);
		return [200, response];
	});

	// Get 4 random products as experience
	mock.onGet("/deals/experience").reply(() => {
		// const products: ProductType[] = ShuffedData(PRODUCTS_MOCK, 4);
		const slugs = ["chilli-prawn-linguine", "cheesecake", "egg-sandwich", "summer-radish"];
		const products: ProductType[] = GetProductsBySlugs(slugs);
		const response: ResponseType<ProductType[]> = SuccessResponse(products);
		return [200, response];
	});

	// Adding delay to simulate purchase
	mock.onPost("/purchase").reply(() => {
		const response: ResponseType<ProductType[]> = SuccessResponse(null);
		const delay = 3000;

		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve([200, response]);
			}, delay);
		});
	});

	return httpClient;
};

export default useMock;
