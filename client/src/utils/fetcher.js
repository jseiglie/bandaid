import validationUtils from "./validationUtils";

export const fetcher = async (endpoint, options = {}) => {
  try {
    const response = await fetch(import.meta.env.VITE_APP_API_URL+endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error at ${endpoint}! status: ${response.status}`);
    }
    validationUtils.validateJSONResponse(
      response.headers.get("Content-Type"),
      endpoint
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};
