import axios, { AxiosError } from "axios";
import { Alert, Platform, ToastAndroid } from "react-native";

// Base URL fallback
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "parth-patel-portfolio-app/1.0.0",
  },
});

// Helper: show error message cross-platform
const showToast = (message: string) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("Error", message);
  }
};

// Global interceptor for errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    let message = "Something went wrong.";

    if (error.code === "ECONNABORTED") {
      message = "Request timeout. Please try again.";
    } else if (!error.response) {
      message = "Network error. Please check your internet connection.";
    } else {
      const status = error.response.status;

      if (status >= 500) {
        message = "Server is down. Try again later.";
      } else if (status === 404) {
        message = "Requested resource not found.";
      } else {
        message =
          (error.response.data as any)?.error ||
          (error.response.data as any)?.message ||
          error.message;
      }
    }

    showToast(message);
    return Promise.reject(error);
  }
);

export default api;
