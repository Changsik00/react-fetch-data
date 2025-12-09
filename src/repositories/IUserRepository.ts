export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export interface IUserRepository {
  getUser(id: number): Promise<User>;
}
