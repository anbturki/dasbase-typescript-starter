/* eslint-disable class-methods-use-this */
import { CreateUserInput } from '@graphtypes';
import { Inject } from 'typedi';
import Database from '../../utils/database/database';

export class UsersRepository {
  find() {
    return Database.getConnection().exec('SELECT * FROM USERS');
  }

  findOne(id: number) {
    return Database.getConnection().exec('SELECT * FROM USERS WHERE ID = $1', [id]);
  }

  create(user: CreateUserInput) {
    const { email, firstName, lastName } = user;
    return Database.getConnection().exec(
      'INSERT INTO users (first_name, last_name, email, username,password) VALUES($1,$2,$3, $4,$5)',
      [firstName, lastName, email, Date.now(), Date.now()],
    );
  }
}

export default new UsersRepository();
