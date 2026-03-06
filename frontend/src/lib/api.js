import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://marketnest-api-y3k7.onrender.com",
  timeout: 20000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Refresh token is cookie-based; only auth endpoints need credentials.
  if (config.url?.startsWith("/api/auth")) {
    config.withCredentials = true;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (
      status === 401 &&
      !originalRequest?._retry &&
      !originalRequest?.url?.includes("/api/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await api.post("/api/auth/refresh");
        const newAccessToken = refreshRes.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (_refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
