import { useSuspenseQuery } from '@tanstack/react-query';
import { userRepository } from '../../repositories/UserRepository';
import type { User } from '../../repositories/IUserRepository';

export const useUser = (id: number) => {
  return useSuspenseQuery<User>({
    queryKey: ['user', id],
    queryFn: () => userRepository.getUser(id),
    retry: 1, // Ky already has some retry logic
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
