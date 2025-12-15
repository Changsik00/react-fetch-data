import { describe, it, expect, beforeEach, vi } from 'vitest';
import { userRepository } from '../../repositories/UserRepository';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { APIError } from '../../api/errors';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('UserRepository', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('fetches user from API when local storage is empty', async () => {
    const user = await userRepository.getUser(1);
    
    expect(user.id).toBe(1);
    expect(user.name).toBe('Mocked User');
    expect(localStorage.getItem('user_1')).not.toBeNull();
  });

  it('returns data from Local Storage if available', async () => {
    // Pre-fill local storage
    const cachedUser = {
      id: 2,
      name: 'Cached User',
      username: 'cached',
      email: 'cached@example.com',
      address: { 
        street: 'st', suite: 'su', city: 'ci', zipcode: 'zip', 
        geo: { lat: '0', lng: '0' } 
      },
      phone: '000',
      website: 'web',
      company: { name: 'co', catchPhrase: 'cp', bs: 'bs' }
    };
    localStorage.setItem('user_2', JSON.stringify(cachedUser));

    // Mock user 2 in MSW to be different (Server User)
    server.use(
      http.get(`${BASE_URL}/users/2`, () => {
         return HttpResponse.json({ ...cachedUser, name: 'Server User' });
      })
    );

    const user = await userRepository.getUser(2);
    expect(user.name).toBe('Cached User'); // Should be cached one
  });

  it('throws APIError on 404', async () => {
    await expect(userRepository.getUser(99999))
      .rejects
      .toThrow(APIError);
  });
});
