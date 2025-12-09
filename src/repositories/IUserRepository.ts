import type { UserResponseDTO } from '../api/endpoints';

// We can map DTO to a Domain Entity if needed, 
// but for this project, we'll use the DTO as the primary User type.
export type User = UserResponseDTO;

export interface IUserRepository {
  getUser(id: number): Promise<User>;
}
