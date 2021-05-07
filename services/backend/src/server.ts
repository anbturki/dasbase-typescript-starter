import { Application } from './Application';
import { rootModule } from './modules/root/root.module';
import { loadSchema } from './utils';

const app = new Application({ rootDir: __dirname });

app.createApolloServer({
  schema: loadSchema(__dirname, rootModule.getResolvers()),
});

const start = () => {
  app.listen();
};

start();
