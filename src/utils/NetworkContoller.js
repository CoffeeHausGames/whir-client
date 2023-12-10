// This file is used to make API requests to the server.
const BASE_URL = 'http://localhost:4444';
const VERSION = '/v1';

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
// TODO probably don't need includeCredentials as we could include them every time with no issues not sure what the standard is here
export function apiRequest(endpoint, method, data = null, headers = {}, includeCredentials = false) {
  // Check cookie-consent in local storage
  let cookieConsent = 'false'; // Default to 'false'

  //TODO This needs to be set for when it is not localhost to localhost
  // if (typeof localStorage !== 'undefined') {
  //   cookieConsent = localStorage.getItem('cookie-consent');
  // }

  const options = {
    method,
    headers: {
      ...headers,
      'Content-Type': data ? 'application/json' : 'text/plain',
      'Cookie-Consent': cookieConsent, // Add cookieConsent to headers
    }
  };

  if (includeCredentials && cookieConsent !== 'false') {
    console.log("include creds")
    options.credentials = 'include';
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(`${BASE_URL}${VERSION}${endpoint}`, options)
    .then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json().then(data => ({
        data: data.data,
        status: response.status,
        ok: response.ok,
        auth_token: response.headers.get('X-Auth-Token'),
        refresh_token: response.headers.get('X-Refresh-Token'),
      }));
    });
}

export function apiRequestWithAuthRetry(endpoint, method, data = null, headers = {}, token = null) {
  return apiRequest(endpoint, method, data, headers, true)
    .catch((error) => {
      // If the status code indicates an authentication issue, retry with the authentication header
      if (error.status >= 401 && error.status <= 403) {
        if (!token) {
          console.error('Business user authentication token not found.');
          return;
        }

        headers.Authorization = `${token}`;
        console.log(token)

        return apiRequest(endpoint, method, data, headers, false);
      }
    });
}