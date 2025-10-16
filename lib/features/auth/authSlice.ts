import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  email: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; email: string }>
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      
      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email", action.payload.email);
      }
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
      
      // Remove from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
      }
    },
    initializeAuth: (state) => {
      // Check localStorage on initialization
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        
        if (token && email) {
          state.token = token;
          state.email = email;
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;

