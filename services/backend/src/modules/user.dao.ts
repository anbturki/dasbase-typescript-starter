import debug from 'debug';
import CreateUserDto from './authentication/create.user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
  private users: CreateUserDto[];

  constructor() {
    log('Created new instance of UsersDao');
  }

  addUser() {
    this.users.push({
      firstName: 'ali',
      lastName: 'turki',
      email: 'ait',
      password: 'xy',
      id: 'k',
    });
  }
}

export default new UsersDao();
