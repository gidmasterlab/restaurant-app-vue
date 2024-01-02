import httpClient from "@/http";
import type { ResponseType } from "@/types/ResponseType";
import type { CategoryType } from "@/types/CategoryType";

export const getAllCategories = (): Promise<ResponseType<CategoryType[]>> => {
  return httpClient.get("/categories");
};
