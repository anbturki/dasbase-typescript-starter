import 'reflect-metadata';
import { Application } from './Application';
import { UsersReslovers } from './modules/users/users.reslovers';

const app = new Application({ rootDir: __dirname, resolvers: [UsersReslovers] });

app.createApolloServer();

const start = () => {
  app.listen();
};

start();
