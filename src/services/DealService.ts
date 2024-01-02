import httpClient from "@/http";
import type { ResponseType } from "@/types/ResponseType";
import type { ProductType } from "@/types/ProductType";

export const getProductsDeals = (): Promise<ResponseType<ProductType[]>> => {
  return httpClient.get("/deals");
};

export const getSpecialProducts = (): Promise<ResponseType<ProductType[]>> => {
  return httpClient.get("/deals/special");
};

export const getProductsExperience = (): Promise<ResponseType<ProductType[]>> => {
  return httpClient.get("/deals/experience");
};

export const getDailyProduct = (): Promise<ResponseType<ProductType>> => {
  return httpClient.get("/deals/daily");
};

export const getHighlightedProduct = (): Promise<ResponseType<ProductType>> => {
  return httpClient.get("/deals/highlighted");
};
