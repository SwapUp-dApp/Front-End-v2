import axios from "axios";
import { Environment } from "@/config";

const API = axios.create({
  baseURL: Environment.API_BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

// Adding token to headers for later use

// API.interceptors.request.use(config => {
//   try {
//     const accessToken = getData("access-token");
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   } catch (error) {
//     console.error("Error in Request Interceptor:", error);
//     return config;
//   }
// });

API.interceptors.response.use(
  response => response,
  error => {
    console.log(
      "Error in Response Interceptor:",
      JSON.stringify(error?.response || error?.message),
    );
    return Promise.resolve(error);
  }
);

export default API;
