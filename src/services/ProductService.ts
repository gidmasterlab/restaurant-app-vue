import httpClient from "@/http";
import type { ResponseType } from "@/types/ResponseType";
import type { ProductType } from "@/types/ProductType";

export const getAllProducts = (): Promise<ResponseType<ProductType[]>> => {
  return httpClient.get("/products");
};

export const getSuggestedProducts = (): Promise<ResponseType<ProductType[]>> => {
  return httpClient.get("/suggested/products");
};

export const getProductBySlug = (slug: string): Promise<ResponseType<ProductType>> => {
  return httpClient.get(`/products/${slug}`);
};
