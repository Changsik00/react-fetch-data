import { useInfiniteQuery } from '@tanstack/react-query';
import { userRepository } from '../../repositories/UserRepository';

export function useUsersInfinite() {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite'],
    queryFn: ({ pageParam }) => userRepository.getUsers(pageParam, 5), // default limit 5
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Assuming 10 users total for now to stop infinite loop in mock
      // In real world, API would return 'nextPage' or 'total'
      const nextPage = allPages.length + 1;
      return lastPage.length > 0 ? nextPage : undefined;
    },
  });
}
