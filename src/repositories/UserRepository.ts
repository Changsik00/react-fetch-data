import { apiClient } from '../api/client';
import type { IUserRepository, User } from './IUserRepository';

export class UserRepository implements IUserRepository {
  async getUser(id: number): Promise<User> {
    const cacheKey = `user_${id}`;
    
    // 1. Try to get from Local Storage
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      console.log(`[Repository] Fetching user ${id} from Local Storage`);
      // Simulate async delay to show Suspense if strictly needed, 
      // but usually local is fast. We return immediately.
      // However, to ensure interface consistency:
      return JSON.parse(cachedData);
    }

    // 2. Fallback to API (Remote)
    console.log(`[Repository] Fetching user ${id} from Remote API`);
    const user = await apiClient.get(`users/${id}`).json<User>();

    // 3. Save to Local Storage
    try {
        localStorage.setItem(cacheKey, JSON.stringify(user));
    } catch (e) {
        console.error("Failed to save to local storage", e);
    }

    return user;
  }
}

export const userRepository = new UserRepository();
