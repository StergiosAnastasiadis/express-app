export type AuthUser = Pick<User, 'email' | 'password'>;
export type RegisterUser = Pick<User, 'email' | 'firstname' | 'lastname' | 'password'>;

export interface User {
  activation_token: string;
  active: boolean;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  password: string;
}
