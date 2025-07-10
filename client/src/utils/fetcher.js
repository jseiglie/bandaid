import { responseObject } from "./response";
import validationUtils from "./validationUtils";

export const fetcher = async (endpoint, options = {}) => {
  try {
    const response = await fetch(import.meta.env.VITE_APP_API_URL + endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: ['POST', 'PUT', 'DELETE'].includes(options.method)? `Bearer ${localStorage.getItem("token")}` : null,
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.log("Response not ok", response);
      const error = new Error(response.statusText);
      error.statusCode = response.status;
      error.success = false;
      error.data = null;
      throw error;
    }

    validationUtils.validateJSONResponse(
      response.headers.get("Content-Type"),
      endpoint
    );
    const data = await response.json();
    return responseObject(
      response.status,
      data.success,
      data.message,
      data.data
    );
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);

    // Return a proper response object with fallback values
    return responseObject(
      error.statusCode || 418,
      error.success || false,
      error.message || "Internal Server Error",
      error.data || null
    );
  }
};
