/**
 * DTO (Data Transfer Object) Definitions
 * Defines the shape of data returned by the API.
 * Source: https://jsonplaceholder.typicode.com
 */

export interface GeoDTO {
  lat: string;
  lng: string;
}

export interface AddressDTO {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoDTO;
}

export interface CompanyDTO {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserResponseDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressDTO;
  phone: string;
  website: string;
  company: CompanyDTO;
}

/**
 * API Endpoint Management
 * Centralizes all URL paths and request configurations.
 */
export const API = {
  USERS: {
    // Get single user details
    DETAIL: (id: number) => ({
      url: `users/${id}`,
      method: 'get' as const,
    }),
    // Get all users (if needed in future)
    LIST: () => ({
      url: `users`,
      method: 'get' as const,
    })
  },
  // Example for future endpoints
  POSTS: {
    LIST: () => ({
      url: `posts`,
      method: 'get' as const
    })
  }
} as const;
