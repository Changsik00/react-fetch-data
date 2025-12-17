import { z } from 'zod';

/**
 * DTO (Data Transfer Object) Schemas
 * Defines the shape of data returned by the API using Zod for runtime validation.
 * Source: https://jsonplaceholder.typicode.com
 */

export const GeoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});
export type GeoDTO = z.infer<typeof GeoSchema>;

export const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: GeoSchema,
});
export type AddressDTO = z.infer<typeof AddressSchema>;

export const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});
export type CompanyDTO = z.infer<typeof CompanySchema>;

export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(), // Added email validation
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: CompanySchema,
});
export type UserResponseDTO = z.infer<typeof UserResponseSchema>;
export const UserListResponseSchema = z.array(UserResponseSchema);

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
    // Get paginated users
    LIST: (page: number = 1, limit: number = 5) => ({
      url: `users?_page=${page}&_limit=${limit}`,
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
