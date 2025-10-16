import { apiClient } from "./client";
import { Category } from "../features/categories/categoriesSlice";

export interface CategoriesParams {
  offset?: number;
  limit?: number;
}

export const categoriesApi = {
  getCategories: async (params?: CategoriesParams): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>("/categories", { params });
    return response.data;
  },

  searchCategories: async (searchedText: string): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>("/categories/search", {
      params: { searchedText },
    });
    return response.data;
  },
};

