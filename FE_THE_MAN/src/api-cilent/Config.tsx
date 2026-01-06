import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const { token } = JSON.parse(localStorage.getItem("user") ?? "{}");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Do something before request is sent
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor

export default instance;
