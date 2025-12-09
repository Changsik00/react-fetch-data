import ky from 'ky';
import { APIError, NetworkError, TimeoutError } from './errors';

const BASE_URL = 'https://jsonplaceholder.typicode.com'; // Placeholder, easy to change

export const apiClient = ky.create({
  prefixUrl: BASE_URL,
  timeout: 10000, // 10s timeout
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;
        
        // Handle Timeout
        if (error.name === 'TimeoutError') {
          throw new TimeoutError();
        }

        // Handle Network Error (fetch failed)
        // Ky wraps fetch errors. If response is undefined, it's likely a network error.
        if (!response) {
            throw new NetworkError(error.message);
        }

        // Handle HTTP Errors
        if (response) {
          let data;
          try {
            data = await response.json();
          } catch {
             // fallback if not json
             data = await response.text();
          }

          throw new APIError(
            response.status,
            response.statusText,
            data
          );
        }

        throw error;
      },
    ],
  },
});
