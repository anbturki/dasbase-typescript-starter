import { CreateUserInput, User } from '@graphtypes';
import { Service } from 'typedi';
import usersRepository from './users.repository';

@Service()
export class UsersService {
  private users: User[] = [];

  private usersRepo = usersRepository;

  public async create(user: CreateUserInput): Promise<User> {
    const newuUser = { ...user, id: (this.users.length + 1).toString() } as User;

    this.users.push(newuUser);
    await this.usersRepo.create(user);
    return newuUser;
  }

  public async findAll(): Promise<any> {
    const results = await this.usersRepo.find();
    console.log(results.rows);
    return this.users;
  }

  public findOne(id: number): User {
    return this.users.find((user) => parseInt(user.id, 10) === id) as User;
  }
}

export default new UsersService();
