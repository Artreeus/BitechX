import { apiClient } from "./client";
import { Product } from "../features/products/productsSlice";

export interface CreateProductData {
  name: string;
  description: string;
  images: string[];
  price: number;
  categoryId: string;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  images?: string[];
  price?: number;
  categoryId?: string;
}

export interface ProductsParams {
  offset?: number;
  limit?: number;
  categoryId?: string;
}

export const productsApi = {
  getProducts: async (params?: ProductsParams): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/products", { params });
    return response.data;
  },

  searchProducts: async (searchedText: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/products/search", {
      params: { searchedText },
    });
    return response.data;
  },

  getProductBySlug: async (slug: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${slug}`);
    return response.data;
  },

  createProduct: async (data: CreateProductData): Promise<Product> => {
    const response = await apiClient.post<Product>("/products", data);
    return response.data;
  },

  updateProduct: async (
    id: string,
    data: UpdateProductData
  ): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.delete<Product>(`/products/${id}`);
    return response.data;
  },
};

