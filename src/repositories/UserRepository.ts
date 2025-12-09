import { apiClient } from '../api/client';
import type { IUserRepository, User } from './IUserRepository';
import { API, UserResponseSchema } from '../api/endpoints';

export class UserRepository implements IUserRepository {
  async getUser(id: number): Promise<User> {
    const cacheKey = `user_${id}`;
    
    // 1. Try to get from Local Storage
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      console.log(`[Repository] Fetching user ${id} from Local Storage`);
      // Optional: Validation for local data to ensure integrity
      const parsed = JSON.parse(cachedData);
      return UserResponseSchema.parse(parsed);
    }

    // 2. Fallback to API (Remote)
    const endpoint = API.USERS.DETAIL(id);
    console.log(`[Repository] Fetching user ${id} from Remote API: ${endpoint.url}`);
    
    const rawData = await apiClient.get(endpoint.url).json();
    
    // 3. Validation
    const user = UserResponseSchema.parse(rawData);

    // 4. Save to Local Storage
    try {
        localStorage.setItem(cacheKey, JSON.stringify(user));
    } catch (e) {
        console.error("Failed to save to local storage", e);
    }

    return user;
  }
}

export const userRepository = new UserRepository();
