import { Inject, Service } from 'typedi';
import { CreateUserInput } from '../../generated/graphql';
import { Mutation, Query } from '../../utils/decorators/mutation.decorator';
import usersService, { IUser, UsersService } from './users.service';

export class UsersReslovers {
  private usersService: UsersService = usersService;

  @Mutation()
  createUser(parent: any, args: { user: CreateUserInput }) {
    const { user } = args;
    return this.usersService.create(user as IUser);
  }

  @Query()
  allUsers(): IUser[] {
    return this.usersService.findAll();
  }

  @Query()
  user(_: any, args: { id: string }) {
    const { id } = args;
    return this.usersService.findOne(parseInt(id, 10));
  }
}

export default UsersReslovers;
