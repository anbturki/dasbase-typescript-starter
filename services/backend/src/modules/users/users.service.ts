import { Service } from 'typedi';

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Service()
export class UsersService {
  private users: IUser[] = [];

  public create(user: IUser): IUser {
    const newuUser = { ...user, id: this.users.length + 1 };
    this.users.push(newuUser);
    return newuUser;
  }

  public findAll(): IUser[] {
    return this.users;
  }

  public findOne(id: number): IUser {
    return this.users.find((user) => user.id === id) as IUser;
  }
}

export default new UsersService();
