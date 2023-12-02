// This file is used to make API requests to the server.
const BASE_URL = 'http://localhost:4444';

/**
 * Makes an HTTP request to the specified endpoint.
 *
 * @param {string} endpoint - The endpoint to request. This should start with a "/" and will be appended to the base URL.
 * @param {string} method - The HTTP method to use for the request (e.g., 'GET', 'POST', etc.).
 * @param {Object} [data=null] - The data to send with the request. This should be an object, which will be stringified to JSON. If this parameter is provided, the 'Content-Type' header will be set to 'application/json'.
 * @param {Object} [headers={}] - Any additional headers to include in the request. This should be an object where the keys are header names and the values are header values.
 * @param {boolean} [includeCredentials=false] - Whether to include credentials (cookies) with the request. If this is true, the 'credentials' option will be set to 'include'.
 *
 * @returns {Promise<Object>} A Promise that resolves with the response from the server, parsed as JSON.
*/
export function apiRequest(endpoint, method, data = null, headers = {}, includeCredentials = false) {
  const options = {
    method,
    headers: {
      ...headers,
      'Content-Type': data ? 'application/json' : 'text/plain',
    }
  };

  if (includeCredentials) {
    options.credentials = 'include';
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(`${BASE_URL}${endpoint}`, options).then(response => response.json());
}