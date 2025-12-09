import { useUser } from '../hooks/queries/useUser';

interface UserProfileProps {
  userId: number;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { data: user } = useUser(userId);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
      <h1>{user.name} ({user.username})</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      
      <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px'}}>
        <h3>Company</h3>
        <p>{user.company.name}</p>
        <p><i>"{user.company.catchPhrase}"</i></p>
      </div>

      <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px'}}>
        <h3>Address</h3>
        <p>{user.address.street}, {user.address.suite}</p>
        <p>{user.address.city}, {user.address.zipcode}</p>
      </div>

      <small style={{ color: '#666', display: 'block', marginTop: '10px' }}>User ID: {user.id}</small>
    </div>
  );
}
