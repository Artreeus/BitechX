import { apiClient } from "./client";

export interface AuthResponse {
  token: string;
}

export const authApi = {
  login: async (email: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth", { email });
    return response.data;
  },
};

