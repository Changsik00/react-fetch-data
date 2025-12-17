import { useUsersInfinite } from '../hooks/queries/useUsersInfinite';

export function UserList() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useUsersInfinite();

  if (status === 'pending') return <div>Loading users...</div>;
  if (status === 'error') return <div>Error fetching users: {error.message}</div>;

  return (
    <div style={{ marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
      <h3>User List (Infinite Scroll)</h3>
        {data.pages.map((group, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {group.map((user) => (
              <div key={user.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
                <strong>{user.name}</strong><br/>
                <small>{user.email}</small>
              </div>
            ))}
          </div>
        ))}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
}
