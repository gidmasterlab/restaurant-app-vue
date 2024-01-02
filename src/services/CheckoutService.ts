import httpClient from "@/http";
import type { ResponseType } from "@/types/ResponseType";
import type { ProductType } from "@/types/ProductType";

export const checkoutCompletePurchase = (products: ProductType[]): Promise<ResponseType<void>> => {
	return httpClient.post("/purchase", products);
};
