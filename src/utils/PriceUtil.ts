import type { ProductType } from "@/types/ProductType";

const getAdditionalsCost = (product: ProductType): number => {
	return product.additionals.reduce(
		(accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
		0
	);
};

export const getProductCost = (product: ProductType): number => {
	const additional = getAdditionalsCost(product);
	return product.price + additional;
};

export const getPreviousProductCost = (product: ProductType): number => {
	const additional = getAdditionalsCost(product);
	const currentPrice = product.previousPrice > 0 ? product.previousPrice : product.price;
	return currentPrice + additional;
};

export const getAllProductsCost = (products: ProductType[]): number => {
	return products
		.map((product) => {
			return getProductCost(product);
		})
		.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

export const getAllPreviousProductsCost = (products: ProductType[]): number => {
	return products
		.map((product) => {
			return getPreviousProductCost(product);
		})
		.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

export const getAllProductsDiscount = (
	products: ProductType[],
	type: "number" | "percentage" = "number"
): number => {
	const discounts = products
		.filter((product) => product.previousPrice > 0)
		.map((product) => {
			return getProductCost(product) - getPreviousProductCost(product);
		})
		.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

	if (type === "percentage") {
		const total = getAllProductsCost(products);
		return Math.abs((discounts * 100) / total);
	}

	return discounts;
};

export const hasProductsDiscount = (products: ProductType[]): boolean => {
	return getAllPreviousProductsCost(products) > getAllProductsCost(products);
};
